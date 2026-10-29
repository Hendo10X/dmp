import { HugeiconsIcon } from "@hugeicons/react"
import {
  Facebook01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { social } from "@/lib/content"

const icons = {
  LinkedIn: Linkedin01Icon,
  Facebook: Facebook01Icon,
  X: NewTwitterIcon,
} as const

// DMPartners' social profiles as square icon buttons. "light" sits on white
// (Contact), "dark" on midnight (footer).
export function SocialLinks({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark"
  className?: string
}) {
  return (
    <ul className={cn("flex gap-2", className)}>
      {social.map((profile) => {
        const icon = icons[profile.name as keyof typeof icons]
        if (!profile.url || !icon) return null
        return (
          <li key={profile.name}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`DMPartners on ${profile.name}`}
              className={cn(
                "flex size-11 items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-electric",
                tone === "dark"
                  ? "bg-white/10 text-white hover:bg-mint hover:text-midnight"
                  : "bg-surface text-midnight hover:bg-brand hover:text-white"
              )}
            >
              <HugeiconsIcon
                icon={icon}
                aria-hidden
                strokeWidth={1.6}
                className="size-5"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
