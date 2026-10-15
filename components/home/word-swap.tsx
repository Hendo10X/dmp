"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const ease = [0.22, 1, 0.36, 1] as const

// The hero's second line: rises in with the headline, then cycles through
// `words`. Each swap pushes the current word up and out of a mask while the
// next rises in, both blurring through the move. Decorative: the h1 carries
// the real text in its aria-label. Reduced motion shows the first word only.
export function WordSwap({
  words,
  play,
  interval = 2600,
  className,
}: {
  words: string[]
  play: boolean
  interval?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (!play || reduce) return
    // First swap waits for the entrance to settle.
    let timer = window.setTimeout(function tick() {
      setIndex((current) => (current + 1) % words.length)
      timer = window.setTimeout(tick, interval)
    }, interval + 1200)
    return () => window.clearTimeout(timer)
  }, [play, reduce, interval, words.length])

  return (
    // Mask with a little bottom room so descenders (p, y) are not clipped.
    <span
      aria-hidden
      className={cn(
        "-mb-[0.14em] block overflow-hidden pb-[0.14em]",
        className
      )}
    >
      <motion.span
        className="relative block"
        initial={false}
        animate={{ y: play || reduce ? "0%" : "115%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            className="block whitespace-nowrap"
            initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  )
}
