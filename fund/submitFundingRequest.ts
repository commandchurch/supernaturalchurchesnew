import { api } from "encore.dev/api";
import { fundDB } from "./db";

interface SubmitFundingRequestParams {
  title: string;
  description: string;
  amountNeeded: number;
  category: string;
  urgency: string;
  deadline?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  organizationName?: string;
  justification: string;
}

interface SubmitFundingRequestResponse {
  id: number;
  message: string;
}

// Submits a funding request for review
export const submitFundingRequest = api<SubmitFundingRequestParams, SubmitFundingRequestResponse>(
  { expose: true, method: "POST", path: "/fund/requests" },
  async (params) => {
    const result = await fundDB.queryRow<{ id: number }>`
      INSERT INTO fund_needs (
        title, description, amount_needed, category, urgency, deadline,
        contact_name, contact_email, contact_phone, organization_name, 
        justification, created_by, status
      )
      VALUES (
        ${params.title}, ${params.description}, ${params.amountNeeded}, 
        ${params.category}, ${params.urgency}, ${params.deadline || null},
        ${params.contactName}, ${params.contactEmail}, ${params.contactPhone || null},
        ${params.organizationName || null}, ${params.justification}, 
        'public_submission', 'pending'
      )
      RETURNING id
    `;

    return {
      id: result!.id,
      message: "Your funding request has been submitted for review. We will contact you within 5-7 business days.",
    };
  }
);
