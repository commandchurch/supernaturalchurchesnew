import { api, APIError } from "encore.dev/api";
import { fundDB } from "./db";

interface CreateDonationParams {
  amount: number;
  name?: string;
  email?: string;
  message?: string;
}

interface CreateDonationResponse {
  id: number;
  status: string;
  createdAt: string;
}

// Records a one-time donation (no payment processor integration; records for reconciliation).
export const createDonation = api<CreateDonationParams, CreateDonationResponse>(
  { expose: true, method: "POST", path: "/fund/donations" },
  async ({ amount, name, email, message }) => {
    if (amount <= 0) {
      throw APIError.invalidArgument("amount must be greater than 0");
    }

    const desc = `One-time donation${name ? ` by ${name}` : ""}${message ? ` - ${message}` : ""}`;
    const row = await fundDB.queryRow<{ id: number; created_at: string }>`
      INSERT INTO fund_transactions (type, amount, description, reference_id, status)
      VALUES ('contribution', ${amount}, ${desc}, ${email || null}, 'completed')
      RETURNING id, created_at
    `;

    return {
      id: row!.id,
      status: "completed",
      createdAt: row!.created_at,
    };
  }
);
