"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import { ScrollTrigger, useGSAP } from "@/lib/gsap"
import { usePreloaderDone } from "@/lib/preloader-store"
import { backdrop, ease } from "@/components/nav/anim"
import { MenuPanel } from "@/components/nav/menu-panel"

// Vertical point (px from the top) used to decide what the bar is sitting on.
const PROBE = 48

export function Header() {
  const [open, setOpen] = React.useState(false)
  const [onDark, setOnDark] = React.useState(false)
  const ready = usePreloaderDone()
  const lenis = useLenis()
  const close = React.useCallback(() => setOpen(false), [])

  // Logo and "Let's Talk" have no backing, so they flip to white over any
  // section marked data-nav-theme="dark".
  useGSAP(() => {
    const active = new Set<Element>()
    const triggers = darkSections().map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: `top ${PROBE}px`,
        end: `bottom ${PROBE}px`,
        onToggle: (self) => {
          if (self.isActive) active.add(section)
          else active.delete(section)
          setOnDark(active.size > 0)
        },
      })
    )
    return () => triggers.forEach((trigger) => trigger.kill())
  })

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

  const light = open || onDark

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
        <nav aria-label="Main" className="relative">
          <AnimatePresence>
            {open && <MenuPanel key="panel" onNavigate={close} />}
          </AnimatePresence>

          <div
            className={cn(
              "relative grid h-16 grid-cols-[1fr_auto] items-center gap-4 px-4 transition-colors duration-500 md:h-20 md:grid-cols-[1fr_auto_1fr] md:px-6",
              light ? "text-white" : "text-oxford"
            )}
          >
            <Link
              href="/"
              onClick={close}
              className="justify-self-start font-display text-2xl tracking-tight md:text-3xl"
            >
              DMP
            </Link>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
              className="flex h-12 w-40 items-center justify-between gap-6 rounded-md bg-oxford px-5 text-base text-white outline-offset-2 focus-visible:outline-2 focus-visible:outline-electric md:w-[min(31rem,40vw)]"
            >
              <span className="grid text-left">
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
              <Lines open={open} />
            </button>

            <LetsTalk onClick={close} />
          </div>
        </nav>
      </motion.header>
    </>
  )
}

function darkSections() {
  return Array.from(document.querySelectorAll('[data-nav-theme="dark"]'))
}

function LetsTalk({ onClick }: { onClick: () => void }) {
  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      className="hidden justify-self-end md:block"
    >
      <Link
        href="/contact"
        onClick={onClick}
        className="relative block py-1 text-base outline-offset-4 focus-visible:outline-2 focus-visible:outline-electric"
      >
        Let&apos;s Talk
        <motion.span
          aria-hidden
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.4, ease }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-lime"
        />
      </Link>
    </motion.span>
  )
}

// Two long hairlines that shrink and cross into an X when open.
function Lines({ open }: { open: boolean }) {
  const line =
    "absolute left-0 h-px w-full bg-current transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
  return (
    <span aria-hidden className="relative block h-2.5 w-10 md:w-[4.5rem]">
      <span
        className={cn(
          line,
          "top-0",
          open && "translate-y-[4.5px] scale-x-50 rotate-45 md:scale-x-[0.28]"
        )}
      />
      <span
        className={cn(
          line,
          "bottom-0",
          open && "-translate-y-[4.5px] scale-x-50 -rotate-45 md:scale-x-[0.28]"
        )}
      />
    </span>
  )
}
