# Baseline Analytics · Stakeholder Portal

Four interactive design directions for the Baseline Analytics Investor Portal, built April 2026 for Chase Spivey / Baseline Analytics.

## Structure

```
baselineanalytics/
├── source/                  Source HTML for each version
│   ├── v1-dark/             V1 · Dark       (editorial, top nav, gold on black)
│   ├── v2-light/            V2 · Light      (same layout, warm cream palette)
│   ├── v3-sidebar/          V3 · Sidebar    (enterprise-tool feel, left nav)
│   └── v4-dark-motion/      V4 · Dark Motion (V1 + animated counters, ACIS wireframe, hero video, thumbnails, avatars)
├── brand_source/            GT America fonts + baseball_impact.mp4 + brand assets
├── deploys/                 Ready-to-upload Netlify zips (include root index.html redirect)
│   ├── v1-dark.zip
│   ├── v2-light.zip
│   ├── v3-sidebar.zip
│   └── v4-dark-motion.zip
├── scripts/                 Build helpers (Python)
│   ├── swap_light.py        Regenerates v2-light from v4-dark-motion via color/rgba swaps
│   ├── build_v3.py          Generates v3-sidebar pages from per-page content + shared chrome
│   ├── inject_graphics.py   Adds stat counters + brand dividers to dark pages
│   └── reorder_nav.py       Updates top-nav order across all pages
├── docs/                    Planning + reference material
└── reference/               Source docs + video frames from client
```

## Live review links

- **V1 Dark**        https://baselinedark.netlify.app/artifacts/login/
- **V2 Light**       https://baselinelight.netlify.app/artifacts/login/
- **V3 Sidebar**     https://baselinesidebar.netlify.app/
- **V4 Dark Motion** https://baselineinteractivev4.netlify.app/artifacts/login/

Client comments: markup.io invite.

## Previewing locally

```bash
cd baselineanalytics
python3 -m http.server 8000
# then open:
#   http://localhost:8000/source/v1-dark/login/
#   http://localhost:8000/source/v2-light/login/
#   http://localhost:8000/source/v3-sidebar/overview/
#   http://localhost:8000/source/v4-dark-motion/login/
```

Font and video paths are relative (`../../brand_source/...`) so the server must be rooted at the `baselineanalytics/` level for assets to resolve. (Each version's internal links use the same relative paths as the Netlify deploys.)

## Versions · what differs

| | V1 Dark | V2 Light | V3 Sidebar | V4 Dark Motion |
|---|---|---|---|---|
| Palette       | Gold on black | Cream / dark text | Gold on black | Gold on black |
| Nav           | Top nav       | Top nav           | Left sidebar  | Top nav |
| Fonts         | GT America    | GT America        | GT America    | GT America |
| Motion        | Fade-ins      | Fade-ins          | Fade-ins      | + animated stat counters, pulsing ACIS markers, hero video on every page |
| Graphics      | Video on Overview/Mission only | Same as V1 | None extra | + ACIS biomechanical wireframe on Deal Intel, Buzz category thumbnails, Advisor initial avatars |
| Content       | Shared across all four: Jeff's Recent Buzz framework, Executive Team with portal roles, 11-member IAB, H1 milestones, meetings cycle + annual timetable |

## Content alignment

All four versions share the same content spine, locked against the Jan 2026 handoff spec:

- **Recent Buzz** · 30-day cycle, 6 categorized items (CASE STUDY / LEADERSHIP / MARKET INTEL / GOVERNANCE / BRAND / PARTNERSHIP) with pinned-first, reset-on-cycle-end framing
- **Team** · 5 exec seats with portal-role chips for the 3 key stakeholders (Chase · Portal Champion, Sheldon · Portal Positioning, Jeff · Portal Architect)
- **Advisory** · 11 active / 2 pending / 1 upcoming with composition breakdown
- **Milestones** · H1 2026 ladder with hover tooltips on each of 5 steps
- **Meetings** · Month view (Cycle 04) + Year Timeline (Oct 2025 to Apr 2026 gantt with hoverable tick marks) + Roster view
- **Deal Intel** · Deal comparables matrix, annual-rate bar chart (V4 adds ACIS biomechanical wireframe)
- **Vault** · 6 documents, category filters
- **About This Portal** · Purpose + 4 core objectives (Overview page)

## Known limitations

- **Mobile is not optimized** in any version. Desktop / laptop only until a direction is locked.
- V1 Dark is frozen at its pre-graphics state and is preserved primarily as a baseline (pun tolerated). V4 Dark Motion is the active dark direction.
