import type { Metadata } from "next"
import Link from "next/link"

import Image from "next/image"

import { cn } from "@/lib/utils"
import { getOpenings, getSiteContent } from "@/lib/cms"
import { Arrow } from "@/components/ui/arrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { heroProps, PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Steps } from "@/components/page/steps"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join DMPartners: people at the heart of demonstrating what is possible in African sports.",
}

// How We Work Together cards take the light-to-dark logo palette used
// across the site, in order.
const tones = [
  "bg-mint text-midnight",
  "bg-electric text-midnight",
  "bg-brand text-white",
  "bg-midnight text-white",
]

// Copy comes from Sanity's Careers page.
export default async function CareersPage() {
  const [openings, content] = await Promise.all([
    getOpenings(),
    getSiteContent(),
  ])
  const page = content.careers
  return (
    <main>
      <PageHero {...heroProps(page.hero)} large />

      {/* How We Work Together */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <SectionHeader
          eyebrow={page.culture.header.eyebrow}
          title={page.culture.header.title}
          intro={page.culture.header.intro}
        />
        <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {page.culture.cards.map((text, index) => (
            <div
              key={`${index}-${text}`}
              className={cn(
                "flex min-h-56 flex-col justify-end p-6 md:p-7",
                tones[index % tones.length]
              )}
            >
              <p className="font-heading text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.05]">
                {text}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Ways in */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow={page.paths.header.eyebrow}
          title={page.paths.header.title}
          intro={page.paths.header.intro}
        />
        <Reveal className="mt-10 grid gap-3 md:mt-12 md:grid-cols-3 md:grid-rows-[minmax(17rem,1fr)_auto_auto_auto]">
          {page.paths.cards.map((path, index) => (
            <Link
              key={`${index}-${path.title}`}
              href={path.href}
              className="group relative grid min-h-[28rem] grid-rows-[1fr_auto_auto_auto] gap-y-3 overflow-hidden bg-midnight p-6 text-white outline-none focus-visible:ring-2 focus-visible:ring-electric md:row-span-4 md:min-h-0 md:grid-rows-subgrid md:p-8"
            >
              <Image
                src={path.image}
                alt=""
                fill
                sizes="(min-width: 768px) 34vw, 100vw"
                className="object-cover transition-[scale] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/55 to-transparent"
              />
              <span aria-hidden />
              <span className="relative font-heading text-3xl leading-none">
                {path.title}
              </span>
              <span className="relative max-w-sm text-sm leading-relaxed text-white/70">
                {path.body}
              </span>
              <span className="relative mt-3 flex items-center gap-2 text-sm font-medium text-mint">
                {path.cta}
                <Arrow
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* Current openings */}
      <section
        id="openings"
        className="relative z-10 mx-auto max-w-[120rem] scroll-mt-28 bg-background px-6 pb-10 md:pb-12 lg:px-10"
      >
        <SectionHeader
          eyebrow={page.openings.eyebrow}
          title={page.openings.title}
          intro={page.openings.intro}
          action={
            <ArrowLink href="/contact?topic=employment" tone="brand">
              Register interest
            </ArrowLink>
          }
        />
        <Reveal className="mt-12 md:mt-16">
          {openings.length === 0 ? (
            <p className="text-lg text-midnight/70">
              No open roles right now. Register your interest and we will be in
              touch.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {openings.map((role) => (
                <li key={role.title}>
                  <Link
                    href={`/contact?topic=employment&role=${encodeURIComponent(role.title)}`}
                    className="group grid gap-3 bg-surface px-6 py-6 text-midnight transition-colors hover:bg-surface-2 md:grid-cols-12 md:items-center md:gap-6 md:py-8"
                  >
                    <span className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-none md:col-span-5">
                      {role.title}
                    </span>
                    <span className="text-midnight/70 md:col-span-3">
                      {role.team}
                    </span>
                    <span className="flex gap-4 text-sm text-midnight/70 md:col-span-3">
                      <span>{role.type}</span>
                      <span>{role.location}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm font-medium md:col-span-1 md:justify-end">
                      <span className="md:sr-only">Apply</span>
                      <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </section>

      {/* Application process */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow={page.process.header.eyebrow}
          title={page.process.header.title}
          intro={page.process.header.intro}
        />
        <Steps steps={page.process.steps} className="mt-10 md:mt-12" />
      </section>

      <Cta
        title="Ready to apply?"
        body="Send us your CV and a short note. We read every application."
        href="/contact?topic=employment"
        label="Apply now"
      />
    </main>
  )
}
