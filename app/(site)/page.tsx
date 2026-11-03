import { Preloader } from "@/components/preloader/preloader"
import { Hero } from "@/components/home/hero"
import { Process } from "@/components/home/process"
import { Services } from "@/components/home/services"
import { Feature } from "@/components/home/feature"
import { Stories } from "@/components/home/stories"
import { Impact } from "@/components/home/impact"
import { About } from "@/components/home/about"
import { Explore } from "@/components/home/explore"
import { SectionHeader } from "@/components/page/section-header"
import { SolutionTiles } from "@/components/page/solution-tiles"
import { Cta, Quote } from "@/components/page/closing"
import { ArrowLink } from "@/components/ui/arrow-link"

// Home: midnight globe hero, how we work, solutions, services, the
// midnight feature band, stories, impact, about (with who we serve), then
// the closing run. "Who we are" lives in About (client brief).
export default function Page() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Process />
        <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
          <SectionHeader
            eyebrow="Our solutions"
            title="Four ways we demonstrate possibility."
            intro="Proprietary programmes and indices that turn what we know about African sports into decisions."
            action={
              <ArrowLink href="/solutions" tone="brand">
                All solutions
              </ArrowLink>
            }
          />
          <SolutionTiles className="mt-10 md:mt-12" />
        </section>
        <Services />
        <Feature />
        <Stories />
        <Impact />
        <About />
        <Explore />
        <Quote />
        <Cta />
      </main>
    </>
  )
}
