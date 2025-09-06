import { api, APIError } from "encore.dev/api";
import { userDB } from "./db";

export interface UserProfile {
  userId: string;
  name?: string | null;
  email?: string | null;
  username?: string | null;
  affiliateLink?: string | null;
  usdtWalletAddress?: string | null;
  bsb?: string | null;
  accountNumber?: string | null;
}

interface GetProfileParams {
  userId: string;
}

// Gets a user's public profile information.
export const getProfile = api<GetProfileParams, UserProfile>(
  { expose: true, method: "GET", path: "/user/profile/:userId" },
  async ({ userId }) => {
    const profile = await userDB.queryRow<{
      user_id: string;
      name?: string | null;
      username?: string | null;
      affiliate_link?: string | null;
    }>`
      SELECT user_id, name, username, affiliate_link FROM user_profiles WHERE user_id = ${userId}
    `;

    if (!profile) {
      throw APIError.notFound("user not found");
    }

    return {
      userId: profile.user_id,
      name: profile.name,
      username: profile.username,
      affiliateLink: profile.affiliate_link,
    };
  }
);
