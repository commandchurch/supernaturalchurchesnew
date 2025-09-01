import { api } from "encore.dev/api";
import { academyDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface CourseProgress {
  courseId: number;
  progressPercentage: number;
  completedAt?: string | null;
  lastAccessed?: string | null;
}

interface GetProgressResponse {
  progress: CourseProgress[];
}

// Gets the progress for all published courses for the authenticated user.
export const getProgress = api<void, GetProgressResponse>(
  { auth: true, expose: true, method: "GET", path: "/academy/progress" },
  async () => {
    const auth = getAuthData()!;
    const rows = await academyDB.queryAll<{
      course_id: number;
      progress_percentage: number;
      completed_at?: string | null;
      last_accessed?: string | null;
    }>`
      SELECT p.course_id, p.progress_percentage, p.completed_at, p.last_accessed
      FROM course_progress p
      JOIN courses c ON c.id = p.course_id
      WHERE p.user_id = ${auth.userID} AND c.is_published = true
      ORDER BY p.last_accessed DESC NULLS LAST, p.created_at DESC
    `;

    return {
      progress: rows.map(r => ({
        courseId: r.course_id,
        progressPercentage: r.progress_percentage,
        completedAt: r.completed_at ?? null,
        lastAccessed: r.last_accessed ?? null,
      })),
    };
  }
);
