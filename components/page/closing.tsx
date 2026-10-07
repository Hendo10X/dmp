import { ArrowLink } from "@/components/ui/arrow-link"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// Partner or client quote: centred pull quote on an electric band.
// Default copy is placeholder.
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
    <section className="relative z-10 bg-electric">
      <figure className="mx-auto max-w-4xl px-6 py-24 text-center md:py-28">
        <Reveal y={12} className="flex justify-center">
          <Eyebrow className="text-oxford/70">{eyebrow}</Eyebrow>
        </Reveal>
        <SplitReveal
          as="blockquote"
          className="mt-6 font-heading text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] text-oxford"
        >
          &ldquo;{text}&rdquo;
        </SplitReveal>
        <Reveal y={12}>
          <figcaption className="mt-8 font-mono text-xs tracking-wider text-oxford/70 uppercase">
            {by}
          </figcaption>
        </Reveal>
      </figure>
    </section>
  )
}

// "Talk to us" CTA (Crowdline's closing CTA) on Oxford. `highlight` is shown
// on a second line in lime.
export function Cta({
  title = "Got a challenge in sport?",
  highlight = "Let’s talk.",
  body = "Tell us where you are and where you want to be. We will take it from there.",
  href = "/contact",
  label = "Talk to us",
}: {
  title?: string
  highlight?: string
  body?: string
  href?: string
  label?: string
}) {
  return (
    <section className="relative z-10 bg-oxford text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-28">
        <Reveal y={12} className="flex justify-center">
          <Eyebrow className="text-electric">Get started</Eyebrow>
        </Reveal>
        <SplitReveal className="mx-auto mt-4 mb-6 max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05]">
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-lime">{highlight}</span>
            </>
          )}
        </SplitReveal>
        <SplitReveal
          as="p"
          className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
        >
          {body}
        </SplitReveal>
        <Reveal y={12}>
          <ArrowLink href={href} tone="lime">
            {label}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
