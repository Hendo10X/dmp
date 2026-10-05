"use client"

import * as React from "react"

import { insights } from "@/lib/content"
import { FilterChips } from "@/components/ui/filter-chips"
import { InsightList } from "@/components/page/insight-list"

const ALL = "all"
const types = Array.from(new Set(insights.map((i) => i.type)))
const topics = Array.from(new Set(insights.map((i) => i.topic)))

// Filter insights by type (reports, news...) and topic.
export function InsightBrowser() {
  const [type, setType] = React.useState(ALL)
  const [topic, setTopic] = React.useState(ALL)

  const results = insights.filter(
    (item) =>
      (type === ALL || item.type === type) &&
      (topic === ALL || item.topic === topic)
  )

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        <FilterChips
          id="type"
          label="Type"
          value={type}
          onChange={setType}
          options={[
            { value: ALL, label: "All" },
            ...types.map((t) => ({
              value: t,
              label: t === "News" ? t : `${t}s`,
            })),
          ]}
        />
        <FilterChips
          id="topic"
          label="Topic"
          value={topic}
          onChange={setTopic}
          options={[
            { value: ALL, label: "All" },
            ...topics.map((t) => ({ value: t, label: t })),
          ]}
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {results.length} insights shown
      </p>

      {results.length > 0 ? (
        // Keyed on the filters so the list re-enters as one block.
        <InsightList key={`${type}-${topic}`} items={results} />
      ) : (
        <div className="rounded-xl bg-secondary p-8 text-oxford">
          <p className="font-heading text-3xl leading-none">
            Nothing matches yet.
          </p>
          <p className="mt-3 text-muted-foreground">
            Try another topic, or subscribe below to hear when we publish.
          </p>
        </div>
      )}
    </div>
  )
}
