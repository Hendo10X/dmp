"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"
import { formatDate, type Insight } from "@/lib/content"
import { Reveal } from "@/components/motion/reveal"

// Table-style list of insights. Desktop: title / type / year columns with a
// photo that trails the pointer. Mobile: thumbnail + title + meta line.
export function InsightList({ items }: { items: Insight[] }) {
  const [active, setActive] = React.useState<number | null>(null)
  const box = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 })

  const onMove = (event: React.PointerEvent) => {
    const rect = box.current?.getBoundingClientRect()
    if (!rect) return
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  return (
    <Reveal>
      <div
        ref={box}
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
        className="relative"
      >
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
                <span className="relative aspect-square overflow-hidden bg-oxford md:hidden">
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
                  <span className="flex gap-3 text-xs tracking-[0.14em] text-muted-foreground uppercase md:col-span-3 md:col-start-9 md:text-base md:tracking-normal md:normal-case">
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

        {/* Photo that trails the pointer; mouse devices only. */}
        <motion.div
          aria-hidden
          style={{ x: springX, y: springY }}
          className="pointer-events-none absolute top-0 left-0 hidden [@media(hover:hover)]:md:block"
        >
          <motion.div
            initial={false}
            animate={{
              scale: active === null ? 0 : 1,
              opacity: active === null ? 0 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="relative -mt-28 -ml-24 h-56 w-48 overflow-hidden bg-oxford"
          >
            {items.map((item, index) => (
              <Image
                key={item.slug}
                src={item.image}
                alt=""
                fill
                sizes="192px"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  active === index ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Reveal>
  )
}
