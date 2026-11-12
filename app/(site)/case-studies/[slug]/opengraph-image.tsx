import { getCaseStudies } from "@/lib/cms"
import { ogContentType, ogImage, ogSize } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "DMPartners case study"

// One card per case study, so a shared link previews that story.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = (await getCaseStudies()).find((c) => c.slug === slug)
  return ogImage({
    eyebrow: study ? `Case study · ${study.client}` : "Case study",
    title: study?.title ?? "Impact, with evidence.",
  })
}
