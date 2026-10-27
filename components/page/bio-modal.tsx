"use client"

import * as React from "react"
import Image from "next/image"
import { useLenis } from "lenis/react"

import type { TeamMember } from "@/lib/content"
import { LinkedinLink } from "@/components/ui/linkedin-link"

// "Read bio" button plus a native <dialog> modal: photo beside the full bio,
// page behind blurred. The dialog gives focus trapping, Escape to close and
// screen-reader semantics; clicking the blurred backdrop also closes it.
// Smooth scroll pauses while it is open.
export function BioModal({ person }: { person: TeamMember }) {
  const dialog = React.useRef<HTMLDialogElement>(null)
  const lenis = useLenis()
  const titleId = React.useId()

  const open = () => {
    dialog.current?.showModal()
    lenis?.stop()
  }
  const close = () => dialog.current?.close()

  if (!person.bio) return null

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex h-10 items-center gap-2 self-start rounded-pill bg-midnight px-6 font-mono text-xs font-semibold tracking-wider whitespace-nowrap text-white uppercase outline-offset-4 transition-colors hover:bg-midnight/90 focus-visible:outline-2 focus-visible:outline-electric"
      >
        Read bio
        <span aria-hidden className="text-sm leading-none text-mint">
          +
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => lenis?.start()}
        onClick={(event) => {
          // A click on the dialog element itself is a click on the backdrop.
          if (event.target === event.currentTarget) close()
        }}
        className="m-auto max-h-[90svh] w-[min(64rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-background p-0 text-midnight backdrop:bg-midnight/50 backdrop:backdrop-blur-md open:animate-[modal-in_0.5s_cubic-bezier(0.22,1,0.36,1)] open:backdrop:animate-[fade-in_0.4s_ease-out]"
      >
        {/* Close sits on the dialog itself so it stays in view over the photo. */}
        <button
          type="button"
          onClick={close}
          aria-label="Close bio"
          className="absolute top-3 right-3 z-10 flex size-10 items-center justify-center bg-background text-midnight outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-electric"
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="size-4"
          >
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
        {/* Phones: photo and bio scroll together. From md: the photo column
            keeps the portrait's 4:5 shape at the panel's height, so it is
            never cropped, and only the bio scrolls. */}
        <div
          data-lenis-prevent
          className="max-h-[90svh] overflow-y-auto md:grid md:h-[min(85svh,44rem)] md:grid-cols-[auto_minmax(0,1fr)] md:overflow-hidden"
        >
          {person.photo && (
            <div className="relative aspect-[4/5] bg-midnight md:h-full">
              <Image
                src={person.photo}
                alt={`Portrait of ${person.name}`}
                fill
                sizes="(min-width: 768px) 36rem, 100vw"
                className="object-cover object-top"
              />
            </div>
          )}

          <div
            data-lenis-prevent
            className="relative flex flex-col gap-5 p-6 md:overflow-y-auto md:p-10"
          >
            <div className="pr-10">
              <p
                id={titleId}
                className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]"
              >
                {person.name}
              </p>
              <p className="mt-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                {person.role}
              </p>
            </div>

            <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground">
              {person.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            {person.linkedin && (
              <LinkedinLink href={person.linkedin} name={person.name} />
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
