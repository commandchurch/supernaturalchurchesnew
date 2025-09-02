import { api } from "encore.dev/api";
import { userDB } from "./db";
import { getAuthData } from "~encore/auth";

interface DownlineLevel {
  level: number;
  points: number;
  members: number;
  commission: number;
  commissionRate: number;
}

interface DownlineTierStats {
  tier: string;
  totalPoints: number;
  totalMembers: number;
  totalCommission: number;
  nextPayoutDate: string;
  levels: DownlineLevel[];
}

interface GetDownlineStatsResponse {
  bronze: DownlineTierStats;
  silver: DownlineTierStats;
  gold: DownlineTierStats;
  diamond: DownlineTierStats;
  overall: {
    totalPoints: number;
    totalMembers: number;
    totalCommission: number;
    nextPayoutDate: string;
  };
}

// Get comprehensive downline statistics with 7-level breakdown
export const getDownlineStats = api<void, GetDownlineStatsResponse>(
  { auth: true, expose: true, method: "GET", path: "/user/downline/stats" },
  async () => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    // Simple commission rates for each level (1-7): 20%, 10%, 5%, 3%, 2%, 1%, 1%
    const commissionRates = [0.20, 0.10, 0.05, 0.03, 0.02, 0.01, 0.01];

    // Flat commission amounts for each tier
    const tierCommissions = {
      'BRONZE': 8,
      'SILVER': 14,
      'GOLD': 60,
      'DIAMOND': 200
    };

    const result = {
      bronze: await getTierStats(userId, 'BRONZE', commissionRates, tierCommissions),
      silver: await getTierStats(userId, 'SILVER', commissionRates, tierCommissions),
      gold: await getTierStats(userId, 'GOLD', commissionRates, tierCommissions),
      diamond: await getTierStats(userId, 'DIAMOND', commissionRates, tierCommissions),
      overall: {
        totalPoints: 0,
        totalMembers: 0,
        totalCommission: 0,
        nextPayoutDate: calculate_next_payout_date().toISOString()
      }
    };

    // Calculate overall totals
    result.overall.totalPoints =
      result.bronze.totalPoints +
      result.silver.totalPoints +
      result.gold.totalPoints +
      result.diamond.totalPoints;

    result.overall.totalMembers =
      result.bronze.totalMembers +
      result.silver.totalMembers +
      result.gold.totalMembers +
      result.diamond.totalMembers;

    result.overall.totalCommission =
      result.bronze.totalCommission +
      result.silver.totalCommission +
      result.gold.totalCommission +
      result.diamond.totalCommission;

    return result;
  }
);

// Helper function to get stats for a specific tier
async function getTierStats(
  userId: string,
  tier: string,
  commissionRates: number[],
  tierCommissions: Record<string, number>
): Promise<DownlineTierStats> {
  const levels: DownlineLevel[] = [];

  // Get data for each of the 7 levels
  for (let level = 1; level <= 7; level++) {
    const levelData = await userDB.queryRow<{ points: number, members: number }>`
      SELECT
        COALESCE(SUM(points_earned), 0) as points,
        COUNT(*) as members
      FROM user_downline
      WHERE user_id = ${userId}
        AND membership_tier = ${tier}
        AND level = ${level}
    `;

    const points = levelData?.points || 0;
    const members = levelData?.members || 0;
    const commissionRate = commissionRates[level - 1] || 0;
    const commission = points * (tierCommissions[tier] || 0) * commissionRate;

    levels.push({
      level,
      points,
      members,
      commission,
      commissionRate
    });
  }

  const totalPoints = levels.reduce((sum, level) => sum + level.points, 0);
  const totalMembers = levels.reduce((sum, level) => sum + level.members, 0);
  const totalCommission = levels.reduce((sum, level) => sum + level.commission, 0);

  return {
    tier,
    totalPoints,
    totalMembers,
    totalCommission,
    nextPayoutDate: calculate_next_payout_date().toISOString(),
    levels
  };
}

// Helper function to calculate next payout date
function calculate_next_payout_date(): Date {
  const now = new Date();
  const nextPayout = new Date(now);
  nextPayout.setDate(now.getDate() + 28);
  return nextPayout;
}