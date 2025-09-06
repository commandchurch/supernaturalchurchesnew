import { api } from "encore.dev/api";

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export const submitContact = api<ContactRequest, ContactResponse>(
  {
    expose: true,
    method: "POST",
    path: "/contact"
  },
  async (req) => {
    const { name, email, message, subject } = req;

    // For now, just log the contact submission
    // In production, you would integrate with an email service
    console.log("Contact form submission:", {
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Integrate with email service (SendGrid, Mailgun, etc.)

    return {
      success: true,
      message: "Thank you for your message. We'll get back to you soon!"
    };
  }
);