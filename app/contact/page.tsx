import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"

import { Arrow } from "@/components/ui/arrow"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Shape } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { ContactForm } from "@/components/page/contact-form"
import { Quote } from "@/components/page/closing"

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
  "The business of sport",
  "Data and the modern federation",
  "Investing in African sport",
  "Governance that lasts",
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation."
        intro="Tell us a little about your organisation and what you are trying to change. A short note is plenty."
      />

      <section
        id="enquiry"
        className="relative z-10 scroll-mt-28 bg-background px-4 pb-24 md:px-7 md:pb-36"
      >
        <div className="grid gap-16 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7">
            <Suspense>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal className="flex flex-col gap-10 md:col-span-4 md:col-start-9">
            <div>
              <Eyebrow className="text-oxford/70">Direct</Eyebrow>
              <ul className="mt-6 flex flex-col gap-5">
                {direct.map((item) => (
                  <li key={item.label} className="flex flex-col gap-1">
                    <span className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      className="font-heading text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none break-all text-oxford transition-colors hover:text-oxford/60"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary p-6 text-oxford">
              <p className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                Prefer to talk first?
              </p>
              <p className="mt-3 leading-relaxed">
                Mention it in your message and we will arrange a call at a time
                that suits you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DMP Speakers */}
      <section
        id="speakers"
        className="relative z-10 scroll-mt-28 bg-background px-4 pb-24 md:px-7 md:pb-36"
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
                  className="group flex min-h-48 flex-col justify-between gap-8 bg-oxford p-6 text-white md:p-7"
                >
                  <Shape
                    name={
                      (["circle", "square", "triangle", "quarter"] as const)[
                        index
                      ]
                    }
                    className="size-8 text-white/25 transition-colors duration-700 group-hover:text-lime"
                  />
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
