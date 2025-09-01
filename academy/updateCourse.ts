import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { Course } from "./listCourses";
import { requireAdmin } from "../auth/admin";

interface UpdateCourseParams {
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
}

// Updates an existing course.
export const updateCourse = api<UpdateCourseParams, Course>(
  { auth: true, expose: true, method: "PUT", path: "/admin/academy/courses/:id" },
  async (params) => {
    requireAdmin();
    const existing = await academyDB.queryRow`SELECT id FROM courses WHERE id = ${params.id}`;
    if (!existing) {
      throw APIError.notFound("course not found");
    }

    const course = await academyDB.queryRow<any>`
      UPDATE courses
      SET
        title = ${params.title},
        description = ${params.description},
        category = ${params.category},
        thumbnail_url = ${params.thumbnailUrl},
        video_url = ${params.videoUrl},
        pdf_url = ${params.pdfUrl},
        duration_minutes = ${params.durationMinutes},
        is_published = ${params.isPublished},
        is_premium = ${params.isPremium},
        updated_at = NOW()
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (!course) {
      throw APIError.internal("failed to update course");
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
