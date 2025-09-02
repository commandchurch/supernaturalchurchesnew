import { api, APIError } from "encore.dev/api";
import { partnershipDB } from "./db";
import { getAuthData } from "~encore/auth";
import { membership } from "~encore/clients";

interface ApplyParams {
  churchName: string;
  websiteUrl?: string;
  logoUrl?: string;
  contactName: string;
  contactEmail: string;
  ministryType: string;  // Five-Fold ministry type: apostle, prophet, evangelist, pastor, teacher
  denomination?: string;
  city?: string;
  state?: string;
  country?: string;
  description?: string;
}

interface ApplyResponse {
  success: boolean;
  partnerId: number;
}

// Allows a user with an active PARTNER subscription to apply for official partnership recognition.
export const apply = api<ApplyParams, ApplyResponse>(
  { auth: true, expose: true, method: "POST", path: "/partnership/apply" },
  async ({ churchName, websiteUrl, logoUrl, contactName, contactEmail, ministryType, denomination, city, state, country, description }) => {
    const auth = getAuthData()!;
    
    // Verify user has the PARTNER subscription
    const sub = await membership.getSubscription();
    if (!sub.active || sub.planCode !== 'PARTNER') {
      throw APIError.permissionDenied("An active Church Partnership subscription is required to apply.");
    }

    const existing = await partnershipDB.queryRow`
      SELECT id FROM church_partners WHERE user_id = ${auth.userID}
    `;
    if (existing) {
      throw APIError.alreadyExists("You have already submitted a partnership application.");
    }

    const result = await partnershipDB.queryRow<{ id: number }>`
      INSERT INTO church_partners (
        name, website_url, logo_url, contact_name, contact_email,
        user_id, status, ministry_type, denomination, city, state, country, description
      )
      VALUES (
        ${churchName}, ${websiteUrl}, ${logoUrl}, ${contactName}, ${contactEmail},
        ${auth.userID}, 'pending', ${ministryType}, ${denomination}, ${city}, ${state}, ${country}, ${description}
      )
      RETURNING id
    `;

    if (!result) {
      throw APIError.internal("Failed to create partnership application.");
    }

    return { success: true, partnerId: result.id };
  }
);
