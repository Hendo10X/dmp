import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { ParallaxImage } from "@/components/page/parallax-image"

// Opening block for every inner page: oversized title, intro, optional
// full-bleed photo. White, like every major section.
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  children,
  compact = false,
}: {
  eyebrow: string
  title: string
  intro?: string
  image?: string
  imageAlt?: string
  children?: React.ReactNode
  // Smaller title for long headlines (case studies, articles).
  compact?: boolean
}) {
  return (
    <section className="relative z-10 bg-background px-4 pt-36 pb-16 md:px-7 md:pt-48 md:pb-24">
      <Reveal y={16}>
        <Eyebrow className="text-oxford/70">{eyebrow}</Eyebrow>
      </Reveal>
      <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-end md:gap-6">
        <SplitReveal
          as="h1"
          className={cn(
            "tracking-[0.01em] text-oxford md:col-span-8",
            compact
              ? "text-[clamp(2.75rem,6vw,6.25rem)] leading-[0.92]"
              : "text-[clamp(3.25rem,9vw,9.5rem)] leading-[0.88]"
          )}
        >
          {title}
        </SplitReveal>
        {(intro || children) && (
          <div className="flex flex-col items-start gap-8 md:col-span-4">
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
          className="mt-14 aspect-[4/3] md:mt-20 md:aspect-[21/9]"
        />
      )}
    </section>
  )
}
