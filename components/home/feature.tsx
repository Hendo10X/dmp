import { getSiteContent } from "@/lib/cms"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// Feature band: one solution's copy and outcomes beside a card of how it
// works (the solution's own steps; no sample figures). Full-width midnight
// band: the one dark break in the white run of the home page. The solution is picked on
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
              Explore the solution
            </ArrowLink>
          </Reveal>
        </div>

        {/* How it works: the solution's own steps, numbered. */}
        <Reveal className="rounded-xl bg-background p-6 text-midnight md:p-8">
          <p className="font-heading text-xl">How it works</p>
          <ol className="mt-6 flex flex-col gap-6">
            {solution.how.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[2rem_1fr] items-baseline gap-3"
              >
                <span className="text-sm font-semibold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-heading text-lg leading-tight">
                    {step.title}
                  </span>
                  <span className="text-sm leading-relaxed text-midnight/70">
                    {step.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
