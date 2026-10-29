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
      <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 pb-10 md:pb-12 lg:px-10">
        <div>
          <div className="flex max-w-3xl flex-col gap-12">
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-4">
                <h2 className="text-3xl leading-none text-midnight">
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
