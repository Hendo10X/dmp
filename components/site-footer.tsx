"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Arrow, Tick } from "@/components/ui/arrow"
import { SplitReveal } from "@/components/motion/split-reveal"

const columns = [
  {
    title: "Firm",
    links: [
      { title: "About", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Solutions", href: "/solutions" },
      { title: "Industries", href: "/industries" },
      { title: "Who We Serve", href: "/who-we-serve" },
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
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 md:grid-cols-12 md:gap-6 md:pt-28">
        <div className="md:col-span-5">
          <SplitReveal className="text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.05]">
            Insights, in your inbox.
          </SplitReveal>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
            Research, reports and news from DMPartners. A few times a year,
            never more.
          </p>
          <Subscribe />
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:col-span-6 md:col-start-7 md:gap-10"
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

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-between gap-x-4 gap-y-2 px-6 font-mono text-xs tracking-wider text-white/50 uppercase md:mt-20">
        <span>&copy; {new Date().getFullYear()} DMPartners</span>
        <span>Demonstrating Possibilities</span>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge. */}
      <p
        aria-hidden
        className="mt-4 -mb-[0.18em] text-center font-logo text-[31vw] leading-[0.8] tracking-tighter text-white/10 select-none md:mt-6 md:text-white/[0.06]"
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
            {sent ? <Tick /> : <Arrow />}
          </motion.span>
        </AnimatePresence>
      </button>
    </form>
  )
}
