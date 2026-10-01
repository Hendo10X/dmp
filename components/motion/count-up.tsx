"use client"

import * as React from "react"

import { gsap, useGSAP } from "@/lib/gsap"

// Counts the numeric part of a stat ("38%", "2.4×", "40+") up from zero when
// it scrolls into view. Prefix/suffix and decimal places are preserved.
export function CountUp({ value }: { value: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)

  useGSAP(
    () => {
      if (!match || !ref.current) return
      const [, prefix, number, suffix] = match
      const target = parseFloat(number)
      const decimals = number.includes(".") ? number.split(".")[1].length : 0
      const state = { n: 0 }

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const render = () => {
          ref.current!.textContent = `${prefix}${state.n.toFixed(decimals)}${suffix}`
        }
        render()
        gsap.to(state, {
          n: target,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
          onUpdate: render,
        })
      })
    },
    { scope: ref }
  )

  // Server/no-JS render shows the real value.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}
