import { api } from "encore.dev/api";
import { academyDB } from "./db";
import { getAuthData } from "~encore/auth";

export interface Certificate {
  id: number;
  courseTitle: string;
  issuedAt: string;
  recipientName?: string;
  certificateCode: string;
  certificateUrl?: string;
}

interface ListUserCertificatesResponse {
  certificates: Certificate[];
}

// Get certificates earned by the authenticated user
export const listUserCertificates = api<void, ListUserCertificatesResponse>(
  { auth: true, expose: true, method: "GET", path: "/academy/certificates/user" },
  async () => {
    const auth = getAuthData()!;
    const rows = await academyDB.queryAll<{
      id: number;
      course_title: string;
      issued_at: string;
      certificate_code: string;
      certificate_url?: string | null;
      full_name?: string | null;
    }>`
      SELECT cert.id, c.title as course_title, cert.issued_at, cert.certificate_code, cert.certificate_url, cert.full_name
      FROM certificates cert
      JOIN courses c ON c.id = cert.course_id
      WHERE cert.user_id = ${auth.userID}
      ORDER BY cert.issued_at DESC
    `;

    return {
      certificates: rows.map(r => ({
        id: r.id,
        courseTitle: r.course_title,
        issuedAt: r.issued_at,
        recipientName: r.full_name ?? undefined,
        certificateCode: r.certificate_code,
        certificateUrl: r.certificate_url ?? undefined,
      })),
    };
  }
);