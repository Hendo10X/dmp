import { caseStudies } from "@/lib/content"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/page/section-header"
import { CaseStudyCard } from "@/components/page/case-study-card"

// "Real stories. Real results." (after PwC): three case study cards whose
// rows line up across the grid (CSS subgrid).
export function Stories() {
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
      <SectionHeader
        eyebrow="Client stories"
        title="Real stories. Real results."
        intro="How federations, leagues and public bodies turned possibility into performance with DMPartners."
        action={
          <ArrowLink href="/case-studies" tone="electric">
            All case studies
          </ArrowLink>
        }
      />
      <Reveal className="mt-10 grid gap-10 md:mt-12 md:grid-cols-3 md:gap-x-6">
        {caseStudies.slice(0, 3).map((study) => (
          <CaseStudyCard
            key={study.slug}
            study={study}
            // Cards share rows so meta, titles and stats line up.
            className="md:row-span-5 md:grid md:grid-rows-subgrid md:gap-y-4"
          />
        ))}
      </Reveal>
    </section>
  )
}
