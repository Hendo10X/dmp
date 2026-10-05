import { cn } from "@/lib/utils"

// Section label (Crowdline template): small uppercase mono text in the
// primary colour. `dot` adds a small leading marker.
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
        "flex items-center gap-2 font-mono text-xs tracking-widest text-oxford uppercase",
        className
      )}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </p>
  )
}

// Status pill with a pulsing dot (Crowdline hero badge).
export function StatusPill({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1",
        className
      )}
    >
      <span
        aria-hidden
        className="size-1.5 shrink-0 animate-pulse rounded-full bg-lime"
      />
      <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
        {children}
      </span>
    </span>
  )
}
