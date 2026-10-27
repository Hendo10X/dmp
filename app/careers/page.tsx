import type { Metadata } from "next"
import Link from "next/link"

import Image from "next/image"

import { cn } from "@/lib/utils"
import { heroImages, images, openings } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Steps } from "@/components/page/steps"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join DMPartners: people at the heart of demonstrating what is possible in African sports.",
}

const process = [
  {
    title: "Apply",
    body: "Send your CV and a short note on why sports and why DMP.",
  },
  {
    title: "Conversation",
    body: "A relaxed first call with someone from the team you would join.",
  },
  {
    title: "Case exercise",
    body: "A realistic problem, worked through with us rather than alone.",
  },
  {
    title: "Offer",
    body: "Meet the partners, ask anything, and hear back within a week.",
  },
]

// How We Work Together: the client's four statements, one per card, in the
// light-to-dark logo palette used across the site.
const together = [
  { text: "Small teams.", tone: "bg-mint text-midnight" },
  {
    text: "Excel on the strength of each other.",
    tone: "bg-electric text-midnight",
  },
  { text: "Work for each other.", tone: "bg-brand text-white" },
  { text: "Deliver together.", tone: "bg-midnight text-white" },
]

// Ways in, after EY's career path cards. Descriptions are PLACEHOLDER.
const paths = [
  {
    title: "Early careers",
    body: "Graduates and early-career analysts who want real responsibility from the first week.",
    image: images.research,
    href: "/contact?topic=employment",
    cta: "Start here",
  },
  {
    title: "Seasoned professionals",
    body: "Experienced advisors, analysts and operators ready to shape the business of sports.",
    image: images.boardroom,
    href: "/contact?topic=employment",
    cta: "Join us",
  },
  {
    title: "Partnership",
    body: "Independent experts who want to deliver alongside us.",
    image: images.construction,
    href: "/contact?topic=general",
    cta: "Partner with us",
  },
]

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        title="DMPCareers"
        large
        intro="People remain at the heart of who we are and why we do what we do."
        image={heroImages.careers}
        imageAlt="Three colleagues reviewing work on a laptop in a Lagos office"
      />

      {/* How We Work Together */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <SectionHeader eyebrow="Culture" title="How we work together." />
        <Reveal className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {together.map((item, index) => (
            <div
              key={item.text}
              className={cn(
                "flex min-h-56 flex-col gap-10 p-6 md:p-7",
                item.tone
              )}
            >
              <span className="font-mono text-sm font-semibold opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-heading text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.05]">
                {item.text}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Ways in */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow="Ways in"
          title="Let's demonstrate possibilities together."
        />
        <Reveal className="mt-10 grid gap-3 md:mt-12 md:grid-cols-3 md:grid-rows-[minmax(17rem,1fr)_auto_auto_auto]">
          {paths.map((path) => (
            <Link
              key={path.title}
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
              <span className="relative max-w-sm text-sm leading-relaxed text-white/80">
                {path.body}
              </span>
              <span className="relative mt-3 flex items-center gap-2 font-mono text-xs tracking-wider text-mint uppercase">
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
          eyebrow="Current openings"
          title="Open roles."
          intro="Nothing that fits? Register your interest and we will be in touch when the right role opens."
        />
        <Reveal className="mt-12 md:mt-16">
          <ul>
            {openings.map((role) => (
              <li key={role.title}>
                <Link
                  href={`/contact?topic=employment&role=${encodeURIComponent(role.title)}`}
                  className="group grid gap-3 border-b border-border py-6 text-midnight md:grid-cols-12 md:items-center md:gap-6 md:py-8"
                >
                  <span className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-none md:col-span-5">
                    {role.title}
                  </span>
                  <span className="text-muted-foreground md:col-span-3">
                    {role.team}
                  </span>
                  <span className="flex gap-4 text-sm text-muted-foreground md:col-span-3">
                    <span>{role.type}</span>
                    <span>{role.location}</span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase md:col-span-1 md:justify-end">
                    <span className="md:sr-only">Apply</span>
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact?topic=employment"
                className="group flex items-center justify-between gap-6 bg-secondary px-6 py-6 text-midnight transition-colors duration-500 hover:bg-midnight hover:text-white md:py-8"
              >
                <span className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-none">
                  Register interest
                </span>
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </Reveal>
      </section>

      {/* Application process */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader
          eyebrow="Application process"
          title="Four steps, no surprises."
        />
        <Steps steps={process} className="mt-10 md:mt-12" />
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
