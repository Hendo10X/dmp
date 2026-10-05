import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"

// Numbered steps in a row (stacked on mobile). Static counterpart to the
// scroll-lit "How we work" section.
export function Steps({
  steps,
  className,
}: {
  steps: { title: string; body: string }[]
  className?: string
}) {
  return (
    <Reveal className={cn(className)}>
      <ol
        className={cn(
          "grid gap-10 sm:grid-cols-2 md:gap-6",
          steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        )}
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6 md:p-8"
          >
            <span className="font-mono text-5xl leading-none font-light text-oxford/20">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-xl leading-tight text-oxford">
              {step.title}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
