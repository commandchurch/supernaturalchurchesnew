import { api } from "encore.dev/api";
import { churchDB } from "./db";
import type { Event } from "./listEvents";
import { requireAdmin } from "../auth/admin";

interface ListAllEventsResponse {
  events: Event[];
}

// Lists all events, including unpublished ones (admin).
export const listAllEvents = api<void, ListAllEventsResponse>(
  {
    auth: true,
    expose: true,
    method: "GET",
    path: "/admin/church/events"
  },
  async () => {
    requireAdmin();
    const events = await churchDB.queryAll<any>`
      SELECT id, title, description, event_type, start_date, end_date, location_name, virtual_link, is_published
      FROM events
      ORDER BY start_date DESC
    `;

    return {
      events: events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        eventType: event.event_type,
        startDate: event.start_date,
        endDate: event.end_date,
        locationName: event.location_name,
        virtualLink: event.virtual_link,
        isPublished: event.is_published,
      }))
    };
  }
);
