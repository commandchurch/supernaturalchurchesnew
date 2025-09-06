import { api, APIError } from "encore.dev/api";
import { userDB } from "./db";

interface CreateUsernameParams {
  userId: string;
  username: string;
}

interface CreateUsernameResponse {
  success: boolean;
  username: string;
  affiliateLink: string;
  message?: string;
}

interface CheckUsernameParams {
  username: string;
  excludeUserId?: string;
}

interface CheckUsernameResponse {
  available: boolean;
  message?: string;
}

// Checks if a username is available
export const checkUsername = api<CheckUsernameParams, CheckUsernameResponse>(
  { expose: true, method: "POST", path: "/user/check-username" },
  async ({ username, excludeUserId }) => {
    // Validate username format
    if (!username || username.length < 3 || username.length > 15) {
      return {
        available: false,
        message: "Username must be between 3 and 15 characters"
      };
    }

    // Check if username contains only lowercase letters and numbers
    if (!/^[a-z0-9]+$/.test(username)) {
      return {
        available: false,
        message: "Username can only contain lowercase letters and numbers"
      };
    }

    // Check if username is already taken
    const existingUser = await userDB.queryRow<{ user_id: string }>`
      SELECT user_id FROM user_profiles WHERE username = ${username} ${excludeUserId ? `AND user_id != ${excludeUserId}` : ''}
    `;

    if (existingUser) {
      return {
        available: false,
        message: "Username is already taken"
      };
    }

    return {
      available: true,
      message: "Username is available"
    };
  }
);

// Creates or updates a username for a user and generates their affiliate link
export const createUsername = api<CreateUsernameParams, CreateUsernameResponse>(
  { expose: true, method: "POST", path: "/user/create-username" },
  async ({ userId, username }) => {
    // Validate username format
    if (!username || username.length < 3 || username.length > 15) {
      throw APIError.invalidArgument("Username must be between 3 and 15 characters");
    }

    // Check if username contains only lowercase letters and numbers
    if (!/^[a-z0-9]+$/.test(username)) {
      throw APIError.invalidArgument("Username can only contain lowercase letters and numbers");
    }

    // Check if username is already taken
    const existingUser = await userDB.queryRow<{ user_id: string }>`
      SELECT user_id FROM user_profiles WHERE username = ${username} AND user_id != ${userId}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("Username is already taken");
    }

    // Check if user has a username and when it was last updated
    const currentProfile = await userDB.queryRow<{ username: string | null; updated_at: string | null }>`
      SELECT username, updated_at FROM user_profiles WHERE user_id = ${userId}
    `;

    if (currentProfile?.username) {
      // User already has a username, check if 28 days have passed
      const lastUpdated = new Date(currentProfile.updated_at || 0);
      const now = new Date();
      const daysSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceUpdate < 28) {
        const daysRemaining = 28 - daysSinceUpdate;
        throw APIError.invalidArgument(`You can update your username in ${daysRemaining} days. Anyone with your current link will need to get the new link from you.`);
      }
    }

    // Generate affiliate link
    const affiliateLink = `https://supernatural.institute/join?ref=${username}`;

    // Update or insert the username and affiliate link
    await userDB.exec`
      INSERT INTO user_profiles (user_id, username, affiliate_link, updated_at)
      VALUES (${userId}, ${username}, ${affiliateLink}, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET
        username = EXCLUDED.username,
        affiliate_link = EXCLUDED.affiliate_link,
        updated_at = NOW()
    `;

    return {
      success: true,
      username,
      affiliateLink,
      message: currentProfile?.username ? "Username updated successfully" : "Username created successfully"
    };
  }
);