import { ArrowLink } from "@/components/ui/arrow-link"
import { SectionHeader } from "@/components/page/section-header"
import { ServiceCards } from "@/components/page/service-cards"

export function Services() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
      <SectionHeader
        eyebrow="What we do"
        title="Six practices. One ambition."
        intro="From strategy and transformation to transactions, policy, research and sustainability: advisory built for the business of sport and the markets around it."
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
