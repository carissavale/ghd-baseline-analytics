# Baseline Portal — Design Decisions Log

Decisions confirmed during the v4 refinement pass after the 2026-05-18 client review. These resolve the open questions that were blocking the Next.js build.

## 2026-05-20

### Vault — document click behavior
**Decision:** Native PDF. Each doc tile is a direct link to a PDF file that opens in a new tab using the browser's built-in viewer.

**Reasoning:** Easiest for the client to manage — uploading a PDF to Supabase storage and linking it doesn't require any custom viewer, modal logic, or PDF.js dependency. Investors are already accustomed to PDF behavior. Drafts get a `#` placeholder href until the document is finalized.

**Implementation:** Already in place in `vault/index.html`. `.doc-row` is an `<a>` tag with `href="docs/<filename>.pdf"` and `target="_blank"`. Hover state: gold-mid border, `translateX(2px)`, gold title color. Three real PDFs live in `vault/docs/`.

### Overview — hero "North Star" message
**Decision:** Single editable slot, not cycling messages.

**Reasoning:** Chase mentioned in the meeting that Jeff Newman will likely want to change the message frequently. Supporting one editable headline (rather than a queue of rotating ones) makes the admin flow simple — Sheldon edits one Supabase field, updates land immediately. No carousel logic, no animation orchestration across multiple strings.

**Implementation:** `overview/index.html` hero headline marked with `data-cms-field="hero_headline"` and the kicker with `data-cms-field="hero_kicker"`. Comment notes the Supabase binding (`portal_settings.hero_headline`). The line-break animation pattern is preserved.

### Scope — which pages stay in v4
**Decision:** Keep all 14 pages.

**Reasoning:** Chase walked through every page in the 2026-05-18 review and approved each one. The earlier doc that listed only 6 "in-scope" pages was outdated. Real list:
1. Overview
2. Mission
3. Deal Intel
4. Milestones
5. Market Context
6. Annual Timetable
7. Meetings
8. Timeline
9. Advisory Board
10. Team
11. Vault
12. Buzz
13. Ask the Portal
14. Login

**Implementation:** No deletions. All 14 page folders remain in `source/v4-dark-motion/`.

---

## Carried-forward items (resolved earlier)

- **Typography:** Manrope (Google Fonts, weights 300/400/500/600/700/800) for body and display. GT America stays in the brand wordmark/logo only. Per page 26 of brand guidelines.
- **Category color palette:** Investor = Gold (#FFC655), Advisory = Mint (#6CBF8F), Strategic = Sky (#6CA8E5), Board/Legal = Lavender (#C49BE5). Defined as `--cat-investor` / `--cat-advisory` / `--cat-strategy` / `--cat-board` CSS vars.
- **Auth:** Email-based password reset. Chase is sole admin who provisions logins. No self-signup.
- **Mobile:** Annual Timetable roster view is desktop/iPad only. Other pages need a mobile pass during the build.

## 2026-05-20 (later)

### Permission tiers
**Decision:** Single-tier viewer access. Chase and Sheldon are admins (can edit content via Supabase / admin actions). Everyone else (investors, IAB members, advisors, legal) sees the same set of pages with the same data — no per-page gating, no IAB-only content, no investor-only sections.

**Reasoning:** Keeps the build dramatically simpler — no permission middleware on every route, no conditional rendering based on role. Reflects the small organization reality (~20 stakeholders, all of whom need the same information for context). Can be added later if needed.

**Implementation:** Two roles in the user table — `admin` (Chase, Sheldon) and `viewer` (everyone else). Admin gate exists only on edit/write operations, not on read.

### Domain
**Decision:** baselinepulse.com is permanent. No move to portal.baselineanalytics.net.

**Implementation:** No DNS changes needed. Auth callbacks, redirects, share links all target baselinepulse.com.

### Market Context page
**Decision:** Parked. The Deal Comparison Matrix on Deal Intel already covers the same comp set ($6B+ aggregate, 7 league-wide deals, ACIS target band).

**Implementation:** Folder moved from `source/v4-dark-motion/market_context/` to `source/_parked/market_context/`. v4 is now 13 pages. The "Six billion dollars has already been spent" framing can move into the Deal Intel masthead if Chase wants to keep that punch line.

### Mission page top nav
**Decision:** Stays nav-free. Mission is a cinematic landing page, intentionally separate from the portal navigation chrome.

**Implementation:** No top nav added to `mission/index.html`. Accessed via direct link or as a pre-dashboard landing experience.

## Outstanding (parked, not blocking build)

- Real logo files for meeting cards + recent activity — Chase's team is sourcing
- Buzz case-study graphic direction — needs creative concept
- Long-term content update workflow (replace Supabase SQL-paste with admin UI) — Carissa researching
