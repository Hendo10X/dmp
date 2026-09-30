"use client"

import * as React from "react"
import Image from "next/image"

import { gsap, useGSAP } from "@/lib/gsap"
import { usePreloaderDone } from "@/lib/preloader-store"
import { ArrowLink } from "@/components/ui/arrow-link"

export function Hero() {
  const ready = usePreloaderDone()
  const section = React.useRef<HTMLElement>(null)
  const media = React.useRef<HTMLDivElement>(null)
  const shade = React.useRef<HTMLDivElement>(null)
  const content = React.useRef<HTMLDivElement>(null)
  const entrance = React.useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Entrance, held until the preloader hands over. Everything in the
        // copy block moves as one — no stagger.
        entrance.current = gsap
          .timeline({ paused: true })
          .fromTo(
            "[data-hero-image]",
            { scale: 1.15 },
            { scale: 1, duration: 2.2, ease: "expo.out" }
          )
          .fromTo(
            "[data-hero-copy]",
            { y: 48, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.4, ease: "expo.out" },
            0.1
          )

        // Parallax: the photo drifts at a fraction of scroll speed and dims
        // while the next section slides up over it.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(media.current, { yPercent: 30, ease: "none" }, 0)
          .to(content.current, { yPercent: -40, ease: "none" }, 0)
          .to(shade.current, { opacity: 0.7, ease: "none" }, 0)
      })
    },
    { scope: section }
  )

  React.useEffect(() => {
    if (ready) entrance.current?.play()
  }, [ready])

  return (
    <section
      ref={section}
      className="relative h-svh min-h-[36rem] overflow-hidden bg-oxford text-white"
    >
      <div ref={media} className="absolute inset-0 will-change-transform">
        <div data-hero-image className="absolute inset-0">
          <Image
            src="/Images/homepage.jpg"
            alt="A DMP consultant in conversation with an athlete on an indoor court"
            fill
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            className="object-cover object-[72%_center] md:object-center"
          />
        </div>
        {/* Oxford tint, deepening toward the copy for legibility. */}
        <div className="absolute inset-0 bg-oxford/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-oxford/90 via-oxford/30 to-oxford/10" />
      </div>
      <div ref={shade} className="absolute inset-0 bg-oxford opacity-0" />

      <div
        ref={content}
        className="relative flex h-full items-end px-4 pb-10 md:px-7 md:pb-14"
      >
        <div
          data-hero-copy
          className="grid w-full gap-8 md:grid-cols-12 md:items-end md:gap-6"
        >
          <div className="md:col-span-8">
            <h1 className="text-[clamp(2.25rem,5.4vw,5.75rem)] leading-[1.02] tracking-tight">
              Strategy for the business of sport.
            </h1>
          </div>
          <div className="flex flex-col items-start gap-7 md:col-span-4">
            <p className="max-w-md text-base leading-relaxed text-white/85 md:text-lg">
              DMP works with federations, institutions, investors and brands to
              turn data, technology and sharp strategy into performance — on the
              field and on the balance sheet.
            </p>
            <ArrowLink href="/services">Explore our services</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  )
}
