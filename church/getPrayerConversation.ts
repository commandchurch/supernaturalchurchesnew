import { api } from "encore.dev/api";
import { churchDB } from "./db";

interface GetPrayerConversationParams {
  prayerRequestId: number;
}

interface PrayerMessage {
  id: number;
  message: string;
  isFromPrayerTeam: boolean;
  createdAt: string;
  userId: string;
}

interface GetPrayerConversationResponse {
  messages: PrayerMessage[];
}

// Get conversation messages for a prayer request
export const getPrayerConversation = api<GetPrayerConversationParams, GetPrayerConversationResponse>(
  { auth: true, expose: true, method: "GET", path: "/church/prayer/conversation/:prayerRequestId" },
  async ({ prayerRequestId }) => {
    const result = await churchDB.query`
      SELECT
        id,
        message,
        is_from_prayer_team as "isFromPrayerTeam",
        created_at as "createdAt",
        user_id as "userId"
      FROM prayer_conversations
      WHERE prayer_request_id = ${prayerRequestId}
      ORDER BY created_at ASC
    `;

    const messages = Array.isArray(result) ? result : [];

    return {
      messages: messages as PrayerMessage[]
    };
  }
);