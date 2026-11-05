"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ReactLenis, useLenis, type LenisRef } from "lenis/react"
import type Lenis from "lenis"

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

  if (!enabled) {
    return (
      <>
        <React.Suspense fallback={null}>
          <ScrollToTop />
        </React.Suspense>
        {children}
      </>
    )
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, anchors: { offset: -96 } }}
    >
      <React.Suspense fallback={null}>
        <LenisScrollToTop />
      </React.Suspense>
      {children}
    </ReactLenis>
  )
}

function LenisScrollToTop() {
  const lenis = useLenis(ScrollTrigger.update)
  return <ScrollToTop lenis={lenis} />
}

// Every forward navigation opens at the top of the page, or at its #anchor
// (e.g. /who-we-serve#federations): a new path always, and a new query only
// when a link caused it, so in-page filters that rewrite the query (case
// studies) keep their place. Back/forward is left to Next.js, which returns
// the visitor to where they were. The jump repeats over the next frames so
// nothing left over can drag the page back down: momentum from a scroll or
// swipe still coasting when the link was tapped, or late layout shifts.
function ScrollToTop({ lenis }: { lenis?: Lenis }) {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const lastPath = React.useRef(pathname)
  const linkNavigation = React.useRef(false)
  const historyNavigation = React.useRef(false)
  const mounted = React.useRef(false)
  // Read through a ref so Lenis arriving after mount does not re-run (and
  // cancel) the jump.
  const lenisRef = React.useRef(lenis)
  lenisRef.current = lenis

  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return
      const link = (event.target as Element | null)?.closest?.("a[href]")
      if (
        link instanceof HTMLAnchorElement &&
        link.origin === location.origin &&
        link.target !== "_blank" &&
        link.pathname + link.search !== location.pathname + location.search
      )
        linkNavigation.current = true
    }
    const onPop = () => {
      historyNavigation.current = true
    }
    document.addEventListener("click", onClick, true)
    window.addEventListener("popstate", onPop)
    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("popstate", onPop)
    }
  }, [])

  React.useEffect(() => {
    const newPath = lastPath.current !== pathname
    lastPath.current = pathname
    const fromLink = linkNavigation.current
    const fromHistory = historyNavigation.current
    linkNavigation.current = false
    historyNavigation.current = false
    if (fromHistory && mounted.current) return
    // First render and path changes always qualify; query-only changes need
    // a link behind them.
    if (!newPath && !fromLink && mounted.current) return
    mounted.current = true

    const jump = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = id ? document.getElementById(id) : null
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target ?? 0, {
          immediate: true,
          force: true,
          offset: target ? -96 : 0,
        })
      } else if (target) {
        target.scrollIntoView()
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
    }

    jump()
    let frame = requestAnimationFrame(() => {
      jump()
      frame = requestAnimationFrame(jump)
    })
    const late = window.setTimeout(() => {
      jump()
      ScrollTrigger.refresh()
    }, 150)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(late)
    }
  }, [pathname, search])

  return null
}
