import { api, Query } from "encore.dev/api";
import { outreachDB } from "./db";

export interface LeaderboardEntry {
  userId: string;
  rank: string;
  totalEarnings: number;
  weeklyEarnings: number;
  level: number;
}

interface ListLeaderboardParams {
  limit?: Query<number>;
}

interface ListLeaderboardResponse {
  leaderboard: LeaderboardEntry[];
}

// Lists top affiliates by total earnings (or weekly earnings if equal)
export const listLeaderboard = api<ListLeaderboardParams, ListLeaderboardResponse>(
  { expose: true, method: "GET", path: "/outreach/leaderboard" },
  async ({ limit }) => {
    const lim = typeof limit === "number" && limit > 0 ? Math.min(limit, 100) : 10;

    const rows = await outreachDB.rawQueryAll<{
      user_id: string;
      rank: string;
      total_earnings: string;
      weekly_earnings: string;
      level: number;
    }>(
      `SELECT user_id, rank, total_earnings, weekly_earnings, level
       FROM affiliate_profiles
       ORDER BY total_earnings DESC, weekly_earnings DESC
       LIMIT $1`,
      lim
    );

    return {
      leaderboard: rows.map((r) => ({
        userId: r.user_id,
        rank: r.rank,
        totalEarnings: parseFloat(r.total_earnings),
        weeklyEarnings: parseFloat(r.weekly_earnings),
        level: r.level,
      })),
    };
  }
);
