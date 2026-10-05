import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { findSector, findService, type CaseStudy } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"

// Photo card for a case study: image zooms gently on hover, the lead stat
// sits on a lime tag.
export function CaseStudyCard({
  study,
  className,
  size = "default",
}: {
  study: CaseStudy
  className?: string
  size?: "default" | "large"
}) {
  const service = findService(study.service)
  const sector = findSector(study.sector)
  const lead = study.stats[0]

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group flex flex-col gap-5 text-oxford outline-none",
        className
      )}
    >
      <span
        className={cn(
          "relative block overflow-hidden rounded-xl bg-oxford",
          size === "large" ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]"
        )}
      >
        <Image
          src={study.image}
          alt=""
          fill
          sizes={
            size === "large"
              ? "(min-width: 768px) 60vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
        />
        {lead && (
          <span className="absolute bottom-3 left-3 flex items-baseline gap-3 rounded-lg bg-lime px-3 py-2">
            <span className="font-heading text-3xl leading-none">
              {lead.value}
            </span>
            <span className="max-w-[10rem] font-mono text-[10px] leading-tight tracking-wider uppercase">
              {lead.label}
            </span>
          </span>
        )}
      </span>
      <span className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
        {service && <span>{service.title}</span>}
        {sector && <span>{sector.title}</span>}
      </span>
      <span
        className={cn(
          "font-heading leading-tight group-focus-visible:text-electric",
          size === "large" ? "text-[clamp(1.5rem,2.4vw,2rem)]" : "text-xl"
        )}
      >
        {study.title}
      </span>
      <span className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase">
        Read case study
        <Arrow
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
