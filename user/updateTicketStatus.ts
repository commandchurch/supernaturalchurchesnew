import { api, APIError } from "encore.dev/api";
import { userDB } from "./db";
import { getAuthData } from "~encore/auth";

interface UpdateTicketStatusParams {
  ticketId: string;
  status: 'resolved' | 'unresolved';
  rating?: number; // 1-5 stars, only required when status is 'resolved'
}

interface UpdateTicketStatusResponse {
  success: boolean;
  message: string;
}

// Update ticket status and add rating when resolved
export const updateTicketStatus = api<UpdateTicketStatusParams, UpdateTicketStatusResponse>(
  { auth: true, expose: true, method: "POST", path: "/user/support/ticket/status" },
  async ({ ticketId, status, rating }) => {
    const auth = getAuthData()!;

    // Validate rating is provided and valid when resolving
    if (status === 'resolved') {
      if (!rating || rating < 1 || rating > 5) {
        throw APIError.invalidArgument("Rating must be between 1 and 5 stars when marking as resolved.");
      }
    }

    // Update ticket status and rating
    const updateData: any = {
      resolution_status: status,
      resolved_at: status === 'resolved' ? new Date().toISOString() : null
    };

    if (status === 'resolved' && rating) {
      updateData.rating = rating;
    }

    await userDB.queryRow`
      UPDATE support_tickets
      SET ${updateData}
      WHERE id = ${ticketId} AND user_id = ${auth.userID}
    `;

    const message = status === 'resolved'
      ? `Ticket marked as resolved with ${rating} star rating. Thank you for your feedback!`
      : 'Ticket status updated to unresolved.';

    return {
      success: true,
      message
    };
  }
);