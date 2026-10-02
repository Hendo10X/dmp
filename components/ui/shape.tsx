import { cn } from "@/lib/utils"

export type ShapeName =
  "circle" | "square" | "triangle" | "quarter" | "diamond" | "ring"

const paths: Record<ShapeName, React.ReactNode> = {
  circle: <circle cx="24" cy="24" r="22" />,
  square: <rect x="6" y="6" width="36" height="36" />,
  triangle: <polygon points="24,3 45,43 3,43" />,
  quarter: <path d="M4 44 V4 A40 40 0 0 1 44 44 Z" />,
  diamond: <polygon points="24,2 46,24 24,46 2,24" />,
  // Ring: even-odd fill punches the centre out.
  ring: (
    <path
      fillRule="evenodd"
      d="M24 2a22 22 0 1 1 0 44a22 22 0 1 1 0-44zm0 12a10 10 0 1 0 0 20a10 10 0 1 0 0-20z"
    />
  ),
}

// The brand's geometric marks. Colour and motion come from the caller.
export function Shape({
  name,
  className,
}: {
  name: ShapeName
  className?: string
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      {paths[name]}
    </svg>
  )
}
