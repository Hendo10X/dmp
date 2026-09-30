"use client"

import * as React from "react"
import Link from "next/link"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"
import { Eyebrow } from "@/components/home/eyebrow"
import { Shape, type ShapeName } from "@/components/home/shape"

// "Who We Serve" groups from docs/brief.md. One-line value props are
// placeholder copy.
const audiences: {
  title: string
  body: string
  slug: string
  shape: ShapeName
  accent: string
}[] = [
  {
    title: "Federations & NGBs",
    body: "Governance, strategy and performance systems for national governing bodies.",
    slug: "federations",
    shape: "circle",
    accent: "group-hover:text-lime group-focus-visible:text-lime",
  },
  {
    title: "Ministries, Departments & Agencies",
    body: "Policy, programme design and evaluation for public investment in sport.",
    slug: "mdas",
    shape: "square",
    accent: "group-hover:text-electric group-focus-visible:text-electric",
  },
  {
    title: "Corporates",
    body: "Sponsorship strategy, activation and measurable return from sport partnerships.",
    slug: "corporates",
    shape: "triangle",
    accent: "group-hover:text-crimson group-focus-visible:text-crimson",
  },
  {
    title: "Investors & Financial Institutions",
    body: "Due diligence, valuation and market insight for capital entering sport.",
    slug: "investors",
    shape: "quarter",
    accent: "group-hover:text-lime group-focus-visible:text-lime",
  },
  {
    title: "Academic & Research Institutions",
    body: "Research partnerships, data and applied studies with real-world reach.",
    slug: "academia",
    shape: "circle",
    accent: "group-hover:text-electric group-focus-visible:text-electric",
  },
  {
    title: "SMEs & Intermediaries",
    body: "Growth strategy and market access for businesses serving the sports economy.",
    slug: "smes",
    shape: "square",
    accent: "group-hover:text-crimson group-focus-visible:text-crimson",
  },
  {
    title: "Professional Associations",
    body: "Standards, member value and professional development for bodies in sport.",
    slug: "associations",
    shape: "triangle",
    accent: "group-hover:text-lime group-focus-visible:text-lime",
  },
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
      <div className="grid gap-8 px-4 md:grid-cols-12 md:items-end md:gap-6 md:px-7">
        <div className="md:col-span-7">
          <Eyebrow className="text-oxford/70">Who we serve</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[0.95] tracking-[0.01em] text-oxford">
            Built for everyone who runs sport.
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-lg">
          Seven kinds of organisation, one shared goal: a sports economy that is
          better governed, better funded and better measured.
        </p>
      </div>

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
                    audience.accent
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
