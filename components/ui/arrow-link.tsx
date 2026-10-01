"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Arrow } from "@/components/ui/arrow"

import { cn } from "@/lib/utils"

const MotionLink = motion.create(Link)

const tones = {
  // White label + lime arrow: on dark or photographic backgrounds.
  light: { label: "bg-white text-oxford", arrow: "bg-lime text-oxford" },
  // Soft label + lime arrow: on white sections.
  muted: { label: "bg-secondary text-oxford", arrow: "bg-lime text-oxford" },
  // Oxford label + white arrow: on lime or electric backgrounds.
  dark: { label: "bg-oxford text-white", arrow: "bg-white text-oxford" },
}

// Rectangular CTA: a text block with an arrow square flush to its right.
export function ArrowLink({
  href,
  children,
  className,
  onClick,
  tone = "light",
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
        "inline-flex h-12 items-stretch outline-offset-4 focus-visible:outline-2 focus-visible:outline-electric",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center px-5 text-xs font-semibold tracking-[0.16em] whitespace-nowrap uppercase",
          tones[tone].label
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "flex aspect-square h-full items-center justify-center",
          tones[tone].arrow
        )}
      >
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex"
        >
          <Arrow size={20} />
        </motion.span>
      </span>
    </MotionLink>
  )
}
