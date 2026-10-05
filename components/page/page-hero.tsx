import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { ParallaxImage } from "@/components/page/parallax-image"

// Opening block for every inner page (Crowdline template): large Cal Sans
// title, muted intro, optional rounded image below.
export function PageHero({
  title,
  intro,
  image,
  imageAlt = "",
  children,
  compact = false,
}: {
  // Kept for page metadata/readability; no longer rendered as a badge.
  eyebrow?: string
  title: string
  intro?: string
  image?: string
  imageAlt?: string
  children?: React.ReactNode
  // Smaller title for long headlines (case studies, articles).
  compact?: boolean
}) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
        <SplitReveal
          as="h1"
          className={cn(
            "text-oxford md:col-span-8",
            compact
              ? "text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05]"
              : "text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.02]"
          )}
        >
          {title}
        </SplitReveal>
        {(intro || children) && (
          <div className="flex flex-col items-start gap-8 md:col-span-4">
            {intro && (
              <SplitReveal
                as="p"
                className="text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {intro}
              </SplitReveal>
            )}
            {children}
          </div>
        )}
      </div>
      {image && (
        <ParallaxImage
          src={image}
          alt={imageAlt}
          priority
          sizes="(min-width: 1152px) 1152px, (min-width: 768px) 100vw, 160vw"
          className="mt-14 aspect-[4/3] rounded-2xl md:mt-16 md:aspect-[21/9]"
        />
      )}
    </section>
  )
}
