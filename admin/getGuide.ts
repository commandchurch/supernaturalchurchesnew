import { api, APIError } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface GetGuideParams {
  guideKey: string;
}

interface GetGuideResponse {
  title: string;
  content: string;
  updatedAt: string;
}

// Gets a specific admin guide by its key.
export const getGuide = api<GetGuideParams, GetGuideResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/guides/:guideKey" },
  async ({ guideKey }) => {
    requireAdmin();
    const guide = await adminDB.queryRow<{ title: string; content: string; updated_at: string }>`
      SELECT title, content, updated_at FROM admin_guides WHERE guide_key = ${guideKey}
    `;

    if (!guide) {
      throw APIError.notFound("guide not found");
    }

    return {
      title: guide.title,
      content: guide.content,
      updatedAt: guide.updated_at,
    };
  }
);
