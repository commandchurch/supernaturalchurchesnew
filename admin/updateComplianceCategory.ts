import { api, APIError } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface UpdateComplianceCategoryParams {
  id: number;
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  displayOrder?: number;
}

interface UpdateComplianceCategoryResponse {
  success: boolean;
}

// Updates a compliance category's metadata.
export const updateComplianceCategory = api<UpdateComplianceCategoryParams, UpdateComplianceCategoryResponse>(
  { auth: true, expose: true, method: "PUT", path: "/admin/compliance/categories/:id" },
  async ({ id, name, description, icon, color, displayOrder }) => {
    requireAdmin();
    const existing = await adminDB.queryRow`SELECT id FROM compliance_categories WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("category not found");
    }
    await adminDB.exec`
      UPDATE compliance_categories
      SET
        name = COALESCE(${name || null}, name),
        description = COALESCE(${description || null}, description),
        icon = COALESCE(${icon || null}, icon),
        color = COALESCE(${color || null}, color),
        display_order = COALESCE(${displayOrder ?? null}, display_order),
        updated_at = NOW()
      WHERE id = ${id}
    `;
    return { success: true };
  }
);
