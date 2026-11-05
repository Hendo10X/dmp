import { getSiteContent } from "@/lib/cms"
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
// the closing run. "Who we are" lives in About (client brief). Copy comes
// from Sanity's Home page.
export default async function Page() {
  const { home } = await getSiteContent()
  return (
    <>
      <Preloader />
      <main>
        <Hero content={home.hero} />
        <Process />
        <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
          <SectionHeader
            eyebrow={home.solutions.eyebrow}
            title={home.solutions.title}
            intro={home.solutions.intro}
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
        <Impact content={home.impact} />
        <About content={home.about} industries={home.industries} />
        <Explore />
        <Quote {...home.quote} />
        <Cta />
      </main>
    </>
  )
}
