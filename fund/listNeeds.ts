import { api } from "encore.dev/api";
import { fundDB } from "./db";

export interface Need {
  id: number;
  title: string;
  description: string;
  amountNeeded: number;
  amountRaised: number;
  status: string;
  urgency: string;
  category: string;
  deadline?: string;
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

interface ListNeedsResponse extends PaginatedResponse<Need> {}

// Lists all fund needs with pagination
export const listNeeds = api<PaginationParams, ListNeedsResponse>(
  { expose: true, method: "GET", path: "/fund/needs" },
  async (params) => {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20)); // Max 100 items per page
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const totalResult = await fundDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count
      FROM fund_needs
    `;

    const total = totalResult?.count || 0;
    const totalPages = Math.ceil(total / limit);

    // Get paginated needs
    const needs = await fundDB.queryAll<{
      id: number;
      title: string;
      description: string;
      amount_needed: string;
      amount_raised: string;
      status: string;
      urgency: string;
      category: string;
      deadline?: string;
      created_at: string;
    }>`SELECT id, title, description, amount_needed, amount_raised, status, urgency, category, deadline, created_at
       FROM fund_needs
       ORDER BY created_at DESC
       LIMIT ${limit} OFFSET ${offset}`;

    return {
      data: needs.map(need => ({
        id: need.id,
        title: need.title,
        description: need.description,
        amountNeeded: parseFloat(need.amount_needed),
        amountRaised: parseFloat(need.amount_raised),
        status: need.status,
        urgency: need.urgency,
        category: need.category,
        deadline: need.deadline,
        createdAt: need.created_at,
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
