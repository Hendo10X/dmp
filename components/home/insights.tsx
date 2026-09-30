import { insights } from "@/lib/content"
import { ArrowLink } from "@/components/ui/arrow-link"
import { SectionHeader } from "@/components/page/section-header"
import { InsightList } from "@/components/page/insight-list"

export function Insights() {
  return (
    <section className="relative z-10 bg-background px-4 py-24 md:px-7 md:py-36">
      <SectionHeader
        eyebrow="Insights"
        title="Thinking from the field."
        action={
          <ArrowLink href="/insights" tone="muted">
            All insights
          </ArrowLink>
        }
      />
      <div className="mt-12 md:mt-20">
        <InsightList items={insights.slice(0, 4)} />
      </div>
    </section>
  )
}
