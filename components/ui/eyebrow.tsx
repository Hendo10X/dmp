import { cn } from "@/lib/utils"

// Small uppercase section label led by a square marker.
export function Eyebrow({
  children,
  className,
  marker = "bg-oxford",
}: {
  children: React.ReactNode
  className?: string
  marker?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] tracking-[0.18em] uppercase",
        className
      )}
    >
      <span aria-hidden className={cn("size-2", marker)} />
      {children}
    </p>
  )
}
