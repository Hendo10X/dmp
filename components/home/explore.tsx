import Link from "next/link"

import { cn } from "@/lib/utils"
import { getSiteContent } from "@/lib/cms"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/page/section-header"

// Each tile owns a logo colour, always on (client: plain white felt dull),
// assigned in order. Hover lifts the tile slightly and nudges the arrow.
const tones = [
  "bg-mint text-midnight",
  "bg-brand text-white",
  "bg-midnight text-white",
]

// Closing link tiles (after PwC's Careers / Press room / Offices row).
export async function Explore() {
  const { header, tiles } = (await getSiteContent()).home.explore
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
      <SectionHeader
        eyebrow={header.eyebrow}
        title={header.title}
        intro={header.intro}
      />
      <Reveal className="mt-10 grid gap-3 md:mt-12 md:grid-cols-3">
        {tiles.map((tile, index) => (
          <Link
            key={`${index}-${tile.href}`}
            href={tile.href}
            className={cn(
              "group flex min-h-48 flex-col justify-end gap-8 rounded-xl p-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-electric md:p-8",
              tones[index % tones.length]
            )}
          >
            <span className="flex items-end justify-between gap-6">
              <span className="flex flex-col gap-2">
                <span className="font-heading text-2xl leading-tight">
                  {tile.title}
                </span>
                <span className="text-sm opacity-75">{tile.body}</span>
              </span>
              <Arrow className="shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  )
}
