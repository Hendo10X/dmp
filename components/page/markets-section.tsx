"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { markets } from "@/lib/content"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { AfricaGlobe } from "@/components/page/africa-globe"

// "Across the continent": an interactive midnight globe centred on Africa,
// sized up and sitting close to the list of markets. Hovering or focusing a
// market swings the globe to it.
export function MarketsSection({
  title = "Built in Nigeria. Working across Africa.",
  intro = "Our home is Nigeria. Our view is continental: the opportunities in sports and their adjacent markets do not stop at borders. Drag the globe, or pick a market.",
}: {
  title?: string
  intro?: string
}) {
  const [active, setActive] = React.useState<number | null>(null)

  return (
    <section className="relative z-10 mx-auto max-w-[120rem] overflow-hidden bg-background px-6 py-16 md:py-20 lg:px-10">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-5">
          <Reveal y={16}>
            <Eyebrow className="text-midnight/70">Across the continent</Eyebrow>
          </Reveal>
          <SplitReveal className="mt-6 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
            {title}
          </SplitReveal>
          <SplitReveal
            as="p"
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {intro}
          </SplitReveal>

          <Reveal className="mt-10">
            <ul
              className="grid grid-cols-2 gap-1"
              onMouseLeave={() => setActive(null)}
            >
              {markets.map((market, index) => (
                <li key={market.city}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                    onClick={() =>
                      setActive((current) => (current === index ? null : index))
                    }
                    aria-pressed={active === index}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-electric",
                      active === index
                        ? "bg-midnight text-white"
                        : "bg-secondary text-midnight"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-2 shrink-0",
                        market.home ? "bg-mint" : "bg-electric"
                      )}
                    />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold">
                        {market.city}
                      </span>
                      <span
                        className={cn(
                          "truncate text-xs",
                          active === index
                            ? "text-white/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {market.country}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="md:col-span-7">
          <AfricaGlobe
            markets={markets}
            focus={active === null ? null : markets[active].location}
            tone="dark"
            className="mx-auto max-w-[52rem] md:-my-8 md:mr-0 md:ml-[-4%]"
          />
        </Reveal>
      </div>
    </section>
  )
}
