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
    slug: "strategy-growth",
    title: "Strategy & Growth Advisory",
    summary:
      "Clear strategies and growth plans for sports organisations, brands and the businesses around them.",
    shape: "circle",
    image: images.meeting,
    what: "We help leadership teams decide where to play and how to win: corporate and commercial strategy, market entry, revenue diversification, partnerships and growth plans grounded in the realities of Nigerian and African markets.",
    forWhom: ["federations", "corporates", "smes"],
    approach: [
      {
        title: "Assess the position",
        body: "Market, competitors, capabilities and the economics that matter.",
      },
      {
        title: "Find the growth",
        body: "Size the opportunities in sport and adjacent markets, then prioritise.",
      },
      {
        title: "Set the plan",
        body: "A strategy with targets, owners, funding and a realistic timeline.",
      },
      {
        title: "Back it to delivery",
        body: "Support through the first milestones so the plan becomes results.",
      },
    ],
    caseStudy: "league-sponsorship-reset",
    insight: "investable-league",
  },
  {
    slug: "business-transformation",
    title: "Business Transformation & Performance",
    summary:
      "Operating models, governance and systems that make organisations perform, and keep performing.",
    shape: "square",
    image: images.engineers,
    what: "We redesign how organisations work: governance, structure, processes, people and technology. The goal is measurable performance, from faster decisions to stronger finances, with change that sticks after we leave.",
    forWhom: ["federations", "associations", "corporates"],
    approach: [
      {
        title: "Diagnose",
        body: "Benchmark performance, governance and operations against peers.",
      },
      {
        title: "Design",
        body: "The target operating model, structures and controls.",
      },
      {
        title: "Implement",
        body: "Phased change alongside your team, with clear milestones.",
      },
      {
        title: "Sustain",
        body: "Scorecards, capability building and a performance rhythm.",
      },
    ],
    caseStudy: "federation-data-rebuild",
    insight: "federation-data-strategy",
  },
  {
    slug: "transaction-investment",
    title: "Transaction & Investment Advisory",
    summary:
      "Due diligence, valuation, deal support and investment cases for capital entering sport.",
    shape: "triangle",
    image: images.analysis,
    what: "We help investors, financial institutions and governments put capital to work in sport and adjacent markets with confidence: commercial due diligence, valuation, feasibility, transaction support and the investment cases that show what is possible.",
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
        title: "Support the deal",
        body: "Investment papers, negotiation support and help through to close.",
      },
    ],
    caseStudy: "league-sponsorship-reset",
    insight: "investable-league",
  },
  {
    slug: "policy-ecosystem",
    title: "Policy & Ecosystem Advisory",
    summary:
      "Policy, regulation and programmes that help a whole sports economy grow.",
    shape: "quarter",
    image: images.research,
    what: "We work with governments, regulators and development partners on the conditions that let sport become an industry: national sports policy, regulatory frameworks, public-private partnerships, infrastructure programmes and the ecosystems around them.",
    forWhom: ["mdas", "federations", "associations"],
    approach: [
      {
        title: "Map the ecosystem",
        body: "Who holds the levers, where value is lost and what blocks growth.",
      },
      {
        title: "Shape the policy",
        body: "Evidence-based options, consultation and drafting.",
      },
      {
        title: "Design programmes",
        body: "Funding models, PPP structures and delivery vehicles.",
      },
      {
        title: "Evaluate impact",
        body: "Frameworks that show what public investment achieved.",
      },
    ],
    caseStudy: "talent-pathway-review",
    insight: "dmp-research-partnership",
  },
  {
    slug: "research-market-intelligence",
    title: "Research & Market Intelligence",
    summary:
      "Evidence, indices and market studies on the sports economy in Nigeria and across Africa.",
    shape: "diamond",
    image: images.analysis,
    what: "Independent research on the size, growth and potential of the sports economy, designed to be used: market sizing, audience and fan research, sector studies and the proprietary indices behind our solutions.",
    forWhom: ["investors", "academia", "mdas"],
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
  {
    slug: "sustainability",
    title: "Sustainability",
    summary:
      "Environmental, social and governance strategy that makes sport last, and makes it count.",
    shape: "ring",
    image: images.site,
    what: "We help sports organisations, venues and investors build sustainability into strategy and operations: ESG frameworks, sustainable venue and event planning, community impact and the reporting that funders and partners now expect.",
    forWhom: ["corporates", "investors", "federations"],
    approach: [
      {
        title: "Baseline",
        body: "Measure environmental, social and governance performance today.",
      },
      {
        title: "Prioritise",
        body: "Focus on the issues that matter most to your stakeholders.",
      },
      {
        title: "Plan and integrate",
        body: "Targets, initiatives and ownership built into operations.",
      },
      {
        title: "Report",
        body: "Credible disclosure and impact reporting for partners and funders.",
      },
    ],
    caseStudy: "club-governance-review",
    insight: "wearables-welfare",
  },
]

// --------------------------------------------------------------- Solutions

// DMPartners' proprietary solutions. Descriptions are PLACEHOLDER
// interpretations of the names: confirm scope and method with the client.
export type Solution = {
  slug: string
  title: string
  kicker: string
  summary: string
  image: string
  shape: ShapeName
  what: string
  outcomes: string[]
  how: { title: string; body: string }[]
  forWhom: string[]
  services: string[]
}

export const solutions: Solution[] = [
  {
    slug: "federation-business-transformation",
    title: "Federation Business Transformation",
    kicker: "Programme",
    summary:
      "An end-to-end programme that turns national federations into well-governed, commercially sustainable organisations.",
    image: images.engineers,
    shape: "square",
    what: "Federations sit at the heart of every sport, yet many run on volunteer structures and a single funding source. Our transformation programme rebuilds them as modern organisations: governance that earns trust, commercial models that diversify income, operations that deliver, and data that proves progress.",
    outcomes: [
      "Governance aligned to international best practice",
      "Diversified, recurring commercial revenue",
      "A professional operating model and team",
      "Performance data the board and funders trust",
    ],
    how: [
      {
        title: "Federation health check",
        body: "A structured diagnostic across governance, finance, commercial, operations and athletes.",
      },
      {
        title: "Transformation blueprint",
        body: "A prioritised plan with funding, owners and milestones.",
      },
      {
        title: "Delivery and change",
        body: "Hands-on support to implement, from constitutions to commercial deals.",
      },
      {
        title: "Measure and report",
        body: "A scorecard that tracks progress for the board, members and funders.",
      },
    ],
    forWhom: ["federations", "mdas", "associations"],
    services: [
      "business-transformation",
      "strategy-growth",
      "policy-ecosystem",
    ],
  },
  {
    slug: "street-credibility-index",
    title: "Street Credibility Index",
    kicker: "Index",
    summary:
      "A measure of how credible and relevant brands, clubs and athletes are with fans and communities.",
    image: images.stadium,
    shape: "circle",
    what: "Reach is easy to buy. Credibility is earned on the street, in communities and among fans. The Street Credibility Index measures it: how trusted, authentic and culturally relevant a brand, club or athlete is with the audiences that matter, and how that compares with peers.",
    outcomes: [
      "A credibility score benchmarked against peers",
      "The drivers of trust and relevance, by audience",
      "Clear actions to strengthen standing with fans",
      "Evidence for sponsors, partners and investors",
    ],
    how: [
      {
        title: "Listen at scale",
        body: "Fan and community research, social listening and on-the-ground panels.",
      },
      {
        title: "Score",
        body: "A consistent index across trust, authenticity, relevance and advocacy.",
      },
      {
        title: "Benchmark",
        body: "Compare against peers, categories and over time.",
      },
      {
        title: "Act",
        body: "Recommendations for partnerships, campaigns and community investment.",
      },
    ],
    forWhom: ["corporates", "federations", "smes"],
    services: ["research-market-intelligence", "strategy-growth"],
  },
  {
    slug: "sports-power-index",
    title: "Sports Power Index",
    kicker: "Index",
    summary:
      "A ranking of the commercial and institutional strength of sports, properties and markets across Africa.",
    image: images.celebrate,
    shape: "triangle",
    what: "Where should capital, sponsorship and policy attention go? The Sports Power Index ranks sports, properties and markets on the factors that create value: audience, commercial maturity, governance, infrastructure and investment readiness. It turns a crowded field into a clear map of possibility.",
    outcomes: [
      "A transparent ranking of sports, properties and markets",
      "Scores across five pillars of sporting power",
      "Investment-ready shortlists and opportunity maps",
      "Annual tracking of who is rising and why",
    ],
    how: [
      {
        title: "Define the pillars",
        body: "Audience, commercial, governance, infrastructure and investment readiness.",
      },
      {
        title: "Collect the data",
        body: "Primary research, partner data and public sources across markets.",
      },
      {
        title: "Rank and publish",
        body: "Weighted scores, peer comparisons and an annual report.",
      },
      {
        title: "Advise",
        body: "Bespoke cuts for investors, sponsors and governments.",
      },
    ],
    forWhom: ["investors", "mdas", "corporates"],
    services: ["research-market-intelligence", "transaction-investment"],
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
    service: "business-transformation",
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
    service: "strategy-growth",
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
    service: "research-market-intelligence",
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
    service: "business-transformation",
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
    team: "Strategy & Growth Advisory",
    type: "Full-time",
    location: "Hybrid",
  },
  {
    title: "Investment Analyst",
    team: "Transaction & Investment Advisory",
    type: "Full-time",
    location: "Hybrid",
  },
  {
    title: "Research Analyst",
    team: "Research & Market Intelligence",
    type: "Full-time",
    location: "On-site",
  },
]

// ------------------------------------------------------------------ Helpers

export const findSolution = (slug: string) =>
  solutions.find((s) => s.slug === slug)
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
