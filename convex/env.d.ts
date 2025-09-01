// Environment variables for Convex
declare namespace NodeJS {
  interface ProcessEnv {
    CLERK_SECRET_KEY: string;
    STRIPE_SECRET_KEY: string;
    CONVEX_DEPLOYMENT: string;
  }
}
