import { api } from "encore.dev/api";
import { userDB } from "./db";

interface DashboardStats {
  weeklyEarnings: number;
  totalEarnings: number;
  referralCount: number;
  rank: string;
  certificatesCount: number;
  activeSubscriptions: number;
}

// Get dashboard statistics for authenticated user
export const getDashboardStats = api<void, DashboardStats>(
  { auth: true, expose: true, method: "GET", path: "/user/dashboard/stats" },
  async () => {
    // For now, return mock data that matches the frontend expectations
    // In a real implementation, this would aggregate data from various tables
    return {
      weeklyEarnings: 150,
      totalEarnings: 1250,
      referralCount: 8,
      rank: 'Silver',
      certificatesCount: 2,
      activeSubscriptions: 1,
    };
  }
);