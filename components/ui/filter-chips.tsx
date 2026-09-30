"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

// Rectangular single-select filter. The active marker slides between chips.
export function FilterChips({
  label,
  options,
  value,
  onChange,
  id,
}: {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  id: string
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <span className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-label={label}
        className="-mx-4 flex [scrollbar-width:none] gap-1 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0"
      >
        {options.map((option) => {
          const active = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative shrink-0 bg-secondary px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-electric",
                active ? "text-white" : "text-oxford hover:bg-oxford/10"
              )}
            >
              {active && (
                <motion.span
                  layoutId={`chip-${id}`}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  className="absolute inset-0 bg-oxford"
                />
              )}
              <span className="relative">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
