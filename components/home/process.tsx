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

export function Process({ action }: { action?: React.ReactNode }) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl bg-background px-6 py-24 md:py-28">
      <SectionHeader
        eyebrow="How we work"
        title="From question to result, in four moves."
        intro="The same disciplined sequence on every engagement, whether it is a ten-week review or a five-year programme."
        action={action}
      />
      <Reveal className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:mt-16 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="group bg-background p-8 transition-colors duration-300 hover:bg-surface"
          >
            <div className="mb-6 font-mono text-5xl font-light text-oxford/15 transition-colors duration-300 group-hover:text-oxford/40">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-3 text-lg text-oxford">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
