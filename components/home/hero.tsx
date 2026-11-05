"use client"

import { markets } from "@/lib/content"
import { usePreloaderDone } from "@/lib/preloader-store"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { AfricaGlobe } from "@/components/page/africa-globe"
import { WordSwap } from "@/components/home/word-swap"
import { Emphasis } from "@/components/ui/emphasis"
import type { HomeContent } from "@/lib/site-content"

// Split hero on a full-bleed midnight band: copy on the left, a large Africa
// globe with market pills on the right. "possibilities." and the buttons use
// the logo colours (client brief). The second line cycles through `words`
// (the first is the tagline); copy comes from Sanity's Home page.
export function Hero({ content }: { content: HomeContent["hero"] }) {
  const ready = usePreloaderDone()
  const { lead, words, intro } = content

  return (
    <section className="relative z-10 overflow-hidden bg-midnight text-white">
      <div className="mx-auto flex min-h-svh max-w-[120rem] items-center px-6 pt-14 lg:px-10">
        <div className="flex w-full flex-col md:flex-row md:items-center md:gap-6">
          <div className="relative z-10 flex flex-col pt-16 pb-4 text-center md:w-[50%] md:py-0 md:text-left">
            <h1
              aria-label={[lead, words[0]].filter(Boolean).join(" ")}
              className="mb-6 text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[1]"
            >
              <SplitReveal
                as="span"
                mode="manual"
                play={ready}
                className="block"
              >
                {lead}
              </SplitReveal>
              <WordSwap words={words} play={ready} className="text-mint" />
            </h1>

            <Reveal y={12}>
              {/* *Wrapped words* stand out in white here, not italic. */}
              <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/70 md:mx-0 md:text-lg">
                <Emphasis text={intro} className="text-white" italic={false} />
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
