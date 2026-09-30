"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/home/eyebrow"

// Placeholder titles until real insights exist.
const insights = [
  {
    title: "Why federations need a data strategy before a new stadium",
    type: "Report",
    year: "26",
    image: "/Images/pexels-mart-production-7089032.jpg",
  },
  {
    title: "The investable league: what capital looks for in African sport",
    type: "Insight",
    year: "26",
    image: "/Images/pexels-bohdan-hyrovych-796614725-38355572.jpg",
  },
  {
    title: "Wearables, welfare and the athlete data question",
    type: "Perspective",
    year: "25",
    image: "/Images/pexels-justyzvidz-5646004.jpg",
  },
  {
    title: "From grassroots to podium: measuring a talent pathway",
    type: "Report",
    year: "25",
    image: "/Images/pexels-franco-monsalvo-252430633-38675822.jpg",
  },
]

export function Insights() {
  const [active, setActive] = React.useState<number | null>(null)
  const list = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 })

  const onMove = (event: React.PointerEvent) => {
    const box = list.current?.getBoundingClientRect()
    if (!box) return
    x.set(event.clientX - box.left)
    y.set(event.clientY - box.top)
  }

  return (
    <section className="relative z-10 bg-background px-4 py-24 md:px-7 md:py-36">
      <Reveal className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <Eyebrow className="text-oxford/70">Insights</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[0.95] tracking-[0.01em] text-oxford">
            Thinking from the field.
          </h2>
        </div>
        <ArrowLink href="/insights" tone="muted">
          All insights
        </ArrowLink>
      </Reveal>

      <Reveal className="mt-14 md:mt-20">
        <div
          ref={list}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          className="relative"
        >
          <ul>
            {insights.map((item, index) => (
              <li key={item.title}>
                <Link
                  href="/insights"
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    "grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-oxford/15 py-6 text-oxford transition-colors duration-500 outline-none md:grid-cols-12 md:py-7",
                    active !== null && active !== index && "text-oxford/35"
                  )}
                >
                  <span className="col-span-full flex items-baseline gap-3 text-lg leading-snug md:col-span-7 md:text-2xl">
                    <span
                      aria-hidden
                      className={cn(
                        "size-2 shrink-0 translate-y-[-0.15em] bg-oxford transition-transform duration-500",
                        active === index ? "scale-100" : "scale-0"
                      )}
                    />
                    {item.title}
                  </span>
                  <span className="text-sm text-muted-foreground md:col-span-3 md:col-start-9 md:text-base">
                    {item.type}
                  </span>
                  <span className="text-right text-sm md:col-span-1 md:col-start-12 md:text-base">
                    &rsquo;{item.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Photo that trails the pointer; pointer devices only. */}
          <motion.div
            aria-hidden
            style={{ x: springX, y: springY }}
            className="pointer-events-none absolute top-0 left-0 hidden [@media(hover:hover)]:block"
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
              {insights.map((item, index) => (
                <Image
                  key={item.image}
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
    </section>
  )
}
