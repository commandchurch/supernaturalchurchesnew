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

interface ListNeedsResponse {
  needs: Need[];
}

// Lists all fund needs
export const listNeeds = api<void, ListNeedsResponse>(
  { expose: true, method: "GET", path: "/fund/needs" },
  async () => {
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
       ORDER BY created_at DESC`;

    return {
      needs: needs.map(need => ({
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
      }))
    };
  }
);
