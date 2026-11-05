import type { Metadata } from "next"

import { getSiteContent } from "@/lib/cms"
import { heroProps, PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { SolutionTiles } from "@/components/page/solution-tiles"
import { ServiceCards } from "@/components/page/service-cards"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Federation Business Transformation, the Street Credibility Index, the Sports Power Index and the Brand Equity Index: DMPartners' proprietary solutions.",
}

export default async function SolutionsPage() {
  const page = (await getSiteContent()).pages.solutions
  return (
    <main>
      <PageHero {...heroProps(page.hero)} />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <SolutionTiles />
      </section>

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <SectionHeader
          eyebrow={page.behind.eyebrow}
          title={page.behind.title}
          intro={page.behind.intro}
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
