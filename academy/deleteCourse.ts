import { api } from "encore.dev/api";
import { academyDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface DeleteCourseParams {
  id: number;
}

interface DeleteCourseResponse {
  success: boolean;
}

// Deletes a course.
export const deleteCourse = api<DeleteCourseParams, DeleteCourseResponse>(
  { auth: true, expose: true, method: "DELETE", path: "/admin/academy/courses/:id" },
  async ({ id }) => {
    requireAdmin();
    // Also need to delete progress and certificates to avoid foreign key violations
    await academyDB.exec`DELETE FROM course_progress WHERE course_id = ${id}`;
    await academyDB.exec`DELETE FROM certificates WHERE course_id = ${id}`;
    await academyDB.exec`DELETE FROM courses WHERE id = ${id}`;
    
    return { success: true };
  }
);
