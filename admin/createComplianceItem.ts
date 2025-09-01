import { api, APIError } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface CreateComplianceItemParams {
  categoryId: number;
  name: string;
  description?: string;
  isRequired?: boolean;
  dueDate?: string;
  displayOrder?: number;
}

interface CreateComplianceItemResponse {
  id: number;
  success: boolean;
}

// Creates a new compliance item under a category.
export const createComplianceItem = api<CreateComplianceItemParams, CreateComplianceItemResponse>(
  { auth: true, expose: true, method: "POST", path: "/admin/compliance/items" },
  async ({ categoryId, name, description, isRequired, dueDate, displayOrder }) => {
    requireAdmin();
    const category = await adminDB.queryRow`SELECT id FROM compliance_categories WHERE id = ${categoryId}`;
    if (!category) {
      throw APIError.notFound("category not found");
    }
    const row = await adminDB.queryRow<{ id: number }>`
      INSERT INTO compliance_items (category_id, name, description, is_required, due_date, display_order)
      VALUES (${categoryId}, ${name}, ${description || null}, ${isRequired ?? true}, ${dueDate || null}, ${displayOrder ?? 0})
      RETURNING id
    `;
    return { id: row!.id, success: true };
  }
);
