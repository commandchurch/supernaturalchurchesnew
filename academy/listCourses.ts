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

interface ListCoursesResponse {
  courses: Course[];
}

// Lists all published courses
export const listCourses = api<void, ListCoursesResponse>(
  { expose: true, method: "GET", path: "/academy/courses" },
  async () => {
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
       ORDER BY created_at DESC`;

    return {
      courses: courses.map(course => ({
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
      }))
    };
  }
);
