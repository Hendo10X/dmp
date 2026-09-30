"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight02Icon, Tick02Icon } from "@hugeicons/core-free-icons"

const columns = [
  {
    title: "Firm",
    links: [
      { title: "About", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Industries", href: "/industries" },
      { title: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Connect",
    links: [
      { title: "Insights", href: "/insights" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "DMP Speakers", href: "/contact#speakers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden bg-oxford text-white">
      <div className="grid gap-16 px-4 pt-24 md:grid-cols-12 md:gap-6 md:px-7 md:pt-32">
        <div className="md:col-span-5">
          <h2 className="text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1] tracking-[0.01em]">
            Insights, in your inbox.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
            Research, reports and news from DMP. A few times a year, never more.
          </p>
          <Subscribe />
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[0.7rem] tracking-[0.18em] text-white/50 uppercase">
                {column.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-electric focus-visible:text-electric"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-24 flex flex-wrap justify-between gap-4 px-4 text-[0.7rem] tracking-[0.18em] text-white/50 uppercase md:px-7">
        <span>&copy; {new Date().getFullYear()} DMP</span>
        <span>Sport &times; Technology Consulting</span>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge. */}
      <p
        aria-hidden
        className="mt-6 -mb-[0.2em] text-center font-logo text-[31vw] leading-[0.8] tracking-tighter text-white/[0.06] select-none"
      >
        DMP
      </p>
    </footer>
  )
}

// UI only: no newsletter provider is connected yet (docs/brief.md, Q8).
function Subscribe() {
  const [sent, setSent] = React.useState(false)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
      className="mt-10 flex h-12 max-w-md"
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="Your email"
        disabled={sent}
        className="min-w-0 flex-1 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus-visible:bg-white/15"
      />
      <button
        type="submit"
        disabled={sent}
        aria-label="Subscribe"
        className="flex aspect-square h-full items-center justify-center bg-lime text-oxford"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={sent ? "sent" : "idle"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex text-xs font-medium"
          >
            <HugeiconsIcon
              icon={sent ? Tick02Icon : ArrowRight02Icon}
              size={20}
              strokeWidth={1.5}
            />
          </motion.span>
        </AnimatePresence>
      </button>
    </form>
  )
}
