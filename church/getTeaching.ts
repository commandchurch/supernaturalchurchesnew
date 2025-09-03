import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";

// Full Teaching interface for get operations (includes content)
export interface Teaching {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  featuredImageUrl?: string;
  authorId: string;
  publishedAt?: string;
  createdAt: string;
}

interface GetTeachingParams {
  slug: string;
}

// Gets a specific teaching by slug
export const getTeaching = api<GetTeachingParams, Teaching>(
  { expose: true, method: "GET", path: "/church/teachings/:slug" },
  async ({ slug }) => {
    const teaching = await churchDB.queryRow<{
      id: number;
      title: string;
      slug: string;
      content: string;
      excerpt?: string;
      category: string;
      featured_image_url?: string;
      author_id: string;
      published_at?: string;
      created_at: string;
    }>`SELECT id, title, slug, content, excerpt, category, featured_image_url, author_id, published_at, created_at 
       FROM teachings 
       WHERE slug = ${slug} AND is_published = true`;

    if (!teaching) {
      throw APIError.notFound("teaching not found");
    }

    return {
      id: teaching.id,
      title: teaching.title,
      slug: teaching.slug,
      content: teaching.content,
      excerpt: teaching.excerpt,
      category: teaching.category,
      featuredImageUrl: teaching.featured_image_url,
      authorId: teaching.author_id,
      publishedAt: teaching.published_at,
      createdAt: teaching.created_at,
    };
  }
);
