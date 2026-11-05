import type { Metadata } from "next"

import { getCaseStudies, getSiteContent } from "@/lib/cms"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { heroProps, PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { ServiceCards } from "@/components/page/service-cards"
import { CaseStudyCard } from "@/components/page/case-study-card"
import { Process } from "@/components/home/process"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy and growth, transformation, transactions and investment, policy, research and sustainability advisory for sports and adjacent markets across Africa.",
}

export default async function ServicesPage() {
  const [caseStudies, content] = await Promise.all([
    getCaseStudies(),
    getSiteContent(),
  ])
  const page = content.pages.services
  return (
    <main>
      <PageHero {...heroProps(page.hero)} />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <SectionHeader
          eyebrow={page.cards.eyebrow}
          title={page.cards.title}
          intro={page.cards.intro}
        />
        <ServiceCards className="mt-10 md:mt-12" />
      </section>

      <Process />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <SectionHeader
          eyebrow={page.inPractice.eyebrow}
          title={page.inPractice.title}
          intro={page.inPractice.intro}
          action={<ArrowLink href="/case-studies">All case studies</ArrowLink>}
        />
        <Reveal className="mt-10 grid gap-12 md:mt-12 md:grid-cols-3 md:gap-6">
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

      <Cta
        title="Not sure where to start?"
        body="Tell us the challenge. We will point you to the right pillar, or the right mix."
      />
    </main>
  )
}
