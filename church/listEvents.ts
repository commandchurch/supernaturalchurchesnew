import { api } from "encore.dev/api";
import { churchDB } from "./db";

export interface Event {
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

interface ListEventsResponse {
  events: Event[];
}

// Lists all published events
export const listEvents = api<void, ListEventsResponse>(
  { expose: true, method: "GET", path: "/church/events" },
  async () => {
    const events = await churchDB.queryAll<{
      id: number;
      title: string;
      description: string;
      event_type: string;
      start_date: string;
      end_date?: string | null;
      location_name?: string | null;
      virtual_link?: string | null;
      is_published: boolean;
    }>`SELECT id, title, description, event_type, start_date, end_date, location_name, virtual_link, is_published
       FROM events
       WHERE is_published = true AND start_date >= NOW()
       ORDER BY start_date ASC`;

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
