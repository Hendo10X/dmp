# DMPartners

Website for **DMPartners**, a consulting practice providing commercial and
investment advisory at the intersection of the sports industry and adjacent
markets across Nigeria and the wider African continent.

*Demonstrating Possibilities.*

## Stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4 and [shadcn/ui](https://ui.shadcn.com)
- [GSAP](https://gsap.com) (ScrollTrigger, SplitText) and [Lenis](https://lenis.darkroom.engineering) for scroll motion
- [Motion](https://motion.dev) for micro-interactions
- [Bun](https://bun.sh) as the package manager

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` routes: home, about, services, industries, who-we-serve,
  case-studies, insights, careers, contact, privacy, terms
- `components/home/` home page sections
- `components/page/` shared page building blocks (hero, section header,
  cards, filters, closing sections)
- `lib/content.ts` all site copy and data (placeholder until final content
  is supplied)

## Scripts

- `bun dev` start the dev server
- `bun run build` production build
- `bun run typecheck` TypeScript check
- `bun run format` Prettier
