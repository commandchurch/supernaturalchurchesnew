import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import { getAuthData } from "~encore/auth";

interface UpdatePrayerStatusParams {
  prayerRequestId: number;
  status: 'resolved' | 'unresolved';
  rating?: number; // 1-5 stars, only required when status is 'resolved'
}

interface UpdatePrayerStatusResponse {
  success: boolean;
  message: string;
}

// Update prayer request status and add rating when resolved
export const updatePrayerStatus = api<UpdatePrayerStatusParams, UpdatePrayerStatusResponse>(
  { auth: true, expose: true, method: "POST", path: "/church/prayer/status" },
  async ({ prayerRequestId, status, rating }) => {
    const auth = getAuthData()!;

    // Validate rating is provided and valid when resolving
    if (status === 'resolved') {
      if (!rating || rating < 1 || rating > 5) {
        throw APIError.invalidArgument("Rating must be between 1 and 5 stars when marking as resolved.");
      }
    }

    // Update prayer request status and rating
    const updateData: any = {
      resolution_status: status,
      resolved_at: status === 'resolved' ? new Date().toISOString() : null
    };

    if (status === 'resolved' && rating) {
      updateData.rating = rating;
    }

    await churchDB.queryRow`
      UPDATE prayer_requests
      SET ${updateData}
      WHERE id = ${prayerRequestId} AND user_id = ${auth.userID}
    `;

    const message = status === 'resolved'
      ? `Prayer request marked as answered with ${rating} star rating. Thank you for your feedback!`
      : 'Prayer request status updated to unanswered.';

    return {
      success: true,
      message
    };
  }
);