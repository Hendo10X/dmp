"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { services, solutions } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"
import { Shape, type ShapeName } from "@/components/ui/shape"
import { ArrowLink } from "@/components/ui/arrow-link"
import { fade, panel } from "@/components/nav/anim"

export type MegaKey = "services" | "solutions"

const accent: Record<ShapeName, string> = {
  circle: "group-hover:text-lime",
  square: "group-hover:text-electric",
  triangle: "group-hover:text-crimson",
  quarter: "group-hover:text-lime",
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

// PwC-style dropdown that grows out of the nav bar (desktop only): an intro
// column plus the services grid or the solution cards.
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
      variants={panel}
      initial="closed"
      animate="open"
      exit="closed"
      className="overflow-hidden"
    >
      <motion.div
        key={menu}
        variants={fade}
        className="grid grid-cols-12 gap-6 px-6 pt-8 pb-8"
      >
        <div className="col-span-3 flex flex-col items-start gap-5 pr-6">
          <p className="font-heading text-5xl leading-none">{copy.title}</p>
          <p className="text-sm leading-relaxed text-white/70">{copy.body}</p>
          <ArrowLink href={copy.href} onClick={onNavigate} className="mt-2">
            {copy.cta}
          </ArrowLink>
        </div>

        {menu === "services" ? (
          <ul className="col-span-9 grid grid-cols-3 gap-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onNavigate}
                  className="group flex h-full flex-col gap-4 bg-white/5 p-5 transition-colors duration-300 outline-none hover:bg-white/10 focus-visible:bg-white/10"
                >
                  <Shape
                    name={service.shape}
                    className={cn(
                      "size-6 text-white/40 transition-[color,rotate] duration-500 group-hover:rotate-90",
                      accent[service.shape]
                    )}
                  />
                  <span className="font-heading text-2xl leading-[0.95]">
                    {service.title}
                  </span>
                  <span className="text-sm leading-snug text-white/60">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="col-span-9 grid grid-cols-3 gap-1">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  onClick={onNavigate}
                  className="group flex h-full flex-col bg-white/5 transition-colors duration-300 outline-none hover:bg-white/10 focus-visible:bg-white/10"
                >
                  <span className="relative block aspect-[16/9] overflow-hidden">
                    <Image
                      src={solution.image}
                      alt=""
                      fill
                      sizes="600px"
                      className="object-cover transition-[scale] duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 flex-col gap-3 p-5">
                    <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-lime uppercase">
                      {solution.kicker}
                    </span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="font-heading text-2xl leading-[0.95]">
                        {solution.title}
                      </span>
                      <Arrow
                        size={18}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  )
}
