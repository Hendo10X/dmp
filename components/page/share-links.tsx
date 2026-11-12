"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Link01Icon,
  Linkedin01Icon,
  Mail01Icon,
  NewTwitterIcon,
  Share08Icon,
  Tick02Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

const button =
  "flex size-10 shrink-0 items-center justify-center text-midnight transition-colors outline-none hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-electric"

// Share a page (case studies, per the client): LinkedIn, X, WhatsApp, email
// and copy link as square icon buttons, matching the LinkedIn button on the
// team cards. Phones also get the system share sheet. `tone` is the button
// colour: "white" on tinted panels, "tint" on white.
export function ShareLinks({
  url,
  title,
  tone = "tint",
  className,
}: {
  url: string
  title: string
  tone?: "tint" | "white"
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const [native, setNative] = React.useState(false)
  const base = tone === "white" ? "bg-background" : "bg-surface"

  // The share sheet only exists in some browsers; show its button after
  // mount so server and client markup match.
  React.useEffect(() => {
    setNative(typeof navigator.share === "function")
  }, [])

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    {
      name: "LinkedIn",
      icon: Linkedin01Icon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    {
      name: "X",
      icon: NewTwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    },
    {
      name: "WhatsApp",
      icon: WhatsappIcon,
      href: `https://wa.me/?text=${t}%20${u}`,
    },
    {
      name: "email",
      icon: Mail01Icon,
      href: `mailto:?subject=${t}&body=${u}`,
    },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the other buttons still work.
    }
  }

  const share = async () => {
    try {
      await navigator.share({ title, url })
    } catch {
      // Dismissed.
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}>
      <span className="text-sm font-semibold tracking-wider text-brand uppercase">
        Share
      </span>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target={link.name === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={
                link.name === "email"
                  ? "Share by email"
                  : `Share on ${link.name}`
              }
              className={cn(button, base)}
            >
              <HugeiconsIcon
                icon={link.icon}
                aria-hidden
                strokeWidth={1.6}
                className="size-5"
              />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy link"
            className={cn(button, base)}
          >
            <HugeiconsIcon
              icon={copied ? Tick02Icon : Link01Icon}
              aria-hidden
              strokeWidth={1.6}
              className="size-5"
            />
          </button>
        </li>
        {native && (
          <li>
            <button
              type="button"
              onClick={share}
              aria-label="More sharing options"
              className={cn(button, base)}
            >
              <HugeiconsIcon
                icon={Share08Icon}
                aria-hidden
                strokeWidth={1.6}
                className="size-5"
              />
            </button>
          </li>
        )}
      </ul>
      <span aria-live="polite" className="text-sm text-midnight/70">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  )
}
