import { api } from "encore.dev/api";
import { outreachDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface OutreachStats {
  weeklyEarnings: number;
  totalEarnings: number;
  referralCount: number;
  outreachImpact: number;
  rank: string;
  referralCode: string;
}

// Gets affiliate stats for the authenticated user
export const getStats = api<void, OutreachStats>(
  { auth: true, expose: true, method: "GET", path: "/outreach/stats" },
  async () => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    const profile = await outreachDB.queryRow<{
      total_earnings: string;
      weekly_earnings: string;
      rank: string;
      referral_code: string;
    }>`SELECT total_earnings, weekly_earnings, rank, referral_code 
       FROM affiliate_profiles 
       WHERE user_id = ${userId}`;

    if (!profile) {
      return {
        weeklyEarnings: 0,
        totalEarnings: 0,
        referralCount: 0,
        outreachImpact: 0,
        rank: 'Bronze',
        referralCode: '',
      };
    }

    const referralCount = await outreachDB.queryRow<{ count: string }>`
      SELECT COUNT(*) as count FROM affiliate_referrals WHERE referrer_id = ${userId}
    `;

    return {
      weeklyEarnings: parseFloat(profile.weekly_earnings),
      totalEarnings: parseFloat(profile.total_earnings),
      referralCount: parseInt(referralCount?.count || '0'),
      outreachImpact: (parseInt(referralCount?.count || '0')) * 7, // Mock calculation
      rank: profile.rank,
      referralCode: profile.referral_code,
    };
  }
);
