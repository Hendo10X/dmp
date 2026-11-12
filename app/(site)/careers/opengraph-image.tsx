import { getSiteContent } from "@/lib/cms"
import { ogContentType, ogImage, ogSize } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Careers at DMPartners"

export default async function Image() {
  const content = await getSiteContent()
  const hero = content.careers.hero
  return ogImage({ eyebrow: hero.eyebrow, title: hero.title })
}
