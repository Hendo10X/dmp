import { ArrowLink } from "@/components/ui/arrow-link"
import { Shape } from "@/components/ui/shape"
import { Eyebrow } from "@/components/ui/eyebrow"

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-svh flex-col justify-center gap-10 bg-background px-4 pt-32 pb-24 md:px-7">
      <Eyebrow className="text-oxford/70">Error 404</Eyebrow>
      <div className="flex items-end gap-4 text-oxford">
        <h1 className="text-[clamp(5rem,18vw,18rem)] leading-[0.8]">
          Off side.
        </h1>
        <Shape
          name="triangle"
          className="mb-[2vw] size-[6vw] min-w-10 text-crimson"
        />
      </div>
      <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
        The page you were looking for isn&rsquo;t here. It may have moved, or
        the link may be out of date.
      </p>
      <ArrowLink href="/" tone="muted" className="self-start">
        Back to home
      </ArrowLink>
    </main>
  )
}
