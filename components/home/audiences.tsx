import Link from "next/link"

import { audiences } from "@/lib/content"
import { Shape } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeader } from "@/components/page/section-header"

// "Who we serve" as pills (Crowdline's coverage categories): each pill
// reveals its shape on hover.
export function Audiences() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
      <SectionHeader
        eyebrow="Who we serve"
        title="Built for everyone who runs sport."
        intro="Seven kinds of organisation, one shared goal: a sports economy that is better governed, better funded and better measured."
      />
      <Reveal className="mt-12 flex flex-wrap gap-3">
        {audiences.map((audience) => (
          <Link
            key={audience.slug}
            href={`/who-we-serve#${audience.slug}`}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:border-oxford/40 hover:bg-surface hover:text-oxford"
          >
            {audience.title}
            <Shape
              name={audience.shape}
              className="size-3 -translate-x-1 text-oxford opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Link>
        ))}
      </Reveal>
    </section>
  )
}
