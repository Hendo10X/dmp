import { getSiteContent } from "@/lib/cms"
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

// Feature band: one solution's copy and outcomes beside a stats card of the
// index (client asked for the card back). Full-width midnight band: the one
// dark break in the white run of the home page. The solution is picked on
// Sanity's Home page; if it is missing, the first solution shows.
export async function Feature() {
  const content = await getSiteContent()
  const solution =
    content.solutions.find((s) => s.slug === content.home.feature.solution) ??
    content.solutions[0]
  if (!solution) return null

  return (
    <section className="relative z-10 bg-midnight text-white">
      <div className="mx-auto grid max-w-[120rem] items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-20 lg:px-10">
        <div>
          <Reveal y={12}>
            <Eyebrow className="text-mint">
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
            <ul className="mb-10 space-y-3">
              {solution.outcomes.map((outcome) => (
                <li key={outcome} className="text-sm text-white md:text-base">
                  {outcome}
                </li>
              ))}
            </ul>
            <ArrowLink href={`/solutions/${solution.slug}`} tone="mint">
              Explore the index
            </ArrowLink>
          </Reveal>
        </div>

        {/* Stats card: a ranked preview of the index. */}
        <Reveal className="rounded-xl bg-background p-6 text-midnight md:p-8">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <p className="font-heading text-xl">{solution.title}</p>
            <p className="text-sm text-midnight/70">Power score</p>
          </div>
          <ul className="space-y-5">
            {preview.map((row) => (
              <li key={row.name} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="text-sm text-midnight/70">{row.rank}</span>
                <span className="flex flex-col gap-2">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold">
                      {row.name}
                      <span className="ml-2 font-normal text-midnight/70">
                        {row.focus}
                      </span>
                    </span>
                    <span className="text-sm font-semibold">{row.score}</span>
                  </span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: `${row.score}%` }}
                    />
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-midnight/70">Illustrative preview</p>
        </Reveal>
      </div>
    </section>
  )
}
