import Image from "next/image"

import type { TeamMember } from "@/lib/content"
import { BioModal } from "@/components/page/bio-modal"
import { LinkedinLink } from "@/components/ui/linkedin-link"

// One person on the About team grid. Every portrait sits on DMP logo blue
// (client): the cut-out (background removed) when there is one, otherwise
// the photo as supplied, otherwise initials. Portraits are greyscale at
// rest and turn to colour on hover, or while the card's buttons have focus
// (client). Below: "Read bio" (full text in a modal) and LinkedIn.
export function TeamCard({ person }: { person: TeamMember }) {
  const portrait = person.cutout ?? person.photo
  return (
    <figure className="group flex flex-col gap-4">
      <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-xl bg-brand p-5">
        {portrait ? (
          <Image
            src={portrait}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover object-top grayscale transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:grayscale-0 group-hover:grayscale-0"
          />
        ) : (
          <span className="font-heading text-[clamp(4rem,12vw,9rem)] leading-none text-white/15">
            {person.initials}
          </span>
        )}
      </div>

      <figcaption className="flex flex-col gap-1">
        <span className="font-heading text-2xl leading-tight text-midnight">
          {person.name}
        </span>
        <span className="text-sm text-midnight/70">{person.role}</span>
        {(person.bio || person.linkedin) && (
          <div className="mt-4 flex items-center gap-3">
            <BioModal person={person} />
            {person.linkedin && (
              <LinkedinLink href={person.linkedin} name={person.name} />
            )}
          </div>
        )}
      </figcaption>
    </figure>
  )
}
