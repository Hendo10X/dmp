import { PageHero } from "@/components/page/page-hero"
import { Cta } from "@/components/page/closing"

// Shared shell for legal pages. Content is PLACEHOLDER pending the client's
// legal copy.
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string
  sections: { heading: string; body: string }[]
}) {
  return (
    <main>
      <PageHero eyebrow="Legal" title={title} intro={intro} compact />
      <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 pb-24 md:pb-36">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="flex flex-col gap-12 md:col-span-7 md:col-start-4">
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-4">
                <h2 className="text-3xl leading-none text-oxford">
                  {section.heading}
                </h2>
                <p className="text-lg leading-relaxed text-foreground">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </main>
  )
}
