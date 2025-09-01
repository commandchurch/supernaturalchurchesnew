import { api } from "encore.dev/api";
import { academyDB } from "./db";
import { Course } from "./listCourses";
import { requireAdmin } from "../auth/admin";

interface ListAllCoursesResponse {
  courses: Course[];
}

// Lists all courses, including unpublished ones, for admin purposes.
export const listAllCourses = api<void, ListAllCoursesResponse>(
  { auth: true, expose: true, method: "GET", path: "/admin/academy/courses" },
  async () => {
    requireAdmin();
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
