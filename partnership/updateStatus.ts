import { api, APIError } from "encore.dev/api";
import { partnershipDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface UpdateStatusParams {
  id: number;
  status: 'approved' | 'rejected' | 'pending';
}

interface UpdateStatusResponse {
  success: boolean;
}

// Updates the status of a partnership application.
export const updateStatus = api<UpdateStatusParams, UpdateStatusResponse>(
  { auth: true, expose: true, method: "PUT", path: "/admin/partnership/applications/:id/status" },
  async ({ id, status }) => {
    requireAdmin();
    const existing = await partnershipDB.queryRow<{ status: string }>`SELECT status FROM church_partners WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("application not found");
    }

    await partnershipDB.exec`
      UPDATE church_partners SET status = ${status}, updated_at = NOW() WHERE id = ${id}
    `;

    // If approving for the first time, schedule the initial Command Audit.
    if (status === 'approved' && existing.status !== 'approved') {
      await partnershipDB.exec`
        INSERT INTO church_audits (partner_id, status, notes)
        VALUES (${id}, 'pending', 'Initial onboarding audit scheduled.')
      `;
    }

    return { success: true };
  }
);
