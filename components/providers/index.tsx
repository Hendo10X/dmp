"use client"

import * as React from "react"
import { MotionConfig } from "motion/react"

import { SmoothScroll } from "@/components/providers/smooth-scroll"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  )
}
