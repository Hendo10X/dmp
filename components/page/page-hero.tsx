import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { ParallaxImage } from "@/components/page/parallax-image"

// Opening block for every inner page: large Cal Sans title with the intro
// stacked underneath (client brief: side-by-side caused alignment issues),
// optional image below.
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
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pt-28 pb-10 md:pt-32 md:pb-14 lg:px-10">
      <div className="flex flex-col gap-5 md:gap-6">
        <SplitReveal
          as="h1"
          className={cn(
            "max-w-5xl text-midnight",
            compact
              ? "text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05]"
              : "text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.02]"
          )}
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
