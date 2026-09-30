"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

const MotionLink = motion.create(Link)

// Rectangular CTA: a text block with a lime arrow square flush to its right.
export function ArrowLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex h-12 items-stretch text-oxford outline-offset-4 focus-visible:outline-2 focus-visible:outline-electric",
        className
      )}
    >
      <span className="flex items-center bg-white px-5 text-[0.7rem] tracking-[0.18em] whitespace-nowrap uppercase">
        {children}
      </span>
      <span className="flex aspect-square h-full items-center justify-center bg-lime">
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex"
        >
          <HugeiconsIcon icon={ArrowRight02Icon} size={20} strokeWidth={1.5} />
        </motion.span>
      </span>
    </MotionLink>
  )
}
