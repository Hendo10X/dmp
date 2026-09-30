"use client"

import * as React from "react"
import { useLenis } from "lenis/react"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import {
  collapseAnimation,
  progressAnimation,
  reelAnimation,
} from "@/components/preloader/animations"
import { BRAND_WORD, brandIndex, words } from "@/components/preloader/words"

// Adapted from danielhult/ultra-agency's Loader: a word reel seen through a
// slit, a progress bar with a riding counter, then a clip-path collapse.
export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = React.useState(false)
  const lenis = useLenis()

  const root = React.useRef<HTMLDivElement>(null)
  const panel = React.useRef<HTMLDivElement>(null)
  const reel = React.useRef<HTMLDivElement>(null)
  const brand = React.useRef<HTMLSpanElement>(null)
  const bar = React.useRef<HTMLDivElement>(null)
  const counter = React.useRef<HTMLSpanElement>(null)

  // Hold the page still while loading.
  React.useEffect(() => {
    if (done) {
      lenis?.start()
      document.documentElement.style.removeProperty("overflow")
      return
    }
    lenis?.stop()
    document.documentElement.style.overflow = "hidden"
  }, [done, lenis])

  useGSAP(
    () => {
      const finish = () => {
        setDone(true)
        onComplete?.()
      }

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ onComplete: finish })
          .add(reelAnimation(reel.current!, brand.current!))
          .add(progressAnimation(bar.current!, counter.current!), 0)
          .add(collapseAnimation(panel.current!, bar.current!), "-=1")
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        counter.current!.textContent = "100"
        gsap.set(bar.current, { scaleX: 1 })
        gsap.set(counter.current, { x: "100vw", xPercent: -100, yPercent: -50 })
        gsap.set(reel.current, {
          y: () =>
            -(
              brand.current!.offsetTop +
              brand.current!.offsetHeight / 2 -
              reel.current!.parentElement!.clientHeight / 2
            ),
        })
        gsap.to(root.current, {
          autoAlpha: 0,
          delay: 0.6,
          duration: 0.4,
          onComplete: finish,
        })
      })
    },
    { scope: root }
  )

  if (done) return null

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading DMP"
      className="fixed inset-0 z-100 overflow-hidden"
    >
      <div
        ref={panel}
        className="flex size-full flex-col items-center justify-center overflow-hidden bg-oxford text-white [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]"
      >
        <div
          aria-hidden
          className="relative h-[clamp(16rem,24vw,28rem)] overflow-hidden [--word:clamp(1.5rem,1.85vw,2.25rem)]"
        >
          {/* Dims everything except a one-line slit through the centre. */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--oxford)_90%,transparent)_calc(50%-var(--word)*0.6),transparent_calc(50%-var(--word)*0.6),transparent_calc(50%+var(--word)*0.6),color-mix(in_oklab,var(--oxford)_90%,transparent)_calc(50%+var(--word)*0.6))]" />
          <div ref={reel} className="text-center will-change-transform">
            {words.map((word, index) => {
              const isBrand = index === brandIndex
              return (
                <span
                  key={index}
                  ref={isBrand ? brand : undefined}
                  className={cn(
                    "block text-(length:--word) leading-[1.2] tracking-tight",
                    isBrand && "text-electric"
                  )}
                >
                  {isBrand ? BRAND_WORD : word}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-[5vh]">
        <div
          ref={bar}
          className="size-full origin-left bg-lime"
          style={{ transform: "scaleX(0)" }}
        />
        <span
          ref={counter}
          aria-hidden
          // Anchored by its right edge to the bar's leading edge; GSAP owns
          // the transform from mount (see progressAnimation).
          style={{ transform: "translate(-100%, -50%)" }}
          className="absolute top-1/2 left-0 pr-4 font-display text-[clamp(1.25rem,1.85vw,2.25rem)] leading-none whitespace-nowrap text-oxford tabular-nums"
        >
          0
        </span>
      </div>
    </div>
  )
}
