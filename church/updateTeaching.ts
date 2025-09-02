import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import type { Teaching as TeachingType } from "./listTeachings";
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
export const updateTeaching = api<UpdateTeachingParams, TeachingType>(
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

    // Build the update query with conditional field updates
    let updateFields = [];
    let hasUpdates = false;

    if (p.title !== undefined) {
      updateFields.push(`title = ${p.title}`);
      hasUpdates = true;
    }
    if (p.slug !== undefined) {
      updateFields.push(`slug = ${p.slug}`);
      hasUpdates = true;
    }
    if (p.content !== undefined) {
      updateFields.push(`content = ${p.content}`);
      hasUpdates = true;
    }
    if (p.excerpt !== undefined) {
      updateFields.push(`excerpt = ${p.excerpt}`);
      hasUpdates = true;
    }
    if (p.category !== undefined) {
      updateFields.push(`category = ${p.category}`);
      hasUpdates = true;
    }
    if (p.featuredImageUrl !== undefined) {
      updateFields.push(`featured_image_url = ${p.featuredImageUrl}`);
      hasUpdates = true;
    }
    if (p.authorId !== undefined) {
      updateFields.push(`author_id = ${p.authorId}`);
      hasUpdates = true;
    }
    if (p.isPublished !== undefined) {
      updateFields.push(`is_published = ${p.isPublished}`);
      hasUpdates = true;
    }
    if (p.publishedAt !== undefined) {
      updateFields.push(`published_at = ${p.publishedAt}`);
      hasUpdates = true;
    }

    if (!hasUpdates) {
      throw APIError.invalidArgument("no fields to update");
    }

    updateFields.push(`updated_at = NOW()`);

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
      SET ${updateFields.join(', ')}
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
