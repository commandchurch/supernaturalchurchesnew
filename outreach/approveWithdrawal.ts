import { api, APIError } from "encore.dev/api";
import { outreachDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface ApproveWithdrawalParams {
  id: number;
}

interface ApproveWithdrawalResponse {
  success: boolean;
  id: number;
  status: string;
  processedAt: string;
}

// Approves a withdrawal request.
export const approveWithdrawal = api<ApproveWithdrawalParams, ApproveWithdrawalResponse>(
  { auth: true, expose: true, method: "POST", path: "/outreach/withdrawals/:id/approve" },
  async ({ id }) => {
    requireAdmin();
    const row = await outreachDB.queryRow<{ status: string }>`
      SELECT status FROM withdrawal_requests WHERE id = ${id}
    `;
    if (!row) {
      throw APIError.notFound("withdrawal not found");
    }

    if (row.status === "completed") {
      return {
        success: true,
        id,
        status: "completed",
        processedAt: new Date().toISOString(),
      };
    }

    await outreachDB.exec`
      UPDATE withdrawal_requests
      SET status = 'completed', processed_at = NOW(), updated_at = NOW()
      WHERE id = ${id}
    `;

    const updated = await outreachDB.queryRow<{ processed_at: string }>`
      SELECT processed_at FROM withdrawal_requests WHERE id = ${id}
    `;
    return {
      success: true,
      id,
      status: "completed",
      processedAt: updated?.processed_at ?? new Date().toISOString(),
    };
  }
);
