import type { Metadata } from "next"

import { getSiteContent, getTeam } from "@/lib/cms"
import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { heroProps, PageHero } from "@/components/page/page-hero"
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

export default async function AboutPage() {
  const [team, content] = await Promise.all([getTeam(), getSiteContent()])
  const { about, home } = content
  return (
    <main>
      <PageHero {...heroProps(about.hero)} />

      {/* Purpose: mission, positioning, values */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        {/* One column, every line starting on the same left edge
            (client). */}
        <div className="flex max-w-4xl flex-col gap-5">
          <Reveal y={12}>
            <Eyebrow>{about.purpose.eyebrow}</Eyebrow>
          </Reveal>
          <SplitReveal className="text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
            {about.purpose.title}
          </SplitReveal>
          <SplitReveal
            as="p"
            className="text-sm leading-relaxed text-midnight/70 md:text-base"
          >
            {about.purpose.body}
          </SplitReveal>
          <Reveal y={12}>
            <p className="font-heading text-[clamp(1.25rem,2vw,1.75rem)] text-brand">
              {about.purpose.tagline}
            </p>
          </Reveal>
        </div>

        {/* Mission and positioning as stacked rows: label left, statement
            right, a hairline between them. */}
        <dl className="mt-10 md:mt-12">
          {[
            { label: "Mission", text: about.mission },
            { label: "Positioning", text: about.positioning },
          ].map((item) => (
            <div
              key={item.label}
              className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <dt className="text-sm font-semibold tracking-wider text-brand uppercase md:col-span-3 md:pt-2">
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
          {about.values.map((value, index) => (
            <div
              key={`${index}-${value.title}`}
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
          eyebrow={about.team.eyebrow}
          title={about.team.title}
          intro={about.team.intro}
        />
        {/* Smaller cards (client): four-column track, so three founders
            sit at a modest size from the left edge. */}
        <Reveal className="mt-10 grid items-start gap-x-3 gap-y-10 sm:grid-cols-3 md:mt-12 lg:grid-cols-4">
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
        title={about.markets.title}
        intro={about.markets.intro}
      />

      {/* A message from the top: midnight band with mint accents. */}
      <section className="relative z-10 bg-midnight text-white">
        {/* Stacked and left-aligned with the rest of the page. */}
        <div className="mx-auto max-w-[120rem] px-6 py-16 md:py-20 lg:px-10">
          <Reveal y={16}>
            <Eyebrow className="text-mint">{about.message.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-6 flex max-w-4xl flex-col gap-6 text-lg leading-relaxed text-white/70 md:text-xl">
            <SplitReveal
              as="p"
              className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.2] text-white"
            >
              {about.message.lead}
            </SplitReveal>
            {about.message.paragraphs.map((paragraph, index) => (
              <SplitReveal key={index} as="p">
                {paragraph}
              </SplitReveal>
            ))}
            <Reveal y={16}>
              <p className="mt-4 font-heading text-3xl text-mint">
                {about.message.signoff}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Quote {...home.quote} />
      <Cta />
    </main>
  )
}
