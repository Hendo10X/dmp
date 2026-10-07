import { findSolution } from "@/lib/content"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// ILLUSTRATIVE preview rows: not real Sports Power Index results.
const preview = [
  { rank: 1, name: "Nigeria", focus: "Football & Leagues", score: 82 },
  { rank: 2, name: "Kenya", focus: "Athletics", score: 76 },
  { rank: 3, name: "South Africa", focus: "Rugby & Cricket", score: 74 },
  { rank: 4, name: "Egypt", focus: "Football & Venues", score: 69 },
  { rank: 5, name: "Senegal", focus: "Basketball", score: 61 },
]

// Feature band (Crowdline's "For publishers" section): copy and outcome
// bullets beside a window-style preview of the index. Full-width Oxford
// band: the one dark break in the white run of the home page.
export function Feature({ slug = "sports-power-index" }: { slug?: string }) {
  const solution = findSolution(slug)
  if (!solution) return null

  return (
    <section className="relative z-10 bg-oxford text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 md:grid-cols-2 md:py-28">
        <div>
          <Reveal y={12}>
            <Eyebrow className="text-electric">
              Featured {solution.kicker.toLowerCase()}
            </Eyebrow>
          </Reveal>
          <SplitReveal className="mt-3 mb-6 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08]">
            {solution.title}
          </SplitReveal>
          <SplitReveal
            as="p"
            className="mb-8 text-sm leading-relaxed text-white/70 md:text-base"
          >
            {solution.what}
          </SplitReveal>
          <Reveal y={12}>
            <ul className="mb-10 space-y-4">
              {solution.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 text-sm text-white"
                >
                  <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-lime" />
                  {outcome}
                </li>
              ))}
            </ul>
            <ArrowLink href={`/solutions/${solution.slug}`} tone="lime">
              Explore the index
            </ArrowLink>
          </Reveal>
        </div>

        {/* Window-style preview, after Crowdline's code snippet card. */}
        <Reveal className="overflow-hidden rounded-xl bg-background">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-crimson" />
            <span className="size-2.5 rounded-full bg-lime" />
            <span className="size-2.5 rounded-full bg-electric" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              sports-power-index.preview
            </span>
          </div>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              <span>Market</span>
              <span>Power score</span>
            </div>
            <ul className="space-y-4">
              {preview.map((row) => (
                <li
                  key={row.name}
                  className="grid grid-cols-[1.5rem_1fr] gap-3"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(row.rank).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-semibold text-oxford">
                        {row.name}
                        <span className="ml-2 font-normal text-muted-foreground">
                          {row.focus}
                        </span>
                      </span>
                      <span className="font-mono text-xs font-semibold text-oxford">
                        {row.score}
                      </span>
                    </span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <span
                        className="block h-full rounded-full bg-oxford"
                        style={{ width: `${row.score}%` }}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              Illustrative preview
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
