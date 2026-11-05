import { getSiteContent } from "@/lib/cms"
import { ArrowLink } from "@/components/ui/arrow-link"
import { SectionHeader } from "@/components/page/section-header"
import { ServiceCards } from "@/components/page/service-cards"

export async function Services() {
  const header = (await getSiteContent()).home.services
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
      <SectionHeader
        eyebrow={header.eyebrow}
        title={header.title}
        intro={header.intro}
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
