import { api, APIError } from "encore.dev/api";
import { staffDB } from "./db";
import { staffDocsBucket } from "./storage";
import { requireAdmin } from "../auth/admin";

interface GetDocUploadUrlParams {
  staffId: number;
  docType: "drivers_license_front";
  fileExtension?: string; // e.g. jpg, png, pdf
}

interface GetDocUploadUrlResponse {
  url: string;
  objectName: string;
}

export const getDocUploadUrl = api<GetDocUploadUrlParams, GetDocUploadUrlResponse>(
  { auth: true, expose: true, method: "POST", path: "/admin/staff/:staffId/doc-upload-url" },
  async ({ staffId, docType, fileExtension }) => {
    requireAdmin();
    const exists = await staffDB.queryRow`SELECT id FROM staff_profiles WHERE id = ${staffId}`;
    if (!exists) throw APIError.notFound("staff not found");

    const ext = (fileExtension || "jpg").replace(/[^a-z0-9]/gi, "").toLowerCase();
    const objectName = `staff/${staffId}/${docType}-${Date.now()}.${ext}`;
    const { url } = await staffDocsBucket.signedUploadUrl(objectName, { ttl: 3600 });

    return { url, objectName };
  }
);
