import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { solutions } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Shape } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"

// Three tall photo tiles for the proprietary solutions, after PwC's
// "Three ways to unlock new growth" row. Photo deepens and the summary
// lifts on hover.
export function SolutionTiles({ className }: { className?: string }) {
  return (
    <Reveal className={cn("grid gap-2 md:grid-cols-3", className)}>
      {solutions.map((solution) => (
        <Link
          key={solution.slug}
          href={`/solutions/${solution.slug}`}
          className="group relative flex min-h-[26rem] flex-col justify-between overflow-hidden bg-oxford p-6 text-white outline-none focus-visible:ring-2 focus-visible:ring-electric md:min-h-[34rem] md:p-7"
        >
          <Image
            src={solution.image}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 200vw"
            className="object-cover transition-[scale] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
          />
          {/* Oxford wash: light at rest, deepens on hover for legibility. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-oxford via-oxford/50 to-oxford/10 transition-opacity duration-700 group-hover:opacity-90"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-oxford/0 transition-colors duration-700 group-hover:bg-oxford/40"
          />

          <span className="relative flex items-center justify-between">
            <span className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
              {solution.kicker}
            </span>
            <Shape
              name={solution.shape}
              className="size-7 text-white transition-[rotate,color] duration-700 group-hover:rotate-90 group-hover:text-lime"
            />
          </span>

          <span className="relative flex flex-col gap-4">
            <span className="font-heading text-[clamp(2.25rem,3.2vw,3rem)] leading-[0.92]">
              {solution.title}
            </span>
            <span className="max-w-sm text-sm leading-relaxed text-white/80 md:text-base">
              {solution.summary}
            </span>
            <span className="mt-2 flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
              Explore {solution.kicker.toLowerCase()}
              <Arrow
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </span>
          </span>
        </Link>
      ))}
    </Reveal>
  )
}
