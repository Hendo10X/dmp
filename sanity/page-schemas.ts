import { defineArrayMember, defineField, defineType } from "sanity"

import { audiences } from "@/lib/content"

// Page copy, services and solutions. Field names match the shapes in
// lib/site-content.ts and lib/content.ts; anything left blank falls back to
// the site's built-in copy.

const EMPHASIS = "Wrap words in *asterisks* to show them in italic green."
const audienceOptions = audiences.map((a) => ({ title: a.title, value: a.slug }))

const str = (name: string, title?: string, description?: string) =>
  defineField({ name, title, type: "string", description })

const txt = (name: string, title?: string, description?: string, rows = 3) =>
  defineField({ name, title, type: "text", rows, description })

const photo = (name = "image", title = "Photo") =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    description: "Use the focal point tool so faces stay in frame.",
  })

const photoAlt = (name = "imageAlt") =>
  str(name, "Photo description", "Read aloud to people using screen readers.")

const order = defineField({
  name: "order",
  title: "Display order",
  type: "number",
  description: "Lower numbers show first.",
  initialValue: 10,
})

// ------------------------------------------------------------ Shared parts

export const hero = defineType({
  name: "hero",
  title: "Page hero",
  type: "object",
  fields: [
    str("eyebrow", "Eyebrow", "The small capitalised label above the title."),
    str("title", "Title", EMPHASIS),
    txt("intro", "Subtext", EMPHASIS),
    photo("image", "Background photo"),
    photoAlt(),
  ],
})

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section heading",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [str("eyebrow"), str("title"), txt("intro", "Subtext")],
})

export const card = defineType({
  name: "card",
  title: "Card",
  type: "object",
  fields: [str("title"), txt("body", "Text")],
  preview: { select: { title: "title", subtitle: "body" } },
})

export const stat = defineType({
  name: "stat",
  title: "Number",
  type: "object",
  fields: [
    str("value", "Number", "e.g. 38%, 2.4× or 12. Counts up on screen."),
    str("label"),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
})

const header = (name: string, title: string) =>
  defineField({ name, title, type: "sectionHeader" })

const cards = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "card" })],
  })

const lines = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [defineArrayMember({ type: "string" })],
  })

const heroField = defineField({ name: "hero", title: "Hero", type: "hero" })

// ------------------------------------------------------- Services, solutions

export const service = defineType({
  name: "service",
  title: "Service",
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
      description: "The end of the page link. Changing it breaks old links.",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    txt("summary", "Card text", "One line, shown on cards and in the menu.", 2),
    defineField({
      name: "image",
      title: "Card photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    txt("what", "What it is", undefined, 4),
    defineField({
      name: "forWhom",
      title: "Built for",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: audienceOptions },
    }),
    cards("approach", "How we deliver it (steps)"),
    defineField({
      name: "caseStudy",
      title: "Featured case study",
      type: "reference",
      to: [{ type: "caseStudy" }],
    }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "summary", media: "image" } },
})

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    str("short", "Short name", "Optional. Used where space is tight, e.g. FBT."),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "The end of the page link. Changing it breaks old links.",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    str("kicker", "Label", "e.g. Index, Programme, Measured."),
    txt("summary", "Card text", undefined, 2),
    defineField({
      name: "image",
      title: "Card photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    txt("what", "What it is", undefined, 4),
    lines("outcomes", "Outcomes"),
    cards("how", "How it works (steps)"),
    defineField({
      name: "forWhom",
      title: "Built for",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: audienceOptions },
    }),
    defineField({
      name: "services",
      title: "Related services",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
    }),
    order,
  ],
  preview: { select: { title: "title", subtitle: "kicker", media: "image" } },
})

// ------------------------------------------------------------------- Pages

const page = (
  name: string,
  title: string,
  fields: ReturnType<typeof defineField>[],
  groups?: { name: string; title: string; default?: boolean }[]
) =>
  defineType({
    name,
    title,
    type: "document",
    groups,
    fields,
    preview: { prepare: () => ({ title }) },
  })

const inGroup = <T extends object>(group: string, field: T) => ({
  ...field,
  group,
})

export const homePage = page(
  "homePage",
  "Home",
  [
    inGroup(
      "hero",
      defineField({
        name: "hero",
        title: "Hero",
        type: "object",
        fields: [
          str("lead", "First line", "e.g. Demonstrating"),
          lines(
            "words",
            "Rotating second line",
            "The words that swap in turn. The first one shows first."
          ),
          txt("intro", "Subtext", EMPHASIS),
        ],
      })
    ),
    inGroup(
      "sections",
      defineField({
        name: "howWeWork",
        title: "How we work (also on About and Services)",
        type: "object",
        fields: [header("header", "Heading"), cards("steps", "Steps")],
      })
    ),
    inGroup("sections", header("solutions", "Our solutions heading")),
    inGroup("sections", header("services", "What we do heading")),
    inGroup(
      "sections",
      defineField({
        name: "feature",
        title: "Featured solution band",
        type: "object",
        fields: [
          defineField({
            name: "solution",
            title: "Solution to feature",
            type: "reference",
            to: [{ type: "solution" }],
          }),
        ],
      })
    ),
    inGroup("sections", header("stories", "Client stories heading")),
    inGroup(
      "impact",
      defineField({
        name: "impact",
        title: "Client impact",
        type: "object",
        fields: [
          header("header", "Heading"),
          defineField({
            name: "stats",
            title: "Numbers (three columns)",
            type: "array",
            of: [defineArrayMember({ type: "stat" })],
            validation: (rule) => rule.max(3),
          }),
          defineField({
            name: "story",
            title: "Case study column",
            type: "object",
            fields: [
              str("eyebrow"),
              str("title"),
              defineField({
                name: "caseStudy",
                title: "Links to",
                type: "reference",
                to: [{ type: "caseStudy" }],
              }),
              defineField({ name: "stat", title: "Big number", type: "stat" }),
              photo(),
              photoAlt(),
            ],
          }),
        ],
      })
    ),
    inGroup(
      "about",
      defineField({
        name: "about",
        title: "About DMPartners",
        type: "object",
        fields: [
          str("eyebrow"),
          str(
            "title",
            "Title",
            "Wrap words in *asterisks* to show them in the softer colour."
          ),
          txt("body", "Text", undefined, 4),
          photo(),
          photoAlt(),
          txt("badge", "Photo badge", "Text on the dark label over the photo.", 2),
          str("industriesLabel", "Industries label"),
        ],
      })
    ),
    inGroup(
      "about",
      lines("industries", "Industries we serve", "Shown as the moving ticker.")
    ),
    inGroup(
      "closing",
      defineField({
        name: "explore",
        title: "Where to next",
        type: "object",
        fields: [
          header("header", "Heading"),
          defineField({
            name: "tiles",
            title: "Tiles",
            type: "array",
            of: [
              defineArrayMember({
                type: "object",
                fields: [str("title"), txt("body", "Text", undefined, 2), str("href", "Link", "e.g. /careers")],
                preview: { select: { title: "title", subtitle: "href" } },
              }),
            ],
          }),
        ],
      })
    ),
    inGroup(
      "closing",
      defineField({
        name: "quote",
        title: "Quote band (Home, About, Contact)",
        type: "object",
        fields: [str("eyebrow"), txt("text", "Quote"), str("by", "Attributed to")],
      })
    ),
  ],
  [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "impact", title: "Impact" },
    { name: "about", title: "About" },
    { name: "closing", title: "Closing" },
  ]
)

export const aboutPage = page("aboutPage", "About", [
  heroField,
  defineField({
    name: "purpose",
    title: "Purpose",
    type: "object",
    fields: [
      str("eyebrow"),
      str("title"),
      txt("body", "Text", undefined, 5),
      str("tagline", "Closing line"),
    ],
  }),
  txt("mission", "Mission", undefined, 4),
  txt("positioning", "Positioning", undefined, 2),
  cards("values", "Values"),
  header("team", "Team heading"),
  defineField({
    name: "markets",
    title: "Markets (globe) section",
    type: "object",
    fields: [str("title"), txt("intro", "Subtext")],
  }),
  defineField({
    name: "message",
    title: "A message from the top",
    type: "object",
    fields: [
      str("eyebrow"),
      txt("lead", "Opening (large)", undefined, 3),
      defineField({
        name: "paragraphs",
        type: "array",
        of: [defineArrayMember({ type: "text", rows: 4 })],
      }),
      str("signoff", "Signed"),
    ],
  }),
])

export const careersPage = page("careersPage", "Careers", [
  heroField,
  defineField({
    name: "culture",
    title: "How we work together",
    type: "object",
    fields: [header("header", "Heading"), lines("cards", "Cards")],
  }),
  defineField({
    name: "paths",
    title: "Ways in",
    type: "object",
    fields: [
      header("header", "Heading"),
      defineField({
        name: "cards",
        title: "Cards",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              str("title"),
              txt("body", "Text", undefined, 2),
              photo(),
              str("href", "Link", "e.g. /contact?topic=employment"),
              str("cta", "Button text"),
            ],
            preview: { select: { title: "title", media: "image" } },
          }),
        ],
      }),
    ],
  }),
  header("openings", "Open roles heading"),
  defineField({
    name: "process",
    title: "Application process",
    type: "object",
    fields: [header("header", "Heading"), cards("steps", "Steps")],
  }),
])

export const servicesPage = page("servicesPage", "Services page", [
  heroField,
  header("cards", "Cards heading"),
  header("inPractice", "Case studies heading"),
])

export const solutionsPage = page("solutionsPage", "Solutions page", [
  heroField,
  header("behind", "Services section heading"),
])

export const whoWeServePage = page("whoWeServePage", "Who we serve", [heroField])
export const caseStudiesPage = page("caseStudiesPage", "Case studies page", [
  heroField,
])
export const reportsPage = page("reportsPage", "Reports page", [heroField])
export const speakersPage = page("speakersPage", "Speakers page", [heroField])
export const contactPage = page("contactPage", "Contact page", [heroField])

// Singletons, opened directly from the Studio menu.
export const pageTypes = [
  homePage,
  aboutPage,
  careersPage,
  servicesPage,
  solutionsPage,
  whoWeServePage,
  caseStudiesPage,
  reportsPage,
  speakersPage,
  contactPage,
]

export const pageSchemaTypes = [
  hero,
  sectionHeader,
  card,
  stat,
  service,
  solution,
  ...pageTypes,
]
