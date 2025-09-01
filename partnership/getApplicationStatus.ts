import { api } from "encore.dev/api";
import { partnershipDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface ApplicationStatus {
  hasApplied: boolean;
  status?: string | null;
  churchName?: string | null;
  createdAt?: string | null;
}

// Gets the partnership application status for the authenticated user.
export const getApplicationStatus = api<void, ApplicationStatus>(
  { auth: true, expose: true, method: "GET", path: "/partnership/status" },
  async () => {
    const auth = getAuthData()!;
    const app = await partnershipDB.queryRow<{
      status: string;
      name: string;
      created_at: string;
    }>`
      SELECT status, name, created_at FROM church_partners WHERE user_id = ${auth.userID}
    `;

    if (!app) {
      return { hasApplied: false };
    }

    return {
      hasApplied: true,
      status: app.status,
      churchName: app.name,
      createdAt: app.created_at,
    };
  }
);
