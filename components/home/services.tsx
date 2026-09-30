import { ArrowLink } from "@/components/ui/arrow-link"
import { SectionHeader } from "@/components/page/section-header"
import { ServiceCards } from "@/components/page/service-cards"

export function Services() {
  return (
    <section className="relative z-10 bg-background px-4 pt-8 pb-24 md:px-7 md:pb-36">
      <SectionHeader
        eyebrow="What we do"
        title="Four ways we move sport forward."
        intro="Each pillar stands on its own, and they work best together: commercial and investment cases built on evidence, backed by strategy and structures that last."
        action={
          <ArrowLink href="/services" tone="muted">
            All services
          </ArrowLink>
        }
      />
      <ServiceCards className="mt-14 md:mt-20" />
    </section>
  )
}
