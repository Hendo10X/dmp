import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"

// Numbered steps in a row (stacked on mobile). Numbers are solid logo blue
// in the heading face so they stand out with the titles (client brief).
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
            <span className="font-heading text-5xl leading-none text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl leading-tight text-midnight">
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
