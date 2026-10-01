// Site content in one place. DMPartners: commercial and investment advisory
// at the intersection of the sports industry and adjacent markets, across
// Nigeria and the wider African continent. "Demonstrating Possibilities."
// Everything here is PLACEHOLDER copy written to
// the structure in docs/brief.md: replace with client-approved content
// (or move to a CMS) before launch. Figures and quotes are illustrative.

import type { ShapeName } from "@/components/ui/shape"

// Photos: Pexels free licence (pexels.com/license). Sources by photo id:
// stadium 29804436, meeting 30688593, research 9301257, celebrate 29804435,
// site 7937367, engineers 37198885, analysis 9301824.
export const images = {
  stadium: "/Images/nigerian-fans-stadium.jpg",
  meeting: "/Images/lagos-office-meeting.jpg",
  research: "/Images/research-presentation.jpg",
  site: "/Images/architects-site-review.jpg",
  engineers: "/Images/engineers-plan-review.jpg",
  analysis: "/Images/market-data-analysis.jpg",
  celebrate: "/Images/super-falcons-celebrate.jpg",
}

// ---------------------------------------------------------------- Services

export type Service = {
  slug: string
  title: string
  summary: string
  shape: ShapeName
  image: string
  what: string
  forWhom: string[]
  approach: { title: string; body: string }[]
  caseStudy: string
  insight: string
}

export const services: Service[] = [
  {
    slug: "commercial-advisory",
    title: "Commercial Advisory",
    summary:
      "Revenue models, sponsorship, media and partnerships that make sport commercially sustainable.",
    shape: "triangle",
    image: images.celebrate,
    what: "We build the commercial case for sport and the markets around it: sponsorship and media strategy, revenue diversification, pricing and the partnerships that turn audiences into lasting income.",
    forWhom: ["federations", "corporates", "smes"],
    approach: [
      {
        title: "Size the market",
        body: "Audiences, rights, comparables and realistic revenue ranges across Nigeria and the continent.",
      },
      {
        title: "Model the options",
        body: "Scenarios and sensitivities that show what really drives value.",
      },
      {
        title: "Package the offer",
        body: "Clear, evidence-led propositions for partners, sponsors and broadcasters.",
      },
      {
        title: "Close and deliver",
        body: "Negotiation support and partner onboarding through to signature and activation.",
      },
    ],
    caseStudy: "league-sponsorship-reset",
    insight: "investable-league",
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    summary:
      "Due diligence, valuation and investment cases for capital entering sport and adjacent markets.",
    shape: "quarter",
    image: images.meeting,
    what: "We help investors, financial institutions and governments put capital to work in sport with confidence: market entry studies, commercial due diligence, feasibility and the investment cases that show what is possible.",
    forWhom: ["investors", "mdas", "corporates"],
    approach: [
      {
        title: "Frame the thesis",
        body: "Agree what the investment must prove and the risks that matter most.",
      },
      {
        title: "Test the evidence",
        body: "Market data, operator interviews and site visits, not assumptions.",
      },
      {
        title: "Value the opportunity",
        body: "Transparent models, benchmarks and downside cases.",
      },
      {
        title: "Support the decision",
        body: "Investment papers, board briefings and support through to close.",
      },
    ],
    caseStudy: "talent-pathway-review",
    insight: "investable-league",
  },
  {
    slug: "strategy-governance",
    title: "Strategy & Governance",
    summary:
      "Long-range plans, structures and policy for federations, leagues and public bodies.",
    shape: "circle",
    image: images.site,
    what: "We help sports organisations decide where they are going and build the structures to get there: multi-year strategies, governance reviews, operating models and policy that stands up to scrutiny.",
    forWhom: ["federations", "mdas", "associations"],
    approach: [
      {
        title: "Listen widely",
        body: "Interviews, surveys and workshops with athletes, officials, members and funders.",
      },
      {
        title: "Benchmark honestly",
        body: "Compare structures and results against peers at home and abroad.",
      },
      {
        title: "Decide together",
        body: "Facilitated sessions that turn options into a strategy the board owns.",
      },
      {
        title: "Embed it",
        body: "Scorecards, operating models and a delivery rhythm that outlast the engagement.",
      },
    ],
    caseStudy: "federation-data-rebuild",
    insight: "federation-data-strategy",
  },
  {
    slug: "research-insight",
    title: "Research & Insight",
    summary:
      "Evidence and market studies on the sports economy that inform decisions and shape policy.",
    shape: "square",
    image: images.research,
    what: "Independent research on the size, growth and potential of the sports economy in Nigeria and across Africa, designed to be used: by ministries setting policy, investors weighing markets and federations planning ahead.",
    forWhom: ["mdas", "academia", "investors"],
    approach: [
      {
        title: "Frame the question",
        body: "Agree what decision the research needs to inform.",
      },
      {
        title: "Gather evidence",
        body: "Surveys, fieldwork, data partnerships and desk research.",
      },
      {
        title: "Analyse rigorously",
        body: "Transparent methods, peer review and plain-language findings.",
      },
      {
        title: "Put it to work",
        body: "Briefings, dashboards and recommendations that lead to action.",
      },
    ],
    caseStudy: "talent-pathway-review",
    insight: "talent-pathway",
  },
]

// --------------------------------------------------------------- Audiences

export type Audience = {
  slug: string
  title: string
  body: string
  shape: ShapeName
  needs: string[]
}

export const audiences: Audience[] = [
  {
    slug: "federations",
    title: "Federations & NGBs",
    body: "Governance, strategy and performance systems for national governing bodies.",
    shape: "circle",
    needs: [
      "Multi-year strategic plans",
      "Governance and board reviews",
      "Athlete and member data platforms",
    ],
  },
  {
    slug: "mdas",
    title: "Ministries, Departments & Agencies",
    body: "Policy, programme design and evaluation for public investment in sport.",
    shape: "square",
    needs: [
      "Sports policy development",
      "Programme evaluation",
      "Infrastructure feasibility",
    ],
  },
  {
    slug: "corporates",
    title: "Corporates",
    body: "Sponsorship strategy, activation and measurable return from sport partnerships.",
    shape: "triangle",
    needs: [
      "Sponsorship strategy",
      "Partnership measurement",
      "Employee wellbeing through sport",
    ],
  },
  {
    slug: "investors",
    title: "Investors & Financial Institutions",
    body: "Due diligence, valuation and market insight for capital entering sport.",
    shape: "quarter",
    needs: [
      "Commercial due diligence",
      "Market entry studies",
      "Asset valuation support",
    ],
  },
  {
    slug: "academia",
    title: "Academic & Research Institutions",
    body: "Research partnerships, data and applied studies with real-world reach.",
    shape: "circle",
    needs: [
      "Joint research programmes",
      "Data access partnerships",
      "Knowledge transfer",
    ],
  },
  {
    slug: "smes",
    title: "SMEs & Intermediaries",
    body: "Growth strategy and market access for businesses serving the sports economy.",
    shape: "square",
    needs: [
      "Go-to-market strategy",
      "Partnership brokering",
      "Digital capability",
    ],
  },
  {
    slug: "associations",
    title: "Professional Associations",
    body: "Standards, member value and professional development for bodies in sport.",
    shape: "triangle",
    needs: [
      "Member value propositions",
      "Accreditation frameworks",
      "CPD programmes",
    ],
  },
]

// ----------------------------------------------------------------- Sectors

export type Sector = {
  slug: string
  title: string
  body: string
  shape: ShapeName
  image: string
}

export const sectors: Sector[] = [
  {
    slug: "football",
    title: "Football & Leagues",
    body: "Club and league strategy, rights, academies and matchday economics.",
    shape: "circle",
    image: images.stadium,
  },
  {
    slug: "olympic-sport",
    title: "Olympic & Grassroots Sport",
    body: "Funding cases, athlete pathways and participation growth.",
    shape: "square",
    image: images.celebrate,
  },
  {
    slug: "media",
    title: "Media & Entertainment",
    body: "Broadcast, streaming and content models built around sport audiences.",
    shape: "triangle",
    image: images.celebrate,
  },
  {
    slug: "tourism-events",
    title: "Sports Tourism & Events",
    body: "Event bidding, hosting economics and the visitor economy around sport.",
    shape: "quarter",
    image: images.meeting,
  },
  {
    slug: "infrastructure",
    title: "Venues & Real Estate",
    body: "Feasibility, financing and operating models for venues and mixed-use sites.",
    shape: "circle",
    image: images.engineers,
  },
  {
    slug: "health-wellness",
    title: "Health, Wellness & Science",
    body: "Sports medicine, wellness markets and applied research.",
    shape: "square",
    image: images.research,
  },
]

// ------------------------------------------------------------ Case studies

export type CaseStudy = {
  slug: string
  title: string
  client: string
  service: string
  sector: string
  image: string
  summary: string
  challenge: string
  approach: string
  impact: string
  stats: { value: string; label: string }[]
  quote?: { text: string; by: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "federation-data-rebuild",
    title: "A national federation rebuilds around its data",
    client: "National sports federation",
    service: "strategy-governance",
    sector: "olympic-sport",
    image: images.research,
    summary:
      "One platform for athletes, clubs and competitions, and a board that reports in days, not months.",
    challenge:
      "Member, competition and athlete data sat in a dozen spreadsheets and two legacy systems. Board reports took six weeks and nobody trusted the numbers.",
    approach:
      "We mapped every data source, designed a single platform with the federation's small digital team, migrated ten years of records and trained staff in every region.",
    impact:
      "Reporting time fell sharply, twelve member associations now share one platform, and the federation used its new data to win a multi-year funding agreement.",
    stats: [
      { value: "2.4×", label: "Faster reporting to the board" },
      { value: "12", label: "Associations on one platform" },
    ],
    quote: {
      text: "For the first time, everyone is looking at the same numbers.",
      by: "Secretary General, national federation",
    },
  },
  {
    slug: "league-sponsorship-reset",
    title: "A professional league resets its sponsorship model",
    client: "Professional sports league",
    service: "commercial-advisory",
    sector: "football",
    image: images.stadium,
    summary:
      "From one-off deals to a tiered partnership programme with measurable value.",
    challenge:
      "Sponsorship revenue was concentrated in two partners and renewals were negotiated from scratch each season.",
    approach:
      "We benchmarked rights against comparable leagues, rebuilt the inventory into tiers and introduced partner reporting.",
    impact:
      "Renewals became routine, the partner base broadened and matchday revenue rose.",
    stats: [
      { value: "38%", label: "Increase in matchday revenue" },
      { value: "91%", label: "Sponsor renewal rate" },
    ],
  },
  {
    slug: "talent-pathway-review",
    title: "Measuring a national talent pathway",
    client: "Government sports agency",
    service: "research-insight",
    sector: "olympic-sport",
    image: images.analysis,
    summary:
      "A three-year evidence base for where talent funding goes furthest.",
    challenge:
      "Funding was spread across programmes with no shared way to measure progression.",
    approach:
      "We designed a pathway framework, gathered data from regional centres and tracked athlete progression over three seasons.",
    impact:
      "The agency redirected funding to the stages with the strongest progression and published the framework for federations to adopt.",
    stats: [
      { value: "3", label: "Seasons of tracked progression" },
      { value: "40+", label: "Regional centres assessed" },
    ],
  },
  {
    slug: "club-governance-review",
    title: "Modernising governance at a heritage club",
    client: "Multi-sport club",
    service: "strategy-governance",
    sector: "football",
    image: images.meeting,
    summary: "A new board structure and constitution approved by members.",
    challenge:
      "An outdated constitution and an oversized board slowed every decision.",
    approach:
      "We consulted members, benchmarked peer clubs and drafted a new constitution with a smaller, skills-based board.",
    impact:
      "Members approved the reforms and the new board delivered its first strategic plan within a year.",
    stats: [
      { value: "1 yr", label: "To first strategic plan" },
      { value: "9", label: "Board seats, down from 21" },
    ],
  },
]

// ---------------------------------------------------------------- Insights

export type Insight = {
  slug: string
  title: string
  type: "Report" | "Insight" | "Perspective" | "News"
  topic: string
  date: string
  image: string
  excerpt: string
  featured?: boolean
}

export const insights: Insight[] = [
  {
    slug: "federation-data-strategy",
    title: "Why federations need a data strategy before a new stadium",
    type: "Report",
    topic: "Governance",
    date: "2026-08-12",
    image: images.research,
    excerpt:
      "Infrastructure gets the headlines. Data decides whether it pays off.",
    featured: true,
  },
  {
    slug: "investable-league",
    title: "The investable league: what capital looks for in African sport",
    type: "Insight",
    topic: "Investment",
    date: "2026-06-03",
    image: images.celebrate,
    excerpt:
      "Five signals investors check before they commit to a league or club.",
  },
  {
    slug: "wearables-welfare",
    title: "Wearables, welfare and the athlete data question",
    type: "Perspective",
    topic: "Technology",
    date: "2025-11-20",
    image: images.analysis,
    excerpt:
      "Who owns an athlete's data, and what should federations do about it?",
  },
  {
    slug: "talent-pathway",
    title: "From grassroots to podium: measuring a talent pathway",
    type: "Report",
    topic: "Performance",
    date: "2025-09-08",
    image: images.celebrate,
    excerpt:
      "A practical framework for tracking athlete progression across a system.",
  },
  {
    slug: "dmp-research-partnership",
    title: "DMP launches a sports economy research partnership",
    type: "News",
    topic: "Research",
    date: "2025-07-15",
    image: images.meeting,
    excerpt:
      "A new collaboration to measure the size and growth of the sports economy.",
  },
]

// ------------------------------------------------------------ About / team

export const values = [
  {
    title: "Evidence first",
    body: "Opinions are welcome. Decisions are made on data.",
    shape: "square" as ShapeName,
  },
  {
    title: "Built to last",
    body: "We design for the institution, not the headline.",
    shape: "quarter" as ShapeName,
  },
  {
    title: "Side by side",
    body: "We work inside your team, not above it.",
    shape: "circle" as ShapeName,
  },
  {
    title: "Straight talk",
    body: "Clear advice, even when it is not what people want to hear.",
    shape: "triangle" as ShapeName,
  },
]

export const team = [
  { name: "Partner Name", role: "Founding Partner", initials: "FP" },
  { name: "Partner Name", role: "Managing Partner", initials: "MP" },
  { name: "Team Member", role: "Head of Investment Advisory", initials: "DT" },
  { name: "Team Member", role: "Head of Research", initials: "HR" },
  { name: "Team Member", role: "Commercial Lead", initials: "CL" },
  { name: "Team Member", role: "Senior Consultant", initials: "SC" },
]

// ------------------------------------------------------------------ Careers

export const openings = [
  {
    title: "Senior Consultant, Strategy",
    team: "Strategy & Governance",
    type: "Full-time",
    location: "Hybrid",
  },
  {
    title: "Investment Analyst",
    team: "Investment Advisory",
    type: "Full-time",
    location: "Hybrid",
  },
  {
    title: "Research Analyst",
    team: "Research & Insight",
    type: "Full-time",
    location: "On-site",
  },
]

// ------------------------------------------------------------------ Helpers

export const findService = (slug: string) =>
  services.find((s) => s.slug === slug)
export const findAudience = (slug: string) =>
  audiences.find((a) => a.slug === slug)
export const findSector = (slug: string) => sectors.find((s) => s.slug === slug)
export const findCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug)
export const findInsight = (slug: string) =>
  insights.find((i) => i.slug === slug)

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

// ------------------------------------------------------------------ Markets

// Globe markers. Nigeria is home; the others are PLACEHOLDER key markets
// until the client confirms where they work.
export type Market = {
  city: string
  country: string
  location: [number, number] // [lat, lng]
  home?: boolean
}

export const markets: Market[] = [
  { city: "Lagos", country: "Nigeria", location: [6.52, 3.38], home: true },
  { city: "Abuja", country: "Nigeria", location: [9.08, 7.4], home: true },
  { city: "Accra", country: "Ghana", location: [5.6, -0.19] },
  { city: "Dakar", country: "Senegal", location: [14.72, -17.47] },
  { city: "Cairo", country: "Egypt", location: [30.04, 31.24] },
  { city: "Nairobi", country: "Kenya", location: [-1.29, 36.82] },
  { city: "Kigali", country: "Rwanda", location: [-1.95, 30.06] },
  { city: "Johannesburg", country: "South Africa", location: [-26.2, 28.05] },
]
