"use client"

import { markets } from "@/lib/content"
import { usePreloaderDone } from "@/lib/preloader-store"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { AfricaGlobe } from "@/components/page/africa-globe"
import { WordSwap } from "@/components/home/word-swap"

// The headline's second line cycles through these (first one is the tagline).
const swapWords = [
  "possibilities.",
  "investment.",
  "growth.",
  "partnerships.",
  "opportunity.",
]

// Split hero on a full-bleed midnight band: copy on the left, a large Africa
// globe with market pills on the right. "possibilities." and the buttons use
// the logo colours (client brief).
export function Hero() {
  const ready = usePreloaderDone()

  return (
    <section className="relative z-10 overflow-hidden bg-midnight text-white">
      <div className="mx-auto flex min-h-svh max-w-[120rem] items-center px-6 pt-14 lg:px-10">
        <div className="flex w-full flex-col md:flex-row md:items-center md:gap-6">
          <div className="relative z-10 flex flex-col pt-16 pb-4 text-center md:w-[50%] md:py-0 md:text-left">
            <h1
              aria-label="Demonstrating possibilities."
              className="mb-6 text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[1]"
            >
              <SplitReveal
                as="span"
                mode="manual"
                play={ready}
                className="block"
              >
                Demonstrating
              </SplitReveal>
              <WordSwap words={swapWords} play={ready} className="text-mint" />
            </h1>

            <Reveal y={12}>
              <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/70 md:mx-0 md:text-lg">
                Commercial and investment advisory where the{" "}
                <span className="text-white">
                  sports industry meets adjacent markets
                </span>
                , across Nigeria and the wider African continent.
              </p>
            </Reveal>

            <Reveal
              y={12}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start"
            >
              <ArrowLink
                href="/services"
                tone="brand"
                className="h-12 w-full justify-center px-7 sm:w-auto"
              >
                Our services
              </ArrowLink>
              <ArrowLink
                href="/solutions"
                tone="mint"
                className="h-12 w-full justify-center px-7 sm:w-auto"
              >
                Our solutions
              </ArrowLink>
            </Reveal>
          </div>

          <div className="flex flex-1 items-center justify-center py-8 md:py-0">
            <div className="relative w-full max-w-[400px] sm:max-w-[520px] md:max-w-none">
              {/* Soft logo-blue halo behind the globe. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 scale-75 rounded-full bg-brand opacity-30 blur-3xl"
              />
              <AfricaGlobe markets={markets} tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
