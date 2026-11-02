import type { Metadata } from "next"

import { heroImages } from "@/lib/content"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PageHero } from "@/components/page/page-hero"
import { Report } from "@/components/page/report"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Research from DMPartners on sports and industrialisation in Nigeria and Africa, including the Nigeria Sports Industry Outlook 2026.",
}

// Summary of the Nigeria Sports Industry Outlook 2026, drawn from the
// report's introduction, executive summary and outlook for 2026.
const summary = [
  "With over 70% of Nigeria’s population under the age of 35, sports is one of the country’s most powerful and underleveraged economic opportunities, even after its recognition as a business sector of the Nigerian economy in 2020. The Nigeria Sports Industry Outlook 2026, the first report of its kind, is a strategic intelligence report and reference for investors, policymakers, business leaders and practitioners looking for where capital, partnerships and innovation can unlock sustainable returns across the sports value chain.",
  "The Outlook examines five pillars that shape how sports is organised, funded, commercialised, regulated and consumed: governance, policy and regulations; sporting events; partnerships and investments; licensing, IP and merchandising; and sports infrastructure. Stakeholders across these sectors review the moments that defined 2025, from the signing of the anti-doping bill to the Sports Africa Investment Summit and the Super Falcons’ WAFCON campaign, and set out the shifts they expect in 2026.",
  "Their consensus is that success will be measured beyond medals: in stronger systems, credible administration, private-sector confidence and how well the industry converts ambition into structure, and structure into long-term value.",
]

// Reports get their own page (client). One report for now: the gated
// Nigeria Sports Industry Outlook 2026 download, introduced by a summary.
export default function ReportsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Reports"
        title="Research that moves decisions."
        intro="Evidence on sports and industrialisation in Nigeria and across Africa."
        image={heroImages.reports}
        imageAlt="Market data charts on a screen"
      />

      {/* Summary: one left-aligned reading column on white (client). */}
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <div className="flex max-w-4xl flex-col gap-5">
          <Reveal y={12}>
            <Eyebrow>Summary</Eyebrow>
          </Reveal>
          <SplitReveal className="text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.08] text-midnight">
            Nigeria Sports Industry Outlook 2026.
          </SplitReveal>
          {summary.map((paragraph) => (
            <SplitReveal
              key={paragraph.slice(0, 24)}
              as="p"
              className="text-base leading-relaxed text-midnight/70 md:text-lg"
            >
              {paragraph}
            </SplitReveal>
          ))}
        </div>
      </section>

      <Report />

      <Cta
        title="Need research of your own?"
        body="Market sizing, audience studies and indices built around your question. Tell us what you need to know."
      />
    </main>
  )
}
