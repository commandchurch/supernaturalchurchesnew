import { api } from "encore.dev/api";
import { adminDB } from "./db";

interface GetTermsParams {
  documentType: string;
}

interface GetTermsResponse {
  content: string;
  updatedAt: string;
}

// Gets the content of a legal document
export const getTerms = api<GetTermsParams, GetTermsResponse>(
  { expose: true, method: "GET", path: "/admin/terms/:documentType" },
  async ({ documentType }) => {
    const doc = await adminDB.queryRow<{ content: string; updated_at: string }>`
      SELECT content, updated_at FROM legal_documents WHERE document_type = ${documentType}
    `;

    if (!doc) {
      return { content: `No terms found for: ${documentType}`, updatedAt: new Date().toISOString() };
    }

    return {
      content: doc.content,
      updatedAt: doc.updated_at,
    };
  }
);
