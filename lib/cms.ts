import "server-only"

import { cache } from "react"
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
import { defaultContent, type SiteContent } from "@/lib/site-content"
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
  "slug": slug.current, title, client, sector, image, summary,
  "service": coalesce(service->slug.current, service),
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

// ------------------------------------------------------------ Page content

const META = new Set([
  "_id",
  "_type",
  "_rev",
  "_key",
  "_createdAt",
  "_updatedAt",
])

// Sanity images become URLs and Sanity's bookkeeping keys are dropped, so
// documents line up with the shapes in lib/site-content.ts.
function clean(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(clean)
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    if (record._type === "image") return imageUrl(record as SanityImage)
    const out: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(record))
      if (!META.has(key)) out[key] = clean(item)
    return out
  }
  return value
}

// Sanity's value wins unless it is blank (missing, empty text or an empty
// list), in which case today's copy stays.
function merge<T>(base: T, over: unknown): T {
  if (over === null || over === undefined || over === "") return base
  if (Array.isArray(base) || Array.isArray(over))
    return (Array.isArray(over) && over.length > 0 ? over : base) as T
  if (base !== null && typeof base === "object" && typeof over === "object") {
    const a = base as Record<string, unknown>
    const b = over as Record<string, unknown>
    const out: Record<string, unknown> = { ...a }
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)]))
      out[key] = key in a ? merge(a[key], b[key]) : b[key]
    return out as T
  }
  return (base === undefined || typeof over === typeof base ? over : base) as T
}

// Merge each Sanity item over the built-in item with the same slug; items
// added in Sanity stand on their own.
function mergeBySlug<T extends { slug: string }>(
  base: T[],
  rows: unknown[] | null | undefined
): T[] {
  if (!rows?.length) return base
  return rows
    .map((row) => clean(row) as Partial<T>)
    .filter((row): row is Partial<T> & { slug: string } => !!row.slug)
    .map((row) => {
      const match = base.find((item) => item.slug === row.slug)
      return match ? merge(match, row) : (row as T)
    })
}

type PagesRow = Record<string, unknown> & {
  services_?: unknown[]
  solutions_?: unknown[]
}

// Every page's copy in one request, shared by everything rendered for that
// request (React cache).
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const row = await query<PagesRow | null>(
    `{
      "home": *[_id == "homePage"][0]{
        ...,
        "feature": {"solution": feature.solution->slug.current},
        "impact": impact{
          ...,
          "story": story{..., "caseStudy": caseStudy->slug.current}
        }
      },
      "about": *[_id == "aboutPage"][0],
      "careers": *[_id == "careersPage"][0],
      "services": *[_id == "servicesPage"][0],
      "solutions": *[_id == "solutionsPage"][0],
      "whoWeServe": *[_id == "whoWeServePage"][0],
      "caseStudies": *[_id == "caseStudiesPage"][0],
      "reports": *[_id == "reportsPage"][0],
      "speakers": *[_id == "speakersPage"][0],
      "contact": *[_id == "contactPage"][0],
      "services_": *[_type == "service" && defined(slug.current)] | ${ORDER} {
        ..., "slug": slug.current, "caseStudy": caseStudy->slug.current
      },
      "solutions_": *[_type == "solution" && defined(slug.current)] | ${ORDER} {
        ..., "slug": slug.current, "services": services[]->slug.current
      }
    }`,
    null
  )
  if (!row) return defaultContent

  const d = defaultContent
  return {
    services: mergeBySlug(d.services, row.services_),
    solutions: mergeBySlug(d.solutions, row.solutions_),
    home: merge(d.home, clean(row.home)),
    about: merge(d.about, clean(row.about)),
    careers: merge(d.careers, clean(row.careers)),
    pages: {
      services: merge(d.pages.services, clean(row.services)),
      solutions: merge(d.pages.solutions, clean(row.solutions)),
      whoWeServe: merge(d.pages.whoWeServe, clean(row.whoWeServe)),
      caseStudies: merge(d.pages.caseStudies, clean(row.caseStudies)),
      reports: merge(d.pages.reports, clean(row.reports)),
      speakers: merge(d.pages.speakers, clean(row.speakers)),
      contact: merge(d.pages.contact, clean(row.contact)),
    },
  }
})

export async function getServices() {
  return (await getSiteContent()).services
}

export async function getSolutions() {
  return (await getSiteContent()).solutions
}
