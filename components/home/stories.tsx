import { caseStudies } from "@/lib/content"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/page/section-header"
import { CaseStudyCard } from "@/components/page/case-study-card"

// "Real stories. Real results." (after PwC): three case study cards.
export function Stories() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
      <SectionHeader
        eyebrow="Client stories"
        title="Real stories. Real results."
        intro="How federations, leagues and public bodies turned possibility into performance with DMPartners."
        action={
          <ArrowLink href="/case-studies" tone="muted">
            All case studies
          </ArrowLink>
        }
      />
      <Reveal className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6">
        {caseStudies.slice(0, 3).map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </Reveal>
    </section>
  )
}
