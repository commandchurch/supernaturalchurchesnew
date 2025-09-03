import { api } from "encore.dev/api";
import { churchDB } from "./db";
import type { Teaching } from "./getTeaching";
import { requireAdmin } from "../auth/admin";

interface ListAllTeachingsResponse {
  teachings: Teaching[];
}

// Lists all teachings including drafts (admin).
export const listAllTeachings = api<void, ListAllTeachingsResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/church/teachings" },
  async () => {
    requireAdmin();
    const rows = await churchDB.queryAll<{
      id: number;
      title: string;
      slug: string;
      content: string;
      excerpt?: string;
      category: string;
      featured_image_url?: string;
      author_id: string;
      is_published: boolean;
      published_at?: string | null;
      created_at: string;
    }>`
      SELECT id, title, slug, content, excerpt, category, featured_image_url, author_id, is_published, published_at, created_at
      FROM teachings
      ORDER BY created_at DESC
    `;

    return {
      teachings: rows.map((t) => ({
        id: t.id,
        title: t.title,
        slug: t.slug,
        content: t.content,
        excerpt: t.excerpt,
        category: t.category,
        featuredImageUrl: t.featured_image_url,
        authorId: t.author_id,
        publishedAt: t.published_at || undefined,
        createdAt: t.created_at,
      })),
    };
  }
);
