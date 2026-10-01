"use client"

import * as React from "react"
import Image from "next/image"

import { gsap, useGSAP } from "@/lib/gsap"
import { images } from "@/lib/content"

// Pinned scene: a small photo between two words grows until it fills the
// screen, then a caption settles over it.
export function ZoomReveal() {
  const section = React.useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean }
          const start = desktop
            ? "inset(22% 35% 22% 35%)"
            : "inset(30% 18% 30% 18%)"

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section.current,
                start: "top top",
                end: "+=180%",
                scrub: true,
                pin: true,
              },
            })
            .fromTo(
              "[data-zoom-frame]",
              { clipPath: start },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
              0
            )
            .fromTo(
              "[data-zoom-image]",
              { scale: 1.35 },
              { scale: 1, duration: 1 },
              0
            )
            .to(
              "[data-zoom-word='left']",
              desktop
                ? { xPercent: -60, autoAlpha: 0, duration: 0.6 }
                : { yPercent: -120, autoAlpha: 0, duration: 0.6 },
              0
            )
            .to(
              "[data-zoom-word='right']",
              desktop
                ? { xPercent: 60, autoAlpha: 0, duration: 0.6 }
                : { yPercent: 120, autoAlpha: 0, duration: 0.6 },
              0
            )
            .to("[data-zoom-label]", { autoAlpha: 0, duration: 0.3 }, 0)
            .fromTo(
              "[data-zoom-shade]",
              { opacity: 0 },
              { opacity: 1, duration: 0.3 },
              0.75
            )
            .fromTo(
              "[data-zoom-caption]",
              { y: 40, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.3 },
              0.8
            )
            .to({}, { duration: 0.25 })
        }
      )

      // Reduced motion: skip the zoom and show the finished frame.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-zoom-frame]", { clipPath: "inset(0% 0% 0% 0%)" })
        gsap.set("[data-zoom-word], [data-zoom-label]", { autoAlpha: 0 })
        gsap.set("[data-zoom-shade]", { opacity: 1 })
        gsap.set("[data-zoom-caption]", { autoAlpha: 1 })
      })
    },
    { scope: section }
  )

  return (
    <section
      ref={section}
      className="relative z-10 h-svh overflow-hidden bg-background"
    >
      <p
        data-zoom-label
        className="absolute inset-x-0 top-[10%] hidden text-center text-[0.7rem] tracking-[0.18em] text-foreground uppercase md:block"
      >
        On the field
      </p>
      <p
        data-zoom-label
        className="absolute inset-x-0 bottom-[10%] hidden text-center text-[0.7rem] tracking-[0.18em] text-foreground uppercase md:block"
      >
        On the balance sheet
      </p>

      <div
        data-zoom-frame
        className="absolute inset-0 [clip-path:inset(22%_35%_22%_35%)] max-md:[clip-path:inset(30%_18%_30%_18%)]"
      >
        <div data-zoom-image className="absolute inset-0">
          <Image
            src={images.engineers}
            alt="A team of engineers in hard hats reviewing construction plans"
            fill
            sizes="(min-width: 768px) 100vw, 300vw"
            className="object-cover"
          />
        </div>
        <div
          data-zoom-shade
          className="absolute inset-0 bg-linear-to-t from-oxford/85 via-oxford/30 to-transparent opacity-0"
        />
        <div
          data-zoom-caption
          className="invisible absolute inset-x-0 bottom-0 grid gap-6 px-4 pb-12 text-white md:grid-cols-12 md:px-7 md:pb-16"
        >
          <h2 className="text-[clamp(2.25rem,5vw,5rem)] leading-[1.02] tracking-[0.01em] md:col-span-7">
            Every decision, measured.
          </h2>
          <p className="max-w-md self-end text-base leading-relaxed text-white/85 md:col-span-4 md:col-start-9 md:text-lg">
            We bring the discipline of performance analysis to the boardroom, so
            strategy is tested against evidence before it reaches the pitch.
          </p>
        </div>
      </div>

      {/* Words sit either side on desktop, above and below on mobile. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-[16%] md:flex-row md:px-[7%] md:py-0">
        <span
          data-zoom-word="left"
          className="font-display text-[clamp(2.25rem,5.5vw,5.5rem)] leading-none tracking-[0.01em] text-oxford"
        >
          Sport
        </span>
        <span
          data-zoom-word="right"
          className="font-display text-[clamp(2.25rem,5.5vw,5.5rem)] leading-none tracking-[0.01em] text-oxford"
        >
          Markets
        </span>
      </div>
    </section>
  )
}
