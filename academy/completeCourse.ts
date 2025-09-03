import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { membership } from "~encore/clients";
import { getAuthData } from "~encore/auth";
import { issueOrUpdateCertificate } from "./util_certificates";
import { Certificate } from "./listCertificates";

interface CompleteCourseParams {
  courseId: number;
}

interface CompleteCourseResponse {
  success: boolean;
  certificate: Certificate;
}

// Marks a course as complete for a user and issues a certificate with their full name.
export const completeCourse = api<CompleteCourseParams, CompleteCourseResponse>(
  { auth: true, expose: true, method: "POST", path: "/academy/courses/:courseId/complete" },
  async ({ courseId }) => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    const course = await academyDB.queryRow<{ title: string; is_premium: boolean; is_published: boolean }>`
      SELECT title, is_premium, is_published FROM courses WHERE id = ${courseId}
    `;
    if (!course || !course.is_published) {
      throw APIError.notFound("course not found");
    }

    if (course.is_premium) {
      const sub = await membership.getSubscription();
      if (!sub.active) {
        throw APIError.permissionDenied("active membership required to complete premium course");
      }
    }

    // Ensure progress is set to 100 and mark completion timestamp.
    await academyDB.exec`
      INSERT INTO course_progress (user_id, course_id, progress_percentage, completed_at, last_accessed, updated_at)
      VALUES (${userId}, ${courseId}, 100, NOW(), NOW(), NOW())
      ON CONFLICT (user_id, course_id)
      DO UPDATE SET
        progress_percentage = 100,
        completed_at = COALESCE(course_progress.completed_at, NOW()),
        last_accessed = NOW(),
        updated_at = NOW()
    `;

    const certificate = await issueOrUpdateCertificate(userId, courseId, course.title);

    return {
      success: true,
      certificate: {
        id: certificate.id,
        courseId: certificate.courseId,
        userId: certificate.userId,
        issuedAt: certificate.issuedAt,
        certificateCode: certificate.certificateCode,
        recipientName: certificate.recipientName,
        certificateUrl: certificate.certificateUrl,
      },
    };
  }
);
