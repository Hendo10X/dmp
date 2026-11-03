import "server-only"

import { createClient } from "next-sanity"
import { createImageUrlBuilder } from "@sanity/image-url"

import {
  caseStudies,
  contactDetails,
  featuredReport,
  openings,
  social,
  talks,
  team,
  type CaseStudy,
  type Opening,
  type ReportDoc,
  type SocialProfile,
  type TeamMember,
} from "@/lib/content"
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env"

// Content the client edits in Sanity (/studio). Every getter returns the
// built-in content from lib/content.ts until Sanity is configured, and also
// if a request to Sanity fails, so the site never renders empty.

const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

const images = sanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null

// Published edits appear within a minute.
const REVALIDATE = 60

async function query<T>(groq: string, fallback: T, params = {}): Promise<T> {
  if (!client) return fallback
  try {
    return await client.fetch<T>(groq, params, {
      next: { revalidate: REVALIDATE, tags: ["sanity"] },
    })
  } catch (error) {
    console.error("Sanity request failed, using built-in content", error)
    return fallback
  }
}

type SanityImage = { asset?: { _ref: string } } | null | undefined

const imageUrl = (image: SanityImage) =>
  image?.asset && images
    ? images.image(image).auto("format").width(2400).url()
    : undefined

const ORDER = "order(coalesce(order, 999) asc, _createdAt desc)"

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

// ------------------------------------------------------------ Case studies

type CaseStudyRow = Omit<CaseStudy, "image"> & { image: SanityImage }

const CASE_STUDY_FIELDS = `{
  "slug": slug.current, title, client, service, sector, image, summary,
  challenge, approach, impact,
  "stats": coalesce(stats[]{value, label}, []),
  "quote": select(defined(quote.text) => quote{text, by})
}`

const toCaseStudy = (row: CaseStudyRow): CaseStudy => ({
  ...row,
  image: imageUrl(row.image) ?? "",
  quote: row.quote ?? undefined,
})

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const rows = await query<CaseStudyRow[] | null>(
    `*[_type == "caseStudy" && defined(slug.current)] | ${ORDER} ${CASE_STUDY_FIELDS}`,
    null
  )
  return rows ? rows.map(toCaseStudy) : caseStudies
}

export async function getCaseStudy(
  slug: string
): Promise<CaseStudy | undefined> {
  const studies = await getCaseStudies()
  return studies.find((study) => study.slug === slug)
}

// -------------------------------------------------------------------- Team

type TeamRow = {
  name: string
  role: string
  photo: SanityImage
  linkedin?: string
  bio?: string[]
}

export async function getTeam(): Promise<TeamMember[]> {
  const rows = await query<TeamRow[] | null>(
    `*[_type == "teamMember"] | ${ORDER} {name, role, photo, linkedin, bio}`,
    null
  )
  if (!rows) return team
  return rows.map((row) => ({
    name: row.name,
    role: row.role,
    initials: initialsOf(row.name),
    photo: imageUrl(row.photo),
    linkedin: row.linkedin ?? undefined,
    bio: row.bio?.length ? row.bio : undefined,
  }))
}

// ---------------------------------------------------------------- Openings

export async function getOpenings(): Promise<Opening[]> {
  const rows = await query<Opening[] | null>(
    `*[_type == "opening"] | ${ORDER} {title, team, type, location}`,
    null
  )
  return rows ?? openings
}

// ---------------------------------------------------------------- Speakers

export async function getTalks(): Promise<string[]> {
  const rows = await query<string[] | null>(
    `*[_type == "speakerTalk"] | ${ORDER}.title`,
    null
  )
  return rows ?? talks
}

// ----------------------------------------------------------------- Reports

type ReportRow = {
  title: string
  url?: string
  filename?: string
  pages?: number
  bytes?: number
  summary?: string[]
}

export async function getFeaturedReport(): Promise<ReportDoc | null> {
  const row = await query<ReportRow | null | undefined>(
    `*[_type == "report" && featured == true && defined(file.asset)]
      | order(_createdAt desc)[0]{
        title, pages, summary,
        "url": file.asset->url,
        "bytes": file.asset->size,
        "filename": file.asset->originalFilename
      }`,
    undefined
  )
  // undefined: Sanity not in use. null: nothing featured yet.
  if (row === undefined) return featuredReport
  if (!row?.url) return null
  const file = `DMPartners - ${row.title}.pdf`
  return {
    title: row.title,
    // ?dl= makes Sanity's CDN serve the PDF as a download under this name
    // (the download attribute is ignored across origins).
    href: `${row.url}?dl=${encodeURIComponent(file)}`,
    file,
    pages: row.pages ?? undefined,
    size: row.bytes ? `${(row.bytes / 1024 / 1024).toFixed(1)} MB` : undefined,
    summary: row.summary ?? [],
  }
}

// ---------------------------------------------------- Contact and social

type SettingsRow = {
  email?: string
  phone?: string
  linkedin?: string
  facebook?: string
  x?: string
} | null

export type SiteSettings = {
  email: string
  phone: string
  social: SocialProfile[]
}

export async function getSettings(): Promise<SiteSettings> {
  const row = await query<SettingsRow | undefined>(
    `*[_id == "siteSettings"][0]{email, phone, linkedin, facebook, x}`,
    undefined
  )
  if (row === undefined) return { ...contactDetails, social }
  return {
    email: row?.email || contactDetails.email,
    phone: row?.phone || contactDetails.phone,
    social: [
      { name: "LinkedIn", url: row?.linkedin ?? "" },
      { name: "Facebook", url: row?.facebook ?? "" },
      { name: "X", url: row?.x ?? "" },
    ].filter((profile) => profile.url),
  }
}
