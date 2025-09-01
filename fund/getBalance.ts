import { api } from "encore.dev/api";
import { fundDB } from "./db";

export interface FundBalance {
  totalAmount: number;
  reservedAmount: number;
  availableAmount: number;
  updatedAt: string;
}

// Gets the current fund balance
export const getBalance = api<void, FundBalance>(
  { expose: true, method: "GET", path: "/fund/balance" },
  async () => {
    const balance = await fundDB.queryRow<{
      total_amount: string;
      reserved_amount: string;
      available_amount: string;
      updated_at: string;
    }>`SELECT total_amount, reserved_amount, available_amount, updated_at FROM fund_balance ORDER BY id DESC LIMIT 1`;

    if (!balance) {
      return {
        totalAmount: 0,
        reservedAmount: 0,
        availableAmount: 0,
        updatedAt: new Date().toISOString(),
      };
    }

    return {
      totalAmount: parseFloat(balance.total_amount),
      reservedAmount: parseFloat(balance.reserved_amount),
      availableAmount: parseFloat(balance.available_amount),
      updatedAt: balance.updated_at,
    };
  }
);
