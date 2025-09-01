import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";

interface ReplyPrayerRequestParams {
  id: number; // prayer request id
  responderName?: string;
  responderEmail?: string;
  message: string;
}

interface ReplyPrayerRequestResponse {
  success: boolean;
  replyId: number;
  updatedStatus: string;
}

// Adds a reply to a prayer request, updates status to 'answered'.
export const replyPrayerRequest = api<ReplyPrayerRequestParams, ReplyPrayerRequestResponse>(
  { expose: true, method: "POST", path: "/church/prayer-requests/:id/reply" },
  async ({ id, responderName, responderEmail, message }) => {
    const req = await churchDB.queryRow<{
      id: number;
      email?: string | null;
      status: string;
    }>`SELECT id, email, status FROM prayer_requests WHERE id = ${id}`;
    if (!req) {
      throw APIError.notFound("prayer request not found");
    }
    if (!message.trim()) {
      throw APIError.invalidArgument("message is required");
    }

    const reply = await churchDB.queryRow<{ id: number }>`
      INSERT INTO prayer_request_replies (request_id, responder_name, responder_email, message)
      VALUES (${id}, ${responderName || null}, ${responderEmail || null}, ${message})
      RETURNING id
    `;

    await churchDB.exec`
      UPDATE prayer_requests
      SET status = 'answered', updated_at = NOW()
      WHERE id = ${id}
    `;

    return {
      success: true,
      replyId: reply!.id,
      updatedStatus: "answered",
    };
  }
);
