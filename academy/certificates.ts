import { certificatesBucket } from "./storage";

// Generates a simple SVG certificate and uploads it to object storage.
// Returns the public URL for the certificate.
export async function generateAndStoreCertificate(params: {
  userId: string;
  fullName: string;
  courseId: number;
  courseTitle: string;
  certificateCode: string;
  issuedAt: Date;
}): Promise<{ url: string; objectName: string }> {
  const { userId, fullName, courseId, courseTitle, certificateCode, issuedAt } = params;

  const safeName = fullName.replace(/[^a-z0-9\s\-\._]/gi, "").trim() || "Student";
  const objectName = `course-${courseId}/user-${userId}/certificate-${certificateCode}.svg`;

  const svg = `
<svg width="1200" height="850" viewBox="0 0 1200 850" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#222222"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="850" fill="url(#grad)" />
  <rect x="40" y="40" width="1120" height="770" fill="none" stroke="#FFFFFF" stroke-width="4"/>
  <rect x="60" y="60" width="1080" height="730" fill="none" stroke="#9CA3AF" stroke-width="2"/>

  <text x="600" y="160" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#D1D5DB" text-anchor="middle" letter-spacing="6">COMMAND CHURCH</text>
  <text x="600" y="210" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="54" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">CERTIFICATE OF COMPLETION</text>

  <text x="600" y="310" font-family="Georgia, serif" font-size="22" fill="#9CA3AF" text-anchor="middle">This certifies that</text>
  <text x="600" y="370" font-family="Georgia, serif" font-size="48" fill="#F9FAFB" text-anchor="middle">${escapeXML(safeName)}</text>

  <text x="600" y="430" font-family="Georgia, serif" font-size="22" fill="#9CA3AF" text-anchor="middle">has successfully completed the course</text>
  <text x="600" y="490" font-family="Georgia, serif" font-size="32" fill="#E5E7EB" text-anchor="middle">${escapeXML(courseTitle)}</text>

  <text x="600" y="560" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#9CA3AF" text-anchor="middle">Certificate Code</text>
  <text x="600" y="596" font-family="Courier New, monospace" font-size="24" fill="#FFFFFF" text-anchor="middle">${escapeXML(certificateCode)}</text>

  <g transform="translate(200, 630)">
    <line x1="0" y1="0" x2="300" y2="0" stroke="#9CA3AF" stroke-width="2"/>
    <text x="150" y="36" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#D1D5DB" text-anchor="middle">Program Director</text>
  </g>

  <g transform="translate(700, 630)">
    <line x1="0" y1="0" x2="300" y2="0" stroke="#9CA3AF" stroke-width="2"/>
    <text x="150" y="36" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#D1D5DB" text-anchor="middle">Date Issued</text>
  </g>

  <text x="850" y="700" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle">${issuedAt.toISOString().split("T")[0]}</text>

  <text x="600" y="780" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle">
    Verify at commandchurch.com with the certificate code above.
  </text>
</svg>`.trim();

  const buffer = Buffer.from(svg, "utf-8");
  await certificatesBucket.upload(objectName, buffer, {
    contentType: "image/svg+xml",
  });

  const url = certificatesBucket.publicUrl(objectName);
  return { url, objectName };
}

function escapeXML(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
