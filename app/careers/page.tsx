import type { Metadata } from "next"
import Link from "next/link"

import { images, openings, values } from "@/lib/content"
import { Arrow } from "@/components/ui/arrow"
import { Shape } from "@/components/ui/shape"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page/page-hero"
import { SectionHeader } from "@/components/page/section-header"
import { Steps } from "@/components/page/steps"
import { Cta } from "@/components/page/closing"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join DMPartners: advisors and analysts demonstrating what is possible in African sport.",
}

const process = [
  {
    title: "Apply",
    body: "Send your CV and a short note on why sport and why DMP.",
  },
  {
    title: "Conversation",
    body: "A relaxed first call with someone from the team you would join.",
  },
  {
    title: "Case exercise",
    body: "A realistic problem, worked through with us rather than alone.",
  },
  {
    title: "Offer",
    body: "Meet the partners, ask anything, and hear back within a week.",
  },
]

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="DMP Careers"
        title="Do the best work of your career in sport."
        intro="We hire curious, rigorous people who believe in what sport can do for Nigeria and the continent, and want to prove it."
        image={images.engineers}
        imageAlt="A team of engineers in hard hats reviewing construction plans"
      />

      {/* Culture */}
      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <SectionHeader
          eyebrow="Culture"
          title="How we work together."
          intro="Small teams, real responsibility early, and partners who stay close to the work. These are the values we hire for."
        />
        <Reveal className="mt-14 grid gap-2 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex min-h-56 flex-col justify-between gap-10 bg-secondary p-6 md:p-7"
            >
              <Shape name={value.shape} className="size-10 text-oxford" />
              <div className="flex flex-col gap-3">
                <h3 className="text-3xl leading-none text-oxford">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Current openings */}
      <section
        id="openings"
        className="relative z-10 scroll-mt-28 bg-background px-4 pb-24 md:px-7 md:pb-36"
      >
        <SectionHeader
          eyebrow="Current openings"
          title="Open roles."
          intro="Nothing that fits? Register your interest and we will be in touch when the right role opens."
        />
        <Reveal className="mt-12 md:mt-16">
          <ul>
            {openings.map((role) => (
              <li key={role.title}>
                <Link
                  href={`/contact?topic=careers&role=${encodeURIComponent(role.title)}`}
                  className="group grid gap-3 border-b border-oxford/15 py-6 text-oxford md:grid-cols-12 md:items-center md:gap-6 md:py-8"
                >
                  <span className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-none md:col-span-5">
                    {role.title}
                  </span>
                  <span className="text-muted-foreground md:col-span-3">
                    {role.team}
                  </span>
                  <span className="flex gap-4 text-sm text-muted-foreground md:col-span-3">
                    <span>{role.type}</span>
                    <span>{role.location}</span>
                  </span>
                  <span className="flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase md:col-span-1 md:justify-end">
                    <span className="md:sr-only">Apply</span>
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact?topic=careers"
                className="group flex items-center justify-between gap-6 bg-secondary px-6 py-6 text-oxford transition-colors duration-500 hover:bg-oxford hover:text-white md:py-8"
              >
                <span className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] leading-none">
                  Register interest
                </span>
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </Reveal>
      </section>

      {/* Application process */}
      <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
        <SectionHeader
          eyebrow="Application process"
          title="Four steps, no surprises."
        />
        <Steps steps={process} className="mt-14 md:mt-20" />
      </section>

      <Cta
        title="Ready to apply?"
        body="Send us your CV and a short note. We read every application."
        href="/contact?topic=careers"
        label="Apply now"
      />
    </main>
  )
}
