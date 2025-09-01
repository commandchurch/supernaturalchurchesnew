import { api, APIError } from "encore.dev/api";
import { staffDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface SendFormsParams {
  id: number;
}

interface SendFormsResponse {
  success: boolean;
  sentAt: string;
}

// Marks forms as sent; in a real system we'd email or push a dashboard notification.
export const sendForms = api<SendFormsParams, SendFormsResponse>(
  { auth: true, expose: true, method: "POST", path: "/admin/staff/:id/send-forms" },
  async ({ id }) => {
    requireAdmin();
    const existing = await staffDB.queryRow`SELECT id FROM staff_profiles WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("staff not found");
    }
    await staffDB.exec`
      UPDATE staff_profiles
      SET forms_last_sent_at = NOW(), updated_at = NOW()
      WHERE id = ${id}
    `;
    const row = await staffDB.queryRow<{ forms_last_sent_at: string }>`
      SELECT forms_last_sent_at FROM staff_profiles WHERE id = ${id}
    `;
    return { success: true, sentAt: row?.forms_last_sent_at || new Date().toISOString() };
  }
);
