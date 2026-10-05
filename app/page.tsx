import { Preloader } from "@/components/preloader/preloader"
import { Hero } from "@/components/home/hero"
import { Statement } from "@/components/home/statement"
import { Process } from "@/components/home/process"
import { Services } from "@/components/home/services"
import { Feature } from "@/components/home/feature"
import { Stories } from "@/components/home/stories"
import { Impact } from "@/components/home/impact"
import { About } from "@/components/home/about"
import { Audiences } from "@/components/home/audiences"
import { Insights } from "@/components/home/insights"
import { Explore } from "@/components/home/explore"
import { SectionHeader } from "@/components/page/section-header"
import { SolutionTiles } from "@/components/page/solution-tiles"
import { Cta, Quote } from "@/components/page/closing"
import { ArrowLink } from "@/components/ui/arrow-link"

// Layout follows the client's Crowdline template on white: split globe
// hero, statement, how we work, solutions, services, a feature band,
// stories, impact, about, who we serve, insights, then the closing run.
export default function Page() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Statement />
        <Process />
        <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
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
          <SolutionTiles className="mt-14 md:mt-16" />
        </section>
        <Services />
        <Feature />
        <Stories />
        <Impact />
        <About />
        <Audiences />
        <Insights />
        <Explore />
        <Quote />
        <Cta />
      </main>
    </>
  )
}
