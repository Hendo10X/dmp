import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  findAudience,
  findCaseStudy,
  findService,
  services,
} from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Steps } from "@/components/page/steps"
import { CaseStudyCard } from "@/components/page/case-study-card"
import { Cta } from "@/components/page/closing"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = findService((await params).slug)
  return service ? { title: service.title, description: service.summary } : {}
}

export default async function ServicePage({ params }: Props) {
  const service = findService((await params).slug)
  if (!service) notFound()

  const study = findCaseStudy(service.caseStudy)
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={service.title}
        intro={service.summary}
        image={service.image}
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
          {service.what}
        </SplitReveal>
      </section>

      {/* Who it's for */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader eyebrow="Who it&rsquo;s for" title="Built for." />
        <Reveal className="mt-12 md:mt-16">
          <ul className="flex flex-col gap-2">
            {service.forWhom.map((slug) => {
              const audience = findAudience(slug)
              if (!audience) return null
              return (
                <li key={slug}>
                  {/* Fixed columns so every row lines up: title,
                      description, arrow. Description drops under the
                      title on mobile. */}
                  <Link
                    href={`/who-we-serve#${slug}`}
                    className="group grid grid-cols-[minmax(0,1fr)_1.25rem] items-start gap-x-5 gap-y-2 bg-surface px-6 py-6 text-midnight transition-colors hover:bg-surface-2 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)_1.25rem] md:items-center md:gap-x-8 md:py-7"
                  >
                    <span className="col-start-1 row-start-1 font-heading text-[clamp(1.25rem,2vw,1.75rem)] leading-tight">
                      {audience.title}
                    </span>
                    <span className="col-start-1 row-start-2 text-sm leading-relaxed text-midnight/70 md:col-start-2 md:row-start-1 md:text-base">
                      {audience.body}
                    </span>
                    <Arrow className="col-start-2 row-start-1 mt-1 transition-transform duration-500 group-hover:translate-x-1 md:col-start-3 md:mt-0" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </section>

      {/* Our approach */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow="Our approach"
          title="How we deliver it."
          intro="Every engagement is shaped to the client, but the discipline underneath does not change."
        />
        <Steps steps={service.approach} className="mt-10 md:mt-12" />
      </section>

      {/* Related case study */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader eyebrow="Related work" title="Proof, not promises." />
        {study && (
          <Reveal className="mt-10 md:mt-12">
            <CaseStudyCard study={study} size="large" />
          </Reveal>
        )}
      </section>

      {/* Other services */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow="Other services"
          title="Explore the other pillars."
        />
        <Reveal className="mt-12 grid gap-2 md:mt-16 md:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/services/${other.slug}`}
              className="group flex items-center justify-between gap-6 rounded-xl bg-secondary p-6 text-midnight transition-colors duration-500 hover:bg-midnight hover:text-white"
            >
              <span className="flex items-center gap-4">
                <span className="font-heading text-2xl leading-none">
                  {other.title}
                </span>
              </span>
              <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          ))}
        </Reveal>
      </section>

      <Cta title={`Interested in ${service.title}?`} />
    </main>
  )
}
