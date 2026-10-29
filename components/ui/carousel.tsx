"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"

// Horizontal card slider: native scroll with snap points (touch swipe and
// trackpads work as-is), mouse drag on desktop, arrow buttons that disable at
// either end, and a mint progress bar. `children` are the slides; size them
// with `slideClassName`.
export function Carousel({
  children,
  label,
  className,
  slideClassName = "w-[85%] sm:w-[60%] lg:w-[40%]",
  tone = "light",
}: {
  children: React.ReactNode
  label: string
  className?: string
  slideClassName?: string
  tone?: "light" | "dark"
}) {
  const track = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState({
    start: true,
    end: false,
    progress: 0,
  })
  const drag = React.useRef<{ x: number; left: number; moved: boolean } | null>(
    null
  )

  const measure = React.useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setState({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
      progress: max > 0 ? el.scrollLeft / max : 1,
    })
  }, [])

  React.useEffect(() => {
    measure()
    const el = track.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  // One slide (plus gap) per click.
  const step = (direction: 1 | -1) => {
    const el = track.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({
      left: direction * (first.offsetWidth + gap),
      behavior: "smooth",
    })
  }

  const dark = tone === "dark"
  const button = cn(
    "flex size-11 items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-electric disabled:cursor-not-allowed disabled:opacity-30",
    dark
      ? "bg-white/10 text-white hover:enabled:bg-white hover:enabled:text-midnight"
      : "bg-surface text-midnight hover:enabled:bg-midnight hover:enabled:text-white"
  )

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
    >
      <div
        ref={track}
        onScroll={measure}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1)
          if (event.key === "ArrowLeft") step(-1)
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || !track.current) return
          drag.current = {
            x: event.clientX,
            left: track.current.scrollLeft,
            moved: false,
          }
        }}
        onPointerMove={(event) => {
          const el = track.current
          if (!drag.current || !el) return
          const dx = event.clientX - drag.current.x
          if (Math.abs(dx) > 4) {
            drag.current.moved = true
            el.style.scrollSnapType = "none"
            el.scrollLeft = drag.current.left - dx
          }
        }}
        onPointerUp={() => {
          const el = track.current
          if (el) el.style.scrollSnapType = ""
          // Let the click that ends a drag through only if nothing moved.
          setTimeout(() => (drag.current = null), 0)
        }}
        onPointerLeave={() => {
          if (track.current) track.current.style.scrollSnapType = ""
          drag.current = null
        }}
        onClickCapture={(event) => {
          if (drag.current?.moved) {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
        tabIndex={0}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth outline-none focus-visible:ring-2 focus-visible:ring-electric [&::-webkit-scrollbar]:hidden"
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            className={cn("shrink-0 snap-start", slideClassName)}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div
          aria-hidden
          className={cn("h-px flex-1", dark ? "bg-white/20" : "bg-border")}
        >
          <div
            className="h-full origin-left bg-mint transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(0.08, state.progress)})` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            disabled={state.start}
            onClick={() => step(-1)}
            className={button}
          >
            <Arrow size={16} className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={state.end}
            onClick={() => step(1)}
            className={button}
          >
            <Arrow size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
