"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"

const MotionLink = motion.create(Link)

// Pill buttons from the Crowdline template.
const tones = {
  // Primary: Oxford pill (on white).
  primary: "bg-oxford text-white hover:bg-oxford/90",
  // Outline: hairline pill (on white).
  muted:
    "border border-oxford/20 bg-transparent text-oxford hover:border-oxford/40 hover:bg-surface",
  // White pill: on Oxford or photographic backgrounds.
  light: "bg-white text-oxford hover:bg-white/90",
  // Lime pill: secondary highlight on Oxford.
  lime: "bg-lime text-oxford hover:bg-lime/90",
  // Oxford pill used on electric/lime backgrounds.
  dark: "bg-oxford text-white hover:bg-oxford/90",
}

export function ArrowLink({
  href,
  children,
  className,
  onClick,
  tone = "primary",
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  tone?: keyof typeof tones
}) {
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-6 font-mono text-xs font-semibold tracking-wider whitespace-nowrap uppercase outline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-electric",
        tones[tone],
        className
      )}
    >
      {children}
      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: 3 } }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex"
      >
        <Arrow size={14} />
      </motion.span>
    </MotionLink>
  )
}
