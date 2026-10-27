import Image from "next/image"

import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// Opening block for every inner page.
// With `image` (every page except Contact, per the client): a full-bleed
// photo hero after the PwC/EY samples. The photo eases in from a slight zoom
// under a midnight gradient; eyebrow, title and intro sit at the bottom in
// white. Without `image`: the plain white header, title with the intro
// stacked underneath.
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
  compact = false,
  large = false,
}: {
  eyebrow?: string
  title: string
  intro?: string
  image?: string
  imageAlt?: string
  // Extra content under the intro (e.g. case-study facts). Styled for the
  // dark hero when an image is set.
  children?: React.ReactNode
  // Smaller title for long headlines (case studies).
  compact?: boolean
  // Bigger title and intro (Careers, per the client).
  large?: boolean
}) {
  const titleSize = compact
    ? "text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.05]"
    : large
      ? "text-[clamp(3.5rem,9vw,8rem)] leading-[0.98]"
      : "text-[clamp(2.75rem,6vw,5rem)] leading-[1.02]"

  if (image) {
    return (
      <section className="relative z-10 flex min-h-[78svh] items-end overflow-hidden bg-midnight text-white md:min-h-[84svh]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="animate-[hero-zoom_2.4s_cubic-bezier(0.22,1,0.36,1)_both] object-cover"
        />
        {/* Midnight wash: strong at the bottom where the copy sits, light at
            the top so the photo still reads. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-midnight via-midnight/55 to-midnight/15"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-midnight/60 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-[120rem] px-6 pt-32 pb-12 md:pb-16 lg:px-10">
          <div className="flex max-w-6xl flex-col gap-5 md:gap-6">
            {eyebrow && (
              <Reveal y={12}>
                <Eyebrow className="text-sm text-mint md:text-base">
                  {eyebrow}
                </Eyebrow>
              </Reveal>
            )}
            <SplitReveal as="h1" className={cn("max-w-4xl", titleSize)}>
              {title}
            </SplitReveal>
            {intro && (
              <SplitReveal
                as="p"
                className={cn(
                  "max-w-5xl leading-relaxed text-white/80",
                  large ? "text-lg md:text-2xl" : "text-base md:text-lg"
                )}
              >
                {intro}
              </SplitReveal>
            )}
            {children}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pt-28 pb-10 md:pt-32 md:pb-14 lg:px-10">
      <div className="flex flex-col gap-5 md:gap-6">
        <SplitReveal
          as="h1"
          className={cn("max-w-5xl text-midnight", titleSize)}
        >
          {title}
        </SplitReveal>
        {(intro || children) && (
          <div className="flex max-w-2xl flex-col items-start gap-8">
            {intro && (
              <SplitReveal
                as="p"
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {intro}
              </SplitReveal>
            )}
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
