export type NavLink = {
  title: string
  href: string
  image: string
}

const images = {
  training: "/Images/pexels-justyzvidz-5646004.jpg",
  coaching: "/Images/pexels-franco-monsalvo-252430633-38675822.jpg",
  tennis: "/Images/pexels-bohdan-hyrovych-796614725-38355572.jpg",
  science: "/Images/pexels-mart-production-7089032.jpg",
}

// Pages from docs/brief.md. Routes don't exist yet.
export const navLinks: NavLink[] = [
  { title: "About", href: "/about", image: images.training },
  { title: "Services", href: "/services", image: images.coaching },
  { title: "Industries", href: "/industries", image: images.tennis },
  { title: "Case Studies", href: "/case-studies", image: images.training },
  { title: "Insights", href: "/insights", image: images.science },
  { title: "Contact", href: "/contact", image: images.coaching },
]

export const navFooterLinks = [
  { title: "Careers", href: "/careers" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
]
