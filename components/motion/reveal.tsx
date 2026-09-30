"use client"

import * as React from "react"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

// Rises its children into place as one block when scrolled into view.
export function Reveal({
  children,
  className,
  y = 48,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          y,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
