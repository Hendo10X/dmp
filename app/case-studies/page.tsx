import type { Metadata } from "next"
import { Suspense } from "react"

import { caseStudies, heroImages } from "@/lib/content"
import { PageHero } from "@/components/page/page-hero"
import { CaseStudyFeatured } from "@/components/page/case-study-featured"
import { CaseStudyBrowser } from "@/components/page/case-study-browser"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Challenge, approach and impact: how DMP's work changes results in sports.",
}

// After PwC's global case studies page: hero, a featured strip of tiles,
// then "All success stories" with a filter bar, a four-across grid and
// "Load more".
export default function CaseStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Case studies"
        title="Impact, with evidence."
        intro="How federations, investors, governments and brands turn possibility into performance with DMPartners."
        image={heroImages.caseStudies}
        imageAlt="Trucks working an open-pit quarry"
      />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pt-16 md:pt-20 lg:px-10">
        <CaseStudyFeatured studies={caseStudies.slice(0, 4)} />
      </section>

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-16 md:py-20 lg:px-10">
        <h2 className="text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
          All success stories
        </h2>
        <div className="mt-8">
          <Suspense>
            <CaseStudyBrowser />
          </Suspense>
        </div>
      </section>

      <Cta
        title="Want results like these?"
        body="Tell us what you are trying to change. We will tell you honestly whether we can help."
      />
    </main>
  )
}
