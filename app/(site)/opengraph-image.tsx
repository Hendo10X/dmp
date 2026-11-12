import { getSiteContent } from "@/lib/cms"
import { ogContentType, ogImage, ogSize } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "DMPartners | Demonstrating Possibilities"

// Home card, and the fallback for any page without its own.
export default async function Image() {
  const { lead, words } = (await getSiteContent()).home.hero
  return ogImage({
    eyebrow: "Commercial & investment advisory",
    title: [lead, words[0]].filter(Boolean).join(" "),
  })
}
