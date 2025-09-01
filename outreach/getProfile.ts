import { api } from "encore.dev/api";
import { outreachDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface AffiliateProfile {
  userId: string;
  referralCode: string;
  sponsorId?: string | null;
  level: number;
  totalEarnings: number;
  weeklyEarnings: number;
  rank: string;
  directReferrals: number;
  isAffiliate: boolean;
}

// Gets the authenticated user's affiliate profile, if it exists.
export const getProfile = api<void, AffiliateProfile>(
  { auth: true, expose: true, method: "GET", path: "/outreach/profile" },
  async () => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    const row = await outreachDB.queryRow<{
      user_id: string;
      referral_code: string;
      sponsor_id?: string | null;
      level: number;
      total_earnings: string;
      weekly_earnings: string;
      rank: string;
      direct_referrals: string;
    }>`
      SELECT
        p.user_id,
        p.referral_code,
        p.sponsor_id,
        p.level,
        p.total_earnings,
        p.weekly_earnings,
        p.rank,
        COALESCE((
          SELECT COUNT(*)::text
          FROM affiliate_referrals r
          WHERE r.referrer_id = p.user_id
        ), '0') AS direct_referrals
      FROM affiliate_profiles p
      WHERE p.user_id = ${userId}
    `;

    if (!row) {
      return {
        userId: userId,
        referralCode: '',
        sponsorId: null,
        level: 0,
        totalEarnings: 0,
        weeklyEarnings: 0,
        rank: 'N/A',
        directReferrals: 0,
        isAffiliate: false,
      };
    }

    return {
      userId: row.user_id,
      referralCode: row.referral_code,
      sponsorId: row.sponsor_id ?? null,
      level: row.level,
      totalEarnings: parseFloat(row.total_earnings),
      weeklyEarnings: parseFloat(row.weekly_earnings),
      rank: row.rank,
      directReferrals: parseInt(row.direct_referrals || "0", 10),
      isAffiliate: true,
    };
  }
);
