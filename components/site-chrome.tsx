import { getSettings } from "@/lib/cms"
import { Providers } from "@/components/providers"
import { Header } from "@/components/nav/header"
import { SiteFooter } from "@/components/site-footer"

// Header, footer and smooth scroll around every site page (and the 404).
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <Providers>
      <Header />
      {children}
      <SiteFooter social={settings.social} />
    </Providers>
  )
}
