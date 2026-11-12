import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

// Link preview cards (Open Graph), drawn in the site's colours: logo, a mint
// label, the page title in Cal Sans and the tagline. Each key page has an
// opengraph-image.tsx that calls ogImage() with its own label and title;
// every other page falls back to the home card.

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const MIDNIGHT = "#0a1033"
const BRAND = "#0100fe"
const MINT = "#3be29c"

// Titles from the CMS mark highlights with *asterisks*; previews show them
// as plain text.
export const plain = (text: string) => text.replace(/\*/g, "")

export async function ogImage({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/CalSansUI-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/brand/dmpartners-white-nav.png")),
  ])
  const text = plain(title)
  // Long case study titles step down so they stay within three lines.
  const size = text.length > 70 ? 60 : text.length > 40 ? 72 : 88

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: MIDNIGHT,
          // Soft logo-blue glow in the corner, as behind the home globe.
          backgroundImage: `radial-gradient(circle at 100% 0%, ${BRAND} 0%, ${MIDNIGHT} 55%)`,
          color: "white",
          fontFamily: "Cal Sans",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={283}
          height={50}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: MINT,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 20,
              maxWidth: 980,
              fontSize: size,
              lineHeight: 1.05,
            }}
          >
            {text}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              backgroundColor: MINT,
              marginRight: 16,
            }}
          />
          Demonstrating Possibilities
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Cal Sans", data: font, style: "normal", weight: 600 }],
    }
  )
}
