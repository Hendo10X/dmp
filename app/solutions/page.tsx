import type { Metadata } from "next"

import { heroImages } from "@/lib/content"

import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { SolutionTiles } from "@/components/page/solution-tiles"
import { ServiceCards } from "@/components/page/service-cards"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Cta } from "@/components/page/closing"
import { Report } from "@/components/page/report"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Federation Business Transformation, the Street Credibility Index and the Sports Power Index: DMPartners' proprietary solutions.",
}

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title="Built to demonstrate possibility."
        intro="Our proprietary programmes and indices package what we know about African sports into tools leaders can act on."
        image={heroImages.solutions}
        imageAlt="An empty football stadium with green pitch and covered stands"
      />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-16 md:py-20 lg:px-10">
        <SolutionTiles />
      </section>

      <Report />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-16 md:py-20 lg:px-10">
        <SectionHeader
          eyebrow="Behind the solutions"
          title="Powered by six practices."
          intro="Every solution draws on our advisory services. Need something bespoke? Start with the service closest to your challenge."
          action={<ArrowLink href="/services">All services</ArrowLink>}
        />
        <ServiceCards className="mt-10 md:mt-12" />
      </section>

      <Cta
        title="See what a solution could do for you."
        body="Tell us your organisation and goal. We will show you how the programme or index applies."
      />
    </main>
  )
}
