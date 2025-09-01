import { api } from "encore.dev/api";
import { outreachDB } from "./db";

export interface AffiliateProfile {
  userId: string;
  referralCode: string;
  sponsorId?: string | null;
  level: number;
  totalEarnings: number;
  weeklyEarnings: number;
  rank: string;
  directReferrals: number;
}

interface ListProfilesResponse {
  profiles: AffiliateProfile[];
}

// Lists all affiliate profiles with direct referral counts and earnings
export const listProfiles = api<void, ListProfilesResponse>(
  { expose: true, method: "GET", path: "/outreach/profiles" },
  async () => {
    const rows = await outreachDB.queryAll<{
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
      ORDER BY p.total_earnings DESC, p.weekly_earnings DESC
    `;

    return {
      profiles: rows.map((r) => ({
        userId: r.user_id,
        referralCode: r.referral_code,
        sponsorId: r.sponsor_id ?? null,
        level: r.level,
        totalEarnings: parseFloat(r.total_earnings),
        weeklyEarnings: parseFloat(r.weekly_earnings),
        rank: r.rank,
        directReferrals: parseInt(r.direct_referrals || "0", 10),
      })),
    };
  }
);
