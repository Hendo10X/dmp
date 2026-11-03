"use client"

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { apiVersion, dataset, projectId } from "@/sanity/env"
import { schemaTypes } from "@/sanity/schemas"

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
    // No "create another" for the single settings document.
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== "siteSettings"),
  },
})
