import { api, APIError } from "encore.dev/api";
import { testimoniesBucket } from "./storage";
import { getAuthData } from "~encore/auth";

interface GetTestimonyUploadUrlParams {
  fileExtension?: string; // e.g., mp4, mov
}

interface GetTestimonyUploadUrlResponse {
  url: string;
  objectName: string;
  publicUrl: string;
}

// Generates a signed upload URL for testimony video uploads.
export const getTestimonyUploadUrl = api<GetTestimonyUploadUrlParams, GetTestimonyUploadUrlResponse>(
  { auth: true, expose: true, method: "POST", path: "/church/testimonies/upload-url" },
  async ({ fileExtension }) => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    const ext = (fileExtension || "mp4").replace(/[^a-z0-9]/gi, "").toLowerCase();
    const objectName = `user-${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const { url } = await testimoniesBucket.signedUploadUrl(objectName, { ttl: 3600 });
    const publicUrl = testimoniesBucket.publicUrl(objectName);
    return { url, objectName, publicUrl };
  }
);
