import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import type { Teaching } from "./getTeaching";
import { requireAdmin } from "../auth/admin";

interface UpdateTeachingParams {
  id: number;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  featuredImageUrl?: string;
  authorId?: string;
  isPublished?: boolean;
  publishedAt?: string | null;
}

// Updates an existing teaching (admin).
export const updateTeaching = api<UpdateTeachingParams, Teaching>(
  { auth: true, expose: true, method: "PUT", path: "/admin/church/teachings/:id" },
  async (p) => {
    requireAdmin();

    // Check if teaching exists
    const existing = await churchDB.queryRow`SELECT id FROM teachings WHERE id = ${p.id}`;
    if (!existing) {
      throw APIError.notFound("teaching not found");
    }

    // Handle slug uniqueness if slug is being updated
    if (p.slug) {
      const slug = p.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      const existingSlug = await churchDB.queryRow`SELECT id FROM teachings WHERE slug = ${slug} AND id != ${p.id}`;
      if (existingSlug) {
        throw APIError.alreadyExists("slug already exists");
      }

      // Update slug in params
      p.slug = slug;
    }

    // Use individual UPDATE statements for each field to avoid SQL injection

    // Use conditional updates for each field
    let updated = false;

    if (p.title !== undefined) {
      await churchDB.exec`UPDATE teachings SET title = ${p.title}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.slug !== undefined) {
      await churchDB.exec`UPDATE teachings SET slug = ${p.slug}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.content !== undefined) {
      await churchDB.exec`UPDATE teachings SET content = ${p.content}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.excerpt !== undefined) {
      await churchDB.exec`UPDATE teachings SET excerpt = ${p.excerpt}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.category !== undefined) {
      await churchDB.exec`UPDATE teachings SET category = ${p.category}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.featuredImageUrl !== undefined) {
      await churchDB.exec`UPDATE teachings SET featured_image_url = ${p.featuredImageUrl}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.authorId !== undefined) {
      await churchDB.exec`UPDATE teachings SET author_id = ${p.authorId}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.isPublished !== undefined) {
      await churchDB.exec`UPDATE teachings SET is_published = ${p.isPublished}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.publishedAt !== undefined) {
      await churchDB.exec`UPDATE teachings SET published_at = ${p.publishedAt}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }

    if (!updated) {
      throw APIError.invalidArgument("no fields to update");
    }

    // Get the updated teaching
    const row = await churchDB.queryRow`SELECT id, title, slug, content, excerpt, category, featured_image_url, author_id, is_published, published_at, created_at FROM teachings WHERE id = ${p.id}`;

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
