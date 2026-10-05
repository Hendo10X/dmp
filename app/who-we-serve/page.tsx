import type { Metadata } from "next"

import { audiences, services } from "@/lib/content"
import { Shape } from "@/components/ui/shape"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "Federations, public bodies, corporates, investors, academia, SMEs and professional associations.",
}

export default function WhoWeServePage() {
  return (
    <main>
      <PageHero
        eyebrow="Who we serve"
        title="Everyone who runs sport."
        intro="Seven kinds of organisation, each with its own pressures. Find yours below to see how we help."
      />

      {/* Jump links */}
      <nav
        aria-label="Client groups"
        className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-16 md:pb-24"
      >
        <Reveal>
          <ul className="flex flex-wrap gap-1">
            {audiences.map((audience) => (
              <li key={audience.slug}>
                <a
                  href={`#${audience.slug}`}
                  className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-sm text-oxford transition-colors duration-300 hover:bg-oxford hover:text-white"
                >
                  <Shape name={audience.shape} className="size-3" />
                  {audience.title}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <ol>
          {audiences.map((audience, index) => {
            const relevant = services.filter((s) =>
              s.forWhom.includes(audience.slug)
            )
            return (
              <li
                key={audience.slug}
                id={audience.slug}
                className="grid scroll-mt-28 gap-8 border-t border-oxford/15 py-14 md:grid-cols-12 md:gap-6 md:py-20"
              >
                <Reveal y={16} className="flex items-start gap-4 md:col-span-2">
                  <span className="font-heading text-lg text-oxford/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Shape name={audience.shape} className="size-8 text-oxford" />
                </Reveal>

                <div className="flex flex-col gap-6 md:col-span-5">
                  <SplitReveal className="text-[clamp(2.25rem,4vw,4rem)] leading-[1.05] text-oxford">
                    {audience.title}
                  </SplitReveal>
                  <SplitReveal
                    as="p"
                    className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
                  >
                    {audience.body}
                  </SplitReveal>
                </div>

                <Reveal className="flex flex-col gap-8 md:col-span-4 md:col-start-9">
                  <div>
                    <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                      Typical work
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {audience.needs.map((need) => (
                        <li
                          key={need}
                          className="flex items-center gap-3 text-oxford"
                        >
                          <span aria-hidden className="size-1.5 bg-oxford" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {relevant.length > 0 && (
                    <div>
                      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                        Most relevant services
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1">
                        {relevant.map((service) => (
                          <li key={service.slug}>
                            <a
                              href={`/services/${service.slug}`}
                              className="block rounded-full bg-secondary px-3 py-2 text-sm text-oxford transition-colors duration-300 hover:bg-oxford hover:text-white"
                            >
                              {service.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <ArrowLink href="/contact" tone="muted">
                    Talk to us
                  </ArrowLink>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </section>

      <Cta />
    </main>
  )
}
