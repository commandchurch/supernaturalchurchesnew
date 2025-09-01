import { api } from "encore.dev/api";
import { membershipDB } from "./db";

export interface Plan {
  code: string;
  name: string;
  priceMonthly: number;
  features: string[];
}

interface ListPlansResponse {
  plans: Plan[];
}

// Lists all membership plans.
export const listPlans = api<void, ListPlansResponse>(
  { expose: true, method: "GET", path: "/membership/plans" },
  async () => {
    const rows = await membershipDB.queryAll<{
      code: string;
      name: string;
      price_monthly: string;
      features: any;
    }>`SELECT code, name, price_monthly, features FROM subscription_plans ORDER BY price_monthly ASC`;

    return {
      plans: rows.map(r => ({
        code: r.code,
        name: r.name,
        priceMonthly: parseFloat(r.price_monthly),
        features: Array.isArray(r.features) ? r.features : [],
      })),
    };
  }
);
