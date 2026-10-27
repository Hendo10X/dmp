"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"

const MotionLink = motion.create(Link)

// Pill buttons from the Crowdline template.
const tones = {
  // Primary: midnight pill. On the home page section buttons rotate through
  // the four colours (midnight, brand, mint, electric) per the client.
  primary: "bg-midnight text-white hover:bg-midnight/90",
  // Logo-blue pill: hero primary.
  brand: "bg-brand text-white hover:bg-brand/90",
  // Logo-mint pill: highlight on midnight bands.
  mint: "bg-mint text-midnight hover:bg-mint/90",
  // Electric pill: the fourth logo-palette colour for mixed button sets.
  electric: "bg-electric text-midnight hover:bg-electric/85",
  // Outline pill on midnight.
  outline:
    "border border-white/25 bg-transparent text-white hover:border-white/50 hover:bg-white/5",
  // White pill: on midnight or photographic backgrounds.
  light: "bg-white text-midnight hover:bg-white/90",
  // Lime pill: secondary highlight on midnight.
  lime: "bg-lime text-midnight hover:bg-lime/90",
  // Midnight pill used on electric/lime backgrounds.
  dark: "bg-midnight text-white hover:bg-midnight/90",
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
        "inline-flex h-10 items-center gap-2 rounded-pill px-6 font-mono text-xs font-semibold tracking-wider whitespace-nowrap uppercase outline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-electric",
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
