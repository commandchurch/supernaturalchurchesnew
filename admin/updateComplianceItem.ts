import { api, APIError } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface UpdateComplianceItemParams {
  id: number;
  isCompleted: boolean;
  completedBy?: string;
  notes?: string;
}

interface UpdateComplianceItemResponse {
  success: boolean;
  item: {
    id: number;
    isCompleted: boolean;
    completedAt?: string | null;
    completedBy?: string | null;
    notes?: string | null;
  };
}

// Updates a compliance item's completion status
export const updateComplianceItem = api<UpdateComplianceItemParams, UpdateComplianceItemResponse>(
  { auth: true, expose: true, method: "PUT", path: "/admin/compliance/items/:id" },
  async ({ id, isCompleted, completedBy, notes }) => {
    requireAdmin();
    const item = await adminDB.queryRow<{ id: number }>`
      SELECT id FROM compliance_items WHERE id = ${id}
    `;
    
    if (!item) {
      throw APIError.notFound("compliance item not found");
    }

    const completedAt = isCompleted ? new Date().toISOString() : null;
    
    await adminDB.exec`
      UPDATE compliance_items 
      SET 
        is_completed = ${isCompleted},
        completed_at = ${completedAt},
        completed_by = ${completedBy || null},
        notes = ${notes || null},
        updated_at = NOW()
      WHERE id = ${id}
    `;

    const updated = await adminDB.queryRow<{
      id: number;
      is_completed: boolean;
      completed_at?: string | null;
      completed_by?: string | null;
      notes?: string | null;
    }>`
      SELECT id, is_completed, completed_at, completed_by, notes 
      FROM compliance_items 
      WHERE id = ${id}
    `;

    return {
      success: true,
      item: {
        id: updated!.id,
        isCompleted: updated!.is_completed,
        completedAt: updated!.completed_at,
        completedBy: updated!.completed_by,
        notes: updated!.notes,
      },
    };
  }
);
