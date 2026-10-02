import { Preloader } from "@/components/preloader/preloader"
import { Hero } from "@/components/home/hero"
import { Statement } from "@/components/home/statement"
import { Services } from "@/components/home/services"
import { ZoomReveal } from "@/components/home/zoom-reveal"
import { Feature } from "@/components/home/feature"
import { Stories } from "@/components/home/stories"
import { Impact } from "@/components/home/impact"
import { About } from "@/components/home/about"
import { Audiences } from "@/components/home/audiences"
import { Insights } from "@/components/home/insights"
import { Explore } from "@/components/home/explore"
import { SectionHeader } from "@/components/page/section-header"
import { SolutionTiles } from "@/components/page/solution-tiles"
import { MarketsSection } from "@/components/page/markets-section"
import { Cta, Quote } from "@/components/page/closing"
import { ArrowLink } from "@/components/ui/arrow-link"

// Layout follows the client's PwC reference: statement, three featured
// solutions, services, a feature banner, client stories, insights and
// closing link tiles. Major sections stay white; the closing run (quote,
// CTA, footer) switches to accent colours.
export default function Page() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Statement />
        <section className="relative z-10 bg-background px-4 pb-24 md:px-7 md:pb-36">
          <SectionHeader
            eyebrow="Our solutions"
            title="Three ways we demonstrate possibility."
            intro="Proprietary programmes and indices that turn what we know about African sport into decisions."
            action={
              <ArrowLink href="/solutions" tone="muted">
                All solutions
              </ArrowLink>
            }
          />
          <SolutionTiles className="mt-14 md:mt-20" />
        </section>
        <Services />
        <ZoomReveal />
        <Feature />
        <Stories />
        <Impact />
        <About />
        <Audiences />
        <MarketsSection />
        <Insights />
        <Explore />
        <Quote />
        <Cta />
      </main>
    </>
  )
}
