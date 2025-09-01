import { api } from "encore.dev/api";
import { membershipDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface SubscriptionInfo {
  active: boolean;
  planCode?: string | null;
  planName?: string | null;
  renewsAt?: string | null;
  status?: string | null;
}

// Gets the current subscription for the authenticated user.
export const getSubscription = api<void, SubscriptionInfo>(
  { auth: true, expose: true, method: "GET", path: "/membership/subscription" },
  async () => {
    const auth = getAuthData()!;
    const row = await membershipDB.queryRow<{
      plan_code: string;
      status: string;
      renews_at?: string | null;
      name: string;
    }>`
      SELECT s.plan_code, s.status, s.renews_at, p.name
      FROM subscriptions s
      JOIN subscription_plans p ON p.code = s.plan_code
      WHERE s.user_id = ${auth.userID}
    `;
    if (!row) {
      return { active: false, planCode: null, planName: null, renewsAt: null, status: null };
    }
    return {
      active: row.status === "active",
      planCode: row.plan_code,
      planName: row.name,
      renewsAt: row.renews_at ?? null,
      status: row.status,
    };
  }
);
