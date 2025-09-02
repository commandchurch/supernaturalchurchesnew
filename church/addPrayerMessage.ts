import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import { getAuthData } from "~encore/auth";

interface AddPrayerMessageParams {
  prayerRequestId: number;
  message: string;
}

interface AddPrayerMessageResponse {
  success: boolean;
  messageId: number;
}

// Add a message to a prayer request conversation
export const addPrayerMessage = api<AddPrayerMessageParams, AddPrayerMessageResponse>(
  { auth: true, expose: true, method: "POST", path: "/church/prayer/message" },
  async ({ prayerRequestId, message }) => {
    const auth = getAuthData()!;

    const result = await churchDB.queryRow<{ id: number }>`
      INSERT INTO prayer_conversations (prayer_request_id, user_id, message, is_from_prayer_team)
      VALUES (${prayerRequestId}, ${auth.userID}, ${message}, FALSE)
      RETURNING id
    `;

    if (!result) {
      throw APIError.internal("Failed to add message to prayer conversation.");
    }

    return {
      success: true,
      messageId: result.id
    };
  }
);