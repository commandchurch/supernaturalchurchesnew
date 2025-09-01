import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";
import { createRemoteJWKSet, jwtVerify } from "jose";

const clerkIssuerURL = secret("ClerkIssuerURL");

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
let issuer: string | null = null;

function getJWKS() {
  if (jwks && issuer) {
    return { jwks, issuer };
  }
  
  issuer = clerkIssuerURL();
  if (!issuer) {
    throw new Error("ClerkIssuerURL secret is not set. Please set it in the Infrastructure tab.");
  }
  
  jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));
  
  return { jwks, issuer };
}

interface AuthParams {
  authorization: Header<"Authorization">;
}

export interface AuthData {
  userID: string;
  email: string | null;
  name: string | null;
  imageUrl: string;
}

const auth = authHandler<AuthParams, AuthData>(
  async ({ authorization }) => {
    const token = authorization.replace("Bearer ", "");
    if (!token) {
      throw APIError.unauthenticated("missing token");
    }

    try {
      const { jwks, issuer } = getJWKS();
      const { payload } = await jwtVerify(token, jwks, { issuer });

      const userID = payload.sub!;
      const email = (payload.email as string) || null;
      const name = (payload.name as string) || (payload.first_name as string) || (payload.last_name as string) || null;
      const imageUrl = (payload.picture as string) || "";

      // The user profile is updated on-demand when user.getMe is called,
      // or when other services need it. We don't need to proactively update it here.

      return {
        userID,
        email,
        name,
        imageUrl,
      };
    } catch (err: any) {
      throw APIError.unauthenticated("invalid token", { detail: err.message });
    }
  }
);

// Configure the API gateway to use the auth handler.
export const gw = new Gateway({ authHandler: auth });
