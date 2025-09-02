import { api } from "encore.dev/api";
import { userDB } from "./db";

interface GetTicketConversationParams {
  ticketId: string;
}

interface ConversationMessage {
  id: number;
  message: string;
  isFromSupport: boolean;
  createdAt: string;
  userId: string;
}

interface GetTicketConversationResponse {
  messages: ConversationMessage[];
}

// Get conversation messages for a support ticket
export const getTicketConversation = api<GetTicketConversationParams, GetTicketConversationResponse>(
  { auth: true, expose: true, method: "GET", path: "/user/support/conversation/:ticketId" },
  async ({ ticketId }) => {
    const result = await userDB.query`
      SELECT
        id,
        message,
        is_from_support as "isFromSupport",
        created_at as "createdAt",
        user_id as "userId"
      FROM ticket_conversations
      WHERE ticket_id = ${ticketId}
      ORDER BY created_at ASC
    `;

    const messages = Array.isArray(result) ? result : [];

    return {
      messages: messages as ConversationMessage[]
    };
  }
);