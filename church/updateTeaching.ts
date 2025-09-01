import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import type { Teaching as TeachingType } from "./listTeachings";
import { requireAdmin } from "../auth/admin";

interface UpdateTeachingParams {
  id: number;
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

// Updates an existing teaching (admin).
export const updateTeaching = api<UpdateTeachingParams, TeachingType>(
  { auth: true, expose: true, method: "PUT", path: "/admin/church/teachings/:id" },
  async (p) => {
    requireAdmin();
    const existing = await churchDB.queryRow<{ id: number; slug: string }>`
      SELECT id, slug FROM teachings WHERE id = ${p.id}
    `;
    if (!existing) {
      throw APIError.notFound("teaching not found");
    }

    const slug = (p.slug || p.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Ensure slug is unique if changed
    if (slug !== existing.slug) {
      const taken = await churchDB.queryRow`SELECT id FROM teachings WHERE slug = ${slug}`;
      if (taken) {
        throw APIError.alreadyExists("slug already exists");
      }
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
      UPDATE teachings
      SET
        title = ${p.title},
        slug = ${slug},
        content = ${p.content},
        excerpt = ${p.excerpt || null},
        category = ${p.category},
        featured_image_url = ${p.featuredImageUrl || null},
        author_id = ${p.authorId || "admin"},
        is_published = ${p.isPublished},
        published_at = ${p.isPublished ? (p.publishedAt || new Date().toISOString()) : null},
        updated_at = NOW()
      WHERE id = ${p.id}
      RETURNING id, title, slug, content, excerpt, category, featured_image_url, author_id, is_published, published_at, created_at
    `;

    if (!row) {
      throw APIError.internal("failed to update teaching");
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
