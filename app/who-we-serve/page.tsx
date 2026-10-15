import type { Metadata } from "next"

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
        title="Everyone who runs sport."
        intro="Seven kinds of organisation, each with its own pressures. Open yours to see how we help."
      />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-16 md:pb-20 lg:px-10">
        <AudienceAccordion />
      </section>

      <Cta />
    </main>
  )
}
