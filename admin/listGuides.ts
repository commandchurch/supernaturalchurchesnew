import { api } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

export interface GuideInfo {
  key: string;
  title: string;
  category: string;
}

interface ListGuidesResponse {
  guides: GuideInfo[];
}

// Lists all available admin guides.
export const listGuides = api<void, ListGuidesResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/guides" },
  async () => {
    requireAdmin();
    const guides = await adminDB.queryAll<{ guide_key: string; title: string; category: string }>`
      SELECT guide_key, title, category FROM admin_guides ORDER BY category, title
    `;

    return {
      guides: guides.map(g => ({
        key: g.guide_key,
        title: g.title,
        category: g.category,
      })),
    };
  }
);
