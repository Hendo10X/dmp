import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { solutions } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"

// Photo tiles for the proprietary solutions (four across on desktop), after
// PwC's "Three ways to unlock new growth" row. On desktop the tiles share their
// rows (CSS subgrid), so every title, summary and link sits on the same line
// as Federation Business Transformation's, whatever the title length.
export function SolutionTiles({ className }: { className?: string }) {
  return (
    <Reveal
      className={cn(
        "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_minmax(11rem,1fr)_auto_auto_auto]",
        className
      )}
    >
      {solutions.map((solution) => (
        <Link
          key={solution.slug}
          href={`/solutions/${solution.slug}`}
          className="group relative grid min-h-[26rem] grid-rows-[auto_1fr_auto_auto_auto] gap-y-3 overflow-hidden rounded-xl bg-midnight p-6 text-white outline-none focus-visible:ring-2 focus-visible:ring-electric md:p-7 lg:row-span-5 lg:min-h-0 lg:grid-rows-subgrid"
        >
          <Image
            src={solution.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-[scale] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
          />
          {/* Midnight wash: light at rest, deepens on hover for legibility. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/60 to-midnight/10 transition-opacity duration-700 group-hover:opacity-90"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-midnight/0 transition-colors duration-700 group-hover:bg-midnight/40"
          />

          <span className="relative flex items-center justify-between">
            <span className="text-sm font-medium">{solution.kicker}</span>
          </span>

          <span aria-hidden />

          <span className="relative font-heading text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.05]">
            {solution.title}
          </span>
          <span className="relative max-w-sm text-sm leading-relaxed text-white/70 md:text-base">
            {solution.summary}
          </span>
          <span className="relative mt-1 flex items-center gap-2 text-sm font-medium">
            Explore
            <Arrow
              size={16}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </span>
        </Link>
      ))}
    </Reveal>
  )
}
