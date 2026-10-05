"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { ArrowLink } from "@/components/ui/arrow-link"
import { navFooterLinks, navLinks } from "@/components/nav/links"

const ease = [0.22, 1, 0.36, 1] as const

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-oxford/40 backdrop-blur-sm"
          />
          <motion.aside
            id="site-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease }}
            data-lenis-prevent
            className="absolute top-0 right-0 flex h-full w-[min(20rem,85vw)] flex-col overflow-y-auto border-l border-border bg-background"
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-6">
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

            <nav className="flex flex-1 flex-col gap-1 p-4">
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center rounded-lg px-4 font-mono text-xs tracking-widest uppercase transition-colors hover:bg-surface hover:text-oxford",
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
                    className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase hover:text-oxford"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="border-t border-border p-4">
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
