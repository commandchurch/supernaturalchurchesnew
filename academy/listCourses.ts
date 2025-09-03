import { api } from "encore.dev/api";
import { academyDB } from "./db";

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
  createdAt: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ListCoursesResponse extends PaginatedResponse<Course> {}

// Lists all published courses with pagination
export const listCourses = api<PaginationParams, ListCoursesResponse>(
  { expose: true, method: "GET", path: "/academy/courses" },
  async (params) => {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20)); // Max 100 items per page
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const totalResult = await academyDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count
      FROM courses
      WHERE is_published = true
    `;

    const total = totalResult?.count || 0;
    const totalPages = Math.ceil(total / limit);

    // Get paginated courses
    const courses = await academyDB.queryAll<{
      id: number;
      title: string;
      description: string;
      category: string;
      thumbnail_url?: string;
      video_url?: string;
      pdf_url?: string;
      duration_minutes?: number;
      is_published: boolean;
      is_premium: boolean;
      created_at: string;
    }>`SELECT id, title, description, category, thumbnail_url, video_url, pdf_url, duration_minutes, is_published, is_premium, created_at
       FROM courses
       WHERE is_published = true
       ORDER BY created_at DESC
       LIMIT ${limit} OFFSET ${offset}`;

    return {
      data: courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        thumbnailUrl: course.thumbnail_url,
        videoUrl: course.video_url,
        pdfUrl: course.pdf_url,
        durationMinutes: course.duration_minutes,
        isPublished: course.is_published,
        isPremium: course.is_premium,
        createdAt: course.created_at,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }
);
