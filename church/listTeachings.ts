import { api } from "encore.dev/api";
import { churchDB } from "./db";

export interface Teaching {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  category: string;
  featuredImageUrl?: string;
  authorId: string;
  publishedAt?: string;
  createdAt: string;
}

interface ListTeachingsResponse {
  teachings: Teaching[];
}

// Lists all published teachings
export const listTeachings = api<void, ListTeachingsResponse>(
  { expose: true, method: "GET", path: "/church/teachings" },
  async () => {
    const teachings = await churchDB.queryAll<{
      id: number;
      title: string;
      slug: string;
      excerpt?: string;
      category: string;
      featured_image_url?: string;
      author_id: string;
      published_at?: string;
      created_at: string;
    }>`SELECT id, title, slug, excerpt, category, featured_image_url, author_id, published_at, created_at 
       FROM teachings 
       WHERE is_published = true 
       ORDER BY published_at DESC`;

    return {
      teachings: teachings.map(teaching => ({
        id: teaching.id,
        title: teaching.title,
        slug: teaching.slug,
        excerpt: teaching.excerpt,
        category: teaching.category,
        featuredImageUrl: teaching.featured_image_url,
        authorId: teaching.author_id,
        publishedAt: teaching.published_at,
        createdAt: teaching.created_at,
      }))
    };
  }
);
