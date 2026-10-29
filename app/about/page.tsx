import type { Metadata } from "next"

import { heroImages, team, values } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Process } from "@/components/home/process"
import { Cta, Quote } from "@/components/page/closing"
import { MarketsSection } from "@/components/page/markets-section"
import { TeamCard } from "@/components/page/team-card"

export const metadata: Metadata = {
  title: "About",
  description:
    "DMPartners: commercial and investment advisory for the sports industry and adjacent markets across Nigeria and Africa.",
}

const valueTones = [
  { card: "bg-mint text-midnight", body: "text-midnight/70" },
  { card: "bg-electric text-midnight", body: "text-midnight/70" },
  { card: "bg-brand text-white", body: "text-white/70" },
  { card: "bg-midnight text-white", body: "text-white/70" },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About DMPartners"
        title="Purpose. People. Performance."
        intro="Guided by our tagline, Demonstrating Possibilities, we show what is achievable in Nigeria and across the African continent through sports and the markets around them."
        image={heroImages.about}
        imageAlt="High-rise office towers in Lagos"
      />

      {/* Purpose: mission, positioning, values */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        {/* Heading left, paragraph right, bottom-aligned so the paragraph
            ends level with the heading's last line (client). */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <Reveal y={12}>
              <Eyebrow>Purpose</Eyebrow>
            </Reveal>
            <SplitReveal className="mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
              Defining the New Era of Sports, Culture and Business.
            </SplitReveal>
          </div>
          <SplitReveal
            as="p"
            className="text-sm leading-relaxed text-midnight/70 md:col-span-5 md:text-base"
          >
            The future of the sports industry is being defined by the
            performance of current stakeholders across market segments, public
            and private sector, in the ecosystem as well as cross-cutting
            sectoral relationships. This presents a niche opportunity to stand
            out from the noise to offer specialised expertise for market
            development, growth strategies, professionalism and direct
            investment.
          </SplitReveal>
        </div>
        <Reveal y={12}>
          <p className="mt-6 font-heading text-[clamp(1.25rem,2vw,1.75rem)] text-brand">
            DMPartners exists to shape the future.
          </p>
        </Reveal>

        {/* Mission and positioning as stacked rows: label left, statement
            right, a hairline between them. */}
        <dl className="mt-10 md:mt-12">
          {[
            {
              label: "Mission",
              text: "To facilitate increased business interest and committed investment into the sports industry in Nigeria, and across Africa, leveraging existing opportunities in adjacent markets guided by principles bordering on people, culture and sustainability.",
            },
            {
              label: "Positioning",
              text: "Commercial and investment advisory at the intersection of the sports industry and adjacent markets.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <dt className="text-sm font-medium text-midnight/70 md:col-span-3 md:pt-2">
                {item.label}
              </dt>
              <dd className="md:col-span-9">
                <SplitReveal
                  as="p"
                  className="text-[clamp(1.375rem,2.4vw,2.25rem)] leading-[1.2] text-midnight"
                >
                  {item.text}
                </SplitReveal>
              </dd>
            </div>
          ))}
        </dl>

        {/* Values in the same light-to-dark logo palette as How we work. */}
        <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={cn(
                "flex min-h-56 flex-col justify-end gap-10 rounded-xl p-6 md:p-7",
                valueTones[index % valueTones.length].card
              )}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-3xl leading-none">{value.title}</h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    valueTones[index % valueTones.length].body
                  )}
                >
                  {value.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* People */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow="People"
          title="The team behind the work."
          intro="We function as a Tier-One team at every level of our operations."
        />
        <Reveal className="mt-10 grid items-start gap-x-3 gap-y-10 sm:grid-cols-3 md:mt-12">
          {team.map((person, index) => (
            <TeamCard key={`${person.name}-${person.role}`} person={person} />
          ))}
        </Reveal>
      </section>

      {/* Performance: approach, linking to What We Do */}
      <Process
        action={<ArrowLink href="/services">See what we do</ArrowLink>}
      />

      <MarketsSection
        title="Nigeria first. The continent in view."
        intro="We start from what is achievable at home and carry it across borders. Drag the globe, or pick a market."
      />

      {/* A message from the top: midnight band with mint accents. */}
      <section className="relative z-10 bg-midnight text-white">
        {/* Stacked and left-aligned with the rest of the page. */}
        <div className="mx-auto max-w-[120rem] px-6 py-16 md:py-20 lg:px-10">
          <Reveal y={16}>
            <Eyebrow className="text-mint">A message from the top</Eyebrow>
          </Reveal>
          <div className="mt-6 flex max-w-4xl flex-col gap-6 text-lg leading-relaxed text-white/70 md:text-xl">
            <SplitReveal
              as="p"
              className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.2] text-white"
            >
              We started DMPartners because we kept meeting people who could see
              what sports in Africa could become, and too few who could show it
              was possible.
            </SplitReveal>
            <SplitReveal as="p">
              Federations without a commercial plan beyond the next tournament.
              Investors who wanted to back sports but could not find a case they
              trusted. Governments that saw the potential but lacked the
              evidence. None of these are problems of talent. They are problems
              of structure and proof, and both can be built.
            </SplitReveal>
            <SplitReveal as="p">
              That is our promise to every client: we will tell you what the
              evidence says, work beside your people to act on it, and measure
              what changed. If it does not move the numbers, it was not worth
              doing.
            </SplitReveal>
            <Reveal y={16}>
              <p className="mt-4 font-heading text-3xl text-mint">
                The Founding Partners
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Quote />
      <Cta />
    </main>
  )
}
