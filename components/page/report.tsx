"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { industries } from "@/lib/content"
import { sendReportRequest } from "@/app/reports/actions"
import { cn } from "@/lib/utils"
import { Arrow, Tick } from "@/components/ui/arrow"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"

// The Nigeria Sports Industry Outlook 2026 (public/reports) on a mint band
// on the Reports page: visitors leave their details, then the PDF
// downloads straight away, with a button as a fallback. The details are
// emailed to the team (app/reports/actions.ts).
const REPORT = {
  title: "Nigeria Sports Industry Outlook 2026",
  href: "/reports/nigeria-sports-industry-outlook-2026.pdf",
  file: "DMPartners - Nigeria Sports Industry Outlook 2026.pdf",
}

// Dropdown options for the download form (client list). Academia sits in
// both Occupation and Industry, as asked.
const titles = [
  "Mr",
  "Mrs",
  "Ms",
  "Miss",
  "Dr",
  "Prof",
  "Chief",
  "Hon.",
  "Other",
]

const roles = [
  "Chairman",
  "CEO",
  "MD",
  "Executive Director",
  "Director",
  "General Manager",
  "Head of Department",
  "Manager",
  "Consultant",
  "Analyst",
  "Officer",
  "Lecturer",
  "Researcher",
  "Student",
  "Other",
]

const occupations = [
  "Business executive",
  "Government and public service",
  "Academia",
  "Investor",
  "Sports administrator",
  "Athlete or coach",
  "Media professional",
  "Consultant",
  "Entrepreneur",
  "Student",
  "Other",
]

const sectors = ["Sports", ...industries, "Academia", "Other"]

export function Report() {
  const [sent, setSent] = React.useState(false)

  const field =
    "h-12 w-full rounded-lg bg-white px-4 text-midnight outline-none placeholder:text-midnight/40 focus-visible:ring-2 focus-visible:ring-midnight"

  return (
    <section className="relative z-10 bg-mint text-midnight">
      <div className="mx-auto grid max-w-[120rem] gap-10 px-6 py-16 md:grid-cols-12 md:items-center md:gap-6 md:py-20 lg:px-10">
        <div className="md:col-span-5">
          <Reveal y={12}>
            <Eyebrow className="text-midnight/70">Free report</Eyebrow>
          </Reveal>
          <SplitReveal className="mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08]">
            {REPORT.title}.
          </SplitReveal>
          <SplitReveal
            as="p"
            className="mt-5 max-w-md text-base leading-relaxed text-midnight/70"
          >
            Our research on the business of sports in Nigeria. Leave your
            details and the report downloads straight away.
          </SplitReveal>
          <Reveal y={12}>
            <p className="mt-6 text-sm font-medium text-midnight/70">
              PDF &middot; 67 pages &middot; 7.1 MB
            </p>
          </Reveal>
        </div>

        <Reveal className="md:col-span-6 md:col-start-7">
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
                  className="group inline-flex h-12 items-center gap-2 rounded-pill bg-mint px-6 text-sm font-semibold text-midnight outline-offset-4 transition-colors hover:bg-mint/90 focus-visible:outline-2 focus-visible:outline-mint"
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
                  // Email the details to the team in the background; the
                  // download never waits on it or fails because of it.
                  sendReportRequest(
                    REPORT.title,
                    new FormData(event.currentTarget)
                  ).catch(() => {})
                  // Start the download in the same click so browsers allow it.
                  const link = document.createElement("a")
                  link.href = REPORT.href
                  link.download = REPORT.file
                  link.click()
                  setSent(true)
                }}
                className="grid gap-3 sm:grid-cols-2"
              >
                <Select
                  id="report-title"
                  name="title"
                  label="Title"
                  options={titles}
                  className={field}
                />
                <Input
                  id="report-name"
                  name="name"
                  label="Full name"
                  autoComplete="name"
                  className={field}
                />
                <Input
                  id="report-email"
                  name="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  className={field}
                />
                <Input
                  id="report-org"
                  name="organisation"
                  label="Organisation or company"
                  autoComplete="organization"
                  className={field}
                />
                <Select
                  id="report-role"
                  name="role"
                  label="Role"
                  options={roles}
                  className={field}
                />
                <Select
                  id="report-occupation"
                  name="occupation"
                  label="Occupation"
                  options={occupations}
                  className={field}
                />
                <Select
                  id="report-sector"
                  name="sector"
                  label="Industry or sector"
                  options={sectors}
                  className={field}
                  wrapperClassName="sm:col-span-2"
                />
                <button
                  type="submit"
                  className="group mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-midnight px-6 text-sm font-semibold text-white outline-offset-4 transition-colors hover:bg-midnight/90 focus-visible:outline-2 focus-visible:outline-midnight sm:col-span-2"
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

// Fields use their label as the placeholder (sr-only label for screen
// readers), matching the form's compact look on the mint band.
function Input({
  id,
  label,
  className,
  ...props
}: React.ComponentProps<"input"> & { id: string; label: string }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        required
        placeholder={label}
        className={className}
        {...props}
      />
    </div>
  )
}

function Select({
  id,
  name,
  label,
  options,
  className,
  wrapperClassName,
}: {
  id: string
  name: string
  label: string
  options: string[]
  className: string
  wrapperClassName?: string
}) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {/* The empty first option is the placeholder; while it is selected the
          select is :invalid, which mutes the text like an input placeholder. */}
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={cn(
          className,
          "cursor-pointer appearance-none pr-11 invalid:text-midnight/70"
        )}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-midnight">
            {option}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-midnight"
      >
        <path d="M2.5 4.5L6 8l3.5-3.5" />
      </svg>
    </div>
  )
}
