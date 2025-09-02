import { api } from "encore.dev/api";

interface CreateSupportTicketParams {
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  category: string;
}

interface CreateSupportTicketResponse {
  ticket: {
    id: string;
    subject: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    createdAt: string;
    lastUpdated: string;
  };
  message: string;
}

// Create a new support ticket
export const createSupportTicket = api<CreateSupportTicketParams, CreateSupportTicketResponse>(
  { auth: true, expose: true, method: "POST", path: "/user/support/ticket" },
  async (params) => {
    // For now, return mock data that matches the frontend expectations
    // In a real implementation, this would insert into the support_tickets table
    const ticketId = `TK-${Date.now()}`;

    return {
      ticket: {
        id: ticketId,
        subject: params.subject,
        description: params.description,
        priority: params.priority,
        status: 'Open',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      },
      message: 'Support ticket created successfully!'
    };
  }
);