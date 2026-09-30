import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { findInsight, formatDate, insights } from "@/lib/content"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { InsightList } from "@/components/page/insight-list"
import { Cta } from "@/components/page/closing"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insight = findInsight((await params).slug)
  return insight ? { title: insight.title, description: insight.excerpt } : {}
}

export default async function InsightPage({ params }: Props) {
  const insight = findInsight((await params).slug)
  if (!insight) notFound()

  const related = insights.filter((i) => i.slug !== insight.slug).slice(0, 3)

  return (
    <main>
      <PageHero
        eyebrow={`${insight.type} · ${insight.topic}`}
        title={insight.title}
        intro={insight.excerpt}
        image={insight.image}
        compact
      >
        <Reveal y={16}>
          <p className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
            Published {formatDate(insight.date)}
          </p>
        </Reveal>
      </PageHero>

      {/* Article body. PLACEHOLDER text until the real piece is supplied. */}
      <article className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-foreground md:col-span-7 md:col-start-4">
            <SplitReveal
              as="p"
              className="text-[clamp(1.4rem,2.4vw,2.25rem)] leading-[1.25] tracking-tight text-oxford"
            >
              {insight.excerpt} This piece sets out what we are seeing in our
              work, why it matters, and what leaders can do next.
            </SplitReveal>
            <SplitReveal as="p">
              Across the organisations we work with, the same pattern repeats:
              ambition runs ahead of the systems needed to deliver it. Plans are
              written, but the data to track them is scattered, and the people
              responsible for delivery are rarely in the room when decisions are
              made.
            </SplitReveal>
            <SplitReveal
              as="h2"
              className="mt-8 text-4xl leading-none tracking-[0.01em] text-oxford"
            >
              What the evidence says
            </SplitReveal>
            <SplitReveal as="p">
              The organisations that make progress share three habits. They
              agree a small number of measures that matter. They invest in the
              plumbing that produces those measures reliably. And they review
              them on a fixed rhythm, with the authority to act on what they
              find.
            </SplitReveal>
            <SplitReveal
              as="h2"
              className="mt-8 text-4xl leading-none tracking-[0.01em] text-oxford"
            >
              What to do next
            </SplitReveal>
            <SplitReveal as="p">
              Start with the decision, not the dashboard. Ask what your board
              needs to know every quarter, then work backwards to the data and
              the people who produce it. It is less exciting than a new stadium
              or platform, and it is what makes those investments pay off.
            </SplitReveal>
          </div>
        </div>
      </article>

      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <SectionHeader eyebrow="Keep reading" title="Related insights." />
        <div className="mt-12 md:mt-16">
          <InsightList items={related} />
        </div>
      </section>

      <Cta
        title="Want to go deeper?"
        body="We brief boards and leadership teams on our research. Ask us for a session."
      />
    </main>
  )
}
