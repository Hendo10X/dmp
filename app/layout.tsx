import type { Metadata } from "next"
import {
  Geist_Mono,
  Instrument_Sans,
  Special_Gothic_Expanded_One,
  Staatliches,
} from "next/font/google"

import "lenis/dist/lenis.css"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/nav/header"
import { SiteFooter } from "@/components/site-footer"
import { cn } from "@/lib/utils"

// Logo + headings
// DMP wordmark only (header + footer)
const fontLogo = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
})

const fontDisplay = Staatliches({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

// Body, subtext, UI
const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "DMPartners | Demonstrating Possibilities",
    template: "%s | DMPartners",
  },
  description:
    "DMPartners provides commercial and investment advisory at the intersection of the sports industry and adjacent markets across Nigeria and the wider African continent.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontLogo.variable,
        fontDisplay.variable,
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body>
        <Providers>
          <Header />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
