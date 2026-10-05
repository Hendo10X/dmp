"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { ArrowLink } from "@/components/ui/arrow-link"
import { navFooterLinks, navLinks } from "@/components/nav/links"

// Soft spring for the panel; same motion reversed on close.
const panelSpring = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.9,
} as const
const fadeEase = [0.32, 0.72, 0, 1] as const

// Right-hand drawer from the Crowdline template (below the lg breakpoint).
export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <div key="drawer" className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: fadeEase }}
            onClick={onClose}
            className="absolute inset-0 bg-oxford/35"
          />
          <motion.aside
            id="site-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "105%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: "105%",
              opacity: 0.6,
              transition: { ...panelSpring, stiffness: 320 },
            }}
            transition={panelSpring}
            data-lenis-prevent
            className="absolute top-2 right-2 bottom-2 flex w-[min(20rem,calc(100vw-1rem))] flex-col overflow-y-auto rounded-2xl bg-background"
          >
            <div className="flex h-14 items-center justify-between px-6">
              <span className="font-logo text-lg text-oxford">DMP</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface hover:text-oxford"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="square"
                  className="size-4"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.12, duration: 0.5, ease: fadeEase },
              }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
              className="flex flex-1 flex-col gap-1 p-4"
            >
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center rounded-lg px-4 text-[15px] font-medium transition-colors hover:bg-surface hover:text-oxford",
                      active
                        ? "bg-surface text-oxford"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.title}
                  </Link>
                )
              })}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 px-4">
                {navFooterLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="text-xs text-muted-foreground hover:text-oxford"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.nav>

            <div className="p-4">
              <ArrowLink
                href="/contact"
                onClick={onClose}
                className="w-full justify-center"
              >
                Talk to us
              </ArrowLink>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
