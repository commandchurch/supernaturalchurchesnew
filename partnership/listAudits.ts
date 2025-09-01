import { api } from "encore.dev/api";
import { partnershipDB } from "./db";
import { requireAdmin } from "../auth/admin";

export interface ChurchAudit {
  id: number;
  partnerId: number;
  partnerName: string;
  status: string;
  scheduledFor: string;
  completedAt?: string | null;
  notes?: string | null;
}

interface ListAuditsResponse {
  audits: ChurchAudit[];
}

// Lists all church audits for admin review.
export const listAudits = api<void, ListAuditsResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/partnership/audits" },
  async () => {
    requireAdmin();
    const audits = await partnershipDB.queryAll<any>`
      SELECT a.id, a.partner_id, p.name as partner_name, a.status, a.scheduled_for, a.completed_at, a.notes
      FROM church_audits a
      JOIN church_partners p ON p.id = a.partner_id
      ORDER BY a.scheduled_for DESC
    `;
    return {
      audits: audits.map(a => ({
        id: a.id,
        partnerId: a.partner_id,
        partnerName: a.partner_name,
        status: a.status,
        scheduledFor: a.scheduled_for,
        completedAt: a.completed_at,
        notes: a.notes,
      }))
    };
  }
);
