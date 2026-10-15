"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { audiences, services } from "@/lib/content"
import { Shape } from "@/components/ui/shape"
import { ArrowLink } from "@/components/ui/arrow-link"

const ease = [0.76, 0, 0.24, 1] as const

// "Who we serve" as large expanding rows (after the industry lists on big
// consultancy sites): one group open at a time, its detail in a midnight
// panel with mint accents. A #slug in the URL (e.g. from the home page
// pills) opens that group.
export function AudienceAccordion() {
  const [open, setOpen] = React.useState<string>(audiences[0].slug)

  React.useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.slice(1)
      if (audiences.some((a) => a.slug === slug)) setOpen(slug)
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    return () => window.removeEventListener("hashchange", fromHash)
  }, [])

  return (
    <ol className="border-b border-border">
      {audiences.map((audience, index) => {
        const isOpen = open === audience.slug
        const relevant = services.filter((s) =>
          s.forWhom.includes(audience.slug)
        )
        return (
          <li
            key={audience.slug}
            id={audience.slug}
            className="scroll-mt-24 border-t border-border"
          >
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${audience.slug}-panel`}
                onClick={() => setOpen(isOpen ? "" : audience.slug)}
                className="group flex w-full items-center gap-4 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-electric md:gap-8 md:py-8"
              >
                <span className="w-8 shrink-0 font-mono text-sm text-midnight/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1 font-heading text-[clamp(1.5rem,3.2vw,3rem)] leading-[1.05] transition-[color,translate] duration-500",
                    isOpen
                      ? "text-brand"
                      : "text-midnight group-hover:translate-x-2"
                  )}
                >
                  {audience.title}
                </span>
                <Shape
                  name={audience.shape}
                  className={cn(
                    "size-7 shrink-0 transition-[rotate,color] duration-500 md:size-9",
                    isOpen
                      ? "rotate-90 text-mint"
                      : "text-midnight/20 group-hover:text-midnight"
                  )}
                />
              </button>
            </h2>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${audience.slug}-panel`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="overflow-hidden"
                >
                  <div className="mb-6 grid gap-8 rounded-xl bg-midnight p-6 text-white md:mb-8 md:grid-cols-12 md:gap-6 md:p-10">
                    <div className="flex flex-col items-start gap-8 md:col-span-6">
                      <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-snug">
                        {audience.body}
                      </p>
                      <ArrowLink href="/contact" tone="mint">
                        Talk to us
                      </ArrowLink>
                    </div>

                    <div className="flex flex-col gap-8 md:col-span-5 md:col-start-8">
                      <div>
                        <p className="font-mono text-xs tracking-wider text-mint uppercase">
                          Typical work
                        </p>
                        <ul className="mt-4 flex flex-col gap-2">
                          {audience.needs.map((need) => (
                            <li
                              key={need}
                              className="flex items-center gap-3 text-white/85"
                            >
                              <span
                                aria-hidden
                                className="size-1.5 shrink-0 rounded-full bg-mint"
                              />
                              {need}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {relevant.length > 0 && (
                        <div>
                          <p className="font-mono text-xs tracking-wider text-mint uppercase">
                            Most relevant services
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {relevant.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  className="block rounded-pill border border-white/20 px-3 py-2 text-sm text-white transition-colors duration-300 hover:border-mint hover:bg-mint hover:text-midnight"
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ol>
  )
}
