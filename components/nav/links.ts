import { images } from "@/lib/content"

export type NavLink = {
  title: string
  href: string
  image: string
}

// Mobile/tablet menu. Desktop uses the top-level bar in header.tsx.
export const navLinks: NavLink[] = [
  { title: "Services", href: "/services", image: images.meeting },
  { title: "Solutions", href: "/solutions", image: images.celebrate },
  { title: "Industries", href: "/industries", image: images.stadium },
  { title: "Case Studies", href: "/case-studies", image: images.engineers },
  { title: "Insights", href: "/insights", image: images.research },
  { title: "About", href: "/about", image: images.site },
  { title: "Careers", href: "/careers", image: images.analysis },
]

export const navFooterLinks = [
  { title: "Contact", href: "/contact" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
]
