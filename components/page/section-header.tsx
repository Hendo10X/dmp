import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// Section opener (Crowdline template): mono eyebrow, bold Cal Sans title,
// optional intro underneath, optional action to the right.
export function SectionHeader({
  eyebrow,
  title,
  intro,
  action,
  tone = "light",
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: string
  action?: React.ReactNode
  tone?: "light" | "dark"
  className?: string
}) {
  const dark = tone === "dark"
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12",
        className
      )}
    >
      <div className="max-w-2xl">
        <Reveal y={12}>
          <Eyebrow className={dark ? "text-electric" : undefined}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <SplitReveal
          className={cn(
            "mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08]",
            dark ? "text-white" : "text-oxford"
          )}
        >
          {title}
        </SplitReveal>
        {intro && (
          <SplitReveal
            as="p"
            className={cn(
              "mt-5 max-w-xl text-sm leading-relaxed md:text-base",
              dark ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {intro}
          </SplitReveal>
        )}
      </div>
      {action && (
        <Reveal y={12} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
