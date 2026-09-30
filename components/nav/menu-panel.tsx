"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { content, ease, panel } from "@/components/nav/anim"
import { navContact, navLinks } from "@/components/nav/links"

const MotionLink = motion.create(Link)

// Drops out of the Menu block: a divided list with a square marking the
// current page (and the hovered one), then direct contact details.
export function MenuPanel({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname()

  return (
    <motion.div
      id="site-menu"
      variants={panel}
      initial="closed"
      animate="open"
      exit="closed"
      className="overflow-hidden"
    >
      <motion.div
        variants={content}
        data-lenis-prevent
        className="max-h-[calc(100svh-6rem)] overflow-y-auto overscroll-contain px-5 pb-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:max-h-[calc(100svh-7rem)]"
      >
        <ul className="divide-y divide-white/15">
          {navLinks.map((link) => {
            const current = pathname === link.href
            return (
              <li key={link.href}>
                <MotionLink
                  href={link.href}
                  onClick={onNavigate}
                  aria-current={current ? "page" : undefined}
                  initial={current ? "on" : "off"}
                  animate={current ? "on" : "off"}
                  whileHover="on"
                  whileFocus="on"
                  className="flex items-center py-4 text-lg outline-none md:py-5 md:text-xl"
                >
                  <motion.span
                    aria-hidden
                    variants={{
                      off: { width: 0, marginRight: 0, opacity: 0 },
                      on: { width: 8, marginRight: 20, opacity: 1 },
                    }}
                    transition={{ duration: 0.35, ease }}
                    className="block h-2 shrink-0 bg-current"
                  />
                  {link.title}
                </MotionLink>
              </li>
            )
          })}
        </ul>

        <ul className="mt-6 flex flex-col gap-3 text-sm md:text-base">
          {navContact.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-electric focus-visible:text-electric focus-visible:outline-none"
              >
                {item.label}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={16}
                  strokeWidth={1.5}
                />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
