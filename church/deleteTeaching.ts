import { api, APIError } from "encore.dev/api";
import { churchDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface DeleteTeachingParams {
  id: number;
}

interface DeleteTeachingResponse {
  success: boolean;
}

// Deletes a teaching (admin).
export const deleteTeaching = api<DeleteTeachingParams, DeleteTeachingResponse>(
  { auth: true, expose: true, method: "DELETE", path: "/admin/church/teachings/:id" },
  async ({ id }) => {
    requireAdmin();

    // Check if teaching exists
    const existing = await churchDB.queryRow`SELECT id FROM teachings WHERE id = ${id}`;
    if (!existing) {
      throw APIError.notFound("teaching not found");
    }

    // Delete the teaching
    await churchDB.exec`DELETE FROM teachings WHERE id = ${id}`;

    return { success: true };
  }
);
