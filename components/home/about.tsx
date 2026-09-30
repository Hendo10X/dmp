"use client"

import * as React from "react"
import Image from "next/image"

import { gsap, useGSAP } from "@/lib/gsap"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/home/eyebrow"

// "Who we are" from docs/brief.md, laid out as photo + stat badge + copy.
// Copy is placeholder until the client supplies it.
export function About() {
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
      className="relative z-10 bg-background px-4 py-24 md:px-7 md:py-36"
    >
      <div className="grid items-center gap-14 md:grid-cols-12 md:gap-6">
        <div
          ref={frame}
          className="relative [clip-path:inset(0%_0%_0%_0%)] md:col-span-6"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-oxford md:aspect-[5/6]">
            <div ref={photo} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src="/Images/pexels-franco-monsalvo-252430633-38675822.jpg"
                alt="A coach walking alongside an athlete at a training ground"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[center_40%]"
              />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute top-0 left-0 size-12 bg-lime md:size-16"
          />
          <div className="absolute top-12 left-12 flex items-center gap-4 bg-oxford px-5 py-4 text-white md:top-16 md:left-16 md:px-6 md:py-5">
            <span className="font-display text-5xl leading-none md:text-6xl">
              7
            </span>
            <span className="text-sm leading-tight">
              Client groups
              <br />
              we serve
            </span>
          </div>
        </div>

        <Reveal className="md:col-span-5 md:col-start-8">
          <Eyebrow className="text-oxford/70">About DMP</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[0.95] tracking-[0.01em] text-oxford">
            Talent wins games.{" "}
            <span className="text-oxford/45">Systems win decades.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground md:text-lg">
            DMP is a consultancy working where sport, business and technology
            meet. We help federations, public institutions, investors and brands
            build the strategy, data and digital capability that turn ambition
            into measurable performance. Independent in our thinking, practical
            in our delivery.
          </p>
          <ArrowLink href="/about" tone="muted" className="mt-10">
            Learn about us
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
