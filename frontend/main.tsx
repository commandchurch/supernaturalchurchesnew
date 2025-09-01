import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";
import "./index.css";

// Sanitize env vars to remove BOM and stray whitespace that may sneak in via CI/CLI
const sanitize = (v: unknown): string => {
  const s = String(v ?? "");
  // Remove UTF-8 BOM if present and trim whitespace/newlines
  return s.replace(/^\uFEFF/, "").trim();
};

const convexUrl = sanitize(import.meta.env.VITE_CONVEX_URL);
const convex = new ConvexReactClient(convexUrl);

const clerkPubKey = sanitize(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

if (!convexUrl) {
  throw new Error("Missing Convex URL")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </ClerkProvider>
  </React.StrictMode>
);
