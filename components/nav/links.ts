export type NavLink = {
  title: string
  href: string
}

// Pages from docs/brief.md. Only "/" exists so far.
export const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Industries", href: "/industries" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Insights", href: "/insights" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
]

// PLACEHOLDER contact details — replace with the client's real ones.
export const navContact = [
  { label: "+234 800 000 0000", href: "tel:+2348000000000" },
  { label: "hello@dmpartners.com", href: "mailto:hello@dmpartners.com" },
]
