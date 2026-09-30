"use client"

import * as React from "react"
import Link from "next/link"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"
import { Shape } from "@/components/ui/shape"
import { audiences } from "@/lib/content"
import { SectionHeader } from "@/components/page/section-header"

// Cards cycle through the accents; every accent reads on Oxford.
const accents = [
  "group-hover:text-lime group-focus-visible:text-lime",
  "group-hover:text-electric group-focus-visible:text-electric",
  "group-hover:text-crimson group-focus-visible:text-crimson",
]

export function Audiences() {
  const section = React.useRef<HTMLElement>(null)
  const viewport = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      // Desktop: pin the section and turn vertical scroll into sideways travel.
      gsap
        .matchMedia()
        .add(
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          () => {
            const distance = () =>
              track.current!.scrollWidth - viewport.current!.clientWidth

            gsap.to(track.current, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section.current,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
          }
        )
    },
    { scope: section }
  )

  return (
    <section
      ref={section}
      className="relative z-10 flex flex-col justify-center gap-12 overflow-hidden bg-background py-24 md:h-svh md:gap-16 md:py-0"
    >
      <SectionHeader
        className="px-4 md:px-7"
        eyebrow="Who we serve"
        title="Built for everyone who runs sport."
        intro="Seven kinds of organisation, one shared goal: a sports economy that is better governed, better funded and better measured."
      />

      <div
        ref={viewport}
        className="snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto px-4 md:snap-none md:overflow-visible md:px-7"
      >
        <ul ref={track} className="flex w-max gap-2 will-change-transform">
          {audiences.map((audience, index) => (
            <li key={audience.slug} className="snap-start">
              <Link
                href={`/who-we-serve#${audience.slug}`}
                className="group relative flex h-[24rem] w-[80vw] flex-col justify-between overflow-hidden bg-oxford p-6 text-white outline-none focus-visible:ring-2 focus-visible:ring-electric sm:w-[22rem] md:h-[28rem] md:w-[26rem] md:p-7"
              >
                <span className="font-heading text-sm text-white/60">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(audiences.length).padStart(2, "0")}
                </span>

                {/* Oversized mark in the corner: a faint white ghost at rest,
                    full accent colour on hover (all accents read on Oxford). */}
                <Shape
                  name={audience.shape}
                  className={cn(
                    "absolute -right-12 -bottom-12 size-40 text-white/[0.08] transition-[color,rotate,scale] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110 group-hover:rotate-45",
                    accents[index % accents.length]
                  )}
                />

                <span className="relative flex flex-col gap-4">
                  <span className="font-heading text-[2.25rem] leading-[0.95]">
                    {audience.title}
                  </span>
                  <span className="max-w-[18rem] text-sm leading-relaxed text-white/70">
                    {audience.body}
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase">
                    How we help
                    <Arrow
                      size={16}
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
