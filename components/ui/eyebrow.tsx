import { cn } from "@/lib/utils"

// Section label: short sentence-case text above a heading. `dot` adds a small leading marker.
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
        "flex items-center gap-2 text-sm font-medium text-midnight",
        className
      )}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </p>
  )
}
