import type { Metadata } from "next"

import { insights } from "@/lib/content"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { InsightCard } from "@/components/page/insight-card"
import { InsightBrowser } from "@/components/page/insight-browser"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Reports, perspectives and news on the business of sport from DMP.",
}

export default function InsightsPage() {
  const featured = insights.find((i) => i.featured) ?? insights[0]

  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title="Thinking from the field."
        intro="Research, reports and perspectives on how sport is governed, funded and measured."
      />

      {/* Featured / pinned piece */}
      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <Reveal>
          <InsightCard insight={featured} size="large" />
        </Reveal>
      </section>

      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <SectionHeader eyebrow="Library" title="Everything we publish." />
        <div className="mt-12 md:mt-16">
          <InsightBrowser />
        </div>
      </section>

      <Cta
        title="Have a question for our researchers?"
        body="We share data and methods where we can. Get in touch to discuss a study or a briefing."
      />
    </main>
  )
}
