import { api } from "encore.dev/api";
import { outreachDB } from "./db";

interface SeedNetworkResponse {
  success: boolean;
  profilesCreated: number;
  referralsCreated: number;
  commissionsCreated: number;
  withdrawalsCreated: number;
}

// Seeds a rich demo network for Outreach so the dashboard shows a full MLM structure.
export const seedNetwork = api<void, SeedNetworkResponse>(
  { expose: true, method: "POST", path: "/outreach/seed" },
  async () => {
    const tx = await outreachDB.begin();
    try {
      await tx.exec`DELETE FROM affiliate_referrals`;
      await tx.exec`DELETE FROM commissions`;
      await tx.exec`DELETE FROM withdrawal_requests`;
      await tx.exec`DELETE FROM affiliate_profiles`;

      // Create demo profiles (roots and deeper levels).
      // We'll include previous sample ids + more detailed network.
      const profiles: {
        user_id: string;
        referral_code: string;
        sponsor_id?: string | null;
        level: number;
        total_earnings: number;
        weekly_earnings: number;
        rank: string;
      }[] = [
        { user_id: "user1", referral_code: "CMD123ABC", sponsor_id: null, level: 1, total_earnings: 20500, weekly_earnings: 1650, rank: "Double Diamond" },
        { user_id: "user2", referral_code: "CMD456DEF", sponsor_id: "user1", level: 2, total_earnings: 11850, weekly_earnings: 900, rank: "Diamond" },
        { user_id: "user3", referral_code: "CMD789GHI", sponsor_id: "user1", level: 2, total_earnings: 13420, weekly_earnings: 1020, rank: "Diamond" },
        { user_id: "user4", referral_code: "CMD321JKL", sponsor_id: "user2", level: 3, total_earnings: 6400, weekly_earnings: 520, rank: "Gold" },
        { user_id: "user5", referral_code: "CMD654MNO", sponsor_id: "user2", level: 3, total_earnings: 4900, weekly_earnings: 450, rank: "Gold" },
        { user_id: "user6", referral_code: "CMD987PQR", sponsor_id: "user3", level: 3, total_earnings: 7200, weekly_earnings: 610, rank: "Gold" },
        { user_id: "user7", referral_code: "CMD147STU", sponsor_id: "user3", level: 3, total_earnings: 3800, weekly_earnings: 340, rank: "Silver" },
        { user_id: "user8", referral_code: "CMD258VWX", sponsor_id: "user4", level: 4, total_earnings: 2150, weekly_earnings: 190, rank: "Silver" },
        { user_id: "user9", referral_code: "CMD369YZA", sponsor_id: "user5", level: 4, total_earnings: 1950, weekly_earnings: 170, rank: "Silver" },
        { user_id: "user10", referral_code: "CMD741BCD", sponsor_id: "user6", level: 4, total_earnings: 2875, weekly_earnings: 240, rank: "Bronze" },
        { user_id: "user11", referral_code: "CMD852EFG", sponsor_id: "user6", level: 4, total_earnings: 3050, weekly_earnings: 260, rank: "Bronze" },
      ];

      for (const p of profiles) {
        await tx.exec`
          INSERT INTO affiliate_profiles (user_id, referral_code, sponsor_id, level, total_earnings, weekly_earnings, rank)
          VALUES (${p.user_id}, ${p.referral_code}, ${p.sponsor_id ?? null}, ${p.level}, ${p.total_earnings}, ${p.weekly_earnings}, ${p.rank})
        `;
      }

      // Referrals (associate child to parent with Commission rates)
      const referrals: {
        referrer_id: string;
        referred_id: string;
        level: number;
        commission_rate: number;
      }[] = [
        { referrer_id: "user1", referred_id: "user2", level: 1, commission_rate: 0.20 },
        { referrer_id: "user1", referred_id: "user3", level: 1, commission_rate: 0.20 },

        { referrer_id: "user2", referred_id: "user4", level: 2, commission_rate: 0.10 },
        { referrer_id: "user2", referred_id: "user5", level: 2, commission_rate: 0.10 },

        { referrer_id: "user3", referred_id: "user6", level: 2, commission_rate: 0.10 },
        { referrer_id: "user3", referred_id: "user7", level: 2, commission_rate: 0.10 },

        { referrer_id: "user4", referred_id: "user8", level: 3, commission_rate: 0.05 },
        { referrer_id: "user5", referred_id: "user9", level: 3, commission_rate: 0.05 },
        { referrer_id: "user6", referred_id: "user10", level: 3, commission_rate: 0.05 },
        { referrer_id: "user6", referred_id: "user11", level: 3, commission_rate: 0.05 },
      ];

      for (const r of referrals) {
        await tx.exec`
          INSERT INTO affiliate_referrals (referrer_id, referred_id, level, commission_rate)
          VALUES (${r.referrer_id}, ${r.referred_id}, ${r.level}, ${r.commission_rate})
        `;
      }

      // Commissions (weekly snapshots)
      const commissionRows: {
        affiliate_id: string;
        referred_id: string;
        amount: number;
        level: number;
        transaction_type: string;
        week_start: string; // ISO date
        status: string;
      }[] = [
        { affiliate_id: "user1", referred_id: "user2", amount: 1650, level: 1, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },
        { affiliate_id: "user1", referred_id: "user3", amount: 1020, level: 1, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },

        { affiliate_id: "user2", referred_id: "user4", amount: 520, level: 2, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },
        { affiliate_id: "user2", referred_id: "user5", amount: 450, level: 2, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },

        { affiliate_id: "user3", referred_id: "user6", amount: 610, level: 2, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },
        { affiliate_id: "user3", referred_id: "user7", amount: 340, level: 2, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },

        { affiliate_id: "user4", referred_id: "user8", amount: 190, level: 3, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },
        { affiliate_id: "user5", referred_id: "user9", amount: 170, level: 3, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },
        { affiliate_id: "user6", referred_id: "user10", amount: 240, level: 3, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },
        { affiliate_id: "user6", referred_id: "user11", amount: 260, level: 3, transaction_type: "subscription", week_start: "2024-12-08", status: "completed" },
      ];

      for (const c of commissionRows) {
        await tx.exec`
          INSERT INTO commissions (affiliate_id, referred_id, amount, level, transaction_type, week_start, status)
          VALUES (${c.affiliate_id}, ${c.referred_id}, ${c.amount}, ${c.level}, ${c.transaction_type}, ${c.week_start}, ${c.status})
        `;
      }

      // Withdrawals
      const withdrawals: {
        affiliate_id: string;
        amount: number;
        wallet_address: string;
        status: string;
      }[] = [
        { affiliate_id: "user1", amount: 1200, wallet_address: "TRC20-USER1-WALLET", status: "pending" },
        { affiliate_id: "user2", amount: 600, wallet_address: "TRC20-USER2-WALLET", status: "pending" },
        { affiliate_id: "user3", amount: 950, wallet_address: "TRC20-USER3-WALLET", status: "completed" },
      ];

      for (const w of withdrawals) {
        await tx.exec`
          INSERT INTO withdrawal_requests (affiliate_id, amount, wallet_address, status)
          VALUES (${w.affiliate_id}, ${w.amount}, ${w.wallet_address}, ${w.status})
        `;
      }

      await tx.commit();
      return {
        success: true,
        profilesCreated: profiles.length,
        referralsCreated: referrals.length,
        commissionsCreated: commissionRows.length,
        withdrawalsCreated: withdrawals.length,
      };
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  }
);
