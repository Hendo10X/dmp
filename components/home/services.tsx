import { ArrowLink } from "@/components/ui/arrow-link"
import { SectionHeader } from "@/components/page/section-header"
import { ServiceCards } from "@/components/page/service-cards"

export function Services() {
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
      <SectionHeader
        eyebrow="What we do"
        title="Six practices. One ambition."
        intro="From strategy and transformation to transactions, policy, research and sustainability: advisory built for the business of sports and the markets around it."
        action={
          <ArrowLink href="/services" tone="mint">
            All services
          </ArrowLink>
        }
      />
      <ServiceCards className="mt-10 md:mt-12" />
    </section>
  )
}
