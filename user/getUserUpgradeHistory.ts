import { api } from "encore.dev/api";
import { userDB } from "./db";

interface GetUserUpgradeHistoryParams {
  userId: string;
}

interface UpgradeRecord {
  id: number;
  oldTier: string;
  newTier: string;
  paymentReceived: boolean;
  refundPeriodPassed: boolean;
  upgradeDate: string;
  commissionEligible: boolean;
}

interface GetUserUpgradeHistoryResponse {
  upgrades: UpgradeRecord[];
  totalUpgrades: number;
}

// Get user's upgrade history for admin dashboard
export const getUserUpgradeHistory = api<GetUserUpgradeHistoryParams, GetUserUpgradeHistoryResponse>(
  { auth: true, expose: true, method: "GET", path: "/user/upgrade-history/:userId" },
  async ({ userId }) => {
    const result = await userDB.query`
      SELECT
        id,
        old_tier as "oldTier",
        new_tier as "newTier",
        payment_received as "paymentReceived",
        refund_period_passed as "refundPeriodPassed",
        upgrade_date as "upgradeDate",
        (payment_received AND refund_period_passed) as "commissionEligible"
      FROM user_upgrades
      WHERE user_id = ${userId}
      ORDER BY upgrade_date DESC
    `;

    const upgrades = Array.isArray(result) ? result : [];

    return {
      upgrades: upgrades as UpgradeRecord[],
      totalUpgrades: upgrades.length
    };
  }
);