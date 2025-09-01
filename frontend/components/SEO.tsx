import React from "react";
import { Helmet } from "react-helmet-async";
import { siteName, siteUrl, defaultOgImage, defaultDescription, twitterHandle } from "../config";

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  canonicalUrl?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  breadcrumbsJsonLd?: any;
};

function SEO({
  title,
  description,
  url,
  canonicalUrl,
  image,
  type = "website",
  noindex = false,
  breadcrumbsJsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const desc = description || defaultDescription;
  const canonical =
    canonicalUrl ||
    url ||
    (typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : siteUrl);
  const ogImage = image || defaultOgImage;

  const robots = noindex ? "noindex, nofollow, noarchive" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  // Keywords for SEO
  const keywords = [
    "supernatural ministry training",
    "christian education",
    "ministry certification",
    "kingdom business training",
    "prophetic training",
    "healing ministry",
    "church leadership",
    "spiritual warfare",
    "miracle ministry"
  ].join(", ");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="Supernatural Institute of Ministry" />
      <meta name="publisher" content="Supernatural Institute of Ministry" />
      <meta name="language" content="en-AU" />
      <meta name="geo.region" content="AU" />
      <meta name="geo.country" content="Australia" />
      <link rel="canonical" href={canonical} />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />

      {/* Performance and caching */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="en_AU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Additional SEO meta tags */}
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="resource-type" content="document" />

      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Favicon and icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD breadcrumbs if provided */}
      {breadcrumbsJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsJsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export default React.memo(SEO);
