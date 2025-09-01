import { api } from "encore.dev/api";
import { outreachDB } from "./db";

export interface OutreachGuide {
  id: number;
  title: string;
  content: string;
  category: string;
  order: number;
  createdAt: string;
}

interface ListGuidesResponse {
  guides: OutreachGuide[];
}

// Lists all outreach guides
export const listGuides = api<void, ListGuidesResponse>(
  { expose: true, method: "GET", path: "/outreach/guides" },
  async () => {
    const guides = await outreachDB.queryAll<{
      id: number;
      title: string;
      content: string;
      category: string;
      display_order: number;
      created_at: string;
    }>`
      SELECT id, title, content, category, display_order, created_at
      FROM outreach_guides
      ORDER BY category, display_order, created_at
    `;

    return {
      guides: guides.map(guide => ({
        id: guide.id,
        title: guide.title,
        content: guide.content,
        category: guide.category,
        order: guide.display_order,
        createdAt: guide.created_at,
      }))
    };
  }
);
