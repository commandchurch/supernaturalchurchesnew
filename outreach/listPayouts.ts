import { api } from "encore.dev/api";
import { outreachDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface Payout {
  id: number;
  date: string;
  amount: number;
  status: string;
}

interface ListPayoutsResponse {
  payouts: Payout[];
}

// Lists commission payouts for the authenticated user
export const listPayouts = api<void, ListPayoutsResponse>(
  { auth: true, expose: true, method: "GET", path: "/outreach/payouts" },
  async () => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    const payouts = await outreachDB.queryAll<{
      id: number;
      amount: string;
      status: string;
      created_at: string;
    }>`SELECT id, amount, status, created_at 
       FROM commissions 
       WHERE affiliate_id = ${userId} 
       ORDER BY created_at DESC 
       LIMIT 20`;

    return {
      payouts: payouts.map(payout => ({
        id: payout.id,
        date: payout.created_at,
        amount: parseFloat(payout.amount),
        status: payout.status,
      }))
    };
  }
);
