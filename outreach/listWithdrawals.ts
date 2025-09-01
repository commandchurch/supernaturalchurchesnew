import { api } from "encore.dev/api";
import { outreachDB } from "./db";

export interface Withdrawal {
  id: number;
  affiliateId: string;
  amount: number;
  walletAddress: string;
  status: string;
  createdAt: string;
  processedAt?: string | null;
}

interface ListWithdrawalsResponse {
  withdrawals: Withdrawal[];
}

// Lists all withdrawal requests (most recent first)
export const listWithdrawals = api<void, ListWithdrawalsResponse>(
  { expose: true, method: "GET", path: "/outreach/withdrawals" },
  async () => {
    const rows = await outreachDB.queryAll<{
      id: number;
      affiliate_id: string;
      amount: string;
      wallet_address: string;
      status: string;
      created_at: string;
      processed_at?: string | null;
    }>`
      SELECT id, affiliate_id, amount, wallet_address, status, created_at, processed_at
      FROM withdrawal_requests
      ORDER BY created_at DESC
    `;

    return {
      withdrawals: rows.map((w) => ({
        id: w.id,
        affiliateId: w.affiliate_id,
        amount: parseFloat(w.amount),
        walletAddress: w.wallet_address,
        status: w.status,
        createdAt: w.created_at,
        processedAt: w.processed_at ?? null,
      })),
    };
  }
);
