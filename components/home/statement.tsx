"use client"

import * as React from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"

// PwC-style positioning statement. The text fills from grey to Oxford as it
// scrolls through the viewport: one gradient sweep on the whole block (no
// per-word stagger), via background-clip: text.
export function Statement() {
  const text = React.useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        text.current,
        { backgroundPositionY: "100%" },
        {
          backgroundPositionY: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: text.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      )
    })
  })

  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <Reveal y={16} className="md:col-span-3">
          <Eyebrow className="text-oxford/70">Who we are</Eyebrow>
        </Reveal>
        <div className="flex flex-col items-start gap-12 md:col-span-9">
          <p
            ref={text}
            className="bg-[linear-gradient(to_bottom,var(--oxford)_50%,color-mix(in_oklab,var(--oxford)_18%,transparent)_50%)] bg-size-[100%_200%] bg-clip-text bg-top text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.15] tracking-tight text-transparent motion-reduce:bg-top"
          >
            We help federations, investors, governments and brands turn sport
            into an industry. Strategy, transformation, transactions, policy,
            research and sustainability, all aimed at one thing: showing what is
            possible in Nigeria and across Africa, and making it happen.
          </p>
          <Reveal y={16}>
            <ArrowLink href="/about" tone="muted">
              About DMPartners
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
