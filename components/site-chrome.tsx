import { getSettings, getSiteContent } from "@/lib/cms"
import { Providers } from "@/components/providers"
import { Header } from "@/components/nav/header"
import type { MenuLists } from "@/components/nav/mega-menu"
import { SiteFooter } from "@/components/site-footer"

// Header, footer and smooth scroll around every site page (and the 404).
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const [settings, content] = await Promise.all([
    getSettings(),
    getSiteContent(),
  ])
  // Just what the dropdowns show, so the full pages aren't sent to the
  // browser.
  const lists: MenuLists = {
    services: content.services.map(({ slug, title, summary }) => ({
      slug,
      title,
      summary,
    })),
    solutions: content.solutions.map(
      ({ slug, title, short, kicker, image }) => ({
        slug,
        title,
        short,
        kicker,
        image,
      })
    ),
  }
  return (
    <Providers>
      <Header lists={lists} />
      {children}
      <SiteFooter social={settings.social} />
    </Providers>
  )
}
