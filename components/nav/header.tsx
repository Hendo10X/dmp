"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import { usePreloaderDone } from "@/lib/preloader-store"
import { ArrowLink } from "@/components/ui/arrow-link"
import { backdrop, ease } from "@/components/nav/anim"
import { MenuPanel } from "@/components/nav/menu-panel"

export function Header() {
  const [open, setOpen] = React.useState(false)
  const ready = usePreloaderDone()
  const lenis = useLenis()
  const close = React.useCallback(() => setOpen(false), [])
  const scrolled = useScrolledPast(48)
  // Shrink once the page moves; the open menu always gets the full bar.
  const compact = scrolled && !open

  // Freeze the page behind the open menu.
  React.useEffect(() => {
    if (!open) return
    lenis?.stop()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      lenis?.start()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, lenis])

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden
            variants={backdrop}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={close}
            className="fixed inset-0 z-40 bg-onyx/60"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: "-130%" }}
        animate={{ y: ready ? 0 : "-130%" }}
        transition={{ duration: 1, ease }}
        className="fixed inset-x-0 top-0 z-50 p-3 md:p-4"
      >
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto max-w-full bg-oxford text-white transition-[max-width] duration-700",
            SHRINK_EASE,
            compact && "md:max-w-[44rem]"
          )}
        >
          <div
            className={cn(
              "grid grid-cols-[1fr_auto] items-center transition-[height] duration-700 md:grid-cols-[1fr_auto_1fr]",
              SHRINK_EASE,
              compact ? "h-12" : "h-14 md:h-16"
            )}
          >
            <Link
              href="/"
              onClick={close}
              className={cn(
                "justify-self-start pl-4 font-display tracking-tight transition-[font-size] duration-700 md:pl-6",
                SHRINK_EASE,
                compact ? "text-lg" : "text-xl md:text-2xl"
              )}
            >
              DMP
            </Link>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
              className="flex h-full items-center gap-3 justify-self-end px-4 text-[0.7rem] tracking-[0.18em] uppercase outline-none focus-visible:text-electric md:justify-self-center"
            >
              <Burger open={open} />
              <span className="grid">
                <span
                  className={cn(
                    "col-start-1 row-start-1 transition-opacity duration-300",
                    open && "opacity-0"
                  )}
                >
                  Menu
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "col-start-1 row-start-1 transition-opacity duration-300",
                    !open && "opacity-0"
                  )}
                >
                  Close
                </span>
              </span>
            </button>

            <ArrowLink
              href="/contact"
              onClick={close}
              className="hidden h-full justify-self-end md:inline-flex"
            >
              Talk to us
            </ArrowLink>
          </div>

          <AnimatePresence>
            {open && <MenuPanel key="panel" onNavigate={close} />}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  )
}

const SHRINK_EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]"

function useScrolledPast(threshold: number) {
  const [past, setPast] = React.useState(false)
  React.useEffect(() => {
    const update = () => setPast(window.scrollY > threshold)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [threshold])
  return past
}

function Burger({ open }: { open: boolean }) {
  const line =
    "absolute left-0 h-px w-full bg-current transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
  return (
    <span aria-hidden className="relative block h-2.5 w-6">
      <span
        className={cn(line, "top-0", open && "translate-y-[4.5px] rotate-45")}
      />
      <span
        className={cn(
          line,
          "bottom-0",
          open && "-translate-y-[4.5px] -rotate-45"
        )}
      />
    </span>
  )
}
