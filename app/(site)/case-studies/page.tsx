import type { Metadata } from "next"
import { Suspense } from "react"

import { getCaseStudies, getSiteContent } from "@/lib/cms"
import { heroProps, PageHero } from "@/components/page/page-hero"
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
export default async function CaseStudiesPage() {
  const [caseStudies, content] = await Promise.all([
    getCaseStudies(),
    getSiteContent(),
  ])
  const services = content.services.map(({ slug, title }) => ({ slug, title }))
  return (
    <main>
      <PageHero {...heroProps(content.pages.caseStudies.hero)} />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pt-10 md:pt-12 lg:px-10">
        <CaseStudyFeatured studies={caseStudies.slice(0, 4)} />
      </section>

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <h2 className="text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
          All success stories
        </h2>
        <div className="mt-8">
          <Suspense>
            <CaseStudyBrowser studies={caseStudies} services={services} />
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
