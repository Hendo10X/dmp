import type { Metadata } from "next"

import { LegalPage } from "@/components/page/legal-page"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How DMP collects, uses and protects personal information. Placeholder text pending legal review."
      sections={[
        {
          heading: "What we collect",
          body: "Information you give us through forms, such as your name, email address and organisation, and basic analytics about how the site is used.",
        },
        {
          heading: "How we use it",
          body: "To reply to enquiries, send the newsletter you asked for, and improve the site. We do not sell personal information.",
        },
        {
          heading: "Your rights",
          body: "You can ask to see, correct or delete the information we hold about you at any time by contacting us.",
        },
        {
          heading: "Contact",
          body: "Questions about this policy can be sent through the contact page.",
        },
      ]}
    />
  )
}
