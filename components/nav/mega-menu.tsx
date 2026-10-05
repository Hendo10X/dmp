"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { services, solutions } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"
import { Shape, type ShapeName } from "@/components/ui/shape"
import { ArrowLink } from "@/components/ui/arrow-link"

export type MegaKey = "services" | "solutions"

const accent: Record<ShapeName, string> = {
  circle: "group-hover:text-lime",
  square: "group-hover:text-electric",
  triangle: "group-hover:text-crimson",
  quarter: "group-hover:text-oxford",
  diamond: "group-hover:text-electric",
  ring: "group-hover:text-lime",
}

const intro: Record<
  MegaKey,
  { title: string; body: string; href: string; cta: string }
> = {
  services: {
    title: "Six practices.",
    body: "Advisory built for the business of sport and the markets around it.",
    href: "/services",
    cta: "All services",
  },
  solutions: {
    title: "Our solutions.",
    body: "Proprietary programmes and indices that demonstrate what is possible.",
    href: "/solutions",
    cta: "All solutions",
  },
}

// Light dropdown that drops from the fixed nav bar (desktop only).
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
      className="absolute inset-x-0 top-full border-b border-border bg-background/95 backdrop-blur-md"
    >
      <div
        key={menu}
        className="mx-auto grid max-w-6xl grid-cols-12 gap-8 px-6 py-8"
      >
        <div className="col-span-3 flex flex-col items-start gap-4">
          <p className="font-heading text-2xl text-oxford">{copy.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {copy.body}
          </p>
          <ArrowLink href={copy.href} onClick={onNavigate} className="mt-2">
            {copy.cta}
          </ArrowLink>
        </div>

        {menu === "services" ? (
          <ul className="col-span-9 grid grid-cols-3 gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onNavigate}
                  className="group flex h-full flex-col gap-3 rounded-lg p-4 transition-colors duration-200 outline-none hover:bg-surface focus-visible:bg-surface"
                >
                  <Shape
                    name={service.shape}
                    className={cn(
                      "size-5 text-oxford/25 transition-[color,rotate] duration-300 group-hover:rotate-90",
                      accent[service.shape]
                    )}
                  />
                  <span className="font-heading text-base leading-tight text-oxford">
                    {service.title}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="col-span-9 grid grid-cols-3 gap-3">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  onClick={onNavigate}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border transition-colors duration-200 outline-none hover:bg-surface focus-visible:bg-surface"
                >
                  <span className="relative block aspect-[16/9] overflow-hidden bg-oxford">
                    <Image
                      src={solution.image}
                      alt=""
                      fill
                      sizes="600px"
                      className="object-cover transition-[scale] duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 flex-col gap-2 p-4">
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {solution.kicker}
                    </span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="font-heading text-base leading-tight text-oxford">
                        {solution.title}
                      </span>
                      <Arrow
                        size={14}
                        className="shrink-0 text-oxford transition-transform duration-300 group-hover:translate-x-1"
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
