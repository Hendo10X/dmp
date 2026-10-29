import type { Metadata } from "next"

import { heroImages } from "@/lib/content"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { SpeakerTalks } from "@/components/page/speaker-talks"
import { Steps } from "@/components/page/steps"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "DMP Speakers",
  description:
    "Book a DMP speaker for conferences, board away-days and federation congresses.",
}

// How a booking works. PLACEHOLDER copy.
const booking = [
  {
    title: "Pick a talk",
    body: "Choose a topic below, or tell us the theme of your event.",
  },
  {
    title: "Tell us about the event",
    body: "Date, audience, format and length. A short note is plenty.",
  },
  {
    title: "Shape it together",
    body: "We tailor the talk to your audience and your goals.",
  },
]

// DMP Speakers on its own page (client), moved off Contact.
export default function SpeakersPage() {
  return (
    <main>
      <PageHero
        eyebrow="DMP Speakers"
        title="Book a DMP speaker."
        intro="Our partners speak at conferences, board away-days and federation congresses on the ideas behind our work."
        image={heroImages.speakers}
        imageAlt="Colleagues in discussion around a boardroom table in Lagos"
      />

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
        <SectionHeader
          eyebrow="Talks"
          title="Choose a talk."
          intro="Each talk is tailored to the room. Pick one to start a booking."
        />
        <SpeakerTalks className="mt-10 md:mt-12" />
      </section>

      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <SectionHeader eyebrow="Booking" title="How it works." />
        <Steps steps={booking} className="mt-10 md:mt-12" />
      </section>

      <Cta
        title="Have an event in mind?"
        body="Tell us the date and the audience. We will come back with the right speaker and talk."
        href="/contact?topic=speakers#enquiry"
        label="Enquire now"
      />
    </main>
  )
}
