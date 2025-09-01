import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface ReviewTestimonyParams {
  id: number;
  approve: boolean;
  reviewerId?: string;
  notes?: string;
}

interface ReviewTestimonyResponse {
  success: boolean;
  status: "approved" | "rejected";
  reviewedAt: string;
}

// Approves or rejects a testimony (admin).
export const reviewTestimony = api<ReviewTestimonyParams, ReviewTestimonyResponse>(
  { auth: true, expose: true, method: "POST", path: "/admin/church/testimonies/:id/review" },
  async ({ id, approve, reviewerId, notes }) => {
    requireAdmin();
    const existing = await churchDB.queryRow<{ id: number }>`
      SELECT id FROM testimonies WHERE id = ${id}
    `;
    if (!existing) {
      throw APIError.notFound("testimony not found");
    }

    const newStatus = approve ? "approved" : "rejected";
    await churchDB.exec`
      UPDATE testimonies
      SET status = ${newStatus}, reviewed_at = NOW(), reviewer_id = ${reviewerId || null}
      WHERE id = ${id}
    `;
    const r = await churchDB.queryRow<{ reviewed_at: string }>`
      SELECT reviewed_at FROM testimonies WHERE id = ${id}
    `;
    return { success: true, status: newStatus, reviewedAt: r!.reviewed_at };
  }
);
