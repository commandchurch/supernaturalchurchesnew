import { api, APIError } from "encore.dev/api";
import { fundDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface RejectNeedParams {
  id: number;
  reviewerId?: string;
  reason?: string;
}

interface RejectNeedResponse {
  success: boolean;
  status: string;
  rejectedAt: string;
}

// Rejects a funding need (admin).
export const rejectNeed = api<RejectNeedParams, RejectNeedResponse>(
  { auth: true, expose: true, method: "POST", path: "/fund/needs/:id/reject" },
  async ({ id, reviewerId, reason }) => {
    requireAdmin();
    const existing = await fundDB.queryRow`SELECT id, status FROM fund_needs WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("need not found");
    }

    await fundDB.exec`
      UPDATE fund_needs
      SET status = 'rejected', approved_by = ${reviewerId || "admin"}, approved_at = NOW(), updated_at = NOW()
      WHERE id = ${id}
    `;
    // Optionally store reason somewhere (not modeled), could be appended to justification.
    return { success: true, status: "rejected", rejectedAt: new Date().toISOString() };
  }
);
