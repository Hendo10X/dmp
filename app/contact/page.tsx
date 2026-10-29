import type { Metadata } from "next"
import { Suspense } from "react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { ContactForm } from "@/components/page/contact-form"
import { Quote } from "@/components/page/closing"
import { SocialLinks } from "@/components/ui/social-links"

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with DMP.",
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
        className="relative z-10 mx-auto max-w-[120rem] scroll-mt-28 bg-background px-6 pb-10 md:pb-12 lg:px-10"
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
                Join the conversation on LinkedIn, Facebook and X.
              </p>
              <SocialLinks className="mt-4" />
            </div>
          </Reveal>
        </div>
      </section>

      <Quote
        eyebrow="Why talk to us"
        text="The first conversation is free, and it is always useful. If we are not the right fit, we will say so and point you to someone who is."
        by="The DMP Partners"
      />
    </main>
  )
}
