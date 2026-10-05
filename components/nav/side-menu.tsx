"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import { navFooterLinks, navLinks } from "@/components/nav/links"

// Mobile menu using the animation style of olivierlarose/awwwards-side-menu
// (its curve, 3D link reveal and close sequencing), as a panel that slides
// in from the right edge under the header. Links move together (no stagger).
const ease = [0.76, 0, 0.24, 1] as const

const panel: Variants = {
  closed: { x: "100%", transition: { duration: 0.75, delay: 0.35, ease } },
  open: { x: 0, transition: { duration: 0.75, ease } },
}

const perspective: Variants = {
  initial: { opacity: 0, rotateX: 90, y: 80, x: -20 },
  enter: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    x: 0,
    transition: {
      duration: 0.65,
      delay: 0.45,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35, delay: 0.45 },
    },
  },
  exit: { opacity: 0, transition: { duration: 0.4, ease } },
}

const slideIn: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
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
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, ease } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, delay: 0.35, ease },
            }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-oxford/25 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        id="site-menu"
        aria-label="Menu"
        aria-hidden={!open}
        variants={panel}
        initial={false}
        animate={open ? "open" : "closed"}
        className="fixed top-0 right-0 bottom-0 z-40 w-[min(26rem,100vw)] bg-background lg:hidden"
      >
        <AnimatePresence>
          {open && (
            <div
              key="nav"
              data-lenis-prevent
              className="flex h-full flex-col justify-between overflow-y-auto px-6 pt-24 pb-10"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = pathname.startsWith(link.href)
                  return (
                    <div
                      key={link.href}
                      className="[perspective-origin:bottom] [perspective:120px]"
                    >
                      <motion.div
                        variants={perspective}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className="flex items-center gap-3 font-heading text-[clamp(2rem,9vw,2.75rem)] leading-tight text-oxford"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "size-2 shrink-0 rounded-full bg-lime",
                              active ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {link.title}
                        </Link>
                      </motion.div>
                    </div>
                  )
                })}
              </nav>

              <motion.div
                variants={slideIn}
                initial="initial"
                animate="enter"
                exit="exit"
                className="mt-10 grid grid-cols-2 gap-y-2"
              >
                {navFooterLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="text-sm text-muted-foreground hover:text-oxford"
                  >
                    {link.title}
                  </Link>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
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
        transition={{ duration: 0.5, ease }}
      />
      <motion.span
        className={cn(line, "bottom-0")}
        initial={false}
        animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.5, ease }}
      />
    </span>
  )
}
