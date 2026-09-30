import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { Eyebrow } from "@/components/home/eyebrow"

// Partner quote. Placeholder until the client supplies one.
export function Quote() {
  return (
    <section className="relative z-10 overflow-hidden bg-electric text-oxford">
      <Reveal className="grid gap-10 px-4 py-24 md:grid-cols-12 md:gap-6 md:px-7 md:py-32">
        <Eyebrow marker="bg-oxford" className="md:col-span-3">
          From our partners
        </Eyebrow>
        <figure className="md:col-span-9">
          <blockquote className="text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.15] tracking-tight">
            &ldquo;Sport is an industry. It deserves the same rigour, the same
            data and the same ambition as any other. That is the standard we
            hold ourselves to.&rdquo;
          </blockquote>
          <figcaption className="mt-10 text-[0.7rem] tracking-[0.18em] uppercase">
            Founding Partner, DMP
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}

// "Talk to us" CTA from the brief.
export function Cta() {
  return (
    <section className="relative z-10 bg-lime px-4 py-24 text-oxford md:px-7 md:py-36">
      <Reveal className="grid gap-12 md:grid-cols-12 md:items-end md:gap-6">
        <h2 className="text-[clamp(2.5rem,6.5vw,7rem)] leading-[0.98] tracking-[0.01em] md:col-span-9">
          Got a challenge in sport? Let&rsquo;s talk.
        </h2>
        <div className="flex flex-col items-start gap-6 md:col-span-3">
          <p className="text-base leading-relaxed">
            Tell us where you are and where you want to be. We will take it from
            there.
          </p>
          <ArrowLink href="/contact" tone="dark">
            Talk to us
          </ArrowLink>
        </div>
      </Reveal>
    </section>
  )
}
