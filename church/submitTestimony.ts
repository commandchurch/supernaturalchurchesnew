import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import { testimoniesBucket } from "./storage";
import { getAuthData } from "~encore/auth";

interface SubmitTestimonyParams {
  contentText?: string;
  videoObjectName?: string; // object name in testimonies bucket
  consentPublic: boolean;
}

interface SubmitTestimonyResponse {
  id: number;
  status: "pending";
  createdAt: string;
}

// Submits a testimony (pending review). Consent is required.
export const submitTestimony = api<SubmitTestimonyParams, SubmitTestimonyResponse>(
  { auth: true, expose: true, method: "POST", path: "/church/testimonies" },
  async ({ contentText, videoObjectName, consentPublic }) => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    if (!consentPublic) {
      throw APIError.invalidArgument("consentPublic must be accepted");
    }
    if (!contentText && !videoObjectName) {
      throw APIError.invalidArgument("either contentText or videoObjectName is required");
    }

    let videoUrl: string | null = null;
    if (videoObjectName) {
      // Validate object exists (best-effort)
      try {
        await testimoniesBucket.attrs(videoObjectName);
        videoUrl = testimoniesBucket.publicUrl(videoObjectName);
      } catch {
        throw APIError.invalidArgument("video upload not found or expired");
      }
    }

    const row = await churchDB.queryRow<{ id: number; created_at: string }>`
      INSERT INTO testimonies (user_id, content_text, video_url, consent_public, status)
      VALUES (${userId}, ${contentText || null}, ${videoUrl}, ${consentPublic}, 'pending')
      RETURNING id, created_at
    `;

    return { id: row!.id, status: "pending", createdAt: row!.created_at };
  }
);
