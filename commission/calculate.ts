import { Subscription } from "encore.dev/pubsub";
import { paymentTopic } from "./pubsub";
import { outreachDB } from "../outreach/db";
import { membershipDB } from "../membership/db";

const MAX_LEVELS = 7;

// Defines commission rates for each level for standard members.
const COMMISSION_RATES = [
  0.20, // Level 1
  0.10, // Level 2
  0.05, // Level 3
  0.02, // Level 4
  0.01, // Level 5
  0.01, // Level 6
  0.01, // Level 7
];

// Defines max payout level for each membership tier.
const TIER_MAX_LEVEL: Record<string, number> = {
  RECRUIT: 4,
  PRIVATE: 4,
  CAPTAIN: 5,
  COMMANDO: 7,
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
        const sponsorTier = sponsorSub?.plan_code || 'RECRUIT';
        const sponsorMaxLevel = TIER_MAX_LEVEL[sponsorTier] || 4;
        const isPartner = sponsorTier === 'PARTNER';
        const isCommando = sponsorTier === 'COMMANDO';

        if (currentLevel <= sponsorMaxLevel) {
          const commissionRate = isPartner
            ? (PARTNER_COMMISSION_RATES[currentLevel - 1] || 0)
            : (COMMISSION_RATES[currentLevel - 1] || 0);
          
          if (commissionRate > 0) {
            let commissionAmount = amountInDollars * commissionRate;

            // Check for monthly cap for Commando and Partner tiers
            if (isCommando || isPartner) {
                const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                const monthlyEarnings = await tx.queryRow<{ total: string }>`
                    SELECT SUM(amount) as total FROM commissions
                    WHERE affiliate_id = ${sponsorId} AND created_at >= ${startOfMonth}
                `;
                const currentMonthlyTotal = parseFloat(monthlyEarnings?.total || '0');
                
                if (currentMonthlyTotal >= 10000) {
                    commissionAmount = 0; // Cap reached, no more commission this month
                } else if (currentMonthlyTotal + commissionAmount > 10000) {
                    commissionAmount = 10000 - currentMonthlyTotal; // Cap the commission to not exceed 10k
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
