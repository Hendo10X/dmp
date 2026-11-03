// Sanity project settings. Until NEXT_PUBLIC_SANITY_PROJECT_ID is set the site
// keeps serving the built-in content from lib/content.ts (see lib/cms.ts).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ""
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
export const apiVersion = "2025-10-01"

export const sanityConfigured = projectId !== ""
