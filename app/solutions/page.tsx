import type { Metadata } from "next"

import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { SolutionTiles } from "@/components/page/solution-tiles"
import { ServiceCards } from "@/components/page/service-cards"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Cta } from "@/components/page/closing"

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
        intro="Our proprietary programmes and indices package what we know about African sport into tools leaders can act on."
      />

      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <SolutionTiles />
      </section>

      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <SectionHeader
          eyebrow="Behind the solutions"
          title="Powered by six practices."
          intro="Every solution draws on our advisory services. Need something bespoke? Start with the service closest to your challenge."
          action={
            <ArrowLink href="/services" tone="muted">
              All services
            </ArrowLink>
          }
        />
        <ServiceCards className="mt-14 md:mt-20" />
      </section>

      <Cta
        title="See what a solution could do for you."
        body="Tell us your organisation and goal. We will show you how the programme or index applies."
      />
    </main>
  )
}
