import type { Metadata } from "next"
import { Geist, Inter, Special_Gothic_Expanded_One } from "next/font/google"
import localFont from "next/font/local"

import "lenis/dist/lenis.css"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/nav/header"
import { SiteFooter } from "@/components/site-footer"
import { cn } from "@/lib/utils"

// Type system from the Crowdline template: Cal Sans headings, Inter body,
// Geist (in the --font-mono slot) for labels, nav and buttons.
const fontDisplay = localFont({
  src: "./fonts/CalSansUI.wght.GEOM.ttf",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
})

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist({
  subsets: ["latin"],
  variable: "--font-mono",
})

// DMP wordmark only (header + footer).
const fontLogo = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
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
