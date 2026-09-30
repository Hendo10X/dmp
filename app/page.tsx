import { Preloader } from "@/components/preloader/preloader"
import { Hero } from "@/components/home/hero"
import { About } from "@/components/home/about"
import { Services } from "@/components/home/services"
import { ZoomReveal } from "@/components/home/zoom-reveal"
import { Impact } from "@/components/home/impact"
import { Insights } from "@/components/home/insights"
import { Process } from "@/components/home/process"
import { Audiences } from "@/components/home/audiences"
import { Cta, Quote } from "@/components/page/closing"

// Major sections sit on the white background; the closing run (quote, CTA,
// footer) switches to accent colours.
export default function Page() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <ZoomReveal />
        <Impact />
        <Audiences />
        <Insights />
        <Quote />
        <Cta />
      </main>
    </>
  )
}
