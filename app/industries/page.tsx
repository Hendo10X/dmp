import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { caseStudies, sectors } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Shape } from "@/components/ui/shape"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { CaseStudyCard } from "@/components/page/case-study-card"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sport and the adjacent markets around it: leagues, grassroots sport, media, tourism, venues and wellness.",
}

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industries"
        title="Sport and the markets around it."
        intro="The sports industry does not stand alone. Its value flows into media, tourism, real estate and health, and that is where much of the opportunity lies."
      />

      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <Reveal className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const count = caseStudies.filter(
              (c) => c.sector === sector.slug
            ).length
            return (
              <Link
                key={sector.slug}
                href={`/case-studies?sector=${sector.slug}`}
                className="group flex flex-col gap-5 text-oxford"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-oxford">
                  <Image
                    src={sector.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-80 transition-[scale,opacity] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 flex size-11 items-center justify-center rounded-lg bg-white">
                    <Shape
                      name={sector.shape}
                      className="size-6 text-oxford transition-transform duration-700 group-hover:rotate-90"
                    />
                  </span>
                  <span className="absolute right-4 bottom-4 font-heading text-6xl leading-none text-white/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="font-heading text-[2.25rem] leading-[1.05]">
                  {sector.title}
                </span>
                <span className="text-base leading-relaxed text-muted-foreground">
                  {sector.body}
                </span>
                <span className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
                  {count > 0
                    ? `${count} case ${count === 1 ? "study" : "studies"}`
                    : "Talk to a specialist"}
                  <Arrow
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            )
          })}
        </Reveal>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <SectionHeader
          eyebrow="Sector case studies"
          title="Recent work across sport."
          action={
            <ArrowLink href="/case-studies" tone="muted">
              All case studies
            </ArrowLink>
          }
        />
        <Reveal className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-6">
          {caseStudies.slice(0, 2).map((study) => (
            <CaseStudyCard key={study.slug} study={study} size="large" />
          ))}
        </Reveal>
      </section>

      <Cta
        title="Your sport, our specialists."
        body="Tell us which sector you work in and we will bring the right people to the first conversation."
      />
    </main>
  )
}
