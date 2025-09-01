import { api } from "encore.dev/api";
import { userDB } from "./db";

export interface BasicProfile {
  userId: string;
  name?: string | null;
}

interface GetProfilesParams {
  userIds: string[];
}

interface GetProfilesResponse {
  profiles: BasicProfile[];
}

// Gets basic profiles for a list of user IDs.
export const getProfiles = api<GetProfilesParams, GetProfilesResponse>(
  { method: "POST", path: "/user/get-profiles" },
  async ({ userIds }) => {
    if (userIds.length === 0) {
      return { profiles: [] };
    }
    const rows = await userDB.query<any>`
      SELECT user_id, name FROM user_profiles WHERE user_id = ANY(${userIds})
    `;
    const profiles: BasicProfile[] = [];
    for await (const row of rows) {
      profiles.push({
        userId: row.user_id,
        name: row.name,
      });
    }
    return { profiles };
  }
);
