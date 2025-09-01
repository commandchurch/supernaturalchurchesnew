import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import type { Event } from "./listEvents";
import { requireAdmin } from "../auth/admin";

interface UpdateEventParams {
  id: number;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate?: string | null;
  locationName?: string | null;
  virtualLink?: string | null;
  isPublished: boolean;
}

// Updates an existing event (admin).
export const updateEvent = api<UpdateEventParams, Event>(
  { auth: true, expose: true, method: "PUT", path: "/admin/church/events/:id" },
  async (p) => {
    requireAdmin();
    const existing = await churchDB.queryRow`SELECT id FROM events WHERE id = ${p.id}`;
    if (!existing) {
      throw APIError.notFound("event not found");
    }

    const row = await churchDB.queryRow<any>`
      UPDATE events
      SET
        title = ${p.title},
        description = ${p.description},
        event_type = ${p.eventType},
        start_date = ${p.startDate},
        end_date = ${p.endDate || null},
        location_name = ${p.locationName || null},
        virtual_link = ${p.virtualLink || null},
        is_published = ${p.isPublished},
        updated_at = NOW()
      WHERE id = ${p.id}
      RETURNING *
    `;

    if (!row) {
      throw APIError.internal("failed to update event");
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
