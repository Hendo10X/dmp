"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { Arrow, Tick } from "@/components/ui/arrow"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// The Nigeria Sports Industry Outlook 2026 (public/reports) on a mint band
// on the Solutions page: visitors leave their details, then the PDF
// downloads straight away, with a button as a fallback. The client also
// wants it emailed; that needs an email provider, and the details are not
// stored or sent anywhere yet.
const REPORT = {
  title: "Nigeria Sports Industry Outlook 2026",
  href: "/reports/nigeria-sports-industry-outlook-2026.pdf",
  file: "DMPartners - Nigeria Sports Industry Outlook 2026.pdf",
}

export function Report() {
  const [sent, setSent] = React.useState(false)

  const field =
    "h-12 w-full rounded-lg border border-midnight/15 bg-white px-4 text-midnight outline-none placeholder:text-midnight/40 focus-visible:border-midnight"

  return (
    <section className="relative z-10 bg-mint text-midnight">
      <div className="mx-auto grid max-w-[120rem] gap-10 px-6 py-16 md:grid-cols-12 md:items-center md:gap-6 md:py-20 lg:px-10">
        <div className="md:col-span-6">
          <Reveal y={12}>
            <Eyebrow className="text-midnight/70">Free report</Eyebrow>
          </Reveal>
          <SplitReveal className="mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08]">
            {REPORT.title}.
          </SplitReveal>
          <SplitReveal
            as="p"
            className="mt-5 max-w-md text-base leading-relaxed text-midnight/75"
          >
            Our research on the business of sports in Nigeria. Leave your
            details and the report downloads straight away.
          </SplitReveal>
          <Reveal y={12}>
            <p className="mt-6 font-mono text-xs tracking-wider text-midnight/60 uppercase">
              PDF &middot; 67 pages &middot; 7.1 MB
            </p>
          </Reveal>
        </div>

        <Reveal className="md:col-span-5 md:col-start-8">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start gap-4 rounded-xl bg-midnight p-8 text-white"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-mint text-midnight">
                  <Tick size={20} />
                </span>
                <p className="font-heading text-2xl leading-tight">
                  Your download has started.
                </p>
                <p className="text-sm text-white/70">
                  If it did not, use the button below.
                </p>
                <a
                  href={REPORT.href}
                  download={REPORT.file}
                  className="group inline-flex h-12 items-center gap-2 rounded-pill bg-mint px-6 font-mono text-xs font-semibold tracking-wider text-midnight uppercase outline-offset-4 transition-colors hover:bg-mint/90 focus-visible:outline-2 focus-visible:outline-mint"
                >
                  Download the report
                  <Arrow
                    size={14}
                    className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                onSubmit={(event) => {
                  event.preventDefault()
                  // Start the download in the same click so browsers allow it.
                  const link = document.createElement("a")
                  link.href = REPORT.href
                  link.download = REPORT.file
                  link.click()
                  setSent(true)
                }}
                className="flex flex-col gap-3"
              >
                <label htmlFor="report-name" className="sr-only">
                  Name
                </label>
                <input
                  id="report-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={field}
                />
                <label htmlFor="report-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="report-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your email"
                  className={field}
                />
                <label htmlFor="report-org" className="sr-only">
                  Organisation (optional)
                </label>
                <input
                  id="report-org"
                  name="organisation"
                  autoComplete="organization"
                  placeholder="Organisation (optional)"
                  className={field}
                />
                <button
                  type="submit"
                  className="group mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-midnight px-6 font-mono text-xs font-semibold tracking-wider text-white uppercase outline-offset-4 transition-colors hover:bg-midnight/90 focus-visible:outline-2 focus-visible:outline-midnight"
                >
                  Download the report
                  <Arrow
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
