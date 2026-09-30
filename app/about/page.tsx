import type { Metadata } from "next"

import { images, team, values } from "@/lib/content"
import { Shape } from "@/components/ui/shape"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Process } from "@/components/home/process"
import { Cta, Quote } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "About",
  description:
    "DMP's purpose, people and performance: a consultancy built for the business of sport.",
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About DMP"
        title="Purpose, people, performance."
        intro="We exist to help sport run with the same rigour as any serious industry, so that athletes, fans and communities get more from it."
        image={images.consult}
        imageAlt="A DMP consultant in conversation with an athlete"
      />

      {/* Purpose: mission, positioning, values */}
      <section className="relative z-10 bg-background px-4 py-24 md:px-7 md:py-36">
        <SectionHeader
          eyebrow="Purpose"
          title="Why we exist."
          intro="Sport creates jobs, health and national pride. Too often it is run on instinct. We bring evidence, systems and commercial discipline to the organisations that shape it."
        />

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-6">
          {[
            {
              label: "Mission",
              text: "To make sport better governed, better funded and better measured.",
            },
            {
              label: "Positioning",
              text: "An independent consultancy at the intersection of sport, business and technology.",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-5">
              <Reveal y={16}>
                <span className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {item.label}
                </span>
              </Reveal>
              <SplitReveal
                as="p"
                className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.15] tracking-tight text-oxford"
              >
                {item.text}
              </SplitReveal>
            </div>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-2 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex min-h-64 flex-col justify-between gap-10 bg-secondary p-6 md:p-7"
            >
              <Shape name={value.shape} className="size-10 text-oxford" />
              <div className="flex flex-col gap-3">
                <h3 className="text-3xl leading-none text-oxford">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* People */}
      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <SectionHeader
          eyebrow="People"
          title="The team behind the work."
          intro="Former athletes, analysts, economists and engineers. Partner and team bios with photos will appear here."
        />
        <Reveal className="mt-14 grid grid-cols-2 gap-x-2 gap-y-10 md:mt-20 lg:grid-cols-3">
          {team.map((person, index) => (
            <figure key={index} className="flex flex-col gap-4">
              {/* Photo placeholder: initials on Oxford until portraits arrive. */}
              <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-oxford p-5">
                <span className="font-heading text-[clamp(4rem,12vw,9rem)] leading-none text-white/10">
                  {person.initials}
                </span>
                <Shape
                  name={values[index % values.length].shape}
                  className="absolute top-5 right-5 size-8 text-white/20"
                />
              </div>
              <figcaption className="flex flex-col gap-1">
                <span className="font-heading text-2xl leading-none text-oxford">
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
        action={
          <ArrowLink href="/services" tone="muted">
            See what we do
          </ArrowLink>
        }
      />

      {/* Note from the Founders */}
      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <Reveal y={16} className="md:col-span-3">
            <Eyebrow className="text-oxford/70">
              A note from the founders
            </Eyebrow>
          </Reveal>
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-foreground md:col-span-7 md:col-start-5 md:text-xl">
            <SplitReveal
              as="p"
              className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.2] tracking-tight text-oxford"
            >
              We started DMP because we kept meeting brilliant people in sport
              held back by weak systems.
            </SplitReveal>
            <SplitReveal as="p">
              Coaches without data. Federations without a plan beyond the next
              tournament. Investors who wanted to back sport but could not find
              a case they trusted. None of these are problems of talent. They
              are problems of structure, and structure can be fixed.
            </SplitReveal>
            <SplitReveal as="p">
              That is our promise to every client: we will tell you what the
              evidence says, work beside your people to act on it, and measure
              what changed. If it does not move the numbers, it was not worth
              doing.
            </SplitReveal>
            <Reveal y={16}>
              <p className="mt-4 font-heading text-3xl text-oxford">
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
