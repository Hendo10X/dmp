import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { services } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"

// The six services as photo cards under a midnight-blue tint, with a deeper
// fade under the copy. Cards share their rows (CSS subgrid) so titles,
// summaries and links line up across each row. Used on Home, Services and
// Solutions.
export function ServiceCards({ className }: { className?: string }) {
  return (
    <Reveal
      className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group relative row-span-5 grid grid-rows-subgrid gap-y-3 overflow-hidden rounded-xl bg-midnight p-7 text-white outline-none focus-visible:ring-2 focus-visible:ring-electric"
        >
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-[scale] duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
          />
          {/* Even midnight-blue tint over the whole photo so the white copy
              always stands out (client), plus a deeper fade under the text.
              The tint lifts slightly on hover. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-midnight/55 transition-colors duration-700 group-hover:bg-midnight/40"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-midnight/90 via-midnight/20 to-transparent"
          />

          <span className="relative flex items-start justify-between">
            <span className="font-mono text-xs text-white/70">
              {String(index + 1).padStart(2, "0")}
            </span>
          </span>

          <span aria-hidden className="h-16" />

          <span className="relative font-heading text-xl leading-tight">
            {service.title}
          </span>
          <span className="relative text-sm leading-relaxed text-white/80">
            {service.summary}
          </span>
          <span className="relative mt-1 flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
            Explore
            <Arrow
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </Link>
      ))}
    </Reveal>
  )
}
