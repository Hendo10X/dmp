"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import {
  caseStudies,
  findSector,
  findService,
  sectors,
  services,
} from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"

const ALL = "all"
const PAGE = 8

// "All success stories" after PwC's case studies page: a tinted filter bar
// with dropdowns, a results count, a four-across grid of photo cards and
// "Load more". Filters live in the URL (?service=, ?sector= shown as
// Industry) so other pages can link straight to a filtered view.
export function CaseStudyBrowser() {
  const router = useRouter()
  const params = useSearchParams()
  const service = params.get("service") ?? ALL
  const sector = params.get("sector") ?? ALL
  const [visible, setVisible] = React.useState(PAGE)

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value === ALL) next.delete(key)
    else next.set(key, value)
    const query = next.toString()
    setVisible(PAGE)
    router.replace(query ? `?${query}` : "?", { scroll: false })
  }

  const results = caseStudies.filter(
    (study) =>
      (service === ALL || study.service === service) &&
      (sector === ALL || study.sector === sector)
  )
  const filtered = service !== ALL || sector !== ALL

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 bg-surface-2 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
        <span className="text-sm text-midnight/70">Filter by:</span>
        <Select
          id="filter-service"
          label="Service"
          value={service}
          onChange={(value) => update("service", value)}
          options={services.map((s) => ({ value: s.slug, label: s.title }))}
        />
        <Select
          id="filter-sector"
          label="Industry"
          value={sector}
          onChange={(value) => update("sector", value)}
          options={sectors.map((s) => ({ value: s.slug, label: s.title }))}
        />
        {filtered && (
          <button
            type="button"
            onClick={() => router.replace("?", { scroll: false })}
            className="font-mono text-xs tracking-wider text-midnight uppercase underline decoration-midnight/30 underline-offset-4 hover:decoration-midnight sm:ml-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>

      <motion.ul
        layout
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {results.slice(0, visible).map((study) => {
            const meta = [
              findService(study.service)?.title,
              findSector(study.sector)?.title,
            ]
              .filter(Boolean)
              .join(" · ")
            return (
              <motion.li
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                // Cards share rows so meta, titles, summaries and links align.
                className="sm:row-span-5 sm:grid sm:grid-rows-subgrid sm:gap-y-4"
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col gap-4 text-midnight outline-none focus-visible:ring-2 focus-visible:ring-electric sm:row-span-5 sm:grid sm:grid-rows-subgrid sm:gap-y-4"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-midnight">
                    <Image
                      src={study.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </span>
                  <span className="text-xs text-muted-foreground">{meta}</span>
                  <span className="font-heading text-xl leading-tight group-hover:text-brand">
                    {study.title}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {study.summary}
                  </span>
                  <span className="flex items-center gap-2 self-end pt-2 font-mono text-xs tracking-wider uppercase">
                    Read case study
                    <Arrow
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>

      {results.length > visible && (
        <button
          type="button"
          onClick={() => setVisible((count) => count + PAGE)}
          className="self-center rounded-pill border border-midnight/25 px-8 py-3 font-mono text-xs font-semibold tracking-wider text-midnight uppercase transition-colors hover:bg-midnight hover:text-white"
        >
          Load more
        </button>
      )}

      {results.length === 0 && (
        <div className="flex flex-col items-start gap-4 bg-surface-2 p-8 text-midnight">
          <p className="font-heading text-3xl leading-none">
            Nothing here yet.
          </p>
          <p className="text-muted-foreground">
            We may still have relevant experience. Clear a filter, or ask us
            directly.
          </p>
        </div>
      )}
    </div>
  )
}

// Native select styled as a borderless dropdown with the site's chevron.
function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <span className="relative inline-flex items-center">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="[field-sizing:content] max-w-[16rem] cursor-pointer appearance-none bg-transparent py-1 pr-6 text-sm font-semibold text-midnight outline-none focus-visible:ring-2 focus-visible:ring-electric"
      >
        <option value={ALL}>{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
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
        className="pointer-events-none absolute right-0 size-3 text-midnight"
      >
        <path d="M2.5 4.5L6 8l3.5-3.5" />
      </svg>
    </span>
  )
}
