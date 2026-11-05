"use client"

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { apiVersion, dataset, projectId } from "@/sanity/env"
import { pageTypes } from "@/sanity/page-schemas"
import { schemaTypes } from "@/sanity/schemas"

const singletons = new Set(["siteSettings", ...pageTypes.map((t) => t.name)])

// The Studio the client edits content in, served at /studio.
export default defineConfig({
  basePath: "/studio",
  title: "DMPartners",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      // "Contact & social" is a single document, opened directly.
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Pages")
              .id("pages")
              .child(
                S.list()
                  .title("Pages")
                  .items(
                    pageTypes.map((t) =>
                      S.listItem()
                        .title(t.title ?? t.name)
                        .id(t.name)
                        .child(
                          S.document().schemaType(t.name).documentId(t.name)
                        )
                    )
                  )
              ),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("solution").title("Solutions"),
            S.divider(),
            S.documentTypeListItem("caseStudy").title("Case studies"),
            S.documentTypeListItem("report").title("Reports"),
            S.documentTypeListItem("opening").title("Job openings"),
            S.documentTypeListItem("teamMember").title("Team"),
            S.documentTypeListItem("speakerTalk").title("Speaker talks"),
            S.divider(),
            S.listItem()
              .title("Contact & social")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
    // Query playground for the developer.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // No "create another" for single documents (settings and pages).
    newDocumentOptions: (prev) =>
      prev.filter((item) => !singletons.has(item.templateId)),
    actions: (prev, { schemaType }) =>
      singletons.has(schemaType)
        ? prev.filter((a) => !["duplicate", "delete"].includes(a.action ?? ""))
        : prev,
  },
})
