"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import { navFooterLinks, navLinks } from "@/components/nav/links"

// Mobile menu after olivierlarose/awwwards-side-menu: the pill button grows
// into the panel, links tip up in 3D, the button flips Menu -> Close.
// Links move together (no stagger, per the design rules).
const ease = [0.76, 0, 0.24, 1] as const
const BUTTON = { width: 100, height: 40 }

const perspective: Variants = {
  initial: { opacity: 0, rotateX: 90, y: 80, x: -20 },
  enter: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    x: 0,
    transition: {
      duration: 0.65,
      delay: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35, delay: 0.5 },
    },
  },
  exit: { opacity: 0, transition: { duration: 0.5, ease } },
}

const slideIn: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.75, ease: [0.215, 0.61, 0.355, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
}

export function SideMenu() {
  const [open, setOpen] = React.useState(false)
  const [size, setSize] = React.useState({ width: 480, height: 650 })
  const pathname = usePathname()
  const lenis = useLenis()

  // Panel fills most of a phone, capped at the reference's 480 x 650.
  React.useEffect(() => {
    const measure = () =>
      setSize({
        width: Math.min(480, window.innerWidth - 24),
        height: Math.min(650, window.innerHeight - 16),
      })
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Close on navigation.
  React.useEffect(() => setOpen(false), [pathname])

  // Lock scroll and listen for Escape while open.
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
      {/* Click-away layer. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="away"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.35 } }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[55] bg-oxford/20 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed top-2 right-6 z-[60] lg:hidden">
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal={open}
          aria-label="Menu"
          initial={false}
          animate={
            open
              ? {
                  width: size.width,
                  height: size.height,
                  transition: { duration: 0.75, ease },
                }
              : {
                  width: BUTTON.width,
                  height: BUTTON.height,
                  transition: { duration: 0.75, delay: 0.35, ease },
                }
          }
          className="absolute top-0 right-0 overflow-hidden rounded-[25px] bg-lime"
        >
          <AnimatePresence>
            {open && (
              <div
                key="nav"
                data-lenis-prevent
                className="flex h-full flex-col justify-between overflow-y-auto px-8 pt-20 pb-10"
              >
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
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
                          onClick={() => setOpen(false)}
                          aria-current={
                            pathname.startsWith(link.href) ? "page" : undefined
                          }
                          className={cn(
                            "font-heading text-[clamp(2rem,9vw,2.75rem)] leading-tight text-oxford",
                            pathname.startsWith(link.href) &&
                              "underline decoration-2 underline-offset-8"
                          )}
                        >
                          {link.title}
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </nav>

                <div className="mt-10 grid grid-cols-2 gap-y-2">
                  {[...navFooterLinks].map((link) => (
                    <motion.div
                      key={link.href}
                      variants={slideIn}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-sm text-oxford/80 hover:text-oxford"
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Menu / Close pill: the two labels slide as one strip. */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
          className="perspective-hover relative block h-10 w-[100px] cursor-pointer overflow-hidden rounded-[25px] outline-none focus-visible:ring-2 focus-visible:ring-electric"
        >
          <motion.span
            className="absolute inset-x-0 top-0 block h-full"
            animate={{ top: open ? "-100%" : "0%" }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="block h-full bg-lime text-oxford">
              <PerspectiveText label="Menu" />
            </span>
            <span className="block h-full bg-oxford text-lime">
              <PerspectiveText label="Close" />
            </span>
          </motion.span>
        </button>
      </div>
    </>
  )
}

function PerspectiveText({ label }: { label: string }) {
  return (
    <span className="perspective-text text-xs font-semibold tracking-wider uppercase">
      <span>{label}</span>
      <span aria-hidden>{label}</span>
    </span>
  )
}
