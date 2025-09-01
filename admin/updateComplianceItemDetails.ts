import { api, APIError } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface UpdateComplianceItemDetailsParams {
  id: number;
  name?: string;
  description?: string;
  isRequired?: boolean;
  dueDate?: string | null;
  displayOrder?: number;
}

interface UpdateComplianceItemDetailsResponse {
  success: boolean;
}

// Updates compliance item fields (not just completion status).
export const updateComplianceItemDetails = api<UpdateComplianceItemDetailsParams, UpdateComplianceItemDetailsResponse>(
  { auth: true, expose: true, method: "PUT", path: "/admin/compliance/items/:id/details" },
  async ({ id, name, description, isRequired, dueDate, displayOrder }) => {
    requireAdmin();
    const item = await adminDB.queryRow`SELECT id FROM compliance_items WHERE id = ${id}`;
    if (!item) {
      throw APIError.notFound("compliance item not found");
    }
    await adminDB.exec`
      UPDATE compliance_items
      SET
        name = COALESCE(${name || null}, name),
        description = COALESCE(${description || null}, description),
        is_required = COALESCE(${typeof isRequired === "boolean" ? isRequired : null}, is_required),
        due_date = ${dueDate === undefined ? undefined : dueDate},
        display_order = COALESCE(${displayOrder ?? null}, display_order),
        updated_at = NOW()
      WHERE id = ${id}
    `;
    return { success: true };
  }
);
