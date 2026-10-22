import Link from "next/link"

import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"

// Each tile owns a logo colour. On devices that can hover the tiles start
// white and fill with their colour on hover; on touch devices (no hover) the
// colour is always on, so phones and tablets see it too.
const tiles: { title: string; body: string; href: string; tone: string }[] = [
  {
    title: "Careers",
    body: "Do the best work of your career in African sports.",
    href: "/careers",
    tone: "bg-mint text-midnight border-mint [@media(hover:hover)]:hover:bg-mint [@media(hover:hover)]:hover:border-mint",
  },
  {
    title: "Solutions",
    body: "Our programmes and indices, built to demonstrate possibility.",
    href: "/solutions",
    tone: "bg-brand text-white border-brand [@media(hover:hover)]:hover:bg-brand [@media(hover:hover)]:hover:border-brand [@media(hover:hover)]:hover:text-white",
  },
  {
    title: "Contact",
    body: "Start a conversation, or book a DMP speaker.",
    href: "/contact",
    tone: "bg-midnight text-white border-midnight [@media(hover:hover)]:hover:bg-midnight [@media(hover:hover)]:hover:border-midnight [@media(hover:hover)]:hover:text-white",
  },
]

// Closing link tiles (after PwC's Careers / Press room / Offices row).
export function Explore() {
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-16 md:py-20 lg:px-10">
      <Reveal className="grid gap-3 md:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className={cn(
              "group flex min-h-48 flex-col justify-end gap-8 rounded-xl border p-6 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-electric md:p-8",
              // Hover-capable devices: white at rest.
              "[@media(hover:hover)]:border-border [@media(hover:hover)]:bg-background [@media(hover:hover)]:text-midnight",
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
