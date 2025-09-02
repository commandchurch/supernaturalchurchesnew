import { api } from "encore.dev/api";
import { userDB } from "./db";
import { processMultiLevelBonuses } from "./processMultiLevelBonuses";

interface TrackSignupParams {
  referrerId: string;
  newUserId: string;
  membershipTier: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  paymentReceived: boolean;
  refundPeriodPassed: boolean;
}

interface TrackSignupResponse {
  success: boolean;
  commissionEligible: boolean;
  message: string;
  bonusTriggered?: {
    type: string;
    amount: number;
    message: string;
  } | null;
}

// Track new user signups and determine commission eligibility
export const trackSignup = api<TrackSignupParams, TrackSignupResponse>(
  { auth: true, expose: true, method: "POST", path: "/user/track-signup" },
  async ({ referrerId, newUserId, membershipTier, paymentReceived, refundPeriodPassed }) => {
    // Record the signup
    await userDB.queryRow`
      INSERT INTO user_signups (
        referrer_id, new_user_id, membership_tier,
        payment_received, refund_period_passed, commission_eligible
      )
      VALUES (
        ${referrerId}, ${newUserId}, ${membershipTier},
        ${paymentReceived}, ${refundPeriodPassed}, ${paymentReceived && refundPeriodPassed}
      )
    `;

    const commissionEligible = paymentReceived && refundPeriodPassed;

    if (commissionEligible) {
      // Count eligible signups for this referrer
      const result = await userDB.queryRow<{ count: number }>`
        SELECT COUNT(*) as count
        FROM user_signups
        WHERE referrer_id = ${referrerId}
        AND commission_eligible = TRUE
        AND commission_paid = FALSE
      `;

      const signupCount = result?.count || 0;

      // Check for bonus triggers
      let bonusTriggered = null;

      // Bronze: 5 signups = Silver upgrade
      if (signupCount >= 5) {
        const existingBonus = await userDB.queryRow`
          SELECT id FROM user_bonuses
          WHERE user_id = ${referrerId} AND bonus_type = 'silver_upgrade' AND status = 'pending'
        `;

        if (!existingBonus) {
          // Point-based bonus system
          const membershipPoints = {
            'BRONZE': 1,
            'SILVER': 2,
            'GOLD': 5,
            'DIAMOND': 10
          };

          const pointsEarned = membershipPoints[membershipTier as keyof typeof membershipPoints] || 1;

          // Update user's total points
          await userDB.queryRow`
            INSERT INTO user_points (user_id, total_points, earned_points, source_type, source_id)
            VALUES (${referrerId}, ${pointsEarned}, ${pointsEarned}, 'direct_signup', ${newUserId})
            ON CONFLICT (user_id) DO UPDATE SET
              total_points = user_points.total_points + ${pointsEarned},
              earned_points = user_points.earned_points + ${pointsEarned}
          `;

          // Check for multi-level bonuses (3 levels deep)
          await processMultiLevelBonuses(referrerId, membershipTier, pointsEarned, 1, 3);

          // Check for bonus triggers based on total points
          const userPointsResult = await userDB.queryRow<{ total_points: number }>`
            SELECT total_points FROM user_points WHERE user_id = ${referrerId}
          `;

          const totalPoints = userPointsResult?.total_points || 0;

          // Bonus triggers (repeatable)
          if (totalPoints >= 25 && totalPoints % 25 === 0) {
            const bonusAmount = Math.floor(totalPoints / 25) * 200; // $200 per 25 points
            bonusTriggered = {
              type: 'points_bonus_25',
              amount: bonusAmount,
              message: `Congratulations! You've earned a $${bonusAmount} AUD bonus for reaching ${totalPoints} points!`
            };
          } else if (totalPoints >= 50 && totalPoints % 50 === 0) {
            const bonusAmount = Math.floor(totalPoints / 50) * 500; // $500 per 50 points
            bonusTriggered = {
              type: 'points_bonus_50',
              amount: bonusAmount,
              message: `Congratulations! You've earned a $${bonusAmount} AUD bonus for reaching ${totalPoints} points!`
            };
          } else if (totalPoints >= 100 && totalPoints % 100 === 0) {
            const bonusAmount = Math.floor(totalPoints / 100) * 2500; // $2,500 per 100 points
            bonusTriggered = {
              type: 'points_bonus_100',
              amount: bonusAmount,
              message: `Congratulations! You've earned a $${bonusAmount} AUD bonus for reaching ${totalPoints} points!`
            };
          } else if (totalPoints >= 200 && totalPoints % 200 === 0) {
            const bonusAmount = Math.floor(totalPoints / 200) * 5000; // $5,000 per 200 points
            bonusTriggered = {
              type: 'points_bonus_200',
              amount: bonusAmount,
              message: `Congratulations! You've earned a $${bonusAmount} AUD bonus for reaching ${totalPoints} points!`
            };
          }
        }
      }

      // Silver: 25 signups = $500 bonus
      if (signupCount >= 25) {
        const existingBonus = await userDB.queryRow`
          SELECT id FROM user_bonuses
          WHERE user_id = ${referrerId} AND bonus_type = 'bonus_500' AND status = 'pending'
        `;

        if (!existingBonus) {
          bonusTriggered = {
            type: 'bonus_500',
            amount: 500,
            message: 'Congratulations! You\'ve earned a $500 AUD bonus for signing up 25 PAID members!'
          };
        }
      }

      // Gold: 50 signups = $1000 bonus
      if (signupCount >= 50) {
        const existingBonus = await userDB.queryRow`
          SELECT id FROM user_bonuses
          WHERE user_id = ${referrerId} AND bonus_type = 'bonus_1000' AND status = 'pending'
        `;

        if (!existingBonus) {
          bonusTriggered = {
            type: 'bonus_1000',
            amount: 1000,
            message: 'Congratulations! You\'ve earned a $1,000 AUD bonus for signing up 50 PAID members!'
          };
        }
      }

      // Diamond: 250 signups = $2000 bonus
      if (signupCount >= 250) {
        const existingBonus = await userDB.queryRow`
          SELECT id FROM user_bonuses
          WHERE user_id = ${referrerId} AND bonus_type = 'bonus_2000' AND status = 'pending'
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
          VALUES (${referrerId}, ${bonusTriggered.type}, ${bonusTriggered.amount}, NOW(), 'pending')
        `;
      }

      return {
        success: true,
        commissionEligible: true,
        message: `PAID signup recorded successfully. Commission eligible.`,
        bonusTriggered
      };
    }

    return {
      success: true,
      commissionEligible: false,
      message: paymentReceived
        ? 'PAID signup recorded. Commission pending refund period.'
        : 'FREE signup recorded. Only PAID memberships qualify for commissions and bonuses.'
    };
  }
);