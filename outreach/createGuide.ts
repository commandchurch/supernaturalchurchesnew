import { api } from "encore.dev/api";
import { outreachDB } from "./db";

interface CreateGuideParams {
  title: string;
  content: string;
  category: string;
  order: number;
}

interface CreateGuideResponse {
  id: number;
  title: string;
}

// Creates a new outreach guide
export const createGuide = api<CreateGuideParams, CreateGuideResponse>(
  { expose: true, method: "POST", path: "/outreach/guides" },
  async ({ title, content, category, order }) => {
    const result = await outreachDB.queryRow<{ id: number }>`
      INSERT INTO outreach_guides (title, content, category, display_order)
      VALUES (${title}, ${content}, ${category}, ${order})
      RETURNING id
    `;

    return {
      id: result!.id,
      title,
    };
  }
);
