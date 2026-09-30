import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/home/eyebrow"

// Placeholder pillars: the brief doesn't name them yet (docs/brief.md, Q2).
const pillars: {
  title: string
  body: string
  shape: ShapeName
  href: string
}[] = [
  {
    title: "Strategy & Governance",
    body: "Long-range plans, structures and policy for federations, leagues and public bodies.",
    shape: "circle",
    href: "/services/strategy-governance",
  },
  {
    title: "Performance Data & Technology",
    body: "Data platforms, analytics and digital tools that turn information into an edge.",
    shape: "square",
    href: "/services/performance-data-technology",
  },
  {
    title: "Commercial & Investment",
    body: "Revenue models, partnerships and investment cases that make sport bankable.",
    shape: "triangle",
    href: "/services/commercial-investment",
  },
  {
    title: "Research & Insight",
    body: "Evidence, market studies and reports that inform decisions and shape policy.",
    shape: "quarter",
    href: "/services/research-insight",
  },
]

export function Services() {
  return (
    <section className="relative z-10 bg-background px-4 pt-8 pb-24 md:px-7 md:pb-36">
      <Reveal className="grid gap-10 md:grid-cols-12 md:items-end md:gap-6">
        <div className="md:col-span-7">
          <Eyebrow className="text-oxford/70">What we do</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[0.95] tracking-[0.01em] text-oxford">
            Four ways we move sport forward.
          </h2>
        </div>
        <div className="flex flex-col items-start gap-8 md:col-span-4 md:col-start-9">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Each pillar stands on its own, and they work best together: strategy
            set by evidence, delivered through technology, funded by a model
            that lasts.
          </p>
          <ArrowLink href="/services" tone="muted">
            All services
          </ArrowLink>
        </div>
      </Reveal>

      <Reveal className="mt-14 grid gap-2 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {pillars.map((pillar, index) => (
          <Link
            key={pillar.href}
            href={pillar.href}
            className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden bg-secondary p-6 text-oxford outline-none focus-visible:ring-2 focus-visible:ring-electric md:min-h-[28rem] md:p-7"
          >
            {/* Oxford fill rising from the bottom on hover/focus. */}
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-oxford transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
            />

            <span className="relative flex items-start justify-between">
              <span className="font-display text-sm transition-colors duration-700 group-hover:text-lime group-focus-visible:text-lime">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Shape name={pillar.shape} />
            </span>

            <span className="relative flex flex-col gap-4 transition-colors duration-700 group-hover:text-white group-focus-visible:text-white">
              <span className="font-display text-[1.6rem] leading-[1.1]">
                {pillar.title}
              </span>
              <span className="text-sm leading-relaxed opacity-80">
                {pillar.body}
              </span>
              <span className="mt-2 flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase">
                Explore
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </span>
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  )
}

type ShapeName = "circle" | "square" | "triangle" | "quarter"

// One geometric mark per pillar, each in its own accent. On hover each turns
// a quarter, and the Oxford one flips to white to stay visible on the fill.
const shapes: Record<ShapeName, { className: string; path: React.ReactNode }> =
  {
    circle: {
      className: "text-lime group-hover:scale-75 group-focus-visible:scale-75",
      path: <circle cx="24" cy="24" r="22" />,
    },
    square: {
      className: "text-electric",
      path: <rect x="6" y="6" width="36" height="36" />,
    },
    triangle: {
      className: "text-crimson",
      path: <polygon points="24,3 45,43 3,43" />,
    },
    quarter: {
      className:
        "text-oxford group-hover:text-white group-focus-visible:text-white",
      path: <path d="M4 44 V4 A40 40 0 0 1 44 44 Z" />,
    },
  }

function Shape({ name }: { name: ShapeName }) {
  const shape = shapes[name]
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      fill="currentColor"
      className={cn(
        "size-11 transition-[rotate,scale,color] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90 group-focus-visible:rotate-90 md:size-12",
        shape.className
      )}
    >
      {shape.path}
    </svg>
  )
}
