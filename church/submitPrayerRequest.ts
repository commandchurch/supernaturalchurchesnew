import { api } from "encore.dev/api";
import { churchDB } from "./db";

interface SubmitPrayerRequestParams {
  name: string;
  email?: string;
  phone?: string;
  request: string;
  isUrgent: boolean;
  isPrivate: boolean;
  userId?: string;
}

interface SubmitPrayerRequestResponse {
  id: number;
  message: string;
}

// Submits a prayer request to the church
export const submitPrayerRequest = api<SubmitPrayerRequestParams, SubmitPrayerRequestResponse>(
  { expose: true, method: "POST", path: "/church/prayer-requests" },
  async ({ name, email, phone, request, isUrgent, isPrivate, userId }) => {
    const result = await churchDB.queryRow<{ id: number }>`
      INSERT INTO prayer_requests (name, email, phone, request, is_urgent, is_private, user_id)
      VALUES (${name}, ${email || null}, ${phone || null}, ${request}, ${isUrgent}, ${isPrivate}, ${userId || null})
      RETURNING id
    `;

    return {
      id: result!.id,
      message: "Your prayer request has been submitted. Our team will be praying for you.",
    };
  }
);
