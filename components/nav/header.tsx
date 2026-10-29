"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useIntroSettled } from "@/lib/preloader-store"
import { ArrowLink } from "@/components/ui/arrow-link"
import { MegaMenu, type MegaKey } from "@/components/nav/mega-menu"
import { Burger, SideMenu } from "@/components/nav/side-menu"

// Desktop top-level links. Services and Solutions open dropdowns.
const primary: { title: string; href: string; mega?: MegaKey }[] = [
  { title: "Services", href: "/services", mega: "services" },
  { title: "Solutions", href: "/solutions", mega: "solutions" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Reports", href: "/reports" },
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
]

// Fixed nav bar (Crowdline layout) on solid midnight, no border, carrying the
// white dmpartners logo (public/brand). Dropdowns stay white.
export function Header() {
  const pathname = usePathname()
  const ready = useIntroSettled()

  const [mega, setMega] = React.useState<MegaKey | null>(null)
  const [menu, setMenu] = React.useState(false)
  const closeTimer = React.useRef<number | null>(null)

  const closeAll = React.useCallback(() => {
    setMega(null)
    setMenu(false)
  }, [])
  const closeMenu = React.useCallback(() => setMenu(false), [])

  const openMega = (key: MegaKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setMega(key)
  }
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(null), 160)
  }
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }

  // Close everything on navigation.
  React.useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  // Escape closes the dropdown.
  React.useEffect(() => {
    if (!mega) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mega, closeAll])

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
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: ready ? 0 : "-100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
        className="fixed inset-x-0 top-0 z-50 bg-midnight"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 max-w-[120rem] items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10"
        >
          {/* Desktop: full-width bar with the logo and CTA pinned to the
              edges and the links centred between them. */}
          <Link
            href="/"
            onClick={closeAll}
            aria-label="DMPartners home"
            className="flex shrink-0 items-center justify-self-start"
          >
            {/* Short dmp mark on mobile, full wordmark from md. Both are
                pre-sized high-res exports, served as-is so edges stay crisp. */}
            <Image
              src="/brand/dmp-white.png"
              alt="DMPartners"
              width={576}
              height={256}
              priority
              unoptimized
              className="h-7 w-auto md:hidden"
            />
            <Image
              src="/brand/dmpartners-white-nav.png"
              alt="DMPartners"
              width={951}
              height={168}
              priority
              unoptimized
              className="hidden h-6 w-auto md:block"
            />
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {primary.map((item) => {
              const active = isActive(item.href)
              const expanded = Boolean(item.mega && mega === item.mega)
              const itemClass = cn(
                "flex items-center gap-1 text-[13px] font-medium transition-colors outline-none hover:text-white focus-visible:text-white",
                active || expanded ? "text-white" : "text-white/70"
              )
              return (
                <li key={item.href}>
                  {item.mega ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls="mega-menu"
                      onMouseEnter={() => openMega(item.mega!)}
                      onClick={() =>
                        setMega((current) =>
                          current === item.mega ? null : item.mega!
                        )
                      }
                      className={itemClass}
                    >
                      {item.title}
                      <Chevron open={expanded} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      onMouseEnter={scheduleClose}
                      aria-current={active ? "page" : undefined}
                      className={itemClass}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
          <ArrowLink
            href="/contact"
            onClick={closeAll}
            tone="brand"
            className="hidden h-8 justify-self-end px-4 lg:inline-flex"
          >
            Talk to us
          </ArrowLink>

          {/* Mobile: hamburger that morphs to an X; the header stays above
              the side panel so it remains visible while open. */}
          <button
            type="button"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => setMenu((value) => !value)}
            className="-mr-2 flex size-10 items-center justify-center text-white outline-none focus-visible:ring-2 focus-visible:ring-electric lg:hidden"
          >
            <Burger open={menu} />
          </button>
        </nav>

        <div className="hidden lg:block">
          <AnimatePresence>
            {mega && <MegaMenu key="mega" menu={mega} onNavigate={closeAll} />}
          </AnimatePresence>
        </div>
      </motion.header>

      <SideMenu open={menu} onClose={closeMenu} />
    </>
  )
}

// Sharp chevron to match the arrows.
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
        "size-2.5 transition-transform duration-300",
        open && "rotate-180"
      )}
    >
      <path d="M2.5 4.5L6 8l3.5-3.5" />
    </svg>
  )
}
