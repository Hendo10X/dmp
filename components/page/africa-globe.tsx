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

// A WebGL globe that sways gently around Africa, can be dragged to spin,
// and swings to a market when `focus` is set. Rendering pauses off-screen.
export function AfricaGlobe({
  markets,
  focus,
  className,
}: {
  markets: Market[]
  focus?: [number, number] | null
  className?: string
}) {
  const canvas = React.useRef<HTMLCanvasElement>(null)
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
    let globe: Globe | null = null

    const home = markets.find((m) => m.home)

    const create = () => {
      globe = createGlobe(el, {
        // cobe multiplies width/height by devicePixelRatio itself.
        width: size,
        height: size,
        devicePixelRatio: dpr,
        phi,
        theta,
        dark: 1,
        diffuse: 1.4,
        mapSamples: 32000,
        mapBrightness: 9,
        mapBaseBrightness: 0,
        baseColor: OXFORD,
        markerColor: LIME,
        glowColor: [0.92, 0.94, 0.97],
        markers: markets.map((m) => ({
          location: m.location,
          size: m.home ? 0.07 : 0.045,
          color: m.home ? LIME : ELECTRIC,
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
    }

    const tick = (_t: number, deltaMs: number) => {
      if (!globe || !visible) return
      time += deltaMs / 1000
      // Idle sway: a slow back-and-forth revolve centred on the target.
      const sway =
        reduceMotion || focused.current || drag.current
          ? 0
          : Math.sin(time * 0.25) * 0.35
      const goalPhi = target.current.phi + sway + dragPhi.current
      phi += (goalPhi - phi) * 0.05
      theta += (target.current.theta - theta) * 0.05
      // Ease drag offset back to zero once released.
      if (!drag.current) dragPhi.current *= 0.96
      globe.update({ phi, theta, width: size, height: size })
    }

    create()
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
      globe?.destroy()
    }
    // Recreate only when the marker set changes; focus is read via ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    </div>
  )
}
