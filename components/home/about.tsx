"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { gsap, useGSAP } from "@/lib/gsap"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Shape } from "@/components/ui/shape"
import { audiences, images } from "@/lib/content"

// "Who we are" from docs/brief.md: photo card beside the copy and the "who we
// serve" pills (client brief: About handles both). The photo stretches to
// the copy's height. Copy is placeholder until the client supplies it.
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
      className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-16 md:py-20 lg:px-10"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-stretch md:gap-6">
        <div
          ref={frame}
          className="relative [clip-path:inset(0%_0%_0%_0%)] md:col-span-6"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-midnight md:aspect-auto md:h-full">
            <div ref={photo} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src={images.site}
                alt="Two architects in hard hats reviewing blueprints on a building site"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[62%_40%]"
              />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute top-4 left-4 size-10 rounded-full bg-mint md:size-12"
          />
          <p className="absolute top-10 left-10 rounded-xl bg-midnight px-5 py-4 font-heading text-lg leading-tight text-white md:top-12 md:left-12 md:px-6 md:py-5 md:text-xl">
            Client Groups
            <br />
            We Serve
          </p>
        </div>

        <div className="flex flex-col md:col-span-6 md:pl-6 lg:pl-10">
          <Reveal y={16}>
            <Eyebrow className="text-midnight/70">About DMPartners</Eyebrow>
          </Reveal>
          <SplitReveal className="mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
            Not aspiration.{" "}
            <span className="text-midnight/45">
              Possibilities within reach.
            </span>
          </SplitReveal>
          <SplitReveal
            as="p"
            className="mt-5 max-w-xl text-base leading-relaxed text-foreground"
          >
            DMPartners is a commercial and investment advisory practice working
            where the sports industry meets adjacent markets. We exist to show
            what is achievable in Nigeria and across the continent, with work
            aimed squarely at industrial development and opportunities that are
            already within reach.
          </SplitReveal>

          <Reveal y={16} className="mt-8">
            <Eyebrow className="text-midnight/70">Who we serve</Eyebrow>
            <ul className="mt-4 flex flex-wrap gap-2">
              {audiences.map((audience) => (
                <li key={audience.slug}>
                  <Link
                    href={`/who-we-serve#${audience.slug}`}
                    className="group inline-flex items-center gap-2 rounded-pill border border-border px-4 py-2 text-sm text-midnight transition-colors duration-300 hover:border-midnight hover:bg-midnight hover:text-white"
                  >
                    {audience.title}
                    <Shape
                      name={audience.shape}
                      className="size-2.5 text-mint opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={16} className="mt-8 md:mt-auto md:pt-8">
            <ArrowLink href="/about">Learn about us</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
