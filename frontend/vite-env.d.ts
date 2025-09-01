/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_TARGET: string
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
