import type { Metadata } from "next"

import { getFeaturedReport, getSiteContent } from "@/lib/cms"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { heroProps, PageHero } from "@/components/page/page-hero"
import { Report } from "@/components/page/report"
import { Cta, Quote } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Research from DMPartners on sports and industrialisation in Nigeria and Africa, including the Nigeria Sports Industry Outlook 2026.",
}

// Reports get their own page (client): the featured report's summary, then
// its gated download. The client picks the report in Sanity.
export default async function ReportsPage() {
  const [report, content] = await Promise.all([
    getFeaturedReport(),
    getSiteContent(),
  ])

  return (
    <main>
      <PageHero {...heroProps(content.pages.reports.hero)} />

      {/* Summary: one left-aligned reading column on white (client). */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <div className="flex max-w-4xl flex-col gap-5">
          <Reveal y={12}>
            <Eyebrow>Summary</Eyebrow>
          </Reveal>
          {report ? (
            <>
              <SplitReveal className="text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
                {report.title}.
              </SplitReveal>
              {report.summary.map((paragraph) => (
                <SplitReveal
                  key={paragraph.slice(0, 24)}
                  as="p"
                  className="text-base leading-relaxed text-midnight/70 md:text-lg"
                >
                  {paragraph}
                </SplitReveal>
              ))}
            </>
          ) : (
            <p className="text-lg text-midnight/70">
              New research is on the way. Check back soon.
            </p>
          )}
        </div>
      </section>

      {report && <Report report={report} />}

      <Quote {...content.pages.reports.quote} />

      <Cta
        title="Need research of your own?"
        body="Market sizing, audience studies and indices built around your question. Tell us what you need to know."
      />
    </main>
  )
}
