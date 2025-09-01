import { secret } from "encore.dev/config";
import { getAuthData } from "~encore/auth";
import { APIError } from "encore.dev/api";

const adminUserIDs = secret("SuperUserIDs");

export function requireAdmin() {
  const auth = getAuthData();
  if (!auth) {
    throw APIError.unauthenticated("not authenticated");
  }
  const admins = adminUserIDs().split(",").map(s => s.trim());
  if (!admins.includes(auth.userID)) {
    throw APIError.permissionDenied("not an admin");
  }
}
