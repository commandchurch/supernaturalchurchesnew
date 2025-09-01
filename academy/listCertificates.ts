import { api } from "encore.dev/api";
import { academyDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface Certificate {
  id: number;
  courseId: number;
  courseTitle: string;
  userId: string;
  issuedAt: string;
  certificateCode: string;
  recipientName?: string | null;
  certificateUrl?: string | null;
}

interface ListCertificatesResponse {
  certificates: Certificate[];
}

// Lists all certificates for the authenticated user.
export const listCertificates = api<void, ListCertificatesResponse>(
  { auth: true, expose: true, method: "GET", path: "/academy/certificates" },
  async () => {
    const auth = getAuthData()!;
    const rows = await academyDB.queryAll<{
      id: number;
      course_id: number;
      course_title: string;
      user_id: string;
      issued_at: string;
      certificate_code: string;
      certificate_url?: string | null;
      full_name?: string | null;
    }>`
      SELECT cert.id, cert.course_id, c.title as course_title, cert.user_id, cert.issued_at, cert.certificate_code, cert.certificate_url, cert.full_name
      FROM certificates cert
      JOIN courses c ON c.id = cert.course_id
      WHERE cert.user_id = ${auth.userID}
      ORDER BY cert.issued_at DESC
    `;

    return {
      certificates: rows.map(r => ({
        id: r.id,
        courseId: r.course_id,
        courseTitle: r.course_title,
        userId: r.user_id,
        issuedAt: r.issued_at,
        certificateCode: r.certificate_code,
        recipientName: r.full_name ?? null,
        certificateUrl: r.certificate_url ?? null,
      })),
    };
  }
);
