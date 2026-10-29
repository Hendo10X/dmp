"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { services, solutions } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { ServiceIcon } from "@/components/ui/service-icon"
import { ArrowLink } from "@/components/ui/arrow-link"

export type MegaKey = "services" | "solutions"

const intro: Record<
  MegaKey,
  {
    title: string
    body: string
    href: string
    cta: string
    tone: "brand" | "mint"
  }
> = {
  services: {
    title: "Six practices.",
    body: "Advisory built for the business of sports and the markets around it.",
    href: "/services",
    cta: "All Services",
    tone: "brand",
  },
  solutions: {
    title: "Our Solutions.",
    body: "Proprietary programmes and indices that demonstrate what is possible.",
    href: "/solutions",
    cta: "All Solutions",
    tone: "mint",
  },
}

// Midnight dropdown that drops from the fixed nav bar, matching it (desktop
// only).
export function MegaMenu({
  menu,
  onNavigate,
}: {
  menu: MegaKey
  onNavigate: () => void
}) {
  const copy = intro[menu]

  return (
    <motion.div
      id="mega-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full bg-midnight"
    >
      <div
        key={menu}
        className="mx-auto grid max-w-[120rem] grid-cols-12 gap-8 px-6 py-8 lg:px-10"
      >
        <div className="col-span-3 flex flex-col items-start gap-4">
          <p className="font-heading text-2xl text-white">{copy.title}</p>
          <p className="text-sm leading-relaxed text-white/70">{copy.body}</p>
          <ArrowLink
            href={copy.href}
            onClick={onNavigate}
            tone={copy.tone}
            className="mt-2"
          >
            {copy.cta}
          </ArrowLink>
        </div>

        {menu === "services" ? (
          // Cards share rows (subgrid) so titles and summaries line up.
          <ul className="col-span-9 grid grid-cols-3 gap-x-2">
            {services.map((service) => (
              <li
                key={service.slug}
                className="row-span-3 grid grid-rows-subgrid"
              >
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onNavigate}
                  className="group row-span-3 grid grid-rows-subgrid gap-y-3 rounded-lg p-4 transition-colors duration-200 outline-none hover:bg-white/5 focus-visible:bg-white/5"
                >
                  <ServiceIcon
                    slug={service.slug}
                    className="size-5 text-white/70 transition-colors duration-300 group-hover:text-white"
                  />
                  <span className="font-heading text-base leading-tight text-white">
                    {service.title}
                  </span>
                  <span className="text-xs leading-snug text-white/70">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="col-span-9 grid grid-cols-4 gap-3">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  onClick={onNavigate}
                  className="group flex h-full flex-col overflow-hidden rounded-xl bg-white/5 transition-colors duration-200 outline-none hover:bg-white/10 focus-visible:bg-white/10"
                >
                  <span className="relative block aspect-[16/9] overflow-hidden bg-midnight">
                    <Image
                      src={solution.image}
                      alt=""
                      fill
                      sizes="600px"
                      className="object-cover transition-[scale] duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 flex-col gap-2 p-4">
                    <span className="text-sm font-medium text-mint">
                      {solution.kicker}
                    </span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="font-heading text-base leading-tight text-white">
                        {solution.short ?? solution.title}
                      </span>
                      <Arrow
                        size={14}
                        className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}
