// The public base URL of your site, used for SEO canonical URLs and Open Graph.
// If you deploy on a custom domain, set this to that domain (including https://).
export const siteUrl = "https://supernatural.institute";

// The human-readable site name used in titles and Open Graph meta.
export const siteName = "Supernatural Institute of Ministry";

// A default Open Graph image used when a page doesn't specify a custom one.
// Ensure this is a hosted image URL you control.
export const defaultOgImage = "https://supernatural.institute/og-image.jpg";

// A default description used for SEO when a page doesn't specify one explicitly.
export const defaultDescription =
  "God's supernatural ministry training believers to be fully equipped for Kingdom advancement. Master signs, wonders, miracles and apply faith to every aspect of life.";

// Optional: your Twitter handle, used for Twitter Card meta tags. Include the @ prefix if applicable.
export const twitterHandle = "@SupernaturalInst";

// The Stripe publishable key, for Stripe Checkout.
// This is loaded from an environment variable.
// For production, ensure this is your Stripe LIVE publishable key.
// TODO: Set VITE_STRIPE_PUBLISHABLE_KEY in your environment.
export const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
