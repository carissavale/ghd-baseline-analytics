// Mock data for Phase 2 design preview — values pulled directly from V4 static HTML.
// At cutover, these get replaced with Supabase queries against the schema in
// supabase/migrations/001_initial_schema.sql.

import type { Meeting } from "@/lib/types";

// Cycle: Mar 24 – Apr 23, 2026. Eight meetings on the record.
// Mock IDs use slugs so the data is stable; real DB rows use UUIDs.
type MockMeeting = Pick<
  Meeting,
  | "id"
  | "title"
  | "meeting_date"
  | "category"
  | "summary"
  | "organization_name"
  | "organization_initial"
>;

export const recentMeetings: ReadonlyArray<MockMeeting> = [
  {
    id: "m-shirman-discovery",
    meeting_date: "2026-04-09",
    category: "investor",
    title: "Mark Shirman Investor Discovery Call",
    summary:
      "Discovery call with Mark Shirman, former CEO of RiverMeadow Software (connection via Jeff Newman). Strong investment interest expressed.",
    organization_name: "BizAnalytica",
    organization_initial: "B",
  },
  {
    id: "m-price-discovery",
    meeting_date: "2026-04-07",
    category: "investor",
    title: "Scott Price Investor Discovery Call",
    summary:
      "Discovery call with Scott Price, President at Beacon Oral Specialists (via Tom Castillo). Personal investment interest discussed.",
    organization_name: "Beacon Oral",
    organization_initial: "B",
  },
  {
    id: "m-prather-iab",
    meeting_date: "2026-04-02",
    category: "advisory",
    title: "Edwin Prather IAB Discovery Call",
    summary:
      "Discovery call with Edwin Prather, Bay Area attorney and General Counsel at Alexander's Steakhouse.",
    organization_name: "Prather",
    organization_initial: "P",
  },
  {
    id: "m-withrow-fenwick",
    meeting_date: "2026-04-02",
    category: "investor",
    title: "Kris Withrow · Fenwick & West",
    summary:
      "Strategic legal framework and investor introduction opportunities.",
    organization_name: "Fenwick",
    organization_initial: "F",
  },
  {
    id: "m-trackman-katz",
    meeting_date: "2026-04-02",
    category: "strategy",
    title: "TrackMan Momentum Call · Adam Katz",
    summary:
      "Integration possibilities and data partnership alignment for the platform.",
    organization_name: "TrackMan",
    organization_initial: "T",
  },
  {
    id: "m-piscotty-iab",
    meeting_date: "2026-04-02",
    category: "advisory",
    title: "Stephen Piscotty IAB Discovery Call",
    summary:
      "IAB candidacy. Former MLB experience and player development connections.",
    organization_name: "Piscotty",
    organization_initial: "P",
  },
  {
    id: "m-castillo-followup",
    meeting_date: "2026-03-28",
    category: "investor",
    title: "Tom Castillo Follow-Up",
    summary:
      "Investment terms, timeline, and next steps for formalizing commitment.",
    organization_name: "Castillo",
    organization_initial: "C",
  },
  {
    id: "m-acis-positioning",
    meeting_date: "2026-03-25",
    category: "strategy",
    title: "ACIS Positioning Review",
    summary:
      "ACIS positioning vs. NFL Digital Athlete and NBA Second Spectrum comparables.",
    organization_name: "Internal",
    organization_initial: "I",
  },
];

// Editorial display: "Apr 9", "Mar 28", etc.
export function shortDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Cycle summary — feeds the new Meetings hybrid header (rolling summary block).
// Source: V4 overview caption left column (THE CYCLE JUST CLOSED).
export const cycleSummary = {
  cycle: "24 Mar to 23 Apr 2026",
  cycleLabel: "Q2 2026",
  brief: "Stakeholder Brief 03",
  closedTitle: "Eight meetings, six materials, one LOI in draft.",
  closedBody:
    "March 24 through April 23. Investor calls accelerated, legal framework tightened, Industry Advisory Board added two candidate discoveries, and the MLB Letter of Intent entered its two-step review directed by incoming Chairman Jeff Newman.",
  aheadTitle: "Convert the LOI. Expand the bench.",
  aheadBody:
    "MLB signature by mid-April, three pending IAB offers to close by end of Q2, two investor term sheets on the table. The next six weeks decide whether Q2 closes as the quarter Baseline moved from validated to capitalized.",
} as const;

// Overview top-line stats — V4 stat-line on /overview
export const overviewStats = [
  { value: "38", label: "Total Conversations", accent: true },
  { value: "19", label: "Active Relationships" },
  { value: "8", label: "This Month" },
  { value: "H1 2026", label: "3 of 5 Milestones Cleared", compact: true },
] as const;

// ====================================================================
// Deal Intel — sports-tech comparables matrix + annual-rate comparison
// Source: V4 deal_intel/index.html
// ====================================================================

export type DealTag = "ai" | "data" | "infra" | "incubated";
export type RelevanceTier =
  | "foundational"
  | "highest"
  | "very-high"
  | "complementary"
  | "structural"
  | "pricing"
  | "entrenchment"
  | "acis";

export type DealRow = {
  id: string;
  name: string;
  tag: DealTag;
  tagLabel: string;
  value: string;
  duration: string;
  structure: string;
  relevanceTier: RelevanceTier;
  relevanceLabel: string;
  relevancePct: number; // 0–100
  isAcis?: boolean;
};

export const dealMatrix: ReadonlyArray<DealRow> = [
  {
    id: "bamtech",
    name: "BAMTech / MLBAM",
    tag: "incubated",
    tagLabel: "MLB-Incubated",
    value: "$3.83B total",
    duration: "2000 to 2022",
    structure:
      "MLB-incubated, Disney acquired. 33× return on $77M initial investment.",
    relevanceTier: "foundational",
    relevanceLabel: "Foundational",
    relevancePct: 100,
  },
  {
    id: "nfl-digital-athlete",
    name: "NFL Digital Athlete + AWS",
    tag: "ai",
    tagLabel: "AI / Injury Prevention",
    value: "$60M+ program",
    duration: "Ongoing · since 2019",
    structure:
      "League-wide AI platform, all 32 NFL clubs. 17% concussion reduction achieved.",
    relevanceTier: "highest",
    relevanceLabel: "Highest · 95%",
    relevancePct: 95,
  },
  {
    id: "second-spectrum",
    name: "Second Spectrum + NBA",
    tag: "ai",
    tagLabel: "AI / Analytics",
    value: "~$42M/yr",
    duration: "6 years · 2016 to 2022",
    structure:
      "Tiered license + per-team upsell. 87% premium-tier adoption. $200M exit.",
    relevanceTier: "very-high",
    relevanceLabel: "Very High · 90%",
    relevancePct: 90,
  },
  {
    id: "hawkeye",
    name: "Hawk-Eye + MLB Statcast",
    tag: "infra",
    tagLabel: "Tracking Infra",
    value: "Est. $20 to 80M/yr",
    duration: "Multi-year · 2020 onward",
    structure:
      "HW + SW infrastructure, 30 MLB + 60+ MiLB + 25+ spring training.",
    relevanceTier: "complementary",
    relevanceLabel: "Complementary · 70%",
    relevancePct: 70,
  },
  {
    id: "sportradar",
    name: "Sportradar + MLB",
    tag: "data",
    tagLabel: "Data Licensing",
    value: "$37.3M eq + annual",
    duration: "8 years · 2025 to 2032",
    structure:
      "Cash + equity exclusive. Establishes MLB's preferred deal structure.",
    relevanceTier: "structural",
    relevanceLabel: "Structural · 55%",
    relevancePct: 55,
  },
  {
    id: "genius-sports",
    name: "Genius Sports + NFL",
    tag: "data",
    tagLabel: "Data Licensing",
    value: "~$120M/yr",
    duration: "4+3 years · 2021 to 2029",
    structure:
      "Exclusive data rights. Exclusivity drove 5 to 6× price increase from prior deal.",
    relevanceTier: "pricing",
    relevanceLabel: "Pricing Ref · 45%",
    relevancePct: 45,
  },
  {
    id: "zebra",
    name: "Zebra Technologies + NFL",
    tag: "infra",
    tagLabel: "Tracking Infra",
    value: "Est. low tens M/yr",
    duration: "12+ seasons · 2014 onward",
    structure:
      "HW tracking, 32 of 32 NFL teams. Rolling 3-year renewals since 2014.",
    relevanceTier: "entrenchment",
    relevanceLabel: "Entrenchment · 35%",
    relevancePct: 35,
  },
  {
    id: "acis",
    name: "ACIS · Baseline Analytics",
    tag: "ai",
    tagLabel: "AI / Injury Prevention · Target",
    value: "$15 to 50M/yr",
    duration: "TBD",
    structure:
      "AI analytics layer, league-wide across 30 MLB clubs. MLB LOI in two-step review.",
    relevanceTier: "acis",
    relevanceLabel: "★ Baseline Position",
    relevancePct: 100,
    isAcis: true,
  },
];

// Annual-rate comparison — bars normalized to Genius Sports at 100%.
export type RateRow = {
  name: string;
  pct: number;
  value: string;
  isAcis?: boolean;
};

export const annualRateRows: ReadonlyArray<RateRow> = [
  { name: "Genius Sports + NFL", pct: 100, value: "~$120M/yr" },
  { name: "Hawk-Eye + MLB Statcast", pct: 67, value: "$20 to 80M/yr" },
  { name: "★ ACIS · Baseline", pct: 42, value: "$15 to 50M/yr", isAcis: true },
  { name: "Second Spectrum + NBA", pct: 35, value: "~$42M/yr" },
  { name: "Zebra Technologies + NFL", pct: 18, value: "Est. low tens M/yr" },
];

// Deal Intel hero stat row
export const dealIntelStats = [
  { value: "$6B+", label: "Aggregate Comp Set", accent: true },
  { value: "$15 to 50M/YR", label: "ACIS Target Band", compact: true },
  { value: "17%", label: "NFL Concussion Reduction" },
  { value: "$641M/YR", label: "MLB Pitcher Injury Cost", compact: true },
] as const;

// ====================================================================
// Milestones — H1 2026 progress ladder + delivered + in-motion
// Source: V4 milestones/index.html
// ====================================================================

export type MilestoneStatus = "delivered" | "in_motion";

export type MilestoneEntry = {
  id: string;
  title: string;
  date: string; // editorial date, "Oct 2025", "Apr 15, 2026"
  status: MilestoneStatus;
  description?: string;
  tooltipDate?: string; // detail line for the ladder hover
};

export const milestones: ReadonlyArray<MilestoneEntry> = [
  {
    id: "corporate-formation",
    title: "Corporate Formation",
    date: "Oct 2025",
    status: "delivered",
    tooltipDate: "Oct 2025 · Wyoming C-Corp",
  },
  {
    id: "iab-established",
    title: "Industry Advisory Board Established",
    date: "Jan 7, 2026",
    status: "delivered",
    tooltipDate: "Jan 7, 2026 · Founding Seats",
    description:
      "First IAB members appointed: Rob Engel (SVP Software Engineering, MLB) and Robbie Erlin (Former MLB Pitcher).",
  },
  {
    id: "cto-recruited",
    title: "CTO Recruited",
    date: "Feb 16, 2026",
    status: "delivered",
    description:
      "Ramesh Bobba, former Cisco VP Engineering, recruited to lead engineering for the MLB deliverable.",
  },
  {
    id: "spring-training",
    title: "Spring Training Validation",
    date: "Feb 23, 2026",
    status: "delivered",
    tooltipDate: "Feb 23, 2026 · Tempe Diablo · 4 MLB Officials",
    description:
      "Arm Care Intelligence System presented to four senior MLB officials at Tempe Diablo Stadium during Spring Training.",
  },
  {
    id: "mlb-loi",
    title: "Sign MLB Letter of Intent",
    date: "Apr 15, 2026",
    status: "in_motion",
    tooltipDate: "Target Apr 23, 2026",
    description:
      "Formalize partnership with Major League Baseball through the two-step LOI process directed by Jeff Newman. The milestone that converts validated to capitalized.",
  },
  {
    id: "iab-expand",
    title: "Expand Industry Advisory Board",
    date: "Jun 30, 2026",
    status: "in_motion",
    tooltipDate: "Target H1 Close · Pitcher Seats",
    description:
      "Add advisors with expertise in sports medicine, data science, and MLB operations. Widens the bench before the LOI is signed, not after.",
  },
];

// Milestones stat-line (counts derived; H1 + status are presentational text)
export const milestonesStats = [
  { value: "3", label: "Completed", accent: true },
  { value: "2", label: "In Motion" },
  { value: "H1 2026", label: "Target Half", compact: true },
  { value: "On Schedule", label: "Status", compact: true },
] as const;

// ====================================================================
// Meetings page — Year view: monthly bar grid + weekly mini chart
// Source: V4 meetings/index.html
// ====================================================================

export type YearMonth = {
  label: string; // "Oct '25"
  count: number;
  pct: number; // 0–100 bar fill
  meta: string; // editorial caption
  current?: boolean;
};

export const yearMonths: ReadonlyArray<YearMonth> = [
  { label: "Oct '25", count: 3, pct: 27, meta: "Founding" },
  { label: "Nov '25", count: 4, pct: 36, meta: "Investor Lane" },
  { label: "Dec '25", count: 4, pct: 36, meta: "Partnerships" },
  { label: "Jan '26", count: 4, pct: 36, meta: "IAB Seated" },
  { label: "Feb '26", count: 6, pct: 54, meta: "CTO + Spring" },
  { label: "Mar '26", count: 6, pct: 54, meta: "Positioning" },
  {
    label: "Apr '26",
    count: 11,
    pct: 100,
    meta: "LOI In Sight",
    current: true,
  },
];

// Weekly mini chart bars — top-right of Meetings masthead. Each "tone" maps
// gold (default) / gold-mid ("mid") / gold-deep ("deep").
export type WeekBar = { h: number; tone?: "mid" | "deep" };
export type WeeklyDistribution = { week: string; bars: ReadonlyArray<WeekBar> };

export const weeklyDistribution: ReadonlyArray<WeeklyDistribution> = [
  { week: "Wk 1", bars: [{ h: 18 }, { h: 28, tone: "mid" }] },
  {
    week: "Wk 2",
    bars: [{ h: 36 }, { h: 26, tone: "mid" }, { h: 22, tone: "deep" }],
  },
  { week: "Wk 3", bars: [{ h: 32, tone: "mid" }] },
  { week: "Wk 4", bars: [{ h: 14 }, { h: 10, tone: "mid" }] },
];

// Year roster — grouped relationship tombstones for the Year > Roster view.
export type RosterTier = "mlb" | "investor" | "advisory" | "legal" | "strategic";

export type RosterEntry = {
  id: string;
  tier: RosterTier;
  eyebrow: string;
  name: string;
  role: string;
  conversations: number;
  range: string; // "Jan 22 to Apr 23 · 91 days"
  isAggregate?: boolean; // dashed/muted tombstone variant
};

export type RosterSection = {
  num: string; // roman numeral
  title: string;
  meta: string; // "1 Relationship · 5 Meetings"
  entries: ReadonlyArray<RosterEntry>;
};

export const rosterSections: ReadonlyArray<RosterSection> = [
  {
    num: "I",
    title: "Major League Baseball",
    meta: "1 Relationship · 5 Meetings",
    entries: [
      {
        id: "mlb-rob-engel",
        tier: "mlb",
        eyebrow: "MLB · Priority",
        name: "Rob Engel",
        role: "SVP Software Eng · MLB",
        conversations: 5,
        range: "Jan 22 to Apr 23 · 91 days",
      },
    ],
  },
  {
    num: "II",
    title: "Investor Pipeline",
    meta: "5 Relationships · 17 Meetings",
    entries: [
      {
        id: "inv-shirman",
        tier: "investor",
        eyebrow: "INVESTOR · ACTIVE",
        name: "Mark Shirman",
        role: "Fmr CEO · RiverMeadow",
        conversations: 5,
        range: "Nov 10 to Apr 15 · 156 days",
      },
      {
        id: "inv-price",
        tier: "investor",
        eyebrow: "INVESTOR · ACTIVE",
        name: "Scott Price",
        role: "President · Beacon Oral",
        conversations: 3,
        range: "Dec 20 to Apr 8 · 109 days",
      },
      {
        id: "inv-bizanalytica",
        tier: "investor",
        eyebrow: "INVESTOR · ACTIVE",
        name: "BizAnalytica",
        role: "Strategic Investor",
        conversations: 4,
        range: "Nov 25 to Apr 18 · 144 days",
      },
      {
        id: "inv-discovery-agg",
        tier: "investor",
        eyebrow: "INVESTOR · DISCOVERY",
        name: "2 more conversations",
        role: "Early stage · Unnamed",
        conversations: 2,
        range: "Jan to Apr · In motion",
        isAggregate: true,
      },
    ],
  },
  {
    num: "III",
    title: "Industry Advisory Board",
    meta: "11 Active · 3 Pending · 1 Upcoming",
    entries: [
      {
        id: "iab-trackman",
        tier: "advisory",
        eyebrow: "ADVISORY · ACTIVE",
        name: "TrackMan",
        role: "Technology Partner",
        conversations: 3,
        range: "Jan 5 to Apr 10 · 95 days",
      },
      {
        id: "iab-rob-engel",
        tier: "advisory",
        eyebrow: "ADVISORY · ACTIVE",
        name: "Rob Engel (IAB)",
        role: "Founding Member",
        conversations: 3,
        range: "Jan 22 to Apr 20 · 88 days",
      },
      {
        id: "iab-allhands",
        tier: "advisory",
        eyebrow: "ADVISORY · COLLECTIVE",
        name: "IAB · All-Hands",
        role: "Full Board Sessions",
        conversations: 3,
        range: "Jan 20 to Apr 23 · 93 days",
      },
      {
        id: "iab-pending-agg",
        tier: "advisory",
        eyebrow: "ADVISORY · PENDING",
        name: "3 pending IAB offers",
        role: "Outbound · Awaiting",
        conversations: 3,
        range: "Feb to Apr · Outreach",
        isAggregate: true,
      },
    ],
  },
  {
    num: "IV",
    title: "Legal Counsel",
    meta: "2 Relationships · 4 Meetings",
    entries: [
      {
        id: "legal-withrow",
        tier: "legal",
        eyebrow: "LEGAL · ACTIVE",
        name: "Kris Withrow",
        role: "Partner · Fenwick & West",
        conversations: 3,
        range: "Oct 25 to Apr 5 · 163 days",
      },
      {
        id: "legal-prather",
        tier: "legal",
        eyebrow: "LEGAL · NEW",
        name: "Edwin Prather",
        role: "GC · Alexander's Steakhouse",
        conversations: 1,
        range: "Apr 2 · Discovery",
      },
    ],
  },
  {
    num: "V",
    title: "Strategic Leadership",
    meta: "2 Incoming Executives · 5 Meetings",
    entries: [
      {
        id: "strat-newman",
        tier: "strategic",
        eyebrow: "STRATEGIC · LEADERSHIP",
        name: "Jeff Newman",
        role: "Incoming Chairman",
        conversations: 3,
        range: "Mar 5 to Apr 22 · 48 days",
      },
      {
        id: "strat-bobba",
        tier: "strategic",
        eyebrow: "STRATEGIC · LEADERSHIP",
        name: "Ramesh Bobba",
        role: "Incoming CTO",
        conversations: 2,
        range: "Feb 18 to Apr 20 · 61 days",
      },
    ],
  },
];

// ====================================================================
// Vault — document library
// Source: V4 vault/index.html, with Birdsong case study promoted per
// Chase delta (May 22, 2026): case study graphics move from Buzz → Vault.
// ====================================================================

export type VaultBadge = "PDF" | "DOC" | "PPTX";
export type VaultCategory =
  | "Intel"
  | "Governance"
  | "Brand"
  | "Case Study"
  | "Deck"
  | "Lead Copy";

export type VaultDocument = {
  id: string;
  badge: VaultBadge;
  title: string;
  category: VaultCategory;
  size: string; // "5 pages", "18 slides"
  date: string; // "Mar 2026"
  author: string;
  href?: string; // when undefined the row is a draft / not yet viewable
  isDraft?: boolean;
  isFeatured?: boolean; // Birdsong case study — promoted per Chase delta
};

export const vaultDocuments: ReadonlyArray<VaultDocument> = [
  {
    id: "birdsong-case-study",
    badge: "DOC",
    title: "Hayden Birdsong Case Study",
    category: "Case Study",
    size: "Draft",
    date: "Apr 2026",
    author: "Chase Spivey",
    isDraft: true,
    isFeatured: true,
  },
  {
    id: "deal-comparables",
    badge: "PDF",
    title: "Sports Tech Deal Comparables",
    category: "Intel",
    size: "5 pages",
    date: "Mar 2026",
    author: "Sheldon McClelland",
    href: "/vault/docs/Sports_Tech_Deal_Comparables.pdf",
  },
  {
    id: "iab-overview",
    badge: "PDF",
    title: "IAB Overview & Governance",
    category: "Governance",
    size: "3 pages",
    date: "Mar 2026",
    author: "Jeff Newman",
    href: "/vault/docs/IAB_Overview.pdf",
  },
  {
    id: "brand-guidelines",
    badge: "PDF",
    title: "Brand Guidelines v1.0",
    category: "Brand",
    size: "42 pages",
    date: "Jan 2026",
    author: "PERKK Studio",
    isDraft: true,
  },
  {
    id: "investor-deck",
    badge: "PPTX",
    title: "Investor Deck · Q1 2026",
    category: "Deck",
    size: "18 slides",
    date: "Apr 2026",
    author: "Baseline Team",
    href: "/vault/docs/Investor_Deck.pdf",
  },
  {
    id: "power-statement",
    badge: "DOC",
    title: "Power Statement · McClelland",
    category: "Lead Copy",
    size: "1 page",
    date: "Apr 2026",
    author: "Sheldon McClelland",
    isDraft: true,
  },
];

export const vaultStats = [
  { value: "6", label: "Documents on File", accent: true },
  { value: "3", label: "Released" },
  { value: "3", label: "In Draft" },
  { value: "Q2 2026", label: "Mar 24 to Apr 23", compact: true },
] as const;
