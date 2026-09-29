import { gsap } from "@/lib/gsap"

const EASE = "power3.inOut"
const DURATION = 5

// Scrolls the word reel so the brand word lands dead-centre in the slit.
export function reelAnimation(reel: HTMLElement, target: HTMLElement) {
  return gsap.to(reel, {
    y: () => {
      const viewport = reel.parentElement!.clientHeight
      return -(target.offsetTop + target.offsetHeight / 2 - viewport / 2)
    },
    duration: DURATION,
    ease: EASE,
  })
}

// Bar fills left→right while the counter rides its leading edge, 0 → 100.
export function progressAnimation(bar: HTMLElement, counter: HTMLElement) {
  const count = { value: 0 }

  return gsap
    .timeline()
    .set(counter, { x: 0, y: 0, xPercent: -100, yPercent: -50 })
    .to(bar, { scaleX: 1, duration: DURATION, ease: EASE })
    .to(counter, { x: "100vw", duration: DURATION, ease: EASE }, "<")
    .to(
      count,
      {
        value: 100,
        duration: DURATION,
        ease: EASE,
        onUpdate: () => {
          counter.textContent = String(Math.round(count.value))
        },
      },
      "<"
    )
    .to(counter, { y: 24, autoAlpha: 0, duration: 0.5, ease: "power2.in" })
}

// Pinches the panel shut onto the slit line, and drops the bar with it.
export function collapseAnimation(panel: HTMLElement, bar: HTMLElement) {
  return gsap
    .timeline()
    .to(panel, {
      clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
      duration: 3,
      ease: "expo.inOut",
    })
    .to(
      bar,
      {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 1.2,
        ease: "expo.inOut",
      },
      "<+=0.9"
    )
}
