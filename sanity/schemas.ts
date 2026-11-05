import { defineArrayMember, defineField, defineType } from "sanity"

import { sectors } from "@/lib/content"
import { pageSchemaTypes } from "@/sanity/page-schemas"

// What the client edits in the Studio. Industries stay in code, so a case
// study picks one from a fixed list; practices are Service documents.
const sectorOptions = sectors.map((s) => ({ title: s.title, value: s.slug }))

// Lower numbers show first; equal numbers fall back to newest first.
const order = defineField({
  name: "order",
  title: "Display order",
  type: "number",
  description: "Lower numbers show first.",
  initialValue: 10,
})

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "The end of the page link, e.g. federation-data-rebuild.",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "service",
      title: "Practice",
      type: "reference",
      to: [{ type: "service" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sector",
      title: "Industry",
      type: "string",
      options: { list: sectorOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "challenge",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "approach",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "impact",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Headline numbers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.min(1).max(3),
    }),
    defineField({
      name: "quote",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 2 }),
        defineField({ name: "by", title: "Attributed to", type: "string" }),
      ],
    }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "client", media: "image" } },
})

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      description: "Portrait. Without one, the initials show instead.",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn profile",
      type: "url",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      description: "One entry per paragraph. Shown behind “Read bio”.",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    order,
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
})

export const opening = defineType({
  name: "opening",
  title: "Job opening",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "team",
      title: "Practice or team",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Contract",
      type: "string",
      options: { list: ["Full-time", "Part-time", "Contract", "Internship"] },
      initialValue: "Full-time",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      options: { list: ["On-site", "Hybrid", "Remote"] },
      initialValue: "Hybrid",
      validation: (rule) => rule.required(),
    }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "team" } },
})

export const speakerTalk = defineType({
  name: "speakerTalk",
  title: "Speaker talk",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    order,
  ],
})

export const report = defineType({
  name: "report",
  title: "Report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pages",
      title: "Number of pages",
      type: "number",
    }),
    defineField({
      name: "summary",
      type: "array",
      description: "One entry per paragraph. Shown on the Reports page.",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "featured",
      title: "Show on the Reports page",
      type: "boolean",
      description: "The newest featured report is the one offered to download.",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "title" } },
})

// Single document: contact details and social profiles.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Contact & social",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn page", type: "url" }),
    defineField({ name: "facebook", title: "Facebook page", type: "url" }),
    defineField({ name: "x", title: "X profile", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Contact & social" }) },
})

export const schemaTypes = [
  caseStudy,
  report,
  opening,
  teamMember,
  speakerTalk,
  siteSettings,
  ...pageSchemaTypes,
]
