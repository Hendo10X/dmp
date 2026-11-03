import type { Metadata } from "next"

import { heroImages } from "@/lib/content"

import { PageHero } from "@/components/page/page-hero"
import { AudienceAccordion } from "@/components/page/audience-accordion"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "Federations, public bodies, corporates, investors, academia, SMEs and professional associations.",
}

export default function WhoWeServePage() {
  return (
    <main>
      <PageHero
        eyebrow="Who we serve"
        title="Everyone in the business of sports."
        intro="Seven stakeholder groups, each with its own friction. Open yours to see how we help."
        image={heroImages.whoWeServe}
        imageAlt="Smiling children at their desks in a classroom"
      />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <AudienceAccordion />
      </section>

      <Cta />
    </main>
  )
}
