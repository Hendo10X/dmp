import { findSolution } from "@/lib/content"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { ParallaxImage } from "@/components/page/parallax-image"

// Feature banner for a flagship piece (after PwC's "Decoding ROI from AI"
// promo): wide photo with an Oxford panel alongside.
export function Feature({ slug = "sports-power-index" }: { slug?: string }) {
  const solution = findSolution(slug)
  if (!solution) return null

  return (
    <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
      <div className="grid md:grid-cols-12">
        <ParallaxImage
          src={solution.image}
          alt=""
          sizes="(min-width: 768px) 80vw, 200vw"
          className="aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[34rem]"
        />
        <div className="flex flex-col justify-between gap-12 bg-oxford p-6 text-white md:col-span-5 md:p-10">
          <Reveal y={16}>
            <span className="inline-flex bg-lime px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-oxford uppercase">
              Featured {solution.kicker.toLowerCase()}
            </span>
          </Reveal>
          <div className="flex flex-col items-start gap-6">
            <SplitReveal className="text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[0.92] tracking-[0.01em]">
              {solution.title}
            </SplitReveal>
            <SplitReveal
              as="p"
              className="max-w-md text-base leading-relaxed text-white/80 md:text-lg"
            >
              {solution.summary} See who is rising, and why.
            </SplitReveal>
            <Reveal y={16} className="mt-2">
              <ArrowLink href={`/solutions/${solution.slug}`}>
                Explore the index
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
