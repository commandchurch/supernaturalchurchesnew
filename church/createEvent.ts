import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import type { Event } from "./listEvents";
import { requireAdmin } from "../auth/admin";

interface CreateEventParams {
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate?: string | null;
  locationName?: string | null;
  virtualLink?: string | null;
  isPublished: boolean;
}

// Creates a new event (admin).
export const createEvent = api<CreateEventParams, Event>(
  { auth: true, expose: true, method: "POST", path: "/admin/church/events" },
  async (p) => {
    requireAdmin();
    const row = await churchDB.queryRow<any>`
      INSERT INTO events (
        title, description, event_type, start_date, end_date,
        location_name, virtual_link, is_published, updated_at
      )
      VALUES (
        ${p.title}, ${p.description}, ${p.eventType}, ${p.startDate}, ${p.endDate || null},
        ${p.locationName || null}, ${p.virtualLink || null}, ${p.isPublished}, NOW()
      )
      RETURNING *
    `;

    if (!row) {
      throw APIError.internal("failed to create event");
    }

    return {
      id: row.id,
      title: row.title,
      description: row.description,
      eventType: row.event_type,
      startDate: row.start_date,
      endDate: row.end_date,
      locationName: row.location_name,
      virtualLink: row.virtual_link,
      isPublished: row.is_published,
    };
  }
);
