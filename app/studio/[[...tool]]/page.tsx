import { NextStudio } from "next-sanity/studio"

import config from "@/sanity.config"
import { sanityConfigured } from "@/sanity/env"

// The Studio shell is static; it loads content in the browser.
export const dynamic = "force-static"

// Mobile viewport and noindex metadata for the Studio.
export { metadata, viewport } from "next-sanity/studio"

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui", padding: "4rem 1.5rem" }}>
        <h1>Studio not connected yet</h1>
        <p>
          Set NEXT_PUBLIC_SANITY_PROJECT_ID (and NEXT_PUBLIC_SANITY_DATASET) to
          connect the DMPartners Studio.
        </p>
      </main>
    )
  }
  return <NextStudio config={config} />
}
