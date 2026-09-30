"use client"

import * as React from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/home/eyebrow"

// "How we work" from the Services hub in docs/brief.md, previewed on Home.
const steps = [
  {
    title: "Diagnose",
    body: "We start with evidence: data, stakeholders and the market, so the real problem is on the table.",
  },
  {
    title: "Design",
    body: "Options are modelled and stress-tested, then shaped into a plan the people involved can own.",
  },
  {
    title: "Deliver",
    body: "We work alongside your team to build, launch and embed the change, not hand over a slide deck.",
  },
  {
    title: "Measure",
    body: "Every engagement ends in numbers: what moved, by how much, and what comes next.",
  },
]

export function Process() {
  const section = React.useRef<HTMLElement>(null)
  const fill = React.useRef<HTMLDivElement>(null)
  const [reached, setReached] = React.useState(0)

  useGSAP(
    () => {
      // The track fills with scroll; each step lights up as the fill reaches it.
      gsap.fromTo(
        fill.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-steps]",
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
            onUpdate: (self) =>
              setReached(
                Math.floor(self.progress * (steps.length - 1) + 0.05) + 1
              ),
          },
        }
      )
    },
    { scope: section }
  )

  return (
    <section
      ref={section}
      className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36"
    >
      <Reveal className="grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
        <div className="md:col-span-7">
          <Eyebrow className="text-oxford/70">How we work</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[0.95] tracking-[0.01em] text-oxford">
            From question to result, in four moves.
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-lg">
          The same disciplined sequence on every engagement, whether it is a
          ten-week review or a five-year programme.
        </p>
      </Reveal>

      <div data-steps className="mt-16 md:mt-24">
        {/* Progress track: the fill is the only moving part. */}
        <div aria-hidden className="relative hidden h-1 bg-secondary md:block">
          <div
            ref={fill}
            className="absolute inset-0 origin-left bg-oxford"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <ol className="grid gap-12 md:mt-10 md:grid-cols-4 md:gap-6">
          {steps.map((step, index) => {
            const lit = index < reached
            return (
              <li key={step.title} className="flex flex-col gap-5">
                <span
                  className={cn(
                    "font-heading text-[clamp(4.5rem,8vw,8rem)] leading-[0.8] transition-colors duration-700",
                    lit ? "text-oxford" : "text-oxford/10"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-3xl text-oxford">{step.title}</h3>
                <p className="max-w-xs text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
