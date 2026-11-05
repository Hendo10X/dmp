import { ArrowLink } from "@/components/ui/arrow-link"
import { SiteChrome } from "@/components/site-chrome"
import { Eyebrow } from "@/components/ui/eyebrow"

// The 404 sits outside app/(site), so it brings the site chrome itself.
export default function NotFound() {
  return (
    <SiteChrome>
      <main className="relative z-10 mx-auto flex min-h-svh max-w-[120rem] flex-col justify-center gap-10 bg-background px-6 pt-32 pb-24 lg:px-10">
        <Eyebrow>Error 404</Eyebrow>
        <div className="flex items-end gap-4 text-midnight">
          <h1 className="text-[clamp(5rem,18vw,18rem)] leading-[0.8]">
            Off side.
          </h1>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-midnight/70">
          The page you were looking for isn&rsquo;t here. It may have moved, or
          the link may be out of date.
        </p>
        <ArrowLink href="/" className="self-start">
          Back to home
        </ArrowLink>
      </main>
    </SiteChrome>
  )
}
