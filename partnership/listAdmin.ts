import { api } from "encore.dev/api";
import { partnershipDB } from "./db";
import { requireAdmin } from "../auth/admin";
import type { Partner } from "./list";

export interface PartnerApplication extends Partner {
  contactName: string;
  contactEmail: string;
  userId: string;
  status: string;
  createdAt: string;
}

interface ListAdminResponse {
  applications: PartnerApplication[];
}

// Lists all partnership applications for admin review.
export const listAdmin = api<void, ListAdminResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/partnership/applications" },
  async () => {
    requireAdmin();
    const applications = await partnershipDB.queryAll<any>`
      SELECT id, name, logo_url, website_url, contact_name, contact_email, user_id, status, created_at
      FROM church_partners
      ORDER BY created_at DESC
    `;
    return { applications };
  }
);
