import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import type { Event } from "./listEvents";
import { requireAdmin } from "../auth/admin";

interface UpdateEventParams {
  id: number;
  title?: string;
  description?: string;
  eventType?: string;
  startDate?: string;
  endDate?: string | null;
  locationName?: string | null;
  virtualLink?: string | null;
  isPublished?: boolean;
}

// Updates an existing event (admin).
export const updateEvent = api<UpdateEventParams, Event>(
  { auth: true, expose: true, method: "PUT", path: "/admin/church/events/:id" },
  async (p) => {
    requireAdmin();

    // Check if event exists
    const existing = await churchDB.queryRow`SELECT id FROM events WHERE id = ${p.id}`;
    if (!existing) {
      throw APIError.notFound("event not found");
    }

    // Build the update query with conditional field updates
    let updateFields = [];
    let hasUpdates = false;

    if (p.title !== undefined) {
      updateFields.push(`title = ${p.title}`);
      hasUpdates = true;
    }
    if (p.description !== undefined) {
      updateFields.push(`description = ${p.description}`);
      hasUpdates = true;
    }
    if (p.eventType !== undefined) {
      updateFields.push(`event_type = ${p.eventType}`);
      hasUpdates = true;
    }
    if (p.startDate !== undefined) {
      updateFields.push(`start_date = ${p.startDate}`);
      hasUpdates = true;
    }
    if (p.endDate !== undefined) {
      updateFields.push(`end_date = ${p.endDate}`);
      hasUpdates = true;
    }
    if (p.locationName !== undefined) {
      updateFields.push(`location_name = ${p.locationName}`);
      hasUpdates = true;
    }
    if (p.virtualLink !== undefined) {
      updateFields.push(`virtual_link = ${p.virtualLink}`);
      hasUpdates = true;
    }
    if (p.isPublished !== undefined) {
      updateFields.push(`is_published = ${p.isPublished}`);
      hasUpdates = true;
    }

    if (!hasUpdates) {
      throw APIError.invalidArgument("no fields to update");
    }

    updateFields.push(`updated_at = NOW()`);

    const row = await churchDB.queryRow<any>`
      UPDATE events
      SET ${updateFields.join(', ')}
      WHERE id = ${p.id}
      RETURNING id, title, description, event_type, start_date, end_date, location_name, virtual_link, is_published
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
