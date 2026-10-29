import Link from "next/link"

import { cn } from "@/lib/utils"
import { Arrow } from "@/components/ui/arrow"
import { Reveal } from "@/components/motion/reveal"

// DMP Speakers talk topics. PLACEHOLDER titles until the client confirms
// the list.
export const talks = [
  "The business of sports",
  "Data and the modern federation",
  "Investing in African sports",
  "Governance that lasts",
]

const tones = [
  "bg-midnight text-white",
  "bg-brand text-white",
  "bg-mint text-midnight",
]

// Talk cards in three rotating colours. Each opens the enquiry form on
// Contact with the topic set and the talk named in the message.
export function SpeakerTalks({ className }: { className?: string }) {
  return (
    <Reveal className={className}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {talks.map((talk, index) => (
          <li key={talk} className="flex">
            <Link
              href={`/contact?topic=speakers&talk=${encodeURIComponent(talk)}#enquiry`}
              className={cn(
                "group flex min-h-56 w-full flex-col gap-6 rounded-xl p-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-electric md:p-7",
                tones[index % tones.length]
              )}
            >
              <span className="font-heading text-3xl leading-none">{talk}</span>
              <span className="mt-auto flex items-center justify-between gap-4 text-sm font-medium">
                Book this talk
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
