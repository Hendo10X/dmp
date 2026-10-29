import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  caseStudies,
  findCaseStudy,
  findSector,
  findService,
  team,
} from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Carousel } from "@/components/ui/carousel"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { CountUp } from "@/components/motion/count-up"
import { SectionHeader } from "@/components/page/section-header"
import { CaseStudyCard } from "@/components/page/case-study-card"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = findCaseStudy((await params).slug)
  return study ? { title: study.title, description: study.summary } : {}
}

// Highlight the last two words of the title, like PwC's marker highlight.
function splitTitle(title: string) {
  const words = title.split(" ")
  const cut = Math.max(1, words.length - 2)
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")]
}

// One case study, after PwC's F1 story: split hero (tinted panel with
// back link, title, summary and facts beside the photo), the numbers in a
// row, the story in one centred reading column with a pull quote, explore
// cards, a named contact, and a slider of more work.
export default async function CaseStudyPage({ params }: Props) {
  const study = findCaseStudy((await params).slug)
  if (!study) notFound()

  const service = findService(study.service)
  const sector = findSector(study.sector)
  const more = caseStudies.filter((c) => c.slug !== study.slug)
  const contact = team.find((person) => person.photo)
  const [lead, highlight] = splitTitle(study.title)

  const facts = [
    { label: "Client", value: study.client },
    sector && {
      label: "Industry",
      value: sector.title,
      href: `/case-studies?sector=${sector.slug}`,
    },
    service && {
      label: "Featuring",
      value: service.title,
      href: `/services/${service.slug}`,
    },
  ].filter(Boolean) as { label: string; value: string; href?: string }[]

  const story = [
    { label: "The challenge", text: study.challenge },
    { label: "Our approach", text: study.approach },
    { label: "The impact", text: study.impact },
  ]

  return (
    <main>
      {/* Split hero */}
      <section className="relative z-10 grid bg-surface-2 lg:min-h-[86svh] lg:grid-cols-2">
        <div className="flex flex-col justify-end px-6 pt-28 pb-12 md:pt-32 md:pb-16 lg:pr-12 lg:pl-10">
          <Link
            href="/case-studies"
            className="w-fit text-sm text-midnight/70 transition-colors hover:text-midnight"
          >
            All case studies
          </Link>

          <Eyebrow className="mt-10 text-sm text-brand md:text-base">
            Case study
          </Eyebrow>
          <h1 className="mt-4 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05] text-midnight">
            {lead}{" "}
            <span className="bg-mint/35 box-decoration-clone px-1">
              {highlight}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed font-semibold text-midnight">
            {study.summary}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <dt className="text-sm font-medium text-midnight/70">
                  {fact.label}
                </dt>
                <dd className="text-sm text-midnight">
                  {fact.href ? (
                    <Link
                      href={fact.href}
                      className="underline decoration-midnight/25 underline-offset-4 hover:decoration-midnight"
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
        </div>

        <div className="relative aspect-[4/3] bg-midnight lg:aspect-auto">
          <Image
            src={study.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* The numbers */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        {/* Centred row, so two or three figures always sit balanced. */}
        <Reveal className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-16 gap-y-10">
          {study.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex w-full flex-col items-center text-center sm:w-60"
            >
              <span className="font-heading text-[clamp(3rem,5vw,4.5rem)] leading-none text-brand">
                <CountUp value={stat.value} />
              </span>
              <span aria-hidden className="mt-5 h-0.5 w-10 bg-mint" />
              <span className="mt-4 max-w-[15rem] text-sm leading-snug text-midnight/70">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* The story, one reading column */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-14 md:gap-16">
          {story.map((block) => (
            <div key={block.label} className="flex flex-col gap-4">
              <Eyebrow className="text-brand">{block.label}</Eyebrow>
              <SplitReveal
                as="p"
                className="text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.45] text-midnight"
              >
                {block.text}
              </SplitReveal>
            </div>
          ))}

          {study.quote && (
            <figure className="flex flex-col gap-4">
              <blockquote className="font-heading text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] text-brand">
                &ldquo;{study.quote.text}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-midnight">
                {study.quote.by}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* Explore */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            service && {
              title: service.title,
              body: service.summary,
              href: `/services/${service.slug}`,
              cta: "Explore the service",
            },
            {
              title: "More case studies",
              body: "Federations, investors, governments and brands: see how others turned possibility into performance.",
              href: "/case-studies",
              cta: "All case studies",
            },
          ]
            .filter(Boolean)
            .map((card) => {
              const item = card as {
                title: string
                body: string
                href: string
                cta: string
              }
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-5 bg-surface-2 px-6 py-12 text-center md:px-12"
                >
                  <span aria-hidden className="h-0.5 w-10 bg-mint" />
                  <p className="font-heading text-2xl leading-tight text-midnight">
                    {item.title}
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-midnight/70">
                    {item.body}
                  </p>
                  <ArrowLink href={item.href}>{item.cta}</ArrowLink>
                </div>
              )
            })}
        </div>
      </section>

      {/* Contact */}
      {contact && (
        <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <span className="relative block size-20 shrink-0 overflow-hidden bg-midnight">
                <Image
                  src={contact.photo!}
                  alt={`Portrait of ${contact.name}`}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </span>
              <div>
                <Eyebrow className="text-midnight/70">Talk to the team</Eyebrow>
                <p className="mt-2 font-heading text-2xl leading-tight text-midnight">
                  {contact.name}
                </p>
                <p className="text-sm text-midnight/70">{contact.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brand hover:text-midnight"
                >
                  LinkedIn
                </a>
              )}
              <ArrowLink href="/contact">Start a conversation</ArrowLink>
            </div>
          </div>
        </section>
      )}

      {/* More work */}
      <section className="relative z-10 overflow-hidden bg-surface-2">
        <div className="mx-auto max-w-[120rem] px-6 py-16 md:py-20 lg:px-10">
          <SectionHeader
            eyebrow="More work"
            title="Other case studies."
            action={
              <Link
                href="/case-studies"
                className="group flex items-center gap-2 text-sm font-semibold text-midnight"
              >
                See all
                <Arrow
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            }
          />
          <Carousel label="Other case studies" className="mt-10 md:mt-12">
            {more.map((other) => (
              <CaseStudyCard key={other.slug} study={other} />
            ))}
          </Carousel>
        </div>
      </section>
    </main>
  )
}
