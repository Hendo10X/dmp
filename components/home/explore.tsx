import Link from "next/link"

import { Arrow } from "@/components/ui/arrow"
import { Shape, type ShapeName } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"

const tiles: { title: string; body: string; href: string; shape: ShapeName }[] =
  [
    {
      title: "Careers",
      body: "Do the best work of your career in African sport.",
      href: "/careers",
      shape: "circle",
    },
    {
      title: "Solutions",
      body: "Our programmes and indices, built to demonstrate possibility.",
      href: "/solutions",
      shape: "diamond",
    },
    {
      title: "Contact",
      body: "Start a conversation, or book a DMP speaker.",
      href: "/contact",
      shape: "square",
    },
  ]

// Closing link tiles (after PwC's Careers / Press room / Offices row).
export function Explore() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-28">
      <Reveal className="grid gap-3 md:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group flex min-h-48 flex-col justify-between gap-8 rounded-xl border border-border bg-background p-6 text-oxford transition-colors duration-300 hover:bg-surface md:p-8"
          >
            <Shape
              name={tile.shape}
              className="size-7 text-oxford/20 transition-[rotate,color] duration-500 group-hover:rotate-90 group-hover:text-oxford"
            />
            <span className="flex items-end justify-between gap-6">
              <span className="flex flex-col gap-2">
                <span className="font-heading text-2xl leading-tight">
                  {tile.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tile.body}
                </span>
              </span>
              <Arrow className="shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  )
}
