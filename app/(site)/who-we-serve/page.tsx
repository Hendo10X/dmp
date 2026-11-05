import type { Metadata } from "next"

import { getSiteContent } from "@/lib/cms"
import { heroProps, PageHero } from "@/components/page/page-hero"
import { AudienceAccordion } from "@/components/page/audience-accordion"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "Federations, public bodies, corporates, investors, academia, SMEs and professional associations.",
}

export default async function WhoWeServePage() {
  const content = await getSiteContent()
  const services = content.services.map(({ slug, title, forWhom }) => ({
    slug,
    title,
    forWhom,
  }))
  return (
    <main>
      <PageHero {...heroProps(content.pages.whoWeServe.hero)} />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <AudienceAccordion services={services} />
      </section>

      <Cta />
    </main>
  )
}
