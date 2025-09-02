import { api, APIError } from "encore.dev/api";
import { userDB } from "./db";
import { getAuthData } from "~encore/auth";

interface AddSupportMessageParams {
  ticketId: string;
  message: string;
}

interface AddSupportMessageResponse {
  success: boolean;
  messageId: number;
}

// Add a message to a support ticket conversation
export const addSupportMessage = api<AddSupportMessageParams, AddSupportMessageResponse>(
  { auth: true, expose: true, method: "POST", path: "/user/support/message" },
  async ({ ticketId, message }) => {
    const auth = getAuthData()!;

    const result = await userDB.queryRow<{ id: number }>`
      INSERT INTO ticket_conversations (ticket_id, user_id, message, is_from_support)
      VALUES (${ticketId}, ${auth.userID}, ${message}, FALSE)
      RETURNING id
    `;

    if (!result) {
      throw APIError.internal("Failed to add message to conversation.");
    }

    return {
      success: true,
      messageId: result.id
    };
  }
);