import type { Metadata } from "next"

import { heroImages } from "@/lib/content"
import { PageHero } from "@/components/page/page-hero"
import { Report } from "@/components/page/report"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Research from DMPartners on the business of sports in Nigeria and Africa, including the Nigeria Sports Industry Outlook 2026.",
}

// Reports get their own page (client). One report for now: the gated
// Nigeria Sports Industry Outlook 2026 download.
export default function ReportsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Reports"
        title="Research that moves decisions."
        intro="Evidence on the business of sports in Nigeria and across Africa, free to download."
        image={heroImages.reports}
        imageAlt="An analyst presenting performance data to colleagues"
      />

      <Report />

      <Cta
        title="Need research of your own?"
        body="Market sizing, audience studies and indices built around your question. Tell us what you need to know."
      />
    </main>
  )
}
