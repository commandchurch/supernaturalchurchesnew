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

    // Use individual UPDATE statements for each field to avoid SQL injection

    // Use conditional updates for each field
    let updated = false;

    if (p.title !== undefined) {
      await churchDB.exec`UPDATE events SET title = ${p.title}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.description !== undefined) {
      await churchDB.exec`UPDATE events SET description = ${p.description}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.eventType !== undefined) {
      await churchDB.exec`UPDATE events SET event_type = ${p.eventType}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.startDate !== undefined) {
      await churchDB.exec`UPDATE events SET start_date = ${p.startDate}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.endDate !== undefined) {
      await churchDB.exec`UPDATE events SET end_date = ${p.endDate}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.locationName !== undefined) {
      await churchDB.exec`UPDATE events SET location_name = ${p.locationName}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.virtualLink !== undefined) {
      await churchDB.exec`UPDATE events SET virtual_link = ${p.virtualLink}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }
    if (p.isPublished !== undefined) {
      await churchDB.exec`UPDATE events SET is_published = ${p.isPublished}, updated_at = NOW() WHERE id = ${p.id}`;
      updated = true;
    }

    if (!updated) {
      throw APIError.invalidArgument("no fields to update");
    }

    // Get the updated event
    const row = await churchDB.queryRow`SELECT id, title, description, event_type, start_date, end_date, location_name, virtual_link, is_published FROM events WHERE id = ${p.id}`;

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