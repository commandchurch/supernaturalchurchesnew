import { api, APIError } from "encore.dev/api";
import { partnershipDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface UpdateAuditStatusParams {
  id: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  notes?: string;
}

interface UpdateAuditStatusResponse {
  success: boolean;
}

// Updates the status of a church audit.
export const updateAuditStatus = api<UpdateAuditStatusParams, UpdateAuditStatusResponse>(
  { auth: true, expose: true, method: "PUT", path: "/admin/partnership/audits/:id/status" },
  async ({ id, status, notes }) => {
    requireAdmin();
    const existing = await partnershipDB.queryRow`SELECT id FROM church_audits WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("audit not found");
    }

    const completedAt = status === 'completed' ? new Date() : null;

    await partnershipDB.exec`
      UPDATE church_audits
      SET
        status = ${status},
        notes = COALESCE(${notes || null}, notes),
        completed_at = ${completedAt},
        updated_at = NOW()
      WHERE id = ${id}
    `;
    return { success: true };
  }
);
