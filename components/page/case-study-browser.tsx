"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import { caseStudies, sectors, services } from "@/lib/content"
import { FilterChips } from "@/components/ui/filter-chips"
import { CaseStudyCard } from "@/components/page/case-study-card"

const ALL = "all"

// Filter case studies by service and sector. Filters live in the URL so
// Industries can link straight to ?sector=...
export function CaseStudyBrowser() {
  const router = useRouter()
  const params = useSearchParams()
  const service = params.get("service") ?? ALL
  const sector = params.get("sector") ?? ALL

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value === ALL) next.delete(key)
    else next.set(key, value)
    const query = next.toString()
    router.replace(query ? `?${query}` : "?", { scroll: false })
  }

  const results = caseStudies.filter(
    (study) =>
      (service === ALL || study.service === service) &&
      (sector === ALL || study.sector === sector)
  )

  return (
    <div className="flex flex-col gap-14 md:gap-20">
      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        <FilterChips
          id="service"
          label="Service"
          value={service}
          onChange={(value) => update("service", value)}
          options={[
            { value: ALL, label: "All" },
            ...services.map((s) => ({ value: s.slug, label: s.title })),
          ]}
        />
        <FilterChips
          id="sector"
          label="Sector"
          value={sector}
          onChange={(value) => update("sector", value)}
          options={[
            { value: ALL, label: "All" },
            ...sectors.map((s) => ({ value: s.slug, label: s.title })),
          ]}
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {results.length} case studies shown
      </p>

      <motion.ul
        layout
        className="grid gap-12 md:grid-cols-2 md:gap-x-6 md:gap-y-20"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((study) => (
            <motion.li
              key={study.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <CaseStudyCard study={study} size="large" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {results.length === 0 && (
        <div className="flex flex-col items-start gap-4 rounded-xl bg-secondary p-8 text-oxford">
          <p className="font-heading text-3xl leading-none">
            Nothing here yet.
          </p>
          <p className="text-muted-foreground">
            We may still have relevant experience. Clear a filter, or ask us
            directly.
          </p>
          <button
            type="button"
            onClick={() => router.replace("?", { scroll: false })}
            className="font-mono text-xs tracking-wider uppercase underline decoration-oxford/30 underline-offset-8 hover:decoration-oxford"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
