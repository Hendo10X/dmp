import { HugeiconsIcon } from "@hugeicons/react"
import {
  ChartIncreaseIcon,
  CourtHouseIcon,
  Exchange01Icon,
  Leaf01Icon,
  MoneyBag02Icon,
  Search02Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

// One line icon per service (Hugeicons, stroke style). Replaces the old
// geometric shapes, which the client asked to remove from the site.
const icons = {
  "strategy-growth": ChartIncreaseIcon,
  "business-transformation": Exchange01Icon,
  "transaction-investment": MoneyBag02Icon,
  "policy-ecosystem": CourtHouseIcon,
  "research-market-intelligence": Search02Icon,
  sustainability: Leaf01Icon,
} as const

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const icon = icons[slug as keyof typeof icons]
  if (!icon) return null
  return (
    <HugeiconsIcon
      icon={icon}
      aria-hidden
      strokeWidth={1.6}
      className={cn("size-6 shrink-0", className)}
    />
  )
}
