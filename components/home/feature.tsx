import Image from "next/image"

import { findSolution } from "@/lib/content"
import { Eyebrow } from "@/components/ui/eyebrow"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// Feature band: one solution's copy and outcomes beside its photo. Full-width
// midnight band: the one dark break in the white run of the home page.
export function Feature({ slug = "sports-power-index" }: { slug?: string }) {
  const solution = findSolution(slug)
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

        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={solution.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  )
}
