import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// The standard section opener used on every page: eyebrow + title on the
// left, a short intro and optional action on the right.
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
        "grid gap-8 md:grid-cols-12 md:items-end md:gap-6",
        className
      )}
    >
      <div className="md:col-span-7">
        <Reveal y={16}>
          <Eyebrow
            marker={dark ? "bg-white" : "bg-oxford"}
            className={dark ? "text-white/70" : "text-oxford/70"}
          >
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <SplitReveal
          className={cn(
            "mt-6 text-[clamp(2.5rem,4.6vw,4.75rem)] leading-[0.95] tracking-[0.01em]",
            dark ? "text-white" : "text-oxford"
          )}
        >
          {title}
        </SplitReveal>
      </div>
      {(intro || action) && (
        <div className="flex flex-col items-start gap-8 md:col-span-4 md:col-start-9">
          {intro && (
            <SplitReveal
              as="p"
              className={cn(
                "text-base leading-relaxed md:text-lg",
                dark ? "text-white/75" : "text-muted-foreground"
              )}
            >
              {intro}
            </SplitReveal>
          )}
          {action && <Reveal y={16}>{action}</Reveal>}
        </div>
      )}
    </div>
  )
}
