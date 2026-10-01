import { images } from "@/lib/content"

export type NavLink = {
  title: string
  href: string
  image: string
}

// Pages from docs/brief.md. Routes don't exist yet.
export const navLinks: NavLink[] = [
  { title: "About", href: "/about", image: images.site },
  { title: "Services", href: "/services", image: images.meeting },
  { title: "Industries", href: "/industries", image: images.stadium },
  { title: "Case Studies", href: "/case-studies", image: images.celebrate },
  { title: "Insights", href: "/insights", image: images.research },
  { title: "Contact", href: "/contact", image: images.analysis },
]

export const navFooterLinks = [
  { title: "Careers", href: "/careers" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
]
