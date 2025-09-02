import { api } from "encore.dev/api";
import { outreachDB } from "./db";

interface AffiliateStats {
  weeklyEarnings: number;
  totalEarnings: number;
  referralCount: number;
  rank: string;
  isAffiliate: boolean;
  referralCode: string;
}

// Get affiliate statistics for authenticated user
export const getAffiliateStats = api<void, AffiliateStats>(
  { auth: true, expose: true, method: "GET", path: "/outreach/affiliate/stats" },
  async () => {
    // For now, return mock data that matches the frontend expectations
    // In a real implementation, this would aggregate data from commissions and referrals tables
    return {
      weeklyEarnings: 150,
      totalEarnings: 1250,
      referralCount: 8,
      rank: 'Silver',
      isAffiliate: true,
      referralCode: 'DEMO123',
    };
  }
);