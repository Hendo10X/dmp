import * as React from "react"

// Renders text from the CMS, turning *wrapped words* into the highlight
// (italic DMP green by default; pass `className` for a different accent,
// e.g. the muted second half of the home About heading).
export function Emphasis({
  text,
  className = "text-mint",
  italic = true,
}: {
  text: string
  className?: string
  italic?: boolean
}) {
  const parts = text.split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          italic ? (
            <em key={index} className={className}>
              {part}
            </em>
          ) : (
            <span key={index} className={className}>
              {part}
            </span>
          )
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  )
}
