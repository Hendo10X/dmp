"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { ArrowLink } from "@/components/ui/arrow-link"
import { dim, fade, panel, reveal } from "@/components/nav/anim"
import { navFooterLinks, navLinks } from "@/components/nav/links"

// Adapted from olivierlarose/nav-menu: the sheet sits behind the bar and
// grows down from it; titles rise out of a mask, hovering one blurs the rest
// and swaps the image.
export function MenuPanel({ onNavigate }: { onNavigate: () => void }) {
  const [hovered, setHovered] = React.useState<number | null>(null)
  const [shown, setShown] = React.useState(0)

  const focus = (index: number) => {
    setHovered(index)
    setShown(index)
  }

  return (
    <motion.div
      id="site-menu"
      variants={panel}
      initial="closed"
      animate="open"
      exit="closed"
      className="absolute inset-x-0 top-0 overflow-hidden rounded-md bg-oxford text-white"
    >
      <div
        data-lenis-prevent
        className="flex max-h-[calc(100svh-1.5rem)] gap-12 overflow-y-auto px-4 pt-24 pb-6 md:max-h-[calc(100svh-2rem)] md:px-6 md:pt-32 lg:justify-between"
      >
        <div className="flex min-w-0 flex-col justify-between gap-12">
          <ul
            className="flex flex-col gap-y-1 md:flex-row md:flex-wrap md:gap-x-10"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link, index) => (
              <li key={link.href} className="overflow-hidden">
                <motion.div variants={reveal}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    onMouseEnter={() => focus(index)}
                    onFocus={() => focus(index)}
                    onBlur={() => setHovered(null)}
                    className="block outline-none focus-visible:text-electric"
                  >
                    <motion.span
                      variants={dim}
                      initial="idle"
                      animate={
                        hovered !== null && hovered !== index
                          ? "dimmed"
                          : "idle"
                      }
                      className="block font-display text-[clamp(1.75rem,4.4vw,4.25rem)] leading-[1.15]"
                    >
                      {link.title}
                    </motion.span>
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="overflow-hidden">
              <motion.ul
                variants={reveal}
                className="flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] tracking-[0.18em] text-white/60 uppercase"
              >
                <li className="text-white">Sport × Technology Consulting</li>
                {navFooterLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="transition-colors hover:text-electric focus-visible:text-electric"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </div>
            <motion.div variants={fade} className="md:hidden">
              <ArrowLink href="/contact" onClick={onNavigate}>
                Talk to us
              </ArrowLink>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={fade}
          className="relative hidden aspect-[4/5] w-[min(26vw,400px)] shrink-0 overflow-hidden bg-onyx lg:block"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={false}
              animate={{
                opacity: shown === index ? 1 : 0,
                scale: shown === index ? 1 : 1.06,
              }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={link.image}
                alt=""
                fill
                sizes="400px"
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
