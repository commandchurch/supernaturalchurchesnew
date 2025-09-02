import { api } from "encore.dev/api";
import { academyDB } from "./db";

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
    // For now, return mock data that matches the frontend expectations
    // In a real implementation, this would query the certificates table
    return {
      certificates: [
        {
          id: 1,
          courseTitle: 'New Life in Jesus: Foundations',
          issuedAt: new Date().toISOString(),
          recipientName: 'John Smith',
          certificateCode: 'CERT-001',
          certificateUrl: undefined,
        },
        {
          id: 2,
          courseTitle: 'Evangelism Essentials',
          issuedAt: new Date().toISOString(),
          recipientName: 'John Smith',
          certificateCode: 'CERT-002',
          certificateUrl: undefined,
        }
      ]
    };
  }
);