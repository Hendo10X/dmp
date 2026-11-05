"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Arrow } from "@/components/ui/arrow"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/page/section-header"
import { CountUp } from "@/components/motion/count-up"
import type { HomeContent, Stat } from "@/lib/site-content"

type Column = {
  id: string
  // Resting flex share, and how hard it gives way when another column is
  // hovered. Unequal factors make the squeeze deliberately lopsided.
  grow: number
  yield: number
  height: string
  tone: string
}

// The three number columns take Sanity's stats in order (first, second,
// third); the case column sits second.
const statSlot: Record<string, number> = { bookings: 0, retention: 1, reach: 2 }

const columns: Column[] = [
  {
    id: "bookings",
    grow: 1,
    yield: 0.72,
    height: "h-[58%]",
    tone: "bg-lime text-midnight",
  },
  {
    id: "case",
    grow: 2.4,
    yield: 0.86,
    height: "h-full",
    tone: "bg-electric/35 text-midnight",
  },
  {
    id: "retention",
    grow: 1,
    yield: 0.62,
    height: "h-[80%]",
    tone: "bg-midnight text-white",
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

export function Impact({ content }: { content: HomeContent["impact"] }) {
  const [active, setActive] = React.useState<string | null>(null)
  const { header, stats, story } = content
  const shown = columns.filter(
    (column) => column.id === "case" || stats[statSlot[column.id]]
  )

  const growFor = (column: Column) => {
    if (!active) return column.grow
    if (active === column.id)
      return column.grow * (column.id === "case" ? 1.4 : HOVER_GROWTH)
    return column.grow * column.yield
  }

  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pt-8 pb-6 md:pt-10 md:pb-8 lg:px-10">
      <SectionHeader
        eyebrow={header.eyebrow}
        title={header.title}
        intro={header.intro}
      />

      <Reveal className="mt-10 flex flex-col gap-3 md:mt-12 md:h-[34rem] md:flex-row md:items-end md:gap-2">
        {shown.map((column) => (
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
              <CaseColumn story={story} />
            ) : (
              <StatColumn stat={stats[statSlot[column.id]]} />
            )}
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function StatColumn({ stat }: { stat: Stat }) {
  return (
    <div className="flex h-full min-h-44 flex-col justify-between gap-10 p-5 md:p-6">
      <span className="font-display text-[clamp(2.25rem,3.4vw,3.5rem)] leading-none whitespace-nowrap">
        <CountUp value={stat.value} />
      </span>
      <span className="max-w-[14rem] text-sm leading-snug font-medium">
        {stat.label}
      </span>
    </div>
  )
}

function CaseColumn({ story }: { story: HomeContent["impact"]["story"] }) {
  return (
    <div className="flex h-full flex-col gap-6 p-5 md:flex-row md:p-6">
      <div className="flex min-w-[15rem] flex-1 flex-col justify-between gap-10">
        <div>
          <p className="text-sm font-medium opacity-70">{story.eyebrow}</p>
          <h3 className="mt-3 max-w-xs font-display text-xl leading-[1.15] md:text-2xl">
            {story.title}
          </h3>
          <Link
            href={
              story.caseStudy
                ? `/case-studies/${story.caseStudy}`
                : "/case-studies"
            }
            className="group mt-5 inline-flex items-center gap-2 text-sm font-medium"
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
            <CountUp value={story.stat.value} />
          </span>
          <span className="mt-3 block max-w-[16rem] text-sm leading-snug font-medium">
            {story.stat.label}
          </span>
        </div>
      </div>
      <div className="relative aspect-[4/3] min-w-0 flex-1 overflow-hidden md:aspect-auto">
        <Image
          src={story.image}
          alt={story.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}
