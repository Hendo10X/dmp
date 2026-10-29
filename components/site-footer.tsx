"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Arrow, Tick } from "@/components/ui/arrow"
import { SplitReveal } from "@/components/motion/split-reveal"
import { SocialLinks } from "@/components/ui/social-links"

const columns = [
  {
    title: "Firm",
    links: [
      { title: "About", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Solutions", href: "/solutions" },
      { title: "Who We Serve", href: "/who-we-serve" },
      { title: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Connect",
    links: [
      { title: "Reports", href: "/reports" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "DMP Speakers", href: "/speakers" },
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
    <footer className="relative z-10 overflow-hidden bg-midnight text-white">
      <div className="mx-auto grid max-w-[120rem] gap-12 px-6 pt-16 md:grid-cols-12 md:gap-6 md:pt-20 lg:px-10">
        <div className="md:col-span-5">
          <SplitReveal className="text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1.05]">
            Have a question for us?{" "}
            <span className="text-mint">Let&rsquo;s talk.</span>
          </SplitReveal>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/70">
            Leave your email and we will get back to you.
          </p>
          <Subscribe />
          <p className="mt-10 text-[0.7rem] font-medium tracking-[0.18em] text-white/70">
            Follow us
          </p>
          <SocialLinks tone="dark" className="mt-4" />
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:col-span-6 md:col-start-7 md:gap-10"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[0.7rem] font-medium tracking-[0.18em] text-white/70">
                {column.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-mint focus-visible:text-mint"
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

      <div className="mx-auto mt-12 flex max-w-[120rem] flex-wrap justify-between gap-x-4 gap-y-2 px-6 text-sm font-medium text-white/70 md:mt-14 lg:px-10">
        <span>&copy; {new Date().getFullYear()} DMPartners</span>
        <span>Demonstrating Possibilities</span>
      </div>

      {/* Oversized, faded dmp mark bleeding off the bottom edge, like the
          original text wordmark. Decorative: the brand is named above. */}
      <Image
        src="/brand/dmp-white-mono.png"
        alt=""
        aria-hidden
        width={2400}
        height={1067}
        unoptimized
        draggable={false}
        className="mx-auto mt-6 -mb-[9vw] h-auto w-[90vw] max-w-[110rem] opacity-10 select-none md:mt-8 md:opacity-[0.06]"
      />
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
        aria-label="Send"
        className="flex aspect-square h-full items-center justify-center bg-mint text-midnight"
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
