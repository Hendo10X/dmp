import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  findAudience,
  findCaseStudy,
  findInsight,
  findService,
  services,
} from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Shape } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Steps } from "@/components/page/steps"
import { CaseStudyCard } from "@/components/page/case-study-card"
import { InsightCard } from "@/components/page/insight-card"
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
  const insight = findInsight(service.insight)
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <main>
      <PageHero
        eyebrow="Service"
        title={service.title}
        intro={service.summary}
        image={service.image}
      />

      {/* What it is */}
      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          <Reveal y={16} className="md:col-span-3">
            <span className="flex items-center gap-3 font-mono text-xs tracking-wider text-oxford/70 uppercase">
              <Shape name={service.shape} className="size-3 text-oxford" />
              What it is
            </span>
          </Reveal>
          <SplitReveal
            as="p"
            className="text-[clamp(1.5rem,2.8vw,2.75rem)] leading-[1.2] tracking-tight text-oxford md:col-span-9"
          >
            {service.what}
          </SplitReveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <SectionHeader eyebrow="Who it&rsquo;s for" title="Built for." />
        <Reveal className="mt-12 md:mt-16">
          <ul className="border-t border-border">
            {service.forWhom.map((slug) => {
              const audience = findAudience(slug)
              if (!audience) return null
              return (
                <li key={slug}>
                  {/* Fixed columns so every row lines up: shape, title,
                      description, arrow. Description drops under the
                      title on mobile. */}
                  <Link
                    href={`/who-we-serve#${slug}`}
                    className="group grid grid-cols-[1.25rem_minmax(0,1fr)_1.25rem] items-start gap-x-5 gap-y-2 border-b border-border py-6 text-oxford md:grid-cols-[1.5rem_minmax(0,5fr)_minmax(0,7fr)_1.25rem] md:items-center md:gap-x-8 md:py-7"
                  >
                    <Shape
                      name={audience.shape}
                      className="col-start-1 row-start-1 mt-1 size-5 text-oxford transition-transform duration-700 group-hover:rotate-90 md:mt-0 md:size-6"
                    />
                    <span className="col-start-2 row-start-1 font-heading text-[clamp(1.25rem,2vw,1.75rem)] leading-tight">
                      {audience.title}
                    </span>
                    <span className="col-start-2 row-start-2 text-sm leading-relaxed text-muted-foreground md:col-start-3 md:row-start-1 md:text-base">
                      {audience.body}
                    </span>
                    <Arrow className="col-start-3 row-start-1 mt-1 transition-transform duration-500 group-hover:translate-x-1 md:col-start-4 md:mt-0" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </section>

      {/* Our approach */}
      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <SectionHeader
          eyebrow="Our approach"
          title="How we deliver it."
          intro="Every engagement is shaped to the client, but the discipline underneath does not change."
        />
        <Steps steps={service.approach} className="mt-14 md:mt-20" />
      </section>

      {/* Related case study + insight */}
      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <SectionHeader eyebrow="Related work" title="Proof, not promises." />
        <Reveal className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-6">
          {study && (
            <CaseStudyCard
              study={study}
              size="large"
              className="md:col-span-7"
            />
          )}
          {insight && (
            <InsightCard insight={insight} className="md:col-span-5" />
          )}
        </Reveal>
      </section>

      {/* Other services */}
      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <SectionHeader
          eyebrow="Other services"
          title="Explore the other pillars."
        />
        <Reveal className="mt-12 grid gap-2 md:mt-16 md:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/services/${other.slug}`}
              className="group flex items-center justify-between gap-6 rounded-xl bg-secondary p-6 text-oxford transition-colors duration-500 hover:bg-oxford hover:text-white"
            >
              <span className="flex items-center gap-4">
                <Shape name={other.shape} className="size-6 shrink-0" />
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
