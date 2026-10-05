"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import { services } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Arrow, Tick } from "@/components/ui/arrow"

const topics = [
  { value: "general", label: "General enquiry" },
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "speakers", label: "DMP Speakers" },
  { value: "careers", label: "Careers" },
]

const field =
  "w-full rounded-lg bg-surface border border-border px-4 py-3 text-oxford outline-none transition-shadow placeholder:text-oxford/40 focus-visible:ring-2 focus-visible:ring-electric"

// Short enquiry form from the brief. UI only: no form service is connected
// yet (docs/brief.md, Q8), so submitting just confirms on screen.
export function ContactForm() {
  const params = useSearchParams()
  const initialTopic = params.get("topic") ?? "general"
  const role = params.get("role")
  const [sent, setSent] = React.useState(false)

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-start gap-6 rounded-xl bg-secondary p-8 text-oxford md:p-10"
          >
            <span className="flex size-12 items-center justify-center bg-lime">
              <Tick size={24} />
            </span>
            <p className="font-heading text-4xl leading-none">
              Thanks. Message received.
            </p>
            <p className="max-w-md text-muted-foreground">
              Someone from the team will reply by email. For anything urgent,
              use the direct details alongside.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-mono text-xs tracking-wider uppercase underline decoration-oxford/30 underline-offset-8 hover:decoration-oxford"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className={field}
              />
            </Field>
            <Field label="Email" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={field}
              />
            </Field>
            <Field label="Organisation" htmlFor="organisation">
              <input
                id="organisation"
                name="organisation"
                autoComplete="organization"
                className={field}
              />
            </Field>
            <Field label="Topic" htmlFor="topic">
              <select
                key={initialTopic}
                id="topic"
                name="topic"
                defaultValue={initialTopic}
                className={cn(field, "appearance-none")}
              >
                {topics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Message" htmlFor="message" className="sm:col-span-2">
              <textarea
                key={role ?? ""}
                id="message"
                name="message"
                required
                rows={5}
                defaultValue={role ? `I'm interested in the ${role} role.` : ""}
                className={cn(field, "resize-y")}
              />
            </Field>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="group inline-flex h-12 items-stretch outline-offset-4 focus-visible:outline-2 focus-visible:outline-electric"
              >
                <span className="flex items-center bg-oxford px-5 font-mono text-xs tracking-wider text-white uppercase">
                  Send message
                </span>
                <span className="flex aspect-square h-full items-center justify-center bg-lime text-oxford">
                  <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string
  htmlFor: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-xs tracking-wider text-muted-foreground uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
