import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  findAudience,
  findService,
  findSolution,
  solutions,
} from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Steps } from "@/components/page/steps"
import { Cta } from "@/components/page/closing"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solution = findSolution((await params).slug)
  return solution
    ? { title: solution.title, description: solution.summary }
    : {}
}

export default async function SolutionPage({ params }: Props) {
  const solution = findSolution((await params).slug)
  if (!solution) notFound()

  const others = solutions.filter((s) => s.slug !== solution.slug)

  return (
    <main>
      <PageHero
        eyebrow={`Solutions · ${solution.kicker}`}
        title={solution.title}
        intro={solution.summary}
        image={solution.image}
        compact
      />

      {/* What it is */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        {/* Stacked so the copy starts on the same left edge as the hero
            title (client: the old side column pushed it out of line). */}
        <Reveal y={16}>
          <span className="text-sm font-medium text-midnight/70">
            What it is
          </span>
        </Reveal>
        <SplitReveal
          as="p"
          className="mt-5 max-w-5xl text-[clamp(1.5rem,2.8vw,2.75rem)] leading-[1.2] text-midnight"
        >
          {solution.what}
        </SplitReveal>
      </section>

      {/* Outcomes */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader eyebrow="What you get" title="Outcomes." />
        <Reveal className="mt-12 grid gap-2 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {solution.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="flex min-h-52 flex-col justify-end rounded-xl bg-midnight p-6 text-white md:p-7"
            >
              <span className="text-lg leading-snug font-semibold">
                {outcome}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow="How it works"
          title="From evidence to action."
        />
        <Steps steps={solution.how} className="mt-10 md:mt-12" />
      </section>

      {/* Who it's for + powering services */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <div className="grid gap-16 md:grid-cols-2 md:gap-6">
          <div>
            <SectionHeader eyebrow="Who it&rsquo;s for" title="Built for." />
            <Reveal className="mt-10">
              <ul>
                {solution.forWhom.map((slug) => {
                  const audience = findAudience(slug)
                  if (!audience) return null
                  return (
                    <li key={slug}>
                      <Link
                        href={`/who-we-serve#${slug}`}
                        className="group flex items-center justify-between gap-6 bg-surface px-6 py-5 text-midnight transition-colors hover:bg-surface-2"
                      >
                        <span className="font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none">
                          {audience.title}
                        </span>
                        <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
          <div>
            <SectionHeader eyebrow="Powered by" title="Our services." />
            <Reveal className="mt-10 flex flex-col gap-2">
              {solution.services.map((slug) => {
                const service = findService(slug)
                if (!service) return null
                return (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="group flex items-center justify-between gap-6 rounded-xl bg-secondary p-5 text-midnight transition-colors duration-500 hover:bg-midnight hover:text-white"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-heading text-2xl leading-none">
                        {service.title}
                      </span>
                    </span>
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                )
              })}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other solutions */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader eyebrow="More solutions" title="Explore the others." />
        <Reveal className="mt-12 grid gap-2 md:mt-16 md:grid-cols-2">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/solutions/${other.slug}`}
              className="group flex min-h-40 flex-col justify-between gap-6 rounded-xl bg-secondary p-6 text-midnight transition-colors duration-500 hover:bg-midnight hover:text-white md:p-7"
            >
              <span className="text-sm font-medium">{other.kicker}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="font-heading text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05]">
                  {other.title}
                </span>
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      <Cta title={`Interested in the ${solution.title}?`} />
    </main>
  )
}
