import type { Transition, Variants } from "motion/react"

// Motion curves adapted from olivierlarose/nav-menu. The per-character
// stagger from the original is intentionally dropped: titles move as one.
export const ease = [0.76, 0, 0.24, 1] as const

const panelTransition: Transition = { duration: 0.9, ease }

export const panel: Variants = {
  closed: { height: 0, transition: panelTransition },
  open: { height: "auto", transition: panelTransition },
}

export const backdrop: Variants = {
  closed: { opacity: 0, transition: { duration: 0.5, ease } },
  open: { opacity: 1, transition: { duration: 0.5, ease } },
}

export const reveal: Variants = {
  closed: { y: "100%", transition: { duration: 0.6, ease } },
  open: { y: 0, transition: { duration: 0.9, ease, delay: 0.25 } },
}

export const fade: Variants = {
  closed: { opacity: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, transition: { duration: 0.3 } },
}

export const dim: Variants = {
  idle: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } },
  dimmed: { filter: "blur(4px)", opacity: 0.35, transition: { duration: 0.3 } },
}
