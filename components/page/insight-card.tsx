import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { formatDate, type Insight } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"

// Photo card for a single insight, typed with an Electric tag.
export function InsightCard({
  insight,
  className,
  size = "default",
}: {
  insight: Insight
  className?: string
  size?: "default" | "large"
}) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn("group flex flex-col gap-5 text-oxford", className)}
    >
      <span
        className={cn(
          "relative block overflow-hidden bg-oxford",
          size === "large" ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]"
        )}
      >
        <Image
          src={insight.image}
          alt=""
          fill
          sizes={
            size === "large"
              ? "(min-width: 768px) 60vw, 100vw"
              : "(min-width: 768px) 40vw, 100vw"
          }
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
        />
        <span className="absolute top-0 left-0 bg-electric px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase">
          {insight.type}
        </span>
      </span>
      <span className="flex gap-4 text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
        <span>{formatDate(insight.date)}</span>
        <span>{insight.topic}</span>
      </span>
      <span
        className={cn(
          "font-heading leading-[0.95]",
          size === "large" ? "text-[clamp(2rem,3.6vw,3.5rem)]" : "text-[1.9rem]"
        )}
      >
        {insight.title}
      </span>
      {size === "large" && (
        <span className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {insight.excerpt}
        </span>
      )}
      <span className="flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase">
        Read {insight.type.toLowerCase()}
        <Arrow
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
