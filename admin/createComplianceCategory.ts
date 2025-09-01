import { api, APIError } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface CreateComplianceCategoryParams {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  displayOrder?: number;
}

interface CreateComplianceCategoryResponse {
  id: number;
  success: boolean;
}

// Creates a new compliance category.
export const createComplianceCategory = api<CreateComplianceCategoryParams, CreateComplianceCategoryResponse>(
  { auth: true, expose: true, method: "POST", path: "/admin/compliance/categories" },
  async ({ name, description, icon, color, displayOrder }) => {
    requireAdmin();
    if (!name.trim()) {
      throw APIError.invalidArgument("name is required");
    }
    const row = await adminDB.queryRow<{ id: number }>`
      INSERT INTO compliance_categories (name, description, icon, color, display_order)
      VALUES (${name}, ${description || null}, ${icon || null}, ${color || null}, ${displayOrder ?? 0})
      RETURNING id
    `;
    return { id: row!.id, success: true };
  }
);
