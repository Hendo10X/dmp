"use client"

import { markets } from "@/lib/content"
import { usePreloaderDone } from "@/lib/preloader-store"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { AfricaGlobe } from "@/components/page/africa-globe"

// Split hero from the Crowdline template on a full-bleed Oxford band (after
// Deloitte's dark hero): copy on the left, the Africa globe with market pills
// on the right.
export function Hero() {
  const ready = usePreloaderDone()

  return (
    <section className="relative z-10 overflow-hidden bg-oxford text-white">
      <div className="mx-auto flex min-h-svh max-w-6xl items-center px-6 pt-14">
        <div className="flex w-full flex-col md:flex-row md:items-center md:gap-8 lg:gap-12">
          <div className="relative z-10 flex flex-col pt-16 pb-4 text-center md:w-[52%] md:py-0 md:text-left lg:w-[50%]">
            <SplitReveal
              as="h1"
              mode="manual"
              play={ready}
              className="mb-6 text-[clamp(2.5rem,4.8vw,4rem)] leading-[1.05]"
            >
              Demonstrating <span className="text-lime">possibilities.</span>
            </SplitReveal>

            <Reveal y={12}>
              <p className="mx-auto mb-10 max-w-sm text-sm leading-relaxed text-white/70 md:mx-0 md:max-w-md md:text-base">
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
                tone="lime"
                className="w-full justify-center sm:w-auto"
              >
                Our services
              </ArrowLink>
              <ArrowLink
                href="/solutions"
                tone="outline"
                className="w-full justify-center sm:w-auto"
              >
                Our solutions
              </ArrowLink>
            </Reveal>
          </div>

          <div className="flex flex-1 items-center justify-center py-8 md:py-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-none">
              {/* Soft electric halo behind the globe. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 scale-75 rounded-full bg-electric opacity-20 blur-3xl"
              />
              <AfricaGlobe markets={markets} tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
