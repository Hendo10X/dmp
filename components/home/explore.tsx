import Link from "next/link"

import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"

// Each tile owns a logo colour, always on (client: plain white felt dull).
// Hover lifts the tile slightly and nudges the arrow.
const tiles: { title: string; body: string; href: string; tone: string }[] = [
  {
    title: "Careers",
    body: "Do the best work of your career in African sports.",
    href: "/careers",
    tone: "bg-mint text-midnight",
  },
  {
    title: "Solutions",
    body: "Our programmes and indices, built to demonstrate possibility.",
    href: "/solutions",
    tone: "bg-brand text-white",
  },
  {
    title: "Contact",
    body: "Start a conversation, or book a DMP speaker.",
    href: "/contact",
    tone: "bg-midnight text-white",
  },
]

// Closing link tiles (after PwC's Careers / Press room / Offices row).
export function Explore() {
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
      <Reveal className="grid gap-3 md:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className={cn(
              "group flex min-h-48 flex-col justify-end gap-8 rounded-xl p-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-electric md:p-8",
              tile.tone
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
