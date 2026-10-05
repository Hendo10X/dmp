"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"

import { Arrow, Tick } from "@/components/ui/arrow"

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

// Light footer after the Crowdline template: wordmark, subscribe, link
// columns, then a thin bottom bar.
export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="font-logo text-2xl text-oxford">
            DMP
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Commercial and investment advisory at the intersection of sport and
            adjacent markets, across Nigeria and Africa.
          </p>
          <p className="mt-10 font-mono text-xs tracking-widest text-oxford uppercase">
            Insights, in your inbox
          </p>
          <Subscribe />
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-6 md:col-start-7"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {column.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-onyx transition-colors hover:text-oxford focus-visible:text-oxford"
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

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          <span>&copy; {new Date().getFullYear()} DMPartners</span>
          <span>Demonstrating Possibilities</span>
        </div>
      </div>
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
      className="mt-4 flex h-11 max-w-md gap-2"
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
        className="min-w-0 flex-1 rounded-full border border-border bg-surface px-5 text-sm text-oxford outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-electric"
      />
      <button
        type="submit"
        disabled={sent}
        aria-label="Subscribe"
        className="flex aspect-square h-full items-center justify-center rounded-full bg-oxford text-white transition-colors hover:bg-oxford/90"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={sent ? "sent" : "idle"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {sent ? <Tick size={16} /> : <Arrow size={16} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </form>
  )
}
