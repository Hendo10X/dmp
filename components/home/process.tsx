import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/page/section-header"
import { Reveal } from "@/components/motion/reveal"

// "How we work": numbered steps in a hairline grid (Crowdline's "How it
// works"). Used on Home, Services and About.
const steps = [
  {
    title: "Diagnose",
    body: "We start with evidence: data, stakeholders and the market, so the real problem is on the table.",
  },
  {
    title: "Design",
    body: "Options are modelled and stress-tested, then shaped into a plan the people involved can own.",
  },
  {
    title: "Deliver",
    body: "We work alongside your team to build, launch and embed the change, not hand over a slide deck.",
  },
  {
    title: "Measure",
    body: "Every engagement ends in numbers: what moved, by how much, and what comes next.",
  },
]

// Cards run light to dark in the logo palette (mint, electric, logo blue,
// midnight): the colour itself travels from question to result.
const tones = [
  { card: "bg-mint text-midnight", body: "text-midnight/75" },
  { card: "bg-electric text-midnight", body: "text-midnight/75" },
  { card: "bg-brand text-white", body: "text-white/80" },
  { card: "bg-midnight text-white", body: "text-white/70" },
]

export function Process({ action }: { action?: React.ReactNode }) {
  return (
    <section className="relative z-10 mx-auto max-w-[120rem] bg-background px-6 py-16 md:py-20 lg:px-10">
      <SectionHeader
        eyebrow="How we work"
        title="From question to result, in four moves."
        intro="The same disciplined sequence on every engagement, whether it is a ten-week review or a five-year programme."
        action={action}
      />
      <Reveal className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn("flex flex-col rounded-xl p-7", tones[index].card)}
          >
            {/* Number and title share one baseline, close together. */}
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-sm font-semibold opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl leading-none">{step.title}</h3>
            </div>
            <p
              className={cn("mt-4 text-sm leading-relaxed", tones[index].body)}
            >
              {step.body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
