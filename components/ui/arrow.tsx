import { cn } from "@/lib/utils"

// Sharp-cornered arrow: square caps and mitred joins, unlike the rounded
// icon-set arrows.
export function Arrow({
  size = 20,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn("shrink-0", className)}
    >
      <path d="M3 12h17" />
      <path d="M14 6l6 6-6 6" />
    </svg>
  )
}

// Matching sharp check mark.
export function Tick({
  size = 20,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn("shrink-0", className)}
    >
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}
