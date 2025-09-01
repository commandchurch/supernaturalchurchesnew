import { api, APIError } from "encore.dev/api";
import { fundDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface ApproveNeedParams {
  id: number;
  reviewerId?: string;
}

interface ApproveNeedResponse {
  success: boolean;
  status: string;
  approvedAt: string;
}

// Approves a funding need (admin).
export const approveNeed = api<ApproveNeedParams, ApproveNeedResponse>(
  { auth: true, expose: true, method: "POST", path: "/fund/needs/:id/approve" },
  async ({ id, reviewerId }) => {
    requireAdmin();
    const existing = await fundDB.queryRow`SELECT id, status FROM fund_needs WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("need not found");
    }

    await fundDB.exec`
      UPDATE fund_needs
      SET status = 'approved', approved_by = ${reviewerId || "admin"}, approved_at = NOW(), updated_at = NOW()
      WHERE id = ${id}
    `;
    const row = await fundDB.queryRow<{ approved_at: string }>`
      SELECT approved_at FROM fund_needs WHERE id = ${id}
    `;
    return { success: true, status: "approved", approvedAt: row?.approved_at || new Date().toISOString() };
  }
);
