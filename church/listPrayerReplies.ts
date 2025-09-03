import { api, APIError, Query } from "encore.dev/api";
import { churchDB } from "./db";

// Shared PrayerReply interface for prayer reply operations
export interface PrayerReply {
  id: number;
  requestId: number;
  message: string;
  responderName?: string | null;
  createdAt: string;
}

interface ListPrayerRepliesParams {
  email: Query<string>;
}

interface ListPrayerRepliesResponse {
  replies: PrayerReply[];
}

// Lists all replies for prayer requests submitted with the given email.
export const listPrayerReplies = api<ListPrayerRepliesParams, ListPrayerRepliesResponse>(
  { expose: true, method: "GET", path: "/church/prayer-replies" },
  async ({ email }) => {
    if (!email) {
      throw APIError.invalidArgument("email is required");
    }

    const rows = await churchDB.queryAll<{
      id: number;
      request_id: number;
      message: string;
      responder_name?: string | null;
      created_at: string;
    }>`
      SELECT r.id, r.request_id, r.message, r.responder_name, r.created_at
      FROM prayer_request_replies r
      WHERE r.request_id IN (SELECT id FROM prayer_requests WHERE email = ${email})
      ORDER BY r.created_at DESC
    `;

    return {
      replies: rows.map(r => ({
        id: r.id,
        requestId: r.request_id,
        message: r.message,
        responderName: r.responder_name ?? null,
        createdAt: r.created_at,
      })),
    };
  }
);
