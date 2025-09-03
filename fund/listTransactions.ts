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

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ListTransactionsResponse extends PaginatedResponse<Transaction> {}

// Lists fund transactions with pagination
export const listTransactions = api<PaginationParams, ListTransactionsResponse>(
  { expose: true, method: "GET", path: "/fund/transactions" },
  async (params) => {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20)); // Max 100 items per page
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const totalResult = await fundDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count
      FROM fund_transactions
    `;

    const total = totalResult?.count || 0;
    const totalPages = Math.ceil(total / limit);

    // Get paginated transactions
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
       LIMIT ${limit} OFFSET ${offset}`;

    return {
      data: transactions.map(tx => ({
        id: tx.id,
        type: tx.type,
        amount: parseFloat(tx.amount),
        description: tx.description,
        referenceId: tx.reference_id,
        status: tx.status,
        createdAt: tx.created_at,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }
);
