import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface DeleteEventParams {
  id: number;
}

interface DeleteEventResponse {
  success: boolean;
}

// Deletes an event (admin).
export const deleteEvent = api<DeleteEventParams, DeleteEventResponse>(
  { auth: true, expose: true, method: "DELETE", path: "/admin/church/events/:id" },
  async ({ id }) => {
    requireAdmin();

    // Check if event exists
    const existing = await churchDB.queryRow`SELECT id FROM events WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("event not found");
    }

    // Delete the event
    await churchDB.exec`DELETE FROM events WHERE id = ${id}`;

    return { success: true };
  }
);
