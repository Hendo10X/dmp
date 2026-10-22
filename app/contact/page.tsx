import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"

import { Arrow } from "@/components/ui/arrow"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { ContactForm } from "@/components/page/contact-form"
import { Quote } from "@/components/page/closing"
import { social } from "@/lib/content"

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with DMP, or book a DMP speaker.",
}

// PLACEHOLDER contact details: replace with the client's real ones.
const direct = [
  {
    label: "Email",
    value: "hello@dmpartners.com",
    href: "mailto:hello@dmpartners.com",
  },
  { label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
]

const talks = [
  "The business of sports",
  "Data and the modern federation",
  "Investing in African sports",
  "Governance that lasts",
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Start a Conversation."
        intro="Tell us a little about your organisation and what you are trying to change. A short note is plenty."
      />

      <section
        id="enquiry"
        className="relative z-10 mx-auto max-w-[120rem] scroll-mt-28 bg-background px-6 pb-16 md:pb-20 lg:px-10"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <Suspense>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
            <div>
              <Eyebrow className="text-midnight/70">Direct</Eyebrow>
              <ul className="mt-6 flex flex-col gap-5">
                {direct.map((item) => (
                  <li key={item.label} className="flex flex-col gap-1">
                    <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      className="font-heading text-[clamp(1.25rem,1.9vw,1.875rem)] leading-none whitespace-nowrap text-midnight transition-colors hover:text-brand"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-midnight p-6 text-white">
              <p className="font-mono text-xs tracking-wider text-mint uppercase">
                Prefer to talk first?
              </p>
              <p className="mt-3 leading-relaxed">
                Drop a message and we will schedule a call at a time that suits
                you.
              </p>
            </div>
            <div>
              <Eyebrow className="text-midnight/70">
                Follow us on social media
              </Eyebrow>
              <p className="mt-4 text-midnight">
                Join the conversation on LinkedIn and X.
              </p>
              <ul className="mt-4 flex gap-2">
                {social.map((profile) => (
                  <li key={profile.name}>
                    {profile.url ? (
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center rounded-pill border border-midnight/20 px-5 font-mono text-xs font-semibold tracking-wider text-midnight uppercase transition-colors hover:bg-midnight hover:text-white"
                      >
                        {profile.name}
                      </a>
                    ) : (
                      <span className="inline-flex h-10 items-center rounded-pill border border-midnight/20 px-5 font-mono text-xs font-semibold tracking-wider text-midnight uppercase">
                        {profile.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DMP Speakers */}
      <section
        id="speakers"
        className="relative z-10 mx-auto max-w-[120rem] scroll-mt-28 bg-background px-6 pb-16 md:pb-20 lg:px-10"
      >
        <SectionHeader
          eyebrow="DMP Speakers"
          title="Book a DMP speaker."
          intro="Our partners speak at conferences, board away-days and federation congresses on the ideas behind our work."
        />
        <Reveal className="mt-12 md:mt-16">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {talks.map((talk, index) => (
              <li key={talk}>
                <Link
                  href="/contact?topic=speakers#enquiry"
                  className="group flex min-h-48 flex-col justify-between gap-8 rounded-xl bg-midnight p-6 text-white md:p-7"
                >
                  <span className="font-mono text-sm text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="font-heading text-3xl leading-none">
                      {talk}
                    </span>
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Quote
        eyebrow="Why talk to us"
        text="The first conversation is free, and it is always useful. If we are not the right fit, we will say so and point you to someone who is."
        by="The DMP Partners"
      />
    </main>
  )
}
