import { academyDB } from "./db";
import { generateAndStoreCertificate } from "./certificates";
import { user } from "~encore/clients";
import type { Certificate } from "./listCertificates";
import { APIError } from "encore.dev/api";

// Issues or updates a certificate for a user for a given course.
// It fetches the user's name, generates a certificate, and saves it to the database.
export async function issueOrUpdateCertificate(userId: string, courseId: number, courseTitle: string): Promise<Omit<Certificate, 'courseTitle'>> {
    const profile = await user.getMe();
    const fullName = profile.name || "Student";

    const existingCert = await academyDB.queryRow<{ certificate_code: string }>`
      SELECT certificate_code FROM certificates WHERE user_id = ${userId} AND course_id = ${courseId}
    `;
    const code = existingCert?.certificate_code || `CERT-${courseId}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    const issuedAt = new Date();

    const { url } = await generateAndStoreCertificate({
      userId,
      fullName,
      courseId,
      courseTitle: courseTitle,
      certificateCode: code,
      issuedAt,
    });

    const cert = await academyDB.queryRow<{
      id: number;
      user_id: string;
      course_id: number;
      issued_at: string;
      certificate_code: string;
      certificate_url?: string | null;
      full_name?: string | null;
    }>`
      INSERT INTO certificates (user_id, course_id, issued_at, certificate_code, certificate_url, full_name)
      VALUES (${userId}, ${courseId}, ${issuedAt}, ${code}, ${url}, ${fullName})
      ON CONFLICT (user_id, course_id)
      DO UPDATE SET
        full_name = EXCLUDED.full_name,
        certificate_url = EXCLUDED.certificate_url,
        issued_at = EXCLUDED.issued_at
      RETURNING *
    `;

    if (!cert) {
      throw APIError.internal("failed to issue or update certificate record");
    }

    return {
      id: cert.id,
      courseId: cert.course_id,
      userId: cert.user_id,
      issuedAt: cert.issued_at,
      certificateCode: cert.certificate_code,
      recipientName: cert.full_name ?? null,
      certificateUrl: cert.certificate_url ?? null,
    };
}
