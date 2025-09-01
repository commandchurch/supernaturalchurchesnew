import { api } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

export interface ComplianceCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  displayOrder: number;
  items: ComplianceItem[];
}

export interface ComplianceItem {
  id: number;
  categoryId: number;
  name: string;
  description?: string;
  isRequired: boolean;
  isCompleted: boolean;
  completedAt?: string | null;
  completedBy?: string | null;
  notes?: string | null;
  dueDate?: string | null;
  displayOrder: number;
}

interface ListComplianceResponse {
  categories: ComplianceCategory[];
}

// Lists all compliance categories with their items
export const listCompliance = api<void, ListComplianceResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/compliance" },
  async () => {
    requireAdmin();
    const categories = await adminDB.queryAll<{
      id: number;
      name: string;
      description?: string;
      icon?: string;
      color?: string;
      display_order: number;
    }>`SELECT id, name, description, icon, color, display_order FROM compliance_categories ORDER BY display_order, name`;

    const items = await adminDB.queryAll<{
      id: number;
      category_id: number;
      name: string;
      description?: string;
      is_required: boolean;
      is_completed: boolean;
      completed_at?: string | null;
      completed_by?: string | null;
      notes?: string | null;
      due_date?: string | null;
      display_order: number;
    }>`SELECT id, category_id, name, description, is_required, is_completed, completed_at, completed_by, notes, due_date, display_order FROM compliance_items ORDER BY display_order, name`;

    const itemsByCategory = new Map<number, ComplianceItem[]>();
    items.forEach(item => {
      const categoryItems = itemsByCategory.get(item.category_id) || [];
      categoryItems.push({
        id: item.id,
        categoryId: item.category_id,
        name: item.name,
        description: item.description,
        isRequired: item.is_required,
        isCompleted: item.is_completed,
        completedAt: item.completed_at ?? null,
        completedBy: item.completed_by ?? null,
        notes: item.notes ?? null,
        dueDate: item.due_date ?? null,
        displayOrder: item.display_order,
      });
      itemsByCategory.set(item.category_id, categoryItems);
    });

    return {
      categories: categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description ?? undefined,
        icon: cat.icon ?? undefined,
        color: cat.color ?? undefined,
        displayOrder: cat.display_order,
        items: itemsByCategory.get(cat.id) || [],
      })),
    };
  }
);
