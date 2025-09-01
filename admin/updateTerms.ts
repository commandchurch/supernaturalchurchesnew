import { api, APIError } from "encore.dev/api";
import { adminDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface UpdateTermsParams {
  documentType: string;
  content: string;
}

interface UpdateTermsResponse {
  success: boolean;
}

// Updates the content of a legal document
export const updateTerms = api<UpdateTermsParams, UpdateTermsResponse>(
  { auth: true, expose: true, method: "PUT", path: "/admin/terms/:documentType" },
  async ({ documentType, content }) => {
    requireAdmin();
    await adminDB.exec`
      INSERT INTO legal_documents (document_type, content, updated_at)
      VALUES (${documentType}, ${content}, NOW())
      ON CONFLICT (document_type) DO UPDATE SET
        content = EXCLUDED.content,
        version = legal_documents.version + 1,
        updated_at = NOW()
    `;
    return { success: true };
  }
);
