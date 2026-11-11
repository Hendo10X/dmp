import type { Metadata } from "next"

import { getSiteContent } from "@/lib/cms"
import { heroProps, PageHero } from "@/components/page/page-hero"
import { AudienceAccordion } from "@/components/page/audience-accordion"
import { SectionHeader } from "@/components/page/section-header"
import { Reveal } from "@/components/motion/reveal"
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

      {/* Industries (client): the full list as a plain grid. The same list
          runs as the ticker on Home. */}
      <section
        id="industries"
        className="relative z-10 mx-auto max-w-[120rem] scroll-mt-24 bg-background px-6 pb-10 md:pb-12 lg:px-10"
      >
        <SectionHeader {...content.pages.whoWeServe.industries} />
        <Reveal className="mt-10 md:mt-12">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {content.home.industries.map((industry) => (
              <li
                key={industry}
                className="flex items-center gap-3 rounded-xl bg-surface px-6 py-5 font-heading text-lg leading-tight text-midnight"
              >
                <span
                  aria-hidden
                  className="size-2 shrink-0 rounded-full bg-mint"
                />
                {industry}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Cta />
    </main>
  )
}
