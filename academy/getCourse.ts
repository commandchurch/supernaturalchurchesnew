import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { membership } from "~encore/clients";
import { getAuthData } from "~encore/auth";
import { Course } from "./listCourses";

interface GetCourseParams {
  id: number;
}

// Gets a specific course by ID
export const getCourse = api<GetCourseParams, Course>(
  { auth: true, expose: true, method: "GET", path: "/academy/courses/:id" },
  async ({ id }) => {
    const auth = getAuthData(); // Can be null if user is not signed in but endpoint is accessed

    const course = await academyDB.queryRow<{
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
       WHERE id = ${id} AND is_published = true`;

    if (!course) {
      throw APIError.notFound("course not found");
    }

    // Enforce membership gating for premium courses
    if (course.is_premium) {
      if (!auth) {
        throw APIError.unauthenticated("membership required to access this course");
      }
      const sub = await membership.getSubscription();
      if (!sub.active) {
        throw APIError.permissionDenied("an active membership is required to access this course");
      }
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
