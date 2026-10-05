"use client"

import * as React from "react"
import createGlobe, { type Globe } from "cobe"

import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import type { Market } from "@/lib/content"

// Brand colours as 0-1 RGB for WebGL.
const OXFORD: [number, number, number] = [0, 0.125, 0.282]
const LIME: [number, number, number] = [0.725, 0.886, 0.004]
const ELECTRIC: [number, number, number] = [0.478, 0.949, 0.969]

// cobe's camera: phi spins around the poles, theta tilts. Derived from
// cobe's projection: a point at [lat, lng] sits dead centre when
// phi = 3π/2 - lng and theta = lat (both in radians).
const toAngles = ([lat, lng]: [number, number]) => ({
  phi: (3 * Math.PI) / 2 - (lng * Math.PI) / 180,
  theta: (lat * Math.PI) / 180,
})

// Africa's centre of mass, tilted slightly north so the Sahel sits mid-globe.
const AFRICA = toAngles([4, 19])

// cobe's own maths (dist/index.esm.js): location -> unit vector, then the
// camera rotation. Globe radius on screen is 0.8 of the half-size.
function project([lat, lng]: [number, number], phi: number, theta: number) {
  const r = (lat * Math.PI) / 180
  const a = (lng * Math.PI) / 180 - Math.PI
  const t = [-Math.cos(r) * Math.cos(a), Math.sin(r), Math.cos(r) * Math.sin(a)]
  const cp = Math.cos(phi)
  const sp = Math.sin(phi)
  const ct = Math.cos(theta)
  const st = Math.sin(theta)
  const x = cp * t[0] + sp * t[2]
  const y = sp * st * t[0] + ct * t[1] - cp * st * t[2]
  const z = -sp * ct * t[0] + st * t[1] + cp * ct * t[2]
  return { sx: (x * 0.8 + 1) / 2, sy: (-y * 0.8 + 1) / 2, front: z > 0.15 }
}

// Light WebGL globe (Crowdline template, on white): sways gently around
// Africa, drag to spin, swings to a market when `focus` is set, and floats
// small city pills over the markets. Rendering pauses off-screen.
export function AfricaGlobe({
  markets,
  focus,
  labels = true,
  className,
}: {
  markets: Market[]
  focus?: [number, number] | null
  labels?: boolean
  className?: string
}) {
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const overlay = React.useRef<HTMLDivElement>(null)
  const target = React.useRef(AFRICA)
  const drag = React.useRef<{ x: number; phi: number } | null>(null)
  const dragPhi = React.useRef(0)
  const focused = React.useRef(false)

  // Swing to the focused market, or back to Africa.
  React.useEffect(() => {
    target.current = focus ? toAngles(focus) : AFRICA
    focused.current = Boolean(focus)
  }, [focus])

  React.useEffect(() => {
    const el = canvas.current
    if (!el) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const dpr = Math.min(window.devicePixelRatio, 2)
    let size = el.offsetWidth
    let phi = AFRICA.phi - 1.2 // starts a little east, then rolls into place
    let theta = AFRICA.theta
    let time = 0
    let visible = false

    const home = markets.find((m) => m.home)

    const globe: Globe = createGlobe(el, {
      // cobe multiplies width/height by devicePixelRatio itself.
      width: size,
      height: size,
      devicePixelRatio: dpr,
      phi,
      theta,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 24000,
      mapBrightness: 2,
      mapBaseBrightness: 0.04,
      baseColor: [1, 1, 1],
      markerColor: OXFORD,
      glowColor: [0.93, 0.95, 0.98],
      markers: markets.map((m) => ({
        location: m.location,
        size: m.home ? 0.06 : 0.035,
        color: m.home ? LIME : OXFORD,
      })),
      arcs: home
        ? markets
            .filter((m) => !m.home)
            .map((m) => ({ from: home.location, to: m.location }))
        : [],
      arcColor: ELECTRIC,
      arcWidth: 0.6,
      arcHeight: 0.25,
      markerElevation: 0.02,
    })

    const pills = () =>
      overlay.current?.querySelectorAll<HTMLElement>("[data-market]") ?? []

    const tick = (_t: number, deltaMs: number) => {
      if (!visible) return
      time += deltaMs / 1000
      // Idle sway: a slow back-and-forth revolve centred on the target.
      const sway =
        reduceMotion || focused.current || drag.current
          ? 0
          : Math.sin(time * 0.25) * 0.35
      const goalPhi = target.current.phi + sway + dragPhi.current
      phi += (goalPhi - phi) * 0.05
      theta += (target.current.theta - theta) * 0.05
      if (!drag.current) dragPhi.current *= 0.96
      globe.update({ phi, theta, width: size, height: size })

      pills().forEach((pill, index) => {
        const market = markets[index]
        if (!market) return
        const { sx, sy, front } = project(market.location, phi, theta)
        pill.style.left = `${sx * 100}%`
        pill.style.top = `${sy * 100}%`
        pill.style.opacity = front ? "1" : "0"
      })
    }

    gsap.ticker.add(tick)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(el)

    const ro = new ResizeObserver(() => {
      size = el.offsetWidth
    })
    ro.observe(el)

    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
      ro.disconnect()
      globe.destroy()
    }
  }, [markets])

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <canvas
        ref={canvas}
        aria-label="Globe centred on Africa showing the markets DMPartners covers"
        role="img"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, phi: dragPhi.current }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          dragPhi.current =
            drag.current.phi + (event.clientX - drag.current.x) / 180
        }}
        onPointerUp={() => {
          drag.current = null
        }}
        onPointerCancel={() => {
          drag.current = null
        }}
        className="size-full cursor-grab touch-pan-y active:cursor-grabbing"
      />

      {labels && (
        <div
          ref={overlay}
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          {markets.map((market) => (
            <div
              key={market.city}
              data-market
              className="absolute -translate-x-1/2 -translate-y-[140%] opacity-0 transition-opacity duration-300"
            >
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-white/90 px-2 py-0.5 backdrop-blur-sm">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    market.home ? "bg-lime" : "bg-oxford"
                  )}
                />
                <span className="font-mono text-[9px] leading-none text-oxford">
                  {market.city}
                </span>
                <span className="font-mono text-[9px] leading-none font-semibold text-muted-foreground">
                  {market.code}
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
