import Image from "next/image"
import Link from "next/link"

import type { CaseStudy } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"

// Featured strip after PwC's case studies page: tiles butted edge to edge,
// photo on top with the client in a white label box overlapping its bottom
// edge, one-line summary on a tinted panel below. Four across on desktop; a
// swipeable snap row on smaller screens.
export function CaseStudyFeatured({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul
      aria-label="Featured case studies"
      className="-mx-6 flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {studies.map((study) => (
        <li
          key={study.slug}
          className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
        >
          <Link
            href={`/case-studies/${study.slug}`}
            className="group flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-electric"
          >
            <span className="relative block aspect-[4/3] overflow-hidden bg-midnight">
              <Image
                src={study.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 78vw"
                className="object-cover transition-[scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <span className="absolute bottom-0 left-0 max-w-[85%] bg-background px-5 pt-4 pb-3 font-heading text-lg leading-tight text-midnight">
                {study.client}
              </span>
            </span>
            <span className="flex flex-1 items-start justify-between gap-4 bg-surface-2 px-5 pt-3 pb-6 text-sm leading-relaxed text-midnight/70">
              {study.summary}
              <Arrow
                size={14}
                className="mt-1 shrink-0 text-midnight transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
