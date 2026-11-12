import type { Metadata } from "next"
import { Geist, Inter, Special_Gothic_Expanded_One } from "next/font/google"
import localFont from "next/font/local"

import "lenis/dist/lenis.css"
import "./globals.css"
import { cn } from "@/lib/utils"
import { siteUrl } from "@/lib/site-url"

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
  // Link previews: each key page draws its own card (opengraph-image.tsx).
  metadataBase: new URL(siteUrl),
  openGraph: { siteName: "DMPartners", type: "website", locale: "en_NG" },
  twitter: { card: "summary_large_image" },
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
      {/* Site chrome lives in app/(site)/layout.tsx so the Studio at
          /studio gets a bare page. */}
      <body>{children}</body>
    </html>
  )
}
