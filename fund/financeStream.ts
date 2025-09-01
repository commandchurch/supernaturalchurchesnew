import { api, StreamOut } from "encore.dev/api";
import { fundDB } from "./db";

interface FinanceSnapshot {
  timestamp: string;
  totalAmount: number;
  reservedAmount: number;
  availableAmount: number;
  recentTransactions: {
    id: number;
    type: string;
    amount: number;
    description: string;
    createdAt: string;
  }[];
}

// Streams finance snapshots periodically for live analysis.
export const financeStream = api.streamOut<FinanceSnapshot>(
  { expose: true, path: "/fund/finance/stream" },
  async (stream: StreamOut<FinanceSnapshot>) => {
    let lastSent = "";
    try {
      for (;;) {
        const balance = await fundDB.queryRow<{
          total_amount: string;
          reserved_amount: string;
          available_amount: string;
          updated_at: string;
        }>`
          SELECT total_amount, reserved_amount, available_amount, updated_at
          FROM fund_balance
          ORDER BY id DESC
          LIMIT 1
        `;

        const txs = await fundDB.queryAll<{
          id: number;
          type: string;
          amount: string;
          description: string;
          created_at: string;
        }>`SELECT id, type, amount, description, created_at FROM fund_transactions ORDER BY created_at DESC LIMIT 10`;

        const snapshot: FinanceSnapshot = {
          timestamp: new Date().toISOString(),
          totalAmount: balance ? parseFloat(balance.total_amount) : 0,
          reservedAmount: balance ? parseFloat(balance.reserved_amount) : 0,
          availableAmount: balance ? parseFloat(balance.available_amount) : 0,
          recentTransactions: txs.map((t) => ({
            id: t.id,
            type: t.type,
            amount: parseFloat(t.amount),
            description: t.description,
            createdAt: t.created_at,
          })),
        };

        const digest = JSON.stringify(snapshot);
        if (digest !== lastSent) {
          await stream.send(snapshot);
          lastSent = digest;
        }

        await new Promise((res) => setTimeout(res, 3000));
      }
    } finally {
      await stream.close();
    }
  }
);
