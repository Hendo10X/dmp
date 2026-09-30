import { Preloader } from "@/components/preloader/preloader"
import { Header } from "@/components/nav/header"
import { Hero } from "@/components/home/hero"
import { Intro } from "@/components/home/intro"

export default function Page() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Intro />
      </main>
    </>
  )
}
