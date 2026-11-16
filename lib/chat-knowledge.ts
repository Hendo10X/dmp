import "server-only"

import { audiences } from "@/lib/content"
import {
  getCaseStudies,
  getFeaturedReport,
  getOpenings,
  getSettings,
  getSiteContent,
  getTalks,
} from "@/lib/cms"

// What the site assistant (app/api/chat) is allowed to know: a compact
// summary of the site's own content, read from the same sources as the
// pages, so Studio edits reach the assistant too. Kept short on purpose:
// Groq's free plan counts every token of this on every question.

const clip = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text

export async function getChatKnowledge(): Promise<{
  email: string
  knowledge: string
}> {
  const [content, studies, settings, openings, talks, report] =
    await Promise.all([
      getSiteContent(),
      getCaseStudies(),
      getSettings(),
      getOpenings(),
      getTalks(),
      getFeaturedReport(),
    ])

  const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n")

  const knowledge = [
    `ABOUT
DMPartners (DMP) is a commercial and investment advisory practice working where the sports industry meets adjacent markets, across Nigeria and the wider African continent. Tagline: Demonstrating Possibilities.
Purpose: ${content.about.purpose.title} ${content.about.purpose.tagline}
Mission: ${content.about.mission}
Positioning: ${content.about.positioning}
Values: ${content.about.values.map((v) => v.title).join(", ")}.`,

    `SERVICES (page: /services)
${list(
  content.services.map(
    (s) => `${s.title} (/services/${s.slug}): ${clip(s.summary, 160)}`
  )
)}`,

    `SOLUTIONS (page: /solutions)
${list(
  content.solutions.map(
    (s) =>
      `${s.title} (/solutions/${s.slug}), ${s.kicker.toLowerCase()}: ${clip(s.summary, 180)}`
  )
)}`,

    `WHO DMP SERVES (page: /who-we-serve)
${list(audiences.map((a) => `${a.title}: ${clip(a.body, 120)}`))}
Industries: ${content.home.industries.join(", ")}.`,

    `HOW DMP WORKS
${content.home.howWeWork.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join("\n")}`,

    `CASE STUDIES (page: /case-studies)
${list(
  studies
    .slice(0, 8)
    .map(
      (c) =>
        `${c.title} (/case-studies/${c.slug}), client: ${c.client}. ${clip(c.summary, 140)}`
    )
)}`,

    `REPORTS (page: /reports)
${report ? `Current report: ${report.title}. It is a free download from the Reports page after a short form.` : "No report is published at the moment."}`,

    `CAREERS (page: /careers)
${openings.length ? `Open roles: ${openings.map((o) => `${o.title} (${o.team}, ${o.type}, ${o.location})`).join("; ")}. Apply through /contact?topic=employment.` : "No open roles right now. Interest can be registered through /contact?topic=employment."}`,

    `SPEAKERS (page: /speakers)
DMP partners speak at conferences, board away-days and federation congresses.${talks.length ? ` Talks: ${talks.join("; ")}.` : ""} Enquiries through /contact?topic=speakers.`,

    `CONTACT (page: /contact)
Email: ${settings.email}
${settings.social.map((p) => `${p.name}: ${p.url}`).join("\n")}
Other pages: /about (purpose, values, team), /privacy, /terms.`,
  ].join("\n\n")

  return { email: settings.email, knowledge }
}
