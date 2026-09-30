"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
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
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, anchors: { offset: -96 } }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}

function ScrollTriggerSync() {
  const lenis = useLenis(ScrollTrigger.update)
  const pathname = usePathname()

  // New page: start at the top and let ScrollTrigger re-measure once the
  // new sections have laid out.
  React.useEffect(() => {
    // Honour #anchors (e.g. /who-we-serve#federations), else go to the top.
    const target = window.location.hash
      ? document.querySelector(window.location.hash)
      : null
    lenis?.scrollTo(target instanceof HTMLElement ? target : 0, {
      immediate: true,
      force: true,
      offset: target ? -96 : 0,
    })
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => window.clearTimeout(id)
  }, [pathname, lenis])

  return null
}
