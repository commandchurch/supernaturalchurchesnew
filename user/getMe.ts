import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { userDB } from "./db";
import type { UserProfile } from "./getProfile";

// Gets the profile for the currently authenticated user.
export const getMe = api<void, UserProfile>(
  { auth: true, expose: true, method: "GET", path: "/user/me" },
  async () => {
    const auth = getAuthData()!;
    const profile = await userDB.queryRow<any>`
      SELECT user_id, name, email, usdt_wallet_address, bsb, account_number FROM user_profiles WHERE user_id = ${auth.userID}
    `;

    return {
      userId: auth.userID,
      name: profile?.name ?? auth.name,
      email: profile?.email ?? auth.email,
      usdtWalletAddress: profile?.usdt_wallet_address ?? null,
      bsb: profile?.bsb ?? null,
      accountNumber: profile?.account_number ?? null,
    };
  }
);
