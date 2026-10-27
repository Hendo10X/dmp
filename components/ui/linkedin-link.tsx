import { HugeiconsIcon } from "@hugeicons/react"
import { Linkedin01Icon } from "@hugeicons/core-free-icons"

// LinkedIn profile as a square icon button (team cards and the bio modal).
export function LinkedinLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="flex size-10 shrink-0 items-center justify-center border border-midnight/20 text-midnight transition-colors outline-none hover:border-brand hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-electric"
    >
      <HugeiconsIcon
        icon={Linkedin01Icon}
        aria-hidden
        strokeWidth={1.6}
        className="size-5"
      />
    </a>
  )
}
