"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { BubbleChatIcon, Cancel01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { useIntroSettled } from "@/lib/preloader-store"
import { Arrow } from "@/components/ui/arrow"

type Message = { role: "user" | "assistant"; content: string }

const ease = [0.22, 1, 0.36, 1] as const

const suggestions = [
  "What does DMPartners do?",
  "Which services do you offer?",
  "How do I get the latest report?",
]

// Emails, web addresses and site paths (/services) in an answer become
// links.
const LINKS = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s)]+|\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*(?:\?[\w=&-]+)?)/g

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(LINKS).map((part, index) => {
        if (index % 2 === 0) return part
        // Trailing punctuation belongs to the sentence, not the link.
        const target = part.replace(/[.,;:!?]+$/, "")
        const tail = part.slice(target.length)
        const className = "font-medium underline underline-offset-4"
        return (
          <React.Fragment key={index}>
            {target.startsWith("/") ? (
              <Link href={target} className={className}>
                {target}
              </Link>
            ) : (
              <a
                href={target.includes("://") ? target : `mailto:${target}`}
                className={className}
                {...(target.includes("://")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {target}
              </a>
            )}
            {tail}
          </React.Fragment>
        )
      })}
    </>
  )
}

// Phones: the panel fills the screen. Its height follows the visible
// viewport, so the question box stays above the on-screen keyboard (iOS
// does not shrink 100dvh for the keyboard).
const PHONE = "(max-width: 639px)"

function usePhoneSheet(open: boolean) {
  const [box, setBox] = React.useState<{ top: number; height: number }>()

  React.useEffect(() => {
    const query = window.matchMedia(PHONE)
    if (!open || !query.matches) {
      setBox(undefined)
      return
    }
    // The page behind stays put while the sheet is open.
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = "hidden"

    const viewport = window.visualViewport
    const update = () =>
      setBox(
        viewport
          ? { top: viewport.offsetTop, height: viewport.height }
          : { top: 0, height: window.innerHeight }
      )
    update()
    viewport?.addEventListener("resize", update)
    viewport?.addEventListener("scroll", update)
    return () => {
      root.style.overflow = previous
      viewport?.removeEventListener("resize", update)
      viewport?.removeEventListener("scroll", update)
    }
  }, [open])

  return box
}

// Site assistant (client request): a midnight pill in the bottom corner
// opens a small chat panel (a full-screen sheet on phones). Answers come
// from /api/chat, which only knows what is on this website and sends
// anything else to the contact email.
export function ChatWidget({ email }: { email: string }) {
  const ready = useIntroSettled()
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [draft, setDraft] = React.useState("")
  const [busy, setBusy] = React.useState(false)
  const log = React.useRef<HTMLDivElement>(null)
  const input = React.useRef<HTMLInputElement>(null)
  const sheet = usePhoneSheet(open)

  React.useEffect(() => {
    if (!open) return
    // On phones the keyboard would cover the suggestions, so the box is
    // only focused when tapped.
    if (!window.matchMedia(PHONE).matches) input.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Keep the newest message in view.
  React.useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight })
  }, [messages, busy, open])

  const ask = async (question: string) => {
    const text = question.trim()
    if (!text || busy) return
    const next: Message[] = [...messages, { role: "user", content: text }]
    setMessages(next)
    setDraft("")
    setBusy(true)
    let reply = `Sorry, something went wrong. Please email ${email} and the team will help.`
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = (await response.json()) as { reply?: string }
      if (data.reply) reply = data.reply
    } catch {
      // Offline or the request failed: the apology above stands.
    }
    setMessages([...next, { role: "assistant", content: reply }])
    setBusy(false)
  }

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex flex-col items-end md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label="Ask DMP"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease }}
            style={sheet}
            className="flex flex-col overflow-hidden bg-background max-sm:fixed max-sm:inset-x-0 max-sm:top-0 max-sm:h-dvh sm:mb-3 sm:h-[min(34rem,calc(100svh-8rem))] sm:w-[23rem] sm:rounded-xl sm:border sm:border-border"
          >
            <header className="flex items-center justify-between gap-4 bg-midnight px-5 py-4 text-white max-sm:pt-[max(1rem,env(safe-area-inset-top))]">
              <div>
                <p className="font-heading text-lg leading-tight">Ask DMP</p>
                <p className="mt-1 text-xs text-white/70">
                  Answers drawn from this website.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="-mr-3 flex size-11 shrink-0 items-center justify-center text-white/70 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-electric"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  aria-hidden
                  strokeWidth={1.6}
                  className="size-5"
                />
              </button>
            </header>

            {/* data-lenis-prevent: the wheel scrolls this list, not the
                page behind it. */}
            <div
              ref={log}
              data-lenis-prevent
              aria-live="polite"
              className="flex flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              <Bubble role="assistant">
                Hello. Ask me about DMPartners: our services, solutions, case
                studies, reports or careers.
              </Bubble>

              {messages.length === 0 && (
                <ul className="mt-1 flex flex-col items-start gap-2">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => ask(suggestion)}
                        className="min-h-11 rounded-pill border border-border px-4 py-2 text-left text-sm text-midnight transition-colors outline-none hover:bg-surface focus-visible:ring-2 focus-visible:ring-electric"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {messages.map((message, index) => (
                <Bubble key={index} role={message.role}>
                  <Rich text={message.content} />
                </Bubble>
              ))}

              {busy && (
                <Bubble role="assistant">
                  <span className="text-midnight/70">Thinking…</span>
                </Bubble>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                ask(draft)
              }}
              className="border-t border-border p-3 max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            >
              <div className="flex items-center gap-2">
                <label htmlFor="chat-question" className="sr-only">
                  Your question
                </label>
                <input
                  ref={input}
                  id="chat-question"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  maxLength={600}
                  autoComplete="off"
                  placeholder="Type your question"
                  className="h-11 min-w-0 flex-1 rounded-pill bg-surface px-4 text-base text-midnight sm:text-sm outline-none placeholder:text-midnight/50 focus-visible:ring-2 focus-visible:ring-electric"
                />
                <button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  aria-label="Send"
                  className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-midnight text-white transition-colors outline-none hover:bg-midnight/90 focus-visible:ring-2 focus-visible:ring-electric disabled:opacity-40"
                >
                  <Arrow size={18} />
                </button>
              </div>
              <p className="mt-2 px-1 text-xs leading-snug text-midnight/70">
                AI answers can be wrong. For anything important, email{" "}
                <a
                  href={`mailto:${email}`}
                  className="underline underline-offset-2"
                >
                  {email}
                </a>
                .
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Launcher: waits for the home preloader, like the header. No
          outline (client). */}
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        initial={false}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
        transition={{ duration: 0.6, ease }}
        className={cn(
          "flex h-12 items-center gap-2 rounded-pill bg-midnight px-5 text-sm font-medium text-white transition-colors outline-none hover:bg-brand focus-visible:ring-2 focus-visible:ring-electric",
          !ready && "pointer-events-none",
          open && "max-sm:hidden"
        )}
      >
        <HugeiconsIcon
          icon={open ? Cancel01Icon : BubbleChatIcon}
          aria-hidden
          strokeWidth={1.6}
          className="size-5"
        />
        {open ? "Close" : "Ask DMP"}
      </motion.button>
    </div>
  )
}

function Bubble({
  role,
  children,
}: {
  role: Message["role"]
  children: React.ReactNode
}) {
  return (
    <p
      className={cn(
        "max-w-[88%] rounded-xl px-4 py-3 text-sm leading-relaxed break-words whitespace-pre-wrap",
        role === "user"
          ? "self-end bg-midnight text-white"
          : "self-start bg-surface text-midnight"
      )}
    >
      {children}
    </p>
  )
}
