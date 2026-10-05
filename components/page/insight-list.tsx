"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { formatDate, type Insight } from "@/lib/content"
import { Reveal } from "@/components/motion/reveal"

// Table-style list of insights. Desktop: title / type / year columns; the
// hovered row stays strong while the rest dim. Mobile: thumbnail + title +
// meta line.
export function InsightList({ items }: { items: Insight[] }) {
  const [active, setActive] = React.useState<number | null>(null)

  return (
    <Reveal>
      <div onPointerLeave={() => setActive(null)}>
        <ul>
          {items.map((item, index) => (
            <li key={item.slug}>
              <Link
                href={`/insights/${item.slug}`}
                onPointerEnter={(event) =>
                  event.pointerType === "mouse" && setActive(index)
                }
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className={cn(
                  "grid grid-cols-[4.5rem_1fr] items-center gap-x-4 border-b border-oxford/15 py-5 text-oxford transition-colors duration-500 outline-none sm:grid-cols-[6rem_1fr] md:grid-cols-12 md:items-baseline md:gap-x-6 md:py-7",
                  active !== null && active !== index && "md:text-oxford/35"
                )}
              >
                {/* Mobile thumbnail */}
                <span className="relative aspect-square overflow-hidden rounded-lg bg-oxford md:hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </span>

                <span className="flex min-w-0 flex-col gap-2 md:contents">
                  <span className="flex items-baseline gap-3 text-base leading-snug sm:text-lg md:col-span-7 md:text-2xl">
                    <span
                      aria-hidden
                      className={cn(
                        "hidden size-2 shrink-0 translate-y-[-0.15em] bg-oxford transition-transform duration-500 md:block",
                        active === index ? "scale-100" : "scale-0"
                      )}
                    />
                    {item.title}
                  </span>
                  <span className="flex gap-3 font-mono text-[11px] tracking-wider text-muted-foreground uppercase md:col-span-3 md:col-start-9 md:text-base md:tracking-normal md:normal-case">
                    {item.type}
                    <span className="md:hidden">{formatDate(item.date)}</span>
                  </span>
                  <span className="hidden text-right md:col-span-1 md:col-start-12 md:block">
                    &rsquo;{item.date.slice(2, 4)}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
