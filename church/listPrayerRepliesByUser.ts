import { api, APIError, Query } from "encore.dev/api";
import { churchDB } from "./db";
import { PrayerReply } from "./listPrayerReplies";

interface ListPrayerRepliesByUserParams {
  userId: Query<string>;
}

interface ListPrayerRepliesByUserResponse {
  replies: PrayerReply[];
}

// Lists all replies for prayer requests submitted by the given user ID.
export const listPrayerRepliesByUser = api<ListPrayerRepliesByUserParams, ListPrayerRepliesByUserResponse>(
  { expose: true, method: "GET", path: "/church/prayer-replies-by-user" },
  async ({ userId }) => {
    if (!userId) {
      throw APIError.invalidArgument("userId is required");
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
      WHERE r.request_id IN (SELECT id FROM prayer_requests WHERE user_id = ${userId})
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