"use client"

import * as React from "react"
import Image from "next/image"

import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

// Photo that unmasks upward when it enters, then drifts inside its frame
// as the page scrolls.
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  imageClassName,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  imageClassName?: string
}) {
  const frame = React.useRef<HTMLDivElement>(null)
  const inner = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(frame.current, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: frame.current,
            start: "top 90%",
            once: true,
          },
        })
        gsap.fromTo(
          inner.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })
    },
    { scope: frame }
  )

  return (
    <div
      ref={frame}
      className={cn(
        "relative overflow-hidden bg-oxford [clip-path:inset(0%_0%_0%_0%)]",
        className
      )}
    >
      <div ref={inner} className="absolute inset-x-0 -inset-y-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    </div>
  )
}
