import type { Metadata } from "next"

import { images, team, values } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Shape } from "@/components/ui/shape"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Process } from "@/components/home/process"
import { Cta, Quote } from "@/components/page/closing"
import { MarketsSection } from "@/components/page/markets-section"

export const metadata: Metadata = {
  title: "About",
  description:
    "DMPartners: commercial and investment advisory for the sports industry and adjacent markets across Nigeria and Africa.",
}

const valueTones = [
  { card: "bg-mint text-midnight", body: "text-midnight/75" },
  { card: "bg-electric text-midnight", body: "text-midnight/75" },
  { card: "bg-brand text-white", body: "text-white/80" },
  { card: "bg-midnight text-white", body: "text-white/70" },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About DMPartners"
        title="Purpose. People. Performance."
        intro="Guided by our tagline, Demonstrating Possibilities, we show what is achievable in Nigeria and across the African continent through sport and the markets around it."
        image={images.meeting}
        imageAlt="A business meeting in a Lagos office"
      />

      {/* Purpose: mission, positioning, values */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-16 md:py-20 lg:px-10">
        <SectionHeader
          eyebrow="Purpose"
          title="Why we exist."
          intro="Sport creates jobs, investment and national pride. Our work is aimed squarely at industrial development, and at proving that the opportunities we describe are possibilities already within reach."
        />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-6">
          {[
            {
              label: "Mission",
              text: "To demonstrate what is achievable in sport across Nigeria and Africa, and turn it into industrial development.",
            },
            {
              label: "Positioning",
              text: "Commercial and investment advisory at the intersection of the sports industry and adjacent markets.",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-5">
              <Reveal y={16}>
                <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  {item.label}
                </span>
              </Reveal>
              <SplitReveal
                as="p"
                className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.15] tracking-tight text-midnight"
              >
                {item.text}
              </SplitReveal>
            </div>
          ))}
        </div>

        {/* Values in the same light-to-dark logo palette as How we work. */}
        <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={cn(
                "flex min-h-56 flex-col justify-between gap-10 rounded-xl p-6 md:p-7",
                valueTones[index % valueTones.length].card
              )}
            >
              <Shape name={value.shape} className="size-10" />
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
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-16 md:pb-20 lg:px-10">
        <SectionHeader
          eyebrow="People"
          title="The team behind the work."
          intro="Former athletes, analysts, economists and engineers. Partner and team bios with photos will appear here."
        />
        <Reveal className="mt-10 grid gap-x-3 gap-y-10 sm:grid-cols-3 md:mt-12">
          {team.map((person, index) => (
            <figure key={index} className="flex flex-col gap-4">
              {/* Photo placeholder: initials on Oxford until portraits arrive. */}
              <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-xl bg-midnight p-5">
                <span className="font-heading text-[clamp(4rem,12vw,9rem)] leading-none text-white/10">
                  {person.initials}
                </span>
                <Shape
                  name={values[index % values.length].shape}
                  className="absolute top-5 right-5 size-8 text-white/20"
                />
              </div>
              <figcaption className="flex flex-col gap-1">
                <span className="font-heading text-2xl leading-none text-midnight">
                  {person.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {person.role}
                </span>
              </figcaption>
            </figure>
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
        <div className="mx-auto grid max-w-[120rem] gap-10 px-6 py-16 md:grid-cols-12 md:gap-6 md:py-20 lg:px-10">
          <Reveal y={16} className="md:col-span-3">
            <Eyebrow className="text-mint">A message from the top</Eyebrow>
          </Reveal>
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-white/75 md:col-span-7 md:col-start-5 md:text-xl">
            <SplitReveal
              as="p"
              className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.2] tracking-tight text-white"
            >
              We started DMPartners because we kept meeting people who could see
              what sport in Africa could become, and too few who could show it
              was possible.
            </SplitReveal>
            <SplitReveal as="p">
              Federations without a commercial plan beyond the next tournament.
              Investors who wanted to back sport but could not find a case they
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
