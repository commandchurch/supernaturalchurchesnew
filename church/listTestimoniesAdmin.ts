import { api } from "encore.dev/api";
import { churchDB } from "./db";

export interface Testimony {
  id: number;
  userId: string;
  contentText?: string | null;
  videoUrl?: string | null;
  consentPublic: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  reviewedAt?: string | null;
  reviewerId?: string | null;
}

interface ListTestimoniesResponse {
  testimonies: Testimony[];
}

// Lists all testimonies for admin review.
export const listTestimoniesAdmin = api<void, ListTestimoniesResponse>(
  { expose: true, method: "GET", path: "/admin/church/testimonies" },
  async () => {
    const rows = await churchDB.queryAll<{
      id: number;
      user_id: string;
      content_text?: string | null;
      video_url?: string | null;
      consent_public: boolean;
      status: string;
      created_at: string;
      reviewed_at?: string | null;
      reviewer_id?: string | null;
    }>`
      SELECT id, user_id, content_text, video_url, consent_public, status, created_at, reviewed_at, reviewer_id
      FROM testimonies
      ORDER BY created_at DESC
    `;

    return {
      testimonies: rows.map((r) => ({
        id: r.id,
        userId: r.user_id,
        contentText: r.content_text ?? null,
        videoUrl: r.video_url ?? null,
        consentPublic: r.consent_public,
        status: r.status as Testimony["status"],
        createdAt: r.created_at,
        reviewedAt: r.reviewed_at ?? null,
        reviewerId: r.reviewer_id ?? null,
      })),
    };
  }
);
