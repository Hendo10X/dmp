"use client"

import * as React from "react"
import Image from "next/image"

import { gsap, useGSAP } from "@/lib/gsap"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Emphasis } from "@/components/ui/emphasis"
import { IndustryMarquee } from "@/components/home/industry-marquee"
import type { HomeContent } from "@/lib/site-content"

// "Who we are" from docs/brief.md: photo card beside the copy and the ticker of
// industries we serve (client list). The photo stretches to
// the copy's height. Copy comes from Sanity's Home page.
export function About({
  content,
  industries,
}: {
  content: HomeContent["about"]
  industries: string[]
}) {
  const section = React.useRef<HTMLElement>(null)
  const frame = React.useRef<HTMLDivElement>(null)
  const photo = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        // Photo and badge unmask upward together.
        gsap.from(frame.current, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: frame.current,
            start: "top 80%",
            once: true,
          },
        })
        // Photo drifts inside its frame while the section scrolls past.
        gsap.fromTo(
          photo.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })
    },
    { scope: section }
  )

  return (
    <section
      ref={section}
      className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pt-6 pb-10 md:pt-8 md:pb-12 lg:px-10"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-stretch md:gap-6">
        <div
          ref={frame}
          className="relative [clip-path:inset(0%_0%_0%_0%)] md:col-span-6"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-midnight md:aspect-auto md:h-full">
            <div ref={photo} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[62%_40%]"
              />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute top-4 left-4 size-10 rounded-full bg-midnight md:size-12"
          />
          <p className="absolute top-10 left-10 rounded-xl bg-midnight px-5 py-4 font-heading text-lg leading-tight text-white md:top-12 md:left-12 md:px-6 md:py-5 md:text-xl">
            {content.badge.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="flex min-w-0 flex-col md:col-span-6 md:pl-6 lg:pl-10">
          <Reveal y={16}>
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </Reveal>
          {/* *Wrapped words* take the softer colour here, not italic. */}
          <SplitReveal className="mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
            <Emphasis
              text={content.title}
              className="text-midnight/70"
              italic={false}
            />
          </SplitReveal>
          <SplitReveal
            as="p"
            className="mt-5 max-w-xl text-base leading-relaxed text-foreground"
          >
            {content.body}
          </SplitReveal>

          <Reveal y={16} className="mt-8">
            <Eyebrow>{content.industriesLabel}</Eyebrow>
            <IndustryMarquee industries={industries} className="mt-4" />
          </Reveal>

          <Reveal y={16} className="mt-8 md:mt-auto md:pt-8">
            <ArrowLink href="/about">Learn about us</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
