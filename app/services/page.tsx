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
    "Strategy and growth, transformation, transactions and investment, policy, research and sustainability advisory for sport and adjacent markets across Africa.",
}

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="What we do."
        intro="Six practices, each built for the business of sport and the markets around it. Start with the one closest to your challenge, or explore our solutions."
      />

      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <ServiceCards />
      </section>

      <Process />

      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-36">
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
