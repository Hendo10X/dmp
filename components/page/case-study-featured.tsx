import Image from "next/image"
import Link from "next/link"

import type { CaseStudy } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"

// Featured strip after PwC's case studies page: photo on top with the client
// in a white label box overlapping its bottom edge, one-line summary on a
// tinted panel below. Stacked on phones (client: no sideways scrolling), two
// across on tablets, four on desktop, with the site's usual gap between
// cards.
//
// Each tile spans three shared rows (CSS subgrid): photo, label, summary.
// Label boxes in a row are therefore as tall as the tallest one, however
// long the client name. The gap under each tile is padding inside its last
// row, because a row gap would also split photo, label and summary.
export function CaseStudyFeatured({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul
      aria-label="Featured case studies"
      className="-mb-3 grid auto-rows-[1fr_auto_auto] gap-x-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {studies.map((study) => (
        <li key={study.slug} className="row-span-3 grid grid-rows-subgrid">
          <Link
            href={`/case-studies/${study.slug}`}
            className="group row-span-3 grid grid-rows-subgrid outline-none"
          >
            {/* The photo runs behind the label row. */}
            <span className="relative col-start-1 row-span-2 row-start-1 block aspect-[4/3] overflow-hidden rounded-t-xl bg-midnight group-focus-visible:ring-2 group-focus-visible:ring-electric">
              <Image
                src={study.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </span>
            <span className="relative col-start-1 row-start-2 max-w-[85%] justify-self-start bg-background px-5 pt-4 pb-3 font-heading text-lg leading-tight text-midnight">
              {study.client}
            </span>
            <span className="col-start-1 row-start-3 flex pb-3">
              <span className="flex flex-1 items-start justify-between gap-4 rounded-b-xl bg-surface-2 px-5 pt-3 pb-6 text-sm leading-relaxed text-midnight/70">
                {study.summary}
                <Arrow
                  size={14}
                  className="mt-1 shrink-0 text-midnight transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
