"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { ArrowLink } from "@/components/ui/arrow-link"
import { dim, fade, panel, reveal } from "@/components/nav/anim"
import { navFooterLinks, navLinks } from "@/components/nav/links"

// Adapted from olivierlarose/nav-menu: the panel grows out of the bar,
// titles rise out of a mask, hovering one blurs the rest and swaps the image.
export function MenuPanel({ onNavigate }: { onNavigate: () => void }) {
  const [hovered, setHovered] = React.useState<number | null>(null)
  const [shown, setShown] = React.useState(0)
  const pathname = usePathname()

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
      className="overflow-hidden"
    >
      <div
        data-lenis-prevent
        className="flex max-h-[calc(100svh-5.5rem)] justify-between gap-10 overflow-y-auto px-4 pt-6 pb-6 @xl:px-6 @xl:pt-10"
      >
        <div className="flex min-w-0 flex-col justify-between gap-12">
          <ul
            className="flex flex-col gap-y-1 @5xl:flex-row @5xl:flex-wrap @5xl:gap-x-10"
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
                    aria-current={
                      pathname.startsWith(link.href) ? "page" : undefined
                    }
                    className={cn(
                      "block outline-none focus-visible:text-electric",
                      pathname.startsWith(link.href) && "text-electric"
                    )}
                  >
                    <motion.span
                      variants={dim}
                      initial="idle"
                      animate={
                        hovered !== null && hovered !== index
                          ? "dimmed"
                          : "idle"
                      }
                      className="block font-display text-[clamp(1.75rem,5.5cqi,4.25rem)] leading-[1.15]"
                    >
                      {link.title}
                    </motion.span>
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 @5xl:flex-row @5xl:items-end @5xl:justify-between">
            <div className="overflow-hidden">
              <motion.ul
                variants={reveal}
                className="flex flex-wrap gap-x-8 gap-y-2 text-[0.7rem] tracking-[0.18em] text-white/60 uppercase"
              >
                <li className="text-white">Demonstrating Possibilities</li>
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
            <motion.div variants={fade} className="@xl:hidden">
              <ArrowLink href="/contact" onClick={onNavigate}>
                Talk to us
              </ArrowLink>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={fade}
          className="relative hidden aspect-[4/5] w-[min(34cqi,400px)] shrink-0 self-start overflow-hidden bg-onyx @xl:block"
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
