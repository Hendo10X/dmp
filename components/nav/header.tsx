"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import { useIntroSettled } from "@/lib/preloader-store"
import { ArrowLink } from "@/components/ui/arrow-link"
import { backdrop, ease } from "@/components/nav/anim"
import { MenuPanel } from "@/components/nav/menu-panel"
import { MegaMenu, type MegaKey } from "@/components/nav/mega-menu"

// Sits over the top of each page and scrolls away with it (not fixed).
// Desktop top-level nav, after the client's PwC reference. Services and
// Solutions open dropdown panels; the rest are plain links.
const primary: { title: string; href: string; mega?: MegaKey }[] = [
  { title: "Services", href: "/services", mega: "services" },
  { title: "Solutions", href: "/solutions", mega: "solutions" },
  { title: "Industries", href: "/industries" },
  { title: "Insights", href: "/insights" },
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
]

export function Header() {
  const pathname = usePathname()
  const ready = useIntroSettled()
  const lenis = useLenis()

  // Mobile/tablet full-screen menu.
  const [open, setOpen] = React.useState(false)
  // Desktop dropdown.
  const [mega, setMega] = React.useState<MegaKey | null>(null)
  const closeTimer = React.useRef<number | null>(null)

  const closeAll = React.useCallback(() => {
    setOpen(false)
    setMega(null)
  }, [])

  const openMega = (key: MegaKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setMega(key)
  }
  // Short delay so moving the pointer from the trigger into the panel
  // doesn't flicker it shut.
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(null), 160)
  }

  // Close everything on navigation.
  React.useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  // Freeze the page behind the full-screen menu; Escape closes either menu.
  React.useEffect(() => {
    if (!open && !mega) return
    if (open) lenis?.stop()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      if (open) lenis?.start()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, mega, lenis, closeAll])

  // Scrolling the page dismisses an open dropdown.
  React.useEffect(() => {
    if (!mega) return
    const onScroll = () => setMega(null)
    window.addEventListener("scroll", onScroll, { passive: true, once: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mega])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <AnimatePresence>
        {(open || mega) && (
          <motion.div
            key="backdrop"
            aria-hidden
            variants={backdrop}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={closeAll}
            className="fixed inset-0 z-40 bg-onyx/50"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: "-130%" }}
        animate={{ y: ready ? 0 : "-130%" }}
        transition={{ duration: 1, ease }}
        className="absolute inset-x-0 top-0 z-50 p-3 md:p-4"
      >
        <nav
          aria-label="Main"
          onMouseLeave={scheduleClose}
          onMouseEnter={() =>
            closeTimer.current && window.clearTimeout(closeTimer.current)
          }
          className="@container bg-oxford text-white"
        >
          <div className="flex h-14 items-center justify-between md:h-16">
            <Link
              href="/"
              onClick={closeAll}
              className="pl-4 font-logo text-xl tracking-tight md:pl-6 md:text-2xl"
            >
              DMP
            </Link>

            {/* Desktop: PwC-style top-level links */}
            <ul className="hidden h-full items-stretch lg:flex">
              {primary.map((item) => {
                const active = isActive(item.href)
                const expanded = item.mega && mega === item.mega
                const label = (
                  <>
                    {item.title}
                    {item.mega && <Chevron open={Boolean(expanded)} />}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-0 h-[3px] origin-left bg-lime transition-transform duration-500 xl:inset-x-5",
                        SHRINK_EASE,
                        active || expanded
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </>
                )
                const itemClass =
                  "group relative flex h-full items-center gap-2 px-3 text-[0.8rem] font-semibold tracking-[0.08em] uppercase outline-none focus-visible:text-electric xl:px-5 xl:text-sm xl:tracking-[0.12em]"

                return (
                  <li key={item.href} className="h-full">
                    {item.mega ? (
                      <button
                        type="button"
                        aria-expanded={Boolean(expanded)}
                        aria-controls="mega-menu"
                        onMouseEnter={() => openMega(item.mega!)}
                        onClick={() =>
                          setMega((current) =>
                            current === item.mega ? null : item.mega!
                          )
                        }
                        className={itemClass}
                      >
                        {label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        onMouseEnter={scheduleClose}
                        aria-current={active ? "page" : undefined}
                        className={itemClass}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex h-full items-center">
              <ArrowLink
                href="/contact"
                onClick={closeAll}
                className="hidden h-full @xl:inline-flex"
              >
                Talk to us
              </ArrowLink>

              {/* Mobile/tablet: full-screen menu */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                onClick={() => {
                  setMega(null)
                  setOpen((value) => !value)
                }}
                className="flex h-full items-center gap-3 px-4 text-sm font-semibold tracking-[0.14em] uppercase outline-none focus-visible:text-electric lg:hidden"
              >
                <Burger open={open} />
                <span className="grid">
                  <span
                    className={cn(
                      "col-start-1 row-start-1 transition-opacity duration-300",
                      open && "opacity-0"
                    )}
                  >
                    Menu
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "col-start-1 row-start-1 transition-opacity duration-300",
                      !open && "opacity-0"
                    )}
                  >
                    Close
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <AnimatePresence>
              {mega && (
                <MegaMenu key="mega" menu={mega} onNavigate={closeAll} />
              )}
            </AnimatePresence>
          </div>
          <div className="lg:hidden">
            <AnimatePresence>
              {open && <MenuPanel key="panel" onNavigate={closeAll} />}
            </AnimatePresence>
          </div>
        </nav>
      </motion.header>
    </>
  )
}

const SHRINK_EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]"

// Sharp-cornered chevron to match the arrows.
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn(
        "size-3 transition-transform duration-500",
        SHRINK_EASE,
        open && "rotate-180"
      )}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" />
    </svg>
  )
}

function Burger({ open }: { open: boolean }) {
  const line =
    "absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
  return (
    <span aria-hidden className="relative block h-2.5 w-6">
      <span
        className={cn(line, "top-0", open && "translate-y-[4.5px] rotate-45")}
      />
      <span
        className={cn(
          line,
          "bottom-0",
          open && "-translate-y-[4.5px] -rotate-45"
        )}
      />
    </span>
  )
}
