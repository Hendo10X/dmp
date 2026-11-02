import { cn } from "@/lib/utils"

// Section label: short capitalised text above a heading. Logo blue on
// white by default; pass text-mint on dark backgrounds (client). `dot` adds a small leading marker.
export function Eyebrow({
  children,
  className,
  dot = false,
}: {
  children: React.ReactNode
  className?: string
  dot?: boolean
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-sm font-semibold tracking-wider text-brand uppercase",
        className
      )}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </p>
  )
}
