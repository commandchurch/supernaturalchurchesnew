import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { membership } from "~encore/clients";
import { getAuthData } from "~encore/auth";

interface UpdateProgressParams {
  courseId: number;
  progressPercentage: number; // 0..100
}

interface UpdateProgressResponse {
  success: boolean;
  progressPercentage: number;
  completedAt?: string | null;
}

// Updates the user's progress for a course. If the course is premium, requires an active membership.
export const updateProgress = api<UpdateProgressParams, UpdateProgressResponse>(
  { auth: true, expose: true, method: "POST", path: "/academy/courses/:courseId/progress" },
  async ({ courseId, progressPercentage }) => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    if (progressPercentage < 0 || progressPercentage > 100) {
      throw APIError.invalidArgument("progressPercentage must be between 0 and 100");
    }

    const course = await academyDB.queryRow<{ is_premium: boolean; is_published: boolean }>`
      SELECT is_premium, is_published FROM courses WHERE id = ${courseId}
    `;
    if (!course || !course.is_published) {
      throw APIError.notFound("course not found");
    }

    if (course.is_premium) {
      const sub = await membership.getSubscription();
      if (!sub.active) {
        throw APIError.permissionDenied("active membership required to update progress for premium course");
      }
    }

    const completed = progressPercentage >= 100;
    await academyDB.exec`
      INSERT INTO course_progress (user_id, course_id, progress_percentage, completed_at, last_accessed, updated_at)
      VALUES (${userId}, ${courseId}, ${progressPercentage}, ${completed ? new Date().toISOString() : null}, NOW(), NOW())
      ON CONFLICT (user_id, course_id)
      DO UPDATE SET
        progress_percentage = EXCLUDED.progress_percentage,
        completed_at = CASE WHEN EXCLUDED.progress_percentage >= 100 THEN NOW() ELSE course_progress.completed_at END,
        last_accessed = NOW(),
        updated_at = NOW()
    `;

    const row = await academyDB.queryRow<{ progress_percentage: number; completed_at?: string | null }>`
      SELECT progress_percentage, completed_at FROM course_progress WHERE user_id = ${userId} AND course_id = ${courseId}
    `;

    return {
      success: true,
      progressPercentage: row?.progress_percentage ?? progressPercentage,
      completedAt: row?.completed_at ?? null,
    };
  }
);
