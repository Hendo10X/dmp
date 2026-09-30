import { Preloader } from "@/components/preloader/preloader"
import { Header } from "@/components/nav/header"
import { Hero } from "@/components/home/hero"
import { About } from "@/components/home/about"
import { Services } from "@/components/home/services"
import { ZoomReveal } from "@/components/home/zoom-reveal"
import { Impact } from "@/components/home/impact"
import { Insights } from "@/components/home/insights"
import { Cta, Quote } from "@/components/home/closing"
import { SiteFooter } from "@/components/site-footer"

// Major sections sit on the white background; the closing run (quote, CTA,
// footer) switches to accent colours.
export default function Page() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <ZoomReveal />
        <Impact />
        <Insights />
        <Quote />
        <Cta />
      </main>
      <SiteFooter />
    </>
  )
}
