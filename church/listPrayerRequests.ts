import { api } from "encore.dev/api";
import { churchDB } from "./db";

export interface PrayerRequest {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  request: string;
  isUrgent: boolean;
  isPrivate: boolean;
  status: string;
  createdAt: string;
  userId?: string;
}

interface ListPrayerRequestsResponse {
  requests: PrayerRequest[];
}

// Lists all prayer requests for admin review
export const listPrayerRequests = api<void, ListPrayerRequestsResponse>(
  { expose: true, method: "GET", path: "/church/prayer-requests" },
  async () => {
    const requests = await churchDB.queryAll<{
      id: number;
      name: string;
      email?: string;
      phone?: string;
      request: string;
      is_urgent: boolean;
      is_private: boolean;
      status: string;
      created_at: string;
      user_id?: string;
    }>`
      SELECT id, name, email, phone, request, is_urgent, is_private, status, created_at, user_id
      FROM prayer_requests
      ORDER BY is_urgent DESC, created_at DESC
    `;

    return {
      requests: requests.map(req => ({
        id: req.id,
        name: req.name,
        email: req.email,
        phone: req.phone,
        request: req.request,
        isUrgent: req.is_urgent,
        isPrivate: req.is_private,
        status: req.status,
        createdAt: req.created_at,
        userId: req.user_id,
      }))
    };
  }
);
