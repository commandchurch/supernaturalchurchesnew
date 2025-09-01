import { api } from "encore.dev/api";
import { fundDB } from "./db";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  description: string;
  referenceId?: string;
  status: string;
  createdAt: string;
}

interface ListTransactionsResponse {
  transactions: Transaction[];
}

// Lists recent fund transactions
export const listTransactions = api<void, ListTransactionsResponse>(
  { expose: true, method: "GET", path: "/fund/transactions" },
  async () => {
    const transactions = await fundDB.queryAll<{
      id: number;
      type: string;
      amount: string;
      description: string;
      reference_id?: string;
      status: string;
      created_at: string;
    }>`SELECT id, type, amount, description, reference_id, status, created_at 
       FROM fund_transactions 
       ORDER BY created_at DESC 
       LIMIT 20`;

    return {
      transactions: transactions.map(tx => ({
        id: tx.id,
        type: tx.type,
        amount: parseFloat(tx.amount),
        description: tx.description,
        referenceId: tx.reference_id,
        status: tx.status,
        createdAt: tx.created_at,
      }))
    };
  }
);
