"use client"

import * as React from "react"
import { ReactLenis, useLenis, type LenisRef } from "lenis/react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

// Lenis drives scrolling; GSAP's ticker drives Lenis so ScrollTrigger and
// smooth scroll share one frame loop. Skipped entirely for reduced motion.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<LenisRef>(null)
  const [enabled, setEnabled] = React.useState(true)

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setEnabled(!query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  React.useEffect(() => {
    if (!enabled) return
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [enabled])

  if (!enabled) return children

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1 }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}

function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update)
  return null
}
