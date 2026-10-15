import type { Metadata } from "next"
import { Suspense } from "react"

import { PageHero } from "@/components/page/page-hero"
import { CaseStudyBrowser } from "@/components/page/case-study-browser"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Challenge, approach and impact: how DMP's work changes results in sport.",
}

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case studies"
        title="Impact, with evidence."
        intro="Each case study follows the same format: the challenge, what we did, and what changed. Filter by service or industry."
      />
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-16 md:pb-20 lg:px-10">
        <Suspense>
          <CaseStudyBrowser />
        </Suspense>
      </section>
      <Cta
        title="Want results like these?"
        body="Tell us what you are trying to change. We will tell you honestly whether we can help."
      />
    </main>
  )
}
