// The site's public address, for link previews and share links. Set
// NEXT_PUBLIC_SITE_URL to the live domain (e.g. https://dmpartners.africa);
// without it, Vercel's production address is used, then localhost.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "")
