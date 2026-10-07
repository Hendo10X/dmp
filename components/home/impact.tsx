"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Arrow } from "@/components/ui/arrow"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/page/section-header"
import { images } from "@/lib/content"
import { CountUp } from "@/components/motion/count-up"

type Column = {
  id: string
  // Resting flex share, and how hard it gives way when another column is
  // hovered. Unequal factors make the squeeze deliberately lopsided.
  grow: number
  yield: number
  height: string
  tone: string
}

// Illustrative figures only: replace with real, client-approved results.
const stats = {
  bookings: { value: "38%", label: "Increase in matchday revenue" },
  hero: { value: "2.4×", label: "Faster reporting to the federation board" },
  retention: { value: "91%", label: "Sponsor renewal rate" },
  reach: { value: "12", label: "Member associations on one data platform" },
}

const columns: Column[] = [
  {
    id: "bookings",
    grow: 1,
    yield: 0.72,
    height: "h-[58%]",
    tone: "bg-lime text-oxford",
  },
  {
    id: "case",
    grow: 2.4,
    yield: 0.86,
    height: "h-full",
    tone: "bg-electric/35 text-oxford",
  },
  {
    id: "retention",
    grow: 1,
    yield: 0.62,
    height: "h-[80%]",
    tone: "bg-oxford text-white",
  },
  {
    id: "reach",
    grow: 1,
    yield: 0.8,
    height: "h-[90%]",
    tone: "bg-crimson text-white",
  },
]

const HOVER_GROWTH = 2

export function Impact() {
  const [active, setActive] = React.useState<string | null>(null)

  const growFor = (column: Column) => {
    if (!active) return column.grow
    if (active === column.id)
      return column.grow * (column.id === "case" ? 1.4 : HOVER_GROWTH)
    return column.grow * column.yield
  }

  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
      <SectionHeader
        eyebrow="Client impact"
        title="Results you can read on a scoreboard."
        intro="Good strategy shows up in numbers. Here is what changes when sport is run with evidence, modern systems and a clear commercial plan."
      />

      <Reveal className="mt-14 flex flex-col gap-3 md:mt-16 md:h-[34rem] md:flex-row md:items-end md:gap-2">
        {columns.map((column) => (
          <div
            key={column.id}
            onMouseEnter={() => setActive(column.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(column.id)}
            onBlur={() => setActive(null)}
            style={{ "--grow": growFor(column) } as React.CSSProperties}
            className={cn(
              "relative min-w-0 overflow-hidden rounded-xl transition-[flex-grow,height] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] md:grow-(--grow) md:basis-0",
              // No column squeezes narrower than its content, so figures and
              // the case copy stay whole while a neighbour is open.
              "md:min-w-min",
              column.tone,
              column.height,
              active === column.id && "md:h-full",
              "max-md:h-auto"
            )}
          >
            {column.id === "case" ? (
              <CaseColumn />
            ) : (
              <StatColumn stat={stats[column.id as keyof typeof stats]} />
            )}
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function StatColumn({ stat }: { stat: { value: string; label: string } }) {
  return (
    <div className="flex h-full min-h-44 flex-col justify-between gap-10 p-5 md:p-6">
      <span className="font-display text-[clamp(2.25rem,3.4vw,3.5rem)] leading-none whitespace-nowrap">
        <CountUp value={stat.value} />
      </span>
      <span className="max-w-[14rem] font-mono text-[11px] leading-snug tracking-wider uppercase">
        {stat.label}
      </span>
    </div>
  )
}

function CaseColumn() {
  return (
    <div className="flex h-full flex-col gap-6 p-5 md:flex-row md:p-6">
      <div className="flex min-w-[15rem] flex-1 flex-col justify-between gap-10">
        <div>
          <p className="font-mono text-xs tracking-wider uppercase opacity-70">
            Case study
          </p>
          <h3 className="mt-3 max-w-xs font-display text-xl leading-[1.15] md:text-2xl">
            A national federation rebuilds around its data
          </h3>
          <Link
            href="/case-studies/federation-data-rebuild"
            className="group mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase"
          >
            Read case study
            <Arrow
              size={16}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div>
          <span className="block font-display text-[clamp(3rem,5vw,5rem)] leading-none">
            <CountUp value={stats.hero.value} />
          </span>
          <span className="mt-3 block max-w-[16rem] font-mono text-[11px] leading-snug tracking-wider uppercase">
            {stats.hero.label}
          </span>
        </div>
      </div>
      <div className="relative aspect-[4/3] min-w-0 flex-1 overflow-hidden md:aspect-auto">
        <Image
          src={images.research}
          alt="An analyst presenting performance data to colleagues"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}
