// One-off import of the site's current content into Sanity, so the client
// starts with everything already filled in. Run from the project folder
// after `npx sanity login`:
//
//   npx sanity exec scripts/import-to-sanity.ts --with-user-token
//
// Safe to run again: each document has a fixed id and is only created if it
// does not exist yet, so edits made in the Studio are never overwritten.
import { createReadStream } from "node:fs"
import path from "node:path"
import { getCliClient } from "sanity/cli"

import {
  caseStudies,
  contactDetails,
  featuredReport,
  openings,
  social,
  talks,
  team,
} from "../lib/content"

const client = getCliClient({ apiVersion: "2025-10-01" })
const publicDir = path.join(process.cwd(), "public")

// Uploads are de-duplicated by Sanity (same file, same asset), so re-runs
// do not pile up copies.
const uploaded = new Map<string, string>()

async function upload(kind: "image" | "file", sitePath: string) {
  const cached = uploaded.get(sitePath)
  if (cached) return cached
  const file = path.join(publicDir, decodeURIComponent(sitePath))
  const asset = await client.assets.upload(kind, createReadStream(file), {
    filename: path.basename(file),
  })
  uploaded.set(sitePath, asset._id)
  return asset._id
}

const image = async (sitePath: string) => ({
  _type: "image",
  asset: { _type: "reference", _ref: await upload("image", sitePath) },
})

const keyed = <T extends object>(items: T[]) =>
  items.map((item, index) => ({ _key: `k${index}`, ...item }))

const slugId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

async function main() {
  const docs: Array<{ _id: string; _type: string; [key: string]: unknown }> = []

  for (const [index, study] of caseStudies.entries()) {
    docs.push({
      _id: `caseStudy-${study.slug}`,
      _type: "caseStudy",
      title: study.title,
      slug: { _type: "slug", current: study.slug },
      client: study.client,
      service: study.service,
      sector: study.sector,
      image: await image(study.image),
      summary: study.summary,
      challenge: study.challenge,
      approach: study.approach,
      impact: study.impact,
      stats: keyed(study.stats),
      ...(study.quote ? { quote: study.quote } : {}),
      order: (index + 1) * 10,
    })
  }

  for (const [index, person] of team.entries()) {
    docs.push({
      _id: `teamMember-${slugId(`${person.name}-${person.role}`)}`,
      _type: "teamMember",
      name: person.name,
      role: person.role,
      ...(person.photo ? { photo: await image(person.photo) } : {}),
      ...(person.linkedin ? { linkedin: person.linkedin } : {}),
      ...(person.bio ? { bio: person.bio } : {}),
      order: (index + 1) * 10,
    })
  }

  for (const [index, role] of openings.entries()) {
    docs.push({
      _id: `opening-${slugId(role.title)}`,
      _type: "opening",
      ...role,
      order: (index + 1) * 10,
    })
  }

  for (const [index, title] of talks.entries()) {
    docs.push({
      _id: `speakerTalk-${slugId(title)}`,
      _type: "speakerTalk",
      title,
      order: (index + 1) * 10,
    })
  }

  docs.push({
    _id: `report-${slugId(featuredReport.title)}`,
    _type: "report",
    title: featuredReport.title,
    file: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: await upload("file", featuredReport.href),
      },
    },
    pages: featuredReport.pages,
    summary: featuredReport.summary,
    featured: true,
  })

  const profile = (name: string) => social.find((p) => p.name === name)?.url
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    email: contactDetails.email,
    phone: contactDetails.phone,
    linkedin: profile("LinkedIn"),
    facebook: profile("Facebook"),
    x: profile("X"),
  })

  const tx = client.transaction()
  for (const doc of docs) tx.createIfNotExists(doc)
  await tx.commit()
  console.log(
    `Imported ${docs.length} documents (existing ones left as they were).`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
