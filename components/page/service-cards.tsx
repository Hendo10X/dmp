import Link from "next/link"

import { cn } from "@/lib/utils"
import { services } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Shape, type ShapeName } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"

// All Oxford at rest; when the card fills with Oxford, each mark takes its
// own accent and turns a quarter.
const accents: Record<ShapeName, string> = {
  circle:
    "group-hover:scale-75 group-hover:text-lime group-focus-visible:scale-75 group-focus-visible:text-lime",
  square: "group-hover:text-electric group-focus-visible:text-electric",
  triangle: "group-hover:text-crimson group-focus-visible:text-crimson",
  quarter: "group-hover:text-white group-focus-visible:text-white",
  diamond: "group-hover:text-electric group-focus-visible:text-electric",
  ring: "group-hover:text-lime group-focus-visible:text-lime",
}

// The six services as fill-on-hover cards. Used on Home and the
// Services hub.
export function ServiceCards({ className }: { className?: string }) {
  return (
    <Reveal
      className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group relative flex min-h-[20rem] flex-col justify-between overflow-hidden bg-secondary p-6 text-oxford outline-none focus-visible:ring-2 focus-visible:ring-electric md:min-h-[24rem] md:p-7"
        >
          {/* Oxford fill rising from the bottom on hover/focus. */}
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-oxford transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
          />

          <span className="relative flex items-start justify-between">
            <span className="font-heading text-sm transition-colors duration-700 group-hover:text-lime group-focus-visible:text-lime">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Shape
              name={service.shape}
              className={cn(
                "size-11 text-oxford transition-[rotate,scale,color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90 group-focus-visible:rotate-90 md:size-12",
                accents[service.shape]
              )}
            />
          </span>

          <span className="relative flex flex-col gap-4 transition-colors duration-700 group-hover:text-white group-focus-visible:text-white">
            <span className="font-heading text-[2rem] leading-[0.95]">
              {service.title}
            </span>
            <span className="text-sm leading-relaxed opacity-80">
              {service.summary}
            </span>
            <span className="mt-2 flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase">
              Explore
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
