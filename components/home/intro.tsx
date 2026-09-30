import Link from "next/link"

// "Who we are" — the ~60-word intro from docs/brief.md. Copy is placeholder.
export function Intro() {
  return (
    <section className="relative z-10 flex min-h-svh items-center bg-background px-4 py-28 md:px-7 md:py-40">
      <div className="grid w-full gap-10 md:grid-cols-12 md:gap-6">
        <p className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase md:col-span-3">
          Who we are
        </p>
        <div className="md:col-span-9">
          <p className="text-[clamp(1.5rem,2.7vw,2.75rem)] leading-[1.2] tracking-tight text-foreground">
            DMP is a consultancy working where sport, business and technology
            meet. We help federations, public institutions, investors and brands
            make better decisions — building the strategy, data and digital
            capability that turn ambition into measurable performance.
            Independent in our thinking, practical in our delivery, and invested
            in the long-term growth of sport.
          </p>
          <Link
            href="/about"
            className="mt-12 inline-block text-[0.7rem] tracking-[0.18em] text-primary uppercase underline decoration-lime decoration-2 underline-offset-8 transition-colors hover:text-charcoal"
          >
            More about DMP
          </Link>
        </div>
      </div>
    </section>
  )
}
