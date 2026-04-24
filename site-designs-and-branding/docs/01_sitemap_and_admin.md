# Baseline Analytics Stakeholder Portal — Facelift

**Prepared by:** GHD (Carissa Vale + Keirsten) · For Chase Spivey, Sheldon McClelland, Jeff Newman · Pitch date: 2026-04-24

---

## Scope

**Visual facelift only.** Information architecture, features, and content strategy are locked per client (Chase Spivey, meeting 2026-04-23). Live site at **baselinepulse.com** is the source of truth.

**NOT in scope:** Recent Buzz feed, Ask the Portal (AI chat), Document Vault, Deal Intel page, admin panels, authentication changes. These appear in an early handoff spec doc but Chase confirmed they are not what they want built.

---

## The Six Pages (stay exactly as-is, redesigned visually)

### 1. Overview (`/overview`)
- Dark hero with Baseline Analytics logo, "Investor Portal" eyebrow, tagline ("AI-powered injury detection for professional baseball"), 3-line product pitch, "Last updated" date, CTA buttons ("View Full Timeline" / "Meet the Team")
- "Recent Activity" section — left-gold-border cards for the 5–6 most recent meeting recaps
- "Your Investor Portal" section — icon links to other pages (Milestones, Annual Timetable, Advisory Board, Team, Timeline)

### 2. Milestones (`/milestones`)
- Vertical timeline of company milestones (date + status + title + description)
- Status states: **Completed** (green check, strikethrough title) · **In Progress** (yellow dot, active title)
- Examples live: Industry Advisory Board Established ✓ (Jan 2026), CTO Recruited ✓ (Feb 2026), Spring Training Validation ✓ (Feb 2026), Sign MLB Letter of Intent (in progress, Apr 2026), Expand Industry Advisory Board (in progress, Jun 2026)

### 3. Annual Timetable (`/catalyst`) — **the hero page to nail**
- Gantt-style visualization: each stakeholder/org as a row, dots for each meeting, horizontal line tracking the relationship over time
- Quarter bands across the top with milestone markers (Corporate Formation, IAB Established, Spring Training Validation, MLB LOI Initiated)
- Summary stats at bottom: 19 active relationships · 38 total meetings · 7 this month · Since Oct 2025
- **Client's stuck point:** they don't know how to make this pop. This is where we win the pitch.

### 4. Advisory Board (`/advisory-board`)
- Grid of **Active Members** with role subtitle (e.g., Rob Engel · SVP Software Engineering, MLB)
- **Pending Advisory Members** section — candidates who've been offered seats
- **Upcoming Advisory Offers** section — people we plan to approach

### 5. Team (`/team`)
- Executive Leadership cards: Chase Spivey (CEO / Co-Founder), Sheldon McClelland (COO / Co-Founder), Jeff Newman (Incoming Executive Chairman), Ramesh Bobba (Incoming CTO), John Mendez (Lead Developer)
- Single CTA: "View Industry Advisory Board →"

### 6. Timeline (`/timeline`)
- Month-by-month chronological meeting log
- Each month has a dark banner with theme label ("Corporate Formation," "Foundation & Product Architecture," etc.) and meeting count
- Meeting cards with date pill, category pill (Board Meeting / Advisory Board / Investor Update / Strategic Planning), title, attendee list, description, Read-more toggle
- Key Milestone callouts inline (yellow border, "KEY MILESTONE" eyebrow)

---

## Current Tech & Update Workflow (stays as-is)

- **Stack:** Next.js (App Router) on Vercel, Supabase (Postgres) for data, GT America Standard + GT America Mono fonts licensed and loaded
- **Auth:** login-gated; Chase controls stakeholder invites
- **Content updates:** Sheldon writes meeting minutes → Chase uses Claude to generate SQL → pastes into Supabase → site reflects immediately. Temporary workflow, not part of this scope, will be improved later.

---

## Audience & Tone

**Viewers:** MLB-world executives, former league presidents, attorneys, investors cutting $1M+ checks. Existing stakeholders include Rob Engel (MLB SVP Software Engineering), Kris Withrow (Fenwick & West Partner), Mark Shirman (former CEO RiverMeadow), Scott Price (Beacon Oral Specialists), Edwin Prather (General Counsel, Alexander's Steakhouse).

**Client direction for the look:** "infotainment-y," "pop," per Chairman Jeff Newman. Confident, sophisticated, premium. Not dashboard-y. Not startup-generic.

---

## Design Deliverables for the Pitch

Two visual directions, same six pages each, so the client can click through and pick (or merge):

### Direction A — "Editorial Dark"
Evolved from what's live. Keeps dark hero / light body hybrid. Elevates typography with Fraunces serif display headlines. Refines Recent Activity cards. Locks gold accent system. More polish, less risk.

### Direction B — "Premium Executive"
Bolder. All-dark throughout. Serif display headlines. Investor-letter feel. Higher contrast data viz. Riskier, bigger visual impact.

Per Keirsten in the 2026-04-23 call, client wants "a handful" to pick from. Two is the right number — enough choice without overwhelming.

---

## Pitch Narrative (suggested flow)

1. **What we learned** — we reviewed the live site, the brand kit, and the call notes. Scope is a visual facelift, not a rebuild. IA stays.
2. **Where we saw the biggest opportunity** — the Annual Timetable is the single most investor-compelling page and also the client's stuck point. That's where we're going to earn the most credit.
3. **Here are two directions** — show Direction A (Editorial Dark), show Direction B (Premium Executive). Both covering all 6 pages with real data. Click through both live.
4. **Recommend a path** — our pick + why. Invite them to pick differently or merge.
5. **Next steps** — once direction locked, we deliver final mockups via Markup.io → Chase's team hands to Keirsten/Carissa for build → delivered as a Next.js codebase that drops into their existing Vercel deployment.

---

## Open Questions to Park (not for tomorrow)

- Long-term update workflow (replace SQL-paste with admin UI or Sheet-based)
- Stakeholder permission tiers (IAB-only content, etc.)
- Domain — `baselinepulse.com` permanent, or eventual move to `portal.baselineanalytics.net`?
- Future scope: brand/web refresh for baselineanalytics.net main marketing site — Chase flagged as future interest
