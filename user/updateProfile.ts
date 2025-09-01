import { api, APIError } from "encore.dev/api";
import { userDB } from "./db";
import { UserProfile } from "./getProfile";
import { getAuthData } from "~encore/auth";

interface UpdateProfileParams {
  name?: string;
  email?: string;
  usdtWalletAddress?: string;
  bsb?: string;
  accountNumber?: string;
}

// Updates the authenticated user's profile information.
export const updateProfile = api<UpdateProfileParams, UserProfile>(
  { auth: true, expose: true, method: "PUT", path: "/user/me" },
  async (params) => {
    const auth = getAuthData()!;

    await userDB.exec`
      INSERT INTO user_profiles (user_id, name, email, usdt_wallet_address, bsb, account_number, updated_at)
      VALUES (${auth.userID}, ${params.name}, ${params.email}, ${params.usdtWalletAddress}, ${params.bsb}, ${params.accountNumber}, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        name = COALESCE(EXCLUDED.name, user_profiles.name),
        email = COALESCE(EXCLUDED.email, user_profiles.email),
        usdt_wallet_address = COALESCE(EXCLUDED.usdt_wallet_address, user_profiles.usdt_wallet_address),
        bsb = COALESCE(EXCLUDED.bsb, user_profiles.bsb),
        account_number = COALESCE(EXCLUDED.account_number, user_profiles.account_number),
        updated_at = NOW()
    `;

    const updated = await userDB.queryRow<any>`
      SELECT user_id, name, email, usdt_wallet_address, bsb, account_number FROM user_profiles WHERE user_id = ${auth.userID}
    `;

    if (!updated) {
      throw APIError.internal("failed to update profile");
    }

    return {
      userId: updated.user_id,
      name: updated.name,
      email: updated.email,
      usdtWalletAddress: updated.usdt_wallet_address,
      bsb: updated.bsb,
      accountNumber: updated.account_number,
    };
  }
);
