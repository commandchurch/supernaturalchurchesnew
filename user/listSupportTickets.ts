import { api } from "encore.dev/api";
import { userDB } from "./db";

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  lastUpdated: string;
}

interface ListSupportTicketsResponse {
  tickets: SupportTicket[];
}

// Get support tickets for the authenticated user
export const listSupportTickets = api<void, ListSupportTicketsResponse>(
  { auth: true, expose: true, method: "GET", path: "/user/support/tickets" },
  async () => {
    // For now, return mock data that matches the frontend expectations
    // In a real implementation, this would query the support_tickets table
    return {
      tickets: [
        {
          id: 'TK-001',
          subject: 'Payment not processing',
          description: 'My membership payment is failing to process through Stripe.',
          priority: 'High',
          status: 'In Progress',
          createdAt: '2025-01-01T10:00:00Z',
          lastUpdated: '2025-01-02T14:30:00Z'
        },
        {
          id: 'TK-002',
          subject: 'Course video not loading',
          description: 'The Evangelism Essentials course videos are not loading properly.',
          priority: 'Medium',
          status: 'Resolved',
          createdAt: '2024-12-28T15:20:00Z',
          lastUpdated: '2024-12-29T09:45:00Z'
        }
      ]
    };
  }
);