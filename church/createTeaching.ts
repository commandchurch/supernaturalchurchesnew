import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import type { Teaching } from "./getTeaching";
import { requireAdmin } from "../auth/admin";

interface CreateTeachingParams {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  category: string;
  featuredImageUrl?: string;
  authorId?: string;
  isPublished: boolean;
  publishedAt?: string | null;
}

// Creates a new teaching (admin).
export const createTeaching = api<CreateTeachingParams, Teaching>(
  { auth: true, expose: true, method: "POST", path: "/admin/church/teachings" },
  async (p) => {
    requireAdmin();
    const slug = (p.slug || p.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const existing = await churchDB.queryRow`SELECT id FROM teachings WHERE slug = ${slug}`;
    if (existing) {
      throw APIError.alreadyExists("slug already exists");
    }

    const row = await churchDB.queryRow<{
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
      INSERT INTO teachings (
        title, slug, content, excerpt, category, featured_image_url, author_id, is_published, published_at, updated_at
      )
      VALUES (
        ${p.title}, ${slug}, ${p.content}, ${p.excerpt || null}, ${p.category},
        ${p.featuredImageUrl || null}, ${p.authorId || "admin"}, ${p.isPublished},
        ${p.isPublished ? (p.publishedAt || new Date().toISOString()) : null}, NOW()
      )
      RETURNING id, title, slug, content, excerpt, category, featured_image_url, author_id, is_published, published_at, created_at
    `;

    if (!row) {
      throw APIError.internal("failed to create teaching");
    }

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      excerpt: row.excerpt,
      category: row.category,
      featuredImageUrl: row.featured_image_url,
      authorId: row.author_id,
      publishedAt: row.published_at || undefined,
      createdAt: row.created_at,
    };
  }
);
