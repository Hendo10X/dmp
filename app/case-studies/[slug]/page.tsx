import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  caseStudies,
  findCaseStudy,
  findSector,
  findService,
} from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { CaseStudyCard } from "@/components/page/case-study-card"
import { Cta, Quote } from "@/components/page/closing"
import { CountUp } from "@/components/motion/count-up"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = findCaseStudy((await params).slug)
  return study ? { title: study.title, description: study.summary } : {}
}

const statTones = [
  "bg-lime text-oxford",
  "bg-electric text-oxford",
  "bg-oxford text-white",
]

export default async function CaseStudyPage({ params }: Props) {
  const study = findCaseStudy((await params).slug)
  if (!study) notFound()

  const service = findService(study.service)
  const sector = findSector(study.sector)
  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2)

  const facts = [
    { label: "Client", value: study.client },
    service && {
      label: "Service",
      value: service.title,
      href: `/services/${service.slug}`,
    },
    sector && {
      label: "Sector",
      value: sector.title,
      href: `/case-studies?sector=${sector.slug}`,
    },
  ].filter(Boolean) as { label: string; value: string; href?: string }[]

  return (
    <main>
      <PageHero
        eyebrow="Case study"
        title={study.title}
        intro={study.summary}
        image={study.image}
        compact
      >
        <Reveal y={16}>
          <dl className="grid gap-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex gap-4">
                <dt className="w-20 shrink-0 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {fact.label}
                </dt>
                <dd className="text-oxford">
                  {fact.href ? (
                    <Link
                      href={fact.href}
                      className="underline decoration-oxford/25 underline-offset-4 hover:decoration-oxford"
                    >
                      {fact.value}
                    </Link>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </PageHero>

      {/* Challenge → Approach → Impact */}
      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <ol>
          {[
            { label: "The challenge", text: study.challenge },
            { label: "Our approach", text: study.approach },
            { label: "The impact", text: study.impact },
          ].map((block, index) => (
            <li
              key={block.label}
              className="grid gap-6 border-t border-oxford/15 py-12 md:grid-cols-12 md:gap-6 md:py-16"
            >
              <Reveal
                y={16}
                className="flex items-baseline gap-4 md:col-span-3"
              >
                <span className="font-heading text-lg text-oxford/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-3xl leading-none text-oxford">
                  {block.label}
                </span>
              </Reveal>
              <SplitReveal
                as="p"
                className="text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.3] tracking-tight text-oxford md:col-span-8 md:col-start-5"
              >
                {block.text}
              </SplitReveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {study.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "flex min-h-52 flex-col justify-between gap-8 p-6 md:p-7",
                statTones[index % statTones.length]
              )}
            >
              <span className="font-heading text-[clamp(3.5rem,6vw,5.5rem)] leading-none">
                <CountUp value={stat.value} />
              </span>
              <span className="max-w-[16rem] text-[0.7rem] leading-snug tracking-[0.14em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <SectionHeader eyebrow="More work" title="Other case studies." />
        <Reveal className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-6">
          {more.map((other) => (
            <CaseStudyCard key={other.slug} study={other} size="large" />
          ))}
        </Reveal>
      </section>

      {study.quote && (
        <Quote
          eyebrow="From the client"
          text={study.quote.text}
          by={study.quote.by}
        />
      )}
      <Cta />
    </main>
  )
}
