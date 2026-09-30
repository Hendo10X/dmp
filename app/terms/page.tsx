import type { Metadata } from "next"

import { LegalPage } from "@/components/page/legal-page"

export const metadata: Metadata = { title: "Terms" }

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="The terms that apply when you use this website. Placeholder text pending legal review."
      sections={[
        {
          heading: "Using this site",
          body: "Content on this site is for general information and does not constitute professional advice for your specific situation.",
        },
        {
          heading: "Intellectual property",
          body: "Reports, text and images on this site belong to DMP or its licensors unless stated otherwise.",
        },
        {
          heading: "Liability",
          body: "We work to keep information accurate but cannot guarantee it is complete or current.",
        },
        {
          heading: "Changes",
          body: "We may update these terms from time to time. The latest version will always be on this page.",
        },
      ]}
    />
  )
}
