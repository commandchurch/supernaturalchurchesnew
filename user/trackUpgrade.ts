import { api } from "encore.dev/api";
import { userDB } from "./db";
import { processMultiLevelBonuses } from "./processMultiLevelBonuses";

interface TrackUpgradeParams {
  userId: string;
  oldTier: 'FREE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  newTier: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  paymentReceived: boolean;
  refundPeriodPassed: boolean;
}

interface TrackUpgradeResponse {
  success: boolean;
  commissionEligible: boolean;
  message: string;
  bonusTriggered?: {
    type: string;
    amount: number;
    message: string;
  } | null;
}

// Track membership upgrades (especially FREE to PAID)
export const trackUpgrade = api<TrackUpgradeParams, TrackUpgradeResponse>(
  { auth: true, expose: true, method: "POST", path: "/user/track-upgrade" },
  async ({ userId, oldTier, newTier, paymentReceived, refundPeriodPassed }) => {
    // Record the upgrade
    await userDB.queryRow`
      INSERT INTO user_upgrades (
        user_id, old_tier, new_tier, payment_received,
        refund_period_passed, upgrade_date
      )
      VALUES (
        ${userId}, ${oldTier}, ${newTier}, ${paymentReceived},
        ${refundPeriodPassed}, NOW()
      )
    `;

    // If upgrading from FREE to PAID, this counts as a "signup" for bonus purposes
    if (oldTier === 'FREE' && paymentReceived && refundPeriodPassed) {
      // Find the referrer for this user
      const referrerResult = await userDB.queryRow<{ referrer_id: string }>`
        SELECT referrer_id FROM user_signups
        WHERE new_user_id = ${userId} AND commission_eligible = FALSE
        ORDER BY signup_date DESC LIMIT 1
      `;

      if (referrerResult?.referrer_id) {
        // Update the original signup to mark it as commission eligible
        await userDB.queryRow`
          UPDATE user_signups
          SET payment_received = TRUE,
              refund_period_passed = TRUE,
              commission_eligible = TRUE,
              commission_amount = CASE
                WHEN membership_tier = 'BRONZE' THEN 3.80
                WHEN membership_tier = 'SILVER' THEN 6.60
                WHEN membership_tier = 'GOLD' THEN 29.80
                WHEN membership_tier = 'DIAMOND' THEN 165.67
                ELSE 0
              END,
              upgraded_from_free = TRUE,
              upgrade_date = NOW()
          WHERE new_user_id = ${userId} AND referrer_id = ${referrerResult.referrer_id}
        `;

        // Award points for the upgrade (same as new signup)
        const membershipPoints = {
          'BRONZE': 1,
          'SILVER': 2,
          'GOLD': 5,
          'DIAMOND': 10
        };

        const pointsEarned = membershipPoints[newTier as keyof typeof membershipPoints] || 1;

        // Update user's total points
        await userDB.queryRow`
          INSERT INTO user_points (user_id, total_points, earned_points, source_type, source_id)
          VALUES (${referrerResult.referrer_id}, ${pointsEarned}, ${pointsEarned}, 'upgrade_signup', ${userId})
          ON CONFLICT (user_id) DO UPDATE SET
            total_points = user_points.total_points + ${pointsEarned},
            earned_points = user_points.earned_points + ${pointsEarned}
        `;

        // Check for multi-level bonuses (3 levels deep)
        await processMultiLevelBonuses(referrerResult.referrer_id, newTier, pointsEarned, 1, 3);

        // Check for bonus triggers for the referrer
        const bonusResult = await userDB.queryRow<{ count: number }>`
          SELECT COUNT(*) as count
          FROM user_signups
          WHERE referrer_id = ${referrerResult.referrer_id}
          AND commission_eligible = TRUE
          AND commission_paid = FALSE
        `;

        const signupCount = bonusResult?.count || 0;

        // Check for bonus triggers
        let bonusTriggered = null;

        if (signupCount >= 5) {
          const existingBonus = await userDB.queryRow`
            SELECT id FROM user_bonuses
            WHERE user_id = ${referrerResult.referrer_id}
            AND bonus_type = 'silver_upgrade'
            AND status = 'pending'
          `;

          if (!existingBonus) {
            bonusTriggered = {
              type: 'silver_upgrade',
              amount: 0,
              message: 'Congratulations! You\'ve earned a 28-day Silver upgrade for signing up 5 PAID members!'
            };
          }
        }

        if (signupCount >= 25) {
          const existingBonus = await userDB.queryRow`
            SELECT id FROM user_bonuses
            WHERE user_id = ${referrerResult.referrer_id}
            AND bonus_type = 'bonus_500'
            AND status = 'pending'
          `;

          if (!existingBonus) {
            bonusTriggered = {
              type: 'bonus_500',
              amount: 500,
              message: 'Congratulations! You\'ve earned a $500 AUD bonus for signing up 25 PAID members!'
            };
          }
        }

        if (signupCount >= 50) {
          const existingBonus = await userDB.queryRow`
            SELECT id FROM user_bonuses
            WHERE user_id = ${referrerResult.referrer_id}
            AND bonus_type = 'bonus_1000'
            AND status = 'pending'
          `;

          if (!existingBonus) {
            bonusTriggered = {
              type: 'bonus_1000',
              amount: 1000,
              message: 'Congratulations! You\'ve earned a $1,000 AUD bonus for signing up 50 PAID members!'
            };
          }
        }

        if (signupCount >= 250) {
          const existingBonus = await userDB.queryRow`
            SELECT id FROM user_bonuses
            WHERE user_id = ${referrerResult.referrer_id}
            AND bonus_type = 'bonus_2000'
            AND status = 'pending'
          `;

          if (!existingBonus) {
            bonusTriggered = {
              type: 'bonus_2000',
              amount: 2000,
              message: 'Congratulations! You\'ve earned a $2,000 AUD bonus for signing up 250 PAID members!'
            };
          }
        }

        // Award bonus if triggered
        if (bonusTriggered) {
          await userDB.queryRow`
            INSERT INTO user_bonuses (user_id, bonus_type, amount, earned_at, status)
            VALUES (${referrerResult.referrer_id}, ${bonusTriggered.type}, ${bonusTriggered.amount}, NOW(), 'pending')
          `;
        }

        return {
          success: true,
          commissionEligible: true,
          message: `FREE to ${newTier} upgrade recorded successfully. Commission now eligible for referrer.`,
          bonusTriggered
        };
      }
    }

    return {
      success: true,
      commissionEligible: paymentReceived && refundPeriodPassed,
      message: paymentReceived
        ? `Upgrade from ${oldTier} to ${newTier} recorded. Commission pending refund period.`
        : `Upgrade from ${oldTier} to ${newTier} recorded. Commission pending payment confirmation.`
    };
  }
);