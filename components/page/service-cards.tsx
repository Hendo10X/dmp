import Link from "next/link"

import { cn } from "@/lib/utils"
import { services } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Shape, type ShapeName } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"

// Shapes start as faint Oxford marks and take their accent on hover.
const accents: Record<ShapeName, string> = {
  circle: "group-hover:text-lime",
  square: "group-hover:text-electric",
  triangle: "group-hover:text-crimson",
  quarter: "group-hover:text-oxford",
  diamond: "group-hover:text-electric",
  ring: "group-hover:text-lime",
}

// The six services as a hairline grid of cells (Crowdline template).
// Used on Home, Services and Solutions.
export function ServiceCards({ className }: { className?: string }) {
  return (
    <Reveal
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group flex min-h-72 flex-col justify-between gap-10 bg-background p-8 transition-colors duration-300 outline-none hover:bg-surface focus-visible:bg-surface"
        >
          <span className="flex items-start justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Shape
              name={service.shape}
              className={cn(
                "size-9 text-oxford/15 transition-[color,rotate] duration-500 group-hover:rotate-90",
                accents[service.shape]
              )}
            />
          </span>

          <span className="flex flex-col gap-3">
            <span className="font-heading text-xl leading-tight text-oxford">
              {service.title}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {service.summary}
            </span>
            <span className="mt-2 flex items-center gap-2 font-mono text-xs tracking-wider text-oxford uppercase">
              Explore
              <Arrow
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </span>
        </Link>
      ))}
    </Reveal>
  )
}
