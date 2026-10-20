import Image from "next/image"

import type { TeamMember } from "@/lib/content"
import { BioModal } from "@/components/page/bio-modal"

// One person on the About team grid. With a photo: portrait, summary line,
// LinkedIn and a "Read bio" button that opens the full text in a modal. Without:
// initials on midnight as a placeholder until the portrait arrives.
export function TeamCard({ person }: { person: TeamMember }) {
  return (
    <figure className="flex flex-col gap-4">
      <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-xl bg-midnight p-5">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <span className="font-heading text-[clamp(4rem,12vw,9rem)] leading-none text-white/10">
            {person.initials}
          </span>
        )}
      </div>

      <figcaption className="flex flex-col gap-1">
        <span className="font-heading text-2xl leading-tight text-midnight">
          {person.name}
        </span>
        <span className="text-sm text-muted-foreground">{person.role}</span>
        {person.summary && (
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {person.summary}
          </p>
        )}

        {(person.bio || person.linkedin) && (
          <div className="mt-4 flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-5">
            <BioModal person={person} />
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-semibold tracking-wider text-brand uppercase hover:text-midnight"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  )
}
