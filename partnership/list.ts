import { api } from "encore.dev/api";
import { partnershipDB } from "./db";

export interface Partner {
  id: number;
  name: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
}

interface ListResponse {
  partners: Partner[];
}

// Lists all approved church partners.
export const list = api<void, ListResponse>(
  { expose: true, method: "GET", path: "/partnership/partners" },
  async () => {
    const partners = await partnershipDB.queryAll<Partner>`
      SELECT id, name, logo_url, website_url
      FROM church_partners
      WHERE status = 'approved'
      ORDER BY name
    `;
    return { partners };
  }
);
