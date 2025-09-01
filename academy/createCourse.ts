import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { Course } from "./listCourses";
import { requireAdmin } from "../auth/admin";

interface CreateCourseParams {
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
}

// Creates a new course.
export const createCourse = api<CreateCourseParams, Course>(
  { auth: true, expose: true, method: "POST", path: "/admin/academy/courses" },
  async (params) => {
    requireAdmin();
    const course = await academyDB.queryRow<any>`
      INSERT INTO courses (title, description, category, thumbnail_url, video_url, pdf_url, duration_minutes, is_published, is_premium, updated_at)
      VALUES (${params.title}, ${params.description}, ${params.category}, ${params.thumbnailUrl}, ${params.videoUrl}, ${params.pdfUrl}, ${params.durationMinutes}, ${params.isPublished}, ${params.isPremium}, NOW())
      RETURNING *
    `;

    if (!course) {
      throw APIError.internal("failed to create course");
    }

    return {
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
    };
  }
);
