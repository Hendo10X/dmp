"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import { navFooterLinks, navLinks } from "@/components/nav/links"

// Mobile menu: a full-screen Oxford panel that opens as a circle growing out
// of the hamburger, on a hard in-out curve. Links rise together (no stagger)
// once the circle has mostly opened, and drop away before it closes.
const ease = [0.76, 0, 0.24, 1] as const
const easeOut = [0.22, 1, 0.36, 1] as const

// Circle centre = the burger's centre (nav px-6, button size-10 with -mr-2,
// bar h-14).
const origin = "at calc(100% - 2.25rem) 1.75rem"

const panel: Variants = {
  closed: {
    clipPath: `circle(0% ${origin})`,
    transition: { duration: 0.6, delay: 0.1, ease },
  },
  open: {
    clipPath: `circle(150% ${origin})`,
    transition: { duration: 0.75, ease },
  },
}

const rise: Variants = {
  initial: { opacity: 0, y: 48 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.3, ease: easeOut },
  },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2, ease } },
}

export function SideMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const lenis = useLenis()

  // Lock scroll and listen for Escape while open.
  React.useEffect(() => {
    if (!open) return
    lenis?.stop()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      lenis?.start()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, lenis, onClose])

  return (
    <motion.aside
      id="site-menu"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      variants={panel}
      initial={false}
      animate={open ? "open" : "closed"}
      className={cn(
        "fixed inset-0 z-40 bg-oxford text-white lg:hidden",
        !open && "pointer-events-none"
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav"
            variants={rise}
            initial="initial"
            animate="enter"
            exit="exit"
            data-lenis-prevent
            className="flex h-full flex-col justify-between overflow-y-auto px-6 pt-24 pb-10"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 font-heading text-[clamp(2.25rem,10vw,3rem)] leading-tight transition-colors",
                      active ? "text-lime" : "text-white hover:text-electric"
                    )}
                  >
                    {link.title}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-10 grid grid-cols-2 gap-y-2 border-t border-white/15 pt-6">
              {navFooterLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}

// Two-line hamburger that morphs into an X on the same curve.
export function Burger({ open }: { open: boolean }) {
  const line = "absolute left-0 h-[1.5px] w-full bg-current"
  return (
    <span aria-hidden className="relative block h-3 w-6">
      <motion.span
        className={cn(line, "top-0")}
        initial={false}
        animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease }}
      />
      <motion.span
        className={cn(line, "bottom-0")}
        initial={false}
        animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease }}
      />
    </span>
  )
}
