import type { Metadata } from "next"

import { caseStudies } from "@/lib/content"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { ServiceCards } from "@/components/page/service-cards"
import { CaseStudyCard } from "@/components/page/case-study-card"
import { Process } from "@/components/home/process"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy, data and technology, commercial and research services for the business of sport.",
}

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="What we do."
        intro="Four pillars, one outcome: sport organisations that make better decisions and can prove it. Start with the pillar closest to your challenge."
      />

      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <ServiceCards />
      </section>

      <Process />

      <section className="relative z-10 bg-background px-4 py-24 md:px-7 md:py-36">
        <SectionHeader
          eyebrow="In practice"
          title="See the pillars at work."
          intro="Each engagement draws on more than one pillar. These case studies show how."
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

      <Cta
        title="Not sure where to start?"
        body="Tell us the challenge. We will point you to the right pillar, or the right mix."
      />
    </main>
  )
}
