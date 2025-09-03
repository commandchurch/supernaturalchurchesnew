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

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ListEventsResponse extends PaginatedResponse<Event> {}

// Lists all published events with pagination
export const listEvents = api<PaginationParams, ListEventsResponse>(
  { expose: true, method: "GET", path: "/church/events" },
  async (params) => {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 20)); // Max 100 items per page
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const totalResult = await churchDB.queryRow<{ count: number }>`
      SELECT COUNT(*) as count
      FROM events
      WHERE is_published = true AND start_date >= NOW()
    `;

    const total = totalResult?.count || 0;
    const totalPages = Math.ceil(total / limit);

    // Get paginated events
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
       ORDER BY start_date ASC
       LIMIT ${limit} OFFSET ${offset}`;

    return {
      data: events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        eventType: event.event_type,
        startDate: event.start_date,
        endDate: event.end_date,
        locationName: event.location_name,
        virtualLink: event.virtual_link,
        isPublished: event.is_published,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }
);
