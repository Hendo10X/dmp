import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SplitReveal } from "@/components/motion/split-reveal"

// Partner or client quote on Electric Blue. Default copy is placeholder.
export function Quote({
  eyebrow = "From our partners",
  text = "The opportunities in African sport are not aspiration. They are possibilities already within reach. Our work is to demonstrate them.",
  by = "Founding Partner, DMPartners",
}: {
  eyebrow?: string
  text?: string
  by?: string
}) {
  return (
    <section className="relative z-10 overflow-hidden bg-electric text-oxford">
      <div className="grid gap-10 px-4 py-24 md:grid-cols-12 md:gap-6 md:px-7 md:py-32">
        <Reveal y={16} className="md:col-span-3">
          <Eyebrow marker="bg-oxford">{eyebrow}</Eyebrow>
        </Reveal>
        <figure className="md:col-span-9">
          <SplitReveal
            as="blockquote"
            className="text-[clamp(1.6rem,3.4vw,3.25rem)] leading-[1.15] tracking-tight"
          >
            &ldquo;{text}&rdquo;
          </SplitReveal>
          <Reveal y={16}>
            <figcaption className="mt-10 text-[0.7rem] tracking-[0.18em] uppercase">
              {by}
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}

// "Talk to us" CTA from the brief. Closes every page, on lime.
export function Cta({
  title = "Got a challenge in sport? Let’s talk.",
  body = "Tell us where you are and where you want to be. We will take it from there.",
  href = "/contact",
  label = "Talk to us",
}: {
  title?: string
  body?: string
  href?: string
  label?: string
}) {
  return (
    <section className="relative z-10 bg-lime px-4 py-24 text-oxford md:px-7 md:py-36">
      <div className="grid gap-12 md:grid-cols-12 md:items-end md:gap-6">
        <SplitReveal className="text-[clamp(2.75rem,6.5vw,7rem)] leading-[0.95] tracking-[0.01em] md:col-span-9">
          {title}
        </SplitReveal>
        <div className="flex flex-col items-start gap-6 md:col-span-3">
          <SplitReveal as="p" className="text-base leading-relaxed">
            {body}
          </SplitReveal>
          <Reveal y={16}>
            <ArrowLink href={href} tone="dark">
              {label}
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
