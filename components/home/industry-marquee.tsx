import { cn } from "@/lib/utils"
import { industries } from "@/lib/content"

// The industries DMP works across, as two slow ticker rows running in
// opposite directions (CSS only). Each row is rendered twice end to end so
// the loop is seamless; hovering a row pauses it. The edges fade out with a
// mask. Reduced motion: one static, wrapped list instead.
export function IndustryMarquee({ className }: { className?: string }) {
  const half = Math.ceil(industries.length / 2)
  const rows = [industries.slice(0, half), industries.slice(half)]

  return (
    <div className={cn("min-w-0", className)}>
      {/* The plain list: always read by screen readers (the ticker is
          aria-hidden), and shown on screen when motion is reduced. */}
      <ul className="sr-only flex-wrap gap-2 motion-reduce:not-sr-only motion-reduce:flex">
        {industries.map((industry) => (
          <li key={industry}>
            <Chip>{industry}</Chip>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="flex flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:hidden"
      >
        {rows.map((row, index) => (
          <div key={index} className="group flex overflow-hidden">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className={cn(
                  "flex shrink-0 gap-2 pr-2 group-hover:[animation-play-state:paused]",
                  index === 0
                    ? "animate-[marquee_38s_linear_infinite]"
                    : "animate-[marquee_38s_linear_infinite_reverse]"
                )}
              >
                {row.map((industry) => (
                  <Chip key={industry}>{industry}</Chip>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-border px-4 py-2 text-sm whitespace-nowrap text-midnight">
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-mint" />
      {children}
    </span>
  )
}
