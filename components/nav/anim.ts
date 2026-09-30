import type { Transition, Variants } from "motion/react"

// Curve from olivierlarose/nav-menu. No stagger anywhere: the list moves as
// one block.
export const ease = [0.76, 0, 0.24, 1] as const

const panelTransition: Transition = { duration: 0.8, ease }

export const panel: Variants = {
  closed: { height: 0, transition: panelTransition },
  open: { height: "auto", transition: panelTransition },
}

export const backdrop: Variants = {
  closed: { opacity: 0, transition: { duration: 0.5, ease } },
  open: { opacity: 1, transition: { duration: 0.5, ease } },
}

export const content: Variants = {
  closed: { opacity: 0, y: -12, transition: { duration: 0.3 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.2 } },
}
