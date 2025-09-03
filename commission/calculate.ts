import { Subscription } from "encore.dev/pubsub";
import { paymentTopic } from "./pubsub";
import { outreachDB } from "../outreach/db";
import { membershipDB } from "../membership/db";

const MAX_LEVELS = 7;

// Defines commission rates for each level for standard members.
const COMMISSION_RATES = [
  0.30, // Level 1 - 30% for all tiers
  0.30, // Level 2 - 30% for all tiers
  0.30, // Level 3 - 30% for all tiers
  0.30, // Level 4 - 30% for all tiers
  0.30, // Level 5 - 30% for all tiers
  0.30, // Level 6 - 30% for all tiers
  0.30, // Level 7 - 30% for all tiers
];

// Updated membership prices for commission calculations
const MEMBERSHIP_PRICES = {
  'BRONZE': 20,
  'SILVER': 50,
  'GOLD': 100,
  'DIAMOND': 250
};

// Defines max payout level for each membership tier.
const TIER_MAX_LEVEL: Record<string, number> = {
  FREE: 1, // Free members can earn Level 1 after signing up 2 Bronze
  BRONZE: 1, // Bronze members earn Level 1
  SILVER: 2, // Silver members earn Levels 1-2
  GOLD: 5, // Gold members earn Levels 1-5
  DIAMOND: 7, // Diamond members earn Levels 1-7
  PARTNER: 3, // Church partners have a 3-tier structure
};

// Defines commission rates for church partners.
const PARTNER_COMMISSION_RATES = [
  0.20, // Level 1
  0.10, // Level 2
  0.05, // Level 3
];

// Subscribes to payment events and calculates multi-level commissions.
new Subscription(paymentTopic, "calculate-commissions", {
  handler: async (event) => {
    const { userId, amountPaid } = event;
    const amountInDollars = amountPaid / 100;

    let currentReferrerId = userId;
    let currentLevel = 1;

    const tx = await outreachDB.begin();
    try {
      while (currentReferrerId && currentLevel <= MAX_LEVELS) {
        // Find the sponsor of the current user
        const sponsor = await tx.queryRow<{ user_id: string }>`
          SELECT sponsor_id as user_id FROM affiliate_profiles WHERE user_id = ${currentReferrerId}
        `;

        if (!sponsor?.user_id) {
          break; // No more sponsors up the chain
        }

        const sponsorId = sponsor.user_id;

        // Get sponsor's membership tier to determine max payout level and rates
        const sponsorSub = await membershipDB.queryRow<{ plan_code: string }>`
          SELECT plan_code FROM subscriptions WHERE user_id = ${sponsorId} AND status = 'active'
        `;
        const sponsorTier = sponsorSub?.plan_code || 'FREE';

        // Special logic for FREE tier: check if they have signed up 2+ Bronze members
        let effectiveTier = sponsorTier;
        let sponsorMaxLevel = TIER_MAX_LEVEL[sponsorTier] || 1;

        if (sponsorTier === 'FREE') {
          // Check if FREE member has signed up 2+ Bronze members to earn Level 1 commissions
          const bronzeSignups = await tx.queryRow<{ count: string }>`
            SELECT COUNT(*) as count FROM affiliate_profiles ap
            JOIN subscriptions s ON ap.user_id = s.user_id
            WHERE ap.sponsor_id = ${sponsorId} AND s.plan_code = 'BRONZE' AND s.status = 'active'
          `;
          const bronzeCount = parseInt(bronzeSignups?.count || '0');
          if (bronzeCount >= 2) {
            effectiveTier = 'BRONZE'; // They earn Level 1 commissions like Bronze
            sponsorMaxLevel = 1;
          }
        } else {
          sponsorMaxLevel = TIER_MAX_LEVEL[sponsorTier] || 1;
        }

        const isPartner = sponsorTier === 'PARTNER';

        if (currentLevel <= sponsorMaxLevel) {
          const commissionRate = isPartner
            ? (PARTNER_COMMISSION_RATES[currentLevel - 1] || 0)
            : (COMMISSION_RATES[currentLevel - 1] || 0);

          // For FREE tier earning Level 1, use Bronze commission rate
          const effectiveCommissionRate = (effectiveTier === 'BRONZE' && currentLevel === 1)
            ? COMMISSION_RATES[0] // 30% for Level 1
            : commissionRate;
          
          if (effectiveCommissionRate > 0) {
            let commissionAmount = amountInDollars * effectiveCommissionRate;

            // Check for monthly cap for Partner tiers (removed Diamond cap since all tiers now get 30%)
            if (isPartner) {
                const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                const monthlyEarnings = await tx.queryRow<{ total: string }>`
                    SELECT SUM(amount) as total FROM commissions
                    WHERE affiliate_id = ${sponsorId} AND created_at >= ${startOfMonth}
                `;
                const currentMonthlyTotal = parseFloat(monthlyEarnings?.total || '0');

                if (currentMonthlyTotal >= 28000) {
                    commissionAmount = 0; // Cap reached, no more commission this month
                } else if (currentMonthlyTotal + commissionAmount > 28000) {
                    commissionAmount = 28000 - currentMonthlyTotal; // Cap the commission to not exceed 28k
                }
            }

            if (commissionAmount > 0) {
              // Insert into commissions table
              await tx.exec`
                INSERT INTO commissions (affiliate_id, referred_id, amount, level, transaction_type, week_start, status)
                VALUES (${sponsorId}, ${userId}, ${commissionAmount}, ${currentLevel}, 'subscription', date_trunc('week', current_date), 'pending')
              `;

              // Update sponsor's earnings
              await tx.exec`
                UPDATE affiliate_profiles
                SET
                  total_earnings = total_earnings + ${commissionAmount},
                  weekly_earnings = weekly_earnings + ${commissionAmount}
                WHERE user_id = ${sponsorId}
              `;
            }
          }
        }

        currentReferrerId = sponsorId;
        currentLevel++;
      }
      await tx.commit();
    } catch (err) {
      await tx.rollback();
      console.error("Failed to calculate commissions", err);
      throw err; // Allow Encore to retry
    }
  },
});
