"use client"

import * as React from "react"

import { gsap, SplitText, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

type Tag = "h1" | "h2" | "h3" | "p" | "blockquote" | "span" | "div"

// Masked line reveal: SplitText cuts the text into lines, each line rises
// out of its own mask. All lines move together (no stagger, per the design
// rules). Re-splits on resize and font load via autoSplit.
//
// mode "scroll": plays once when the text scrolls into view.
// mode "manual": holds until `play` turns true (e.g. after the preloader).
export function SplitReveal({
  as: Component = "h2",
  children,
  className,
  mode = "scroll",
  play = true,
  delay = 0,
}: {
  as?: Tag
  children: React.ReactNode
  className?: string
  mode?: "scroll" | "manual"
  play?: boolean
  delay?: number
}) {
  const ref = React.useRef<HTMLElement>(null)
  const tween = React.useRef<gsap.core.Tween | null>(null)
  const played = React.useRef(false)

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) => {
            // After a re-split (resize/font swap), don't replay what the
            // visitor has already seen.
            if (played.current) return
            tween.current = gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.4,
              delay,
              ease: "expo.out",
              paused: mode === "manual",
              onStart: () => {
                played.current = true
              },
              scrollTrigger:
                mode === "scroll"
                  ? { trigger: ref.current, start: "top 90%", once: true }
                  : undefined,
            })
            return tween.current
          },
        })
        return () => split.revert()
      })
    },
    { scope: ref }
  )

  React.useEffect(() => {
    if (mode === "manual" && play) tween.current?.play()
  }, [mode, play])

  return React.createElement(
    Component,
    { ref, className: cn(className) },
    children
  )
}
