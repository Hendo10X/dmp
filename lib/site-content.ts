import {
  heroImages,
  images,
  industries,
  services,
  solutions,
  values,
  type Service,
  type Solution,
} from "@/lib/content"

// Page copy the client edits in Sanity (/studio), with today's copy as the
// defaults. lib/cms.ts merges Sanity over these field by field, so anything
// left blank in the Studio falls back to what is here.
//
// In titles and intros, words wrapped in *asterisks* render as the italic
// highlight (components/ui/emphasis.tsx).

export type Hero = {
  eyebrow: string
  title: string
  intro: string
  image?: string
  imageAlt?: string
}

export type Header = { eyebrow: string; title: string; intro?: string }

export type Card = { title: string; body: string }

export type Stat = { value: string; label: string }

export type HomeContent = {
  hero: { lead: string; words: string[]; intro: string }
  howWeWork: { header: Header; steps: Card[] }
  solutions: Header
  services: Header
  feature: { solution: string }
  stories: Header
  impact: {
    header: Header
    stats: Stat[]
    story: {
      eyebrow: string
      title: string
      caseStudy: string
      stat: Stat
      image: string
      imageAlt: string
    }
  }
  about: {
    eyebrow: string
    title: string
    body: string
    image: string
    imageAlt: string
    badge: string
    industriesLabel: string
  }
  industries: string[]
  explore: {
    header: Header
    tiles: { title: string; body: string; href: string }[]
  }
  quote: { eyebrow: string; text: string; by: string }
}

export type AboutContent = {
  hero: Hero
  purpose: { eyebrow: string; title: string; body: string; tagline: string }
  mission: string
  positioning: string
  values: Card[]
  team: Header
  markets: { title: string; intro: string }
  message: {
    eyebrow: string
    lead: string
    paragraphs: string[]
    signoff: string
  }
}

export type CareersContent = {
  hero: Hero
  culture: { header: Header; cards: string[] }
  paths: {
    header: Header
    cards: {
      title: string
      body: string
      image: string
      href: string
      cta: string
    }[]
  }
  openings: Header
  process: { header: Header; steps: Card[] }
}

export type PagesContent = {
  services: { hero: Hero; cards: Header; inPractice: Header }
  solutions: { hero: Hero; behind: Header }
  whoWeServe: { hero: Hero }
  caseStudies: { hero: Hero }
  reports: { hero: Hero }
  speakers: { hero: Hero }
  contact: { hero: Hero }
}

export type SiteContent = {
  services: Service[]
  solutions: Solution[]
  home: HomeContent
  about: AboutContent
  careers: CareersContent
  pages: PagesContent
}

const servicesIntro =
  "From strategy and transformation to transactions, policy, research and sustainability: advisory built for the business of sports and the markets connected to it."

export const defaultContent: SiteContent = {
  services,
  solutions,

  home: {
    hero: {
      lead: "Demonstrating",
      // The second line cycles through these (the first is the tagline).
      words: [
        "possibilities.",
        "investment.",
        "growth.",
        "partnerships.",
        "opportunity.",
      ],
      intro:
        "Commercial and investment advisory where the *sports industry meets adjacent markets*, across Nigeria and the wider African continent.",
    },
    howWeWork: {
      header: {
        eyebrow: "How we work",
        title: "From question to result, in four moves.",
        intro:
          "The same disciplined sequence on every engagement, whether it is a ten-week review or a five-year programme.",
      },
      steps: [
        {
          title: "Diagnose",
          body: "We start with evidence: data, stakeholders and the market, so the real problem is on the table.",
        },
        {
          title: "Design",
          body: "Options are modelled and stress-tested, then shaped into a plan the people involved can own.",
        },
        {
          title: "Deliver",
          body: "We work alongside your team to build, launch and embed the change, not hand over a slide deck.",
        },
        {
          title: "Measure",
          body: "Every engagement ends in numbers: what moved, by how much, and what comes next.",
        },
      ],
    },
    solutions: {
      eyebrow: "Our solutions",
      title: "Four ways we demonstrate possibilities.",
      intro:
        "Proprietary programmes and indices that turn what we know about African sports into decisions.",
    },
    services: {
      eyebrow: "What we do",
      title: "Six practices. One ambition.",
      intro: servicesIntro,
    },
    feature: { solution: "sports-power-index" },
    stories: {
      eyebrow: "Client stories",
      title: "Real stories. Real results.",
      intro:
        "How federations, leagues and public bodies turned possibilities into performance with DMPartners.",
    },
    impact: {
      header: {
        eyebrow: "Client impact",
        title: "Results you can read on a scoreboard.",
        intro:
          "Good strategy shows up in numbers. Here is what changes when sports are run with evidence, modern systems and a clear commercial plan.",
      },
      // Illustrative figures only: replace with real, client-approved
      // results.
      stats: [
        { value: "38%", label: "Increase in matchday revenue" },
        { value: "91%", label: "Sponsor renewal rate" },
        { value: "12", label: "Member associations on one data platform" },
      ],
      story: {
        eyebrow: "Case study",
        title: "A national federation rebuilds around its data",
        caseStudy: "federation-data-rebuild",
        stat: { value: "2.4×", label: "Faster reporting to the federation board" },
        image: images.engineers,
        imageAlt: "Engineers reviewing plans together",
      },
    },
    about: {
      eyebrow: "About DMPartners",
      title: "Not aspiration. *Possibilities within reach.*",
      body: "DMPartners is a commercial and investment advisory practice working where the sports industry meets adjacent markets. We exist to show what is achievable in Nigeria and across the continent, with work aimed squarely at industrial development and opportunities that are already within reach.",
      image: images.site,
      imageAlt:
        "Two architects in hard hats reviewing blueprints on a building site",
      badge: "Client Groups\nWe Serve",
      industriesLabel: "Industries we serve",
    },
    industries,
    explore: {
      header: {
        eyebrow: "Explore",
        title: "Where to next.",
        intro:
          "Join the team, see what our solutions can do, or start a conversation with DMPartners.",
      },
      tiles: [
        {
          title: "Careers",
          body: "Do the best work of your career in African sports.",
          href: "/careers",
        },
        {
          title: "Solutions",
          body: "Our programmes and indices, built to demonstrate possibilities.",
          href: "/solutions",
        },
        {
          title: "Contact",
          body: "Start a conversation, or book a DMP speaker.",
          href: "/contact",
        },
      ],
    },
    quote: {
      eyebrow: "From our partners",
      text: "The opportunities in African sports are not aspirational. They are possibilities already within reach. Our work is to demonstrate them.",
      by: "Founders, DMPartners",
    },
  },

  about: {
    hero: {
      eyebrow: "About DMPartners",
      title: "Purpose. People. Performance.",
      intro:
        "Guided by our tagline, *Demonstrating Possibilities*, we show what is achievable in Nigeria and across the African continent through sports and the markets connected to it.",
      image: heroImages.about,
      imageAlt: "High-rise office towers in Lagos",
    },
    purpose: {
      eyebrow: "Purpose",
      title: "Defining the New Era of Sports, Culture and Business.",
      body: "The future of the sports industry is being defined by the performance of current stakeholders across market segments, public and private sector, in the ecosystem as well as cross-cutting sectoral relationships. This presents a niche opportunity to stand out from the noise to offer specialised expertise for market development, growth strategies, professionalism and direct investment.",
      tagline: "DMPartners exists to shape the future.",
    },
    mission:
      "To facilitate increased business interest and committed investment into the sports industry in Nigeria, and across Africa, leveraging existing opportunities in adjacent markets guided by principles bordering on people, culture and sustainability.",
    positioning:
      "Commercial and investment advisory at the intersection of the sports industry and adjacent markets.",
    values,
    team: {
      eyebrow: "People",
      title: "The team behind the work.",
      intro: "We function as a Tier-One team at every level of our operations.",
    },
    markets: {
      title: "Nigeria first. The continent in view.",
      intro:
        "We start from what is achievable at home and carry it across borders. Drag the globe, or pick a market.",
    },
    message: {
      eyebrow: "A message from the top",
      lead: "We started DMPartners because we kept meeting people who could see what sports in Africa could become, and too few who could show it was possible.",
      paragraphs: [
        "Federations without a commercial plan beyond the next tournament. Investors who wanted to back sports but could not find a case they trusted. Governments that saw the potential but lacked the evidence. None of these are problems of talent. They are problems of structure and proof, and both can be built.",
        "That is our promise to every client: we will tell you what the evidence says, work beside your people to act on it, and measure what changed. If it does not move the numbers, it was not worth doing.",
      ],
      signoff: "The Founding Partners",
    },
  },

  careers: {
    hero: {
      eyebrow: "Careers",
      title: "DMP*Careers*",
      intro:
        "People remain at the heart of who we are and why we do what we do.",
      image: heroImages.careers,
      imageAlt: "Three colleagues reviewing work on a laptop in a Lagos office",
    },
    culture: {
      header: { eyebrow: "Culture", title: "How we work together." },
      cards: [
        "Small teams.",
        "Excel on the strength of each other.",
        "Work for each other.",
        "Deliver together.",
      ],
    },
    paths: {
      header: {
        eyebrow: "Ways in",
        title: "Let's demonstrate possibilities together.",
      },
      cards: [
        {
          title: "Early careers",
          body: "Graduates and early-career analysts who want real responsibility from the first week.",
          image: images.meeting,
          href: "/contact?topic=employment",
          cta: "Start here",
        },
        {
          title: "Seasoned professionals",
          body: "Experienced advisors, analysts and operators ready to shape the business of sports.",
          image: images.boardroom,
          href: "/contact?topic=employment",
          cta: "Join us",
        },
        {
          title: "Partnership",
          body: "Independent experts who want to deliver alongside us.",
          image: images.construction,
          href: "/contact?topic=general",
          cta: "Partner with us",
        },
      ],
    },
    openings: {
      eyebrow: "Current openings",
      title: "Open roles.",
      intro:
        "Nothing that fits? Register your interest and we will be in touch when the right role opens.",
    },
    process: {
      header: {
        eyebrow: "Application process",
        title: "Four steps, no surprises.",
      },
      steps: [
        {
          title: "Apply",
          body: "Send your CV and a short note on why sports and why DMP.",
        },
        {
          title: "Conversation",
          body: "A relaxed first call with someone from the team you would join.",
        },
        {
          title: "Case exercise",
          body: "A realistic problem, worked through with us rather than alone.",
        },
        {
          title: "Offer",
          body: "Meet the partners, ask anything, and hear back within a week.",
        },
      ],
    },
  },

  pages: {
    services: {
      hero: {
        eyebrow: "Services",
        title: "What we do.",
        intro:
          "Six practices, each built for the business of sports and the markets connected to it. Start with the one closest to your challenge, or explore our solutions.",
        image: heroImages.services,
        imageAlt: "Construction workers in hard hats on a building site",
      },
      cards: {
        eyebrow: "What we do",
        title: "Six practices. One ambition.",
        intro: servicesIntro,
      },
      inPractice: {
        eyebrow: "In practice",
        title: "See the pillars at work.",
        intro:
          "Each engagement draws on more than one pillar. These case studies show how.",
      },
    },
    solutions: {
      hero: {
        eyebrow: "Solutions",
        title: "Built to demonstrate possibilities.",
        intro:
          "Our proprietary programmes and indices package what we know about African sports into tools leaders can act on.",
        image: heroImages.solutions,
        imageAlt: "Aerial view of a football stadium",
      },
      behind: {
        eyebrow: "Behind the solutions",
        title: "Powered by six practices.",
        intro:
          "Every solution draws on our advisory services. Need something bespoke? Start with the service closest to your challenge.",
      },
    },
    whoWeServe: {
      hero: {
        eyebrow: "Who we serve",
        title: "Everyone in the business of sports.",
        intro:
          "Seven stakeholder groups, each with its own friction. Open yours to see how we help.",
        image: heroImages.whoWeServe,
        imageAlt: "Smiling children at their desks in a classroom",
      },
    },
    caseStudies: {
      hero: {
        eyebrow: "Case studies",
        title: "Impact, with evidence.",
        intro:
          "How federations, investors, governments and brands turn possibilities into performance.",
        image: heroImages.caseStudies,
        imageAlt: "Trucks working an open-pit quarry",
      },
    },
    reports: {
      hero: {
        eyebrow: "Reports",
        title: "Research that moves decisions.",
        intro:
          "Evidence on sports and industrialisation in Nigeria and across Africa.",
        image: heroImages.reports,
        imageAlt: "Market data charts on a screen",
      },
    },
    speakers: {
      hero: {
        eyebrow: "DMP Speakers",
        title: "Book a DMP speaker.",
        intro:
          "Our partners speak at conferences, board away-days and federation congresses on the ideas behind our work.",
        image: heroImages.speakers,
        imageAlt: "Colleagues in discussion around a boardroom table in Lagos",
      },
    },
    contact: {
      hero: {
        eyebrow: "Contact",
        title: "Start a Conversation.",
        intro:
          "Tell us a little about your organisation and what you are trying to change. A short note is plenty.",
      },
    },
  },
}
