import { insights } from "@/lib/content"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/page/section-header"
import { InsightCard } from "@/components/page/insight-card"

// "Sharp takes on what's next" (after PwC): the latest three insights as
// cards. The full filterable list lives on /insights.
export function Insights() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
      <SectionHeader
        eyebrow="Insights"
        title="Sharp takes on what&rsquo;s next."
        intro="Research, reports and perspectives on how sport in Africa is governed, funded and grown."
        action={
          <ArrowLink href="/insights" tone="muted">
            All insights
          </ArrowLink>
        }
      />
      <Reveal className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6">
        {insights.slice(0, 3).map((insight) => (
          <InsightCard key={insight.slug} insight={insight} />
        ))}
      </Reveal>
    </section>
  )
}
