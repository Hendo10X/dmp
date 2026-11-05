import { cn } from "@/lib/utils"
import { getSiteContent } from "@/lib/cms"
import { SectionHeader } from "@/components/page/section-header"
import { Reveal } from "@/components/motion/reveal"

// "How we work": numbered steps in a hairline grid (Crowdline's "How it
// works"). Used on Home, Services and About; copy from Sanity's Home page.

// Cards run light to dark in the logo palette (mint, electric, logo blue,
// midnight): the colour itself travels from question to result.
const tones = [
  { card: "bg-mint text-midnight", body: "text-midnight/70" },
  { card: "bg-electric text-midnight", body: "text-midnight/70" },
  { card: "bg-brand text-white", body: "text-white/70" },
  { card: "bg-midnight text-white", body: "text-white/70" },
]

export async function Process({ action }: { action?: React.ReactNode }) {
  const { header, steps } = (await getSiteContent()).home.howWeWork
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-10 md:py-12 lg:px-10">
      <SectionHeader
        eyebrow={header.eyebrow}
        title={header.title}
        intro={header.intro}
        action={action}
      />
      <Reveal className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={`${index}-${step.title}`}
            className={cn(
              "flex flex-col rounded-xl p-7",
              tones[index % tones.length].card
            )}
          >
            {/* Number and title share one baseline, close together. */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-sm font-semibold opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl leading-none">{step.title}</h3>
            </div>
            <p
              className={cn(
                "mt-4 text-sm leading-relaxed",
                tones[index % tones.length].body
              )}
            >
              {step.body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
