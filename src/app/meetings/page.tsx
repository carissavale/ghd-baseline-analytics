"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/app/_components/TopNav";
import { Masthead } from "@/app/_components/Masthead";
import { BottomFooter } from "@/app/_components/BottomFooter";
import {
  cycleSummary,
  recentMeetings,
  rosterSections,
  shortDate,
  weeklyDistribution,
  yearMonths,
} from "@/lib/mock-data";
import type { MeetingCategory } from "@/lib/types";
import { MEETING_CATEGORY_LABELS } from "@/lib/types";
import { YearGanttSvg } from "./YearGanttSvg";
import { MeetingTooltip } from "./MeetingTooltip";

// /meetings — Hybrid layout per Chase delta (May 22, 2026):
//   • Rolling summary + Vault CTA banner ABOVE the call log (Month view only)
//   • Call log = the existing 8-card meeting grid (filterable)
//   • Year view = monthly summary + Annual Timetable (Timeline | Roster)
//
// Client component end-to-end so the toggle state directly drives what gets
// rendered. No CSS-attribute trick — the previous version's data-attribute
// approach didn't toggle reliably across hydration.

const TOTAL_YEAR_MEETINGS = yearMonths.reduce((s, m) => s + m.count, 0);

type FilterKey = MeetingCategory | "all";

const FILTER_CHIPS: ReadonlyArray<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "investor", label: "Investor" },
  { key: "advisory", label: "Advisory" },
  { key: "strategy", label: "Strategy" },
  { key: "board", label: "Board" },
];

export default function MeetingsPage() {
  const [view, setView] = useState<"month" | "year">("month");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [yearSub, setYearSub] = useState<"timeline" | "roster">("timeline");

  // Honor #year hash from /overview "View the Timeline" CTA on first load.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#year") {
      setView("year");
    }
  }, []);

  const filterCounts = useMemo(() => {
    const counts: Record<FilterKey, number> = {
      all: recentMeetings.length,
      investor: 0,
      advisory: 0,
      strategy: 0,
      board: 0,
    };
    for (const m of recentMeetings) {
      counts[m.category] += 1;
    }
    return counts;
  }, []);

  const visibleMeetings =
    filter === "all"
      ? recentMeetings
      : recentMeetings.filter((m) => m.category === filter);

  const heroCount = view === "month" ? recentMeetings.length : TOTAL_YEAR_MEETINGS;
  const heroKicker =
    view === "month"
      ? "Month Timeline · Q2 2026"
      : "Year Timeline · Oct 2025 to Apr 2026";

  return (
    <>
      <TopNav active="meetings" />

      <div className="page">
        <Masthead
          dateline="Investor Portal · 23 April 2026"
          pub="Baseline Analytics · Stakeholder Brief 03"
          edition="Meetings"
          cycle={`Cycle · ${cycleSummary.cycle}`}
        />

        {/* Hero + view toggle masthead */}
        <div className="meetings-masthead fade" style={{ animationDelay: "0.1s" }}>
          <div className="hero-left">
            <div className="hero-kicker">{heroKicker}</div>
            <h1 className="hero-headline">
              <span className="count">{heroCount}</span>
              <span>
                Meetings<span className="dot">.</span>
              </span>
            </h1>
          </div>

          <div className="mini-chart-wrap" aria-hidden="true">
            <div className="mini-chart">
              {weeklyDistribution.map((wk) => (
                <div className="mini-week" key={wk.week}>
                  <div className="mini-bars">
                    {wk.bars.map((b, i) => (
                      <div
                        key={i}
                        className={`mini-bar${b.tone ? ` ${b.tone}` : ""}`}
                        style={{ height: `${b.h}px` }}
                      />
                    ))}
                  </div>
                  <div className="mini-week-label">{wk.week}</div>
                </div>
              ))}
            </div>
            <div className="mini-chart-caption">
              Weekly Distribution · <em>{cycleSummary.cycleLabel}</em>
            </div>
          </div>

          <div className="view-toggle">
            <button
              type="button"
              className={view === "month" ? "active" : undefined}
              onClick={() => setView("month")}
            >
              Month Timeline
            </button>
            <button
              type="button"
              className={view === "year" ? "active" : undefined}
              onClick={() => setView("year")}
            >
              Year Timeline
            </button>
          </div>

          {view === "month" && (
            <div className="filter-row">
              {FILTER_CHIPS.map((chip) => {
                const count = filterCounts[chip.key];
                if (count === 0 && chip.key !== "all") return null;
                return (
                  <button
                    key={chip.key}
                    type="button"
                    className={`filter-chip${filter === chip.key ? " active" : ""}`}
                    onClick={() => setFilter(chip.key)}
                  >
                    {chip.label} <span className="count-pill">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* MONTH VIEW                                                   */}
        {/* ============================================================ */}
        {view === "month" && (
          <>
            {/* HYBRID DELTA — rolling summary + Vault CTA */}
            <div className="hybrid-wrap fade" style={{ animationDelay: "0.34s" }}>
              <div className="hybrid-left">
                <div className="hybrid-eyebrow">
                  Rolling Summary · {cycleSummary.cycleLabel}
                </div>
                <h2 className="hybrid-title">{cycleSummary.closedTitle}</h2>
                <p className="hybrid-body">{cycleSummary.closedBody}</p>
              </div>
              <div className="hybrid-right">
                <Link href="/vault" className="vault-cta">
                  Open Vault <span>→</span>
                </Link>
                <div className="vault-cta-sub">
                  Cycle materials, decks, and case studies — all dated and
                  attributed.
                </div>
              </div>
            </div>

            {/* Call log */}
            <div
              className="meetings-grid fade"
              style={{ animationDelay: "0.4s" }}
            >
              {visibleMeetings.map((m) => (
                <article key={m.id} className="mtg-card">
                  <div className="mtg-head">
                    <span className={`mtg-pill ${m.category}`}>
                      {MEETING_CATEGORY_LABELS[m.category]}
                    </span>
                    <span className="mtg-date">{shortDate(m.meeting_date)}</span>
                  </div>
                  <div className="mtg-title">{m.title}</div>
                  <div className="mtg-body">{m.summary}</div>
                  <div className="mtg-footer">
                    <div className="mtg-avatar">
                      {m.organization_initial ?? "·"}
                    </div>
                    <div className="mtg-org">{m.organization_name}</div>
                  </div>
                </article>
              ))}
              {visibleMeetings.length === 0 && (
                <div className="meetings-empty">
                  No meetings match the {filter} filter this cycle.
                </div>
              )}
            </div>
          </>
        )}

        {/* ============================================================ */}
        {/* YEAR VIEW                                                    */}
        {/* ============================================================ */}
        {view === "year" && (
          <>
            <div className="year-summary">
              <div className="year-title">
                <span>Year in Meetings · Oct 2025 to Apr 2026</span>
                <span className="total">
                  {TOTAL_YEAR_MEETINGS} total · {yearMonths.length} months
                </span>
              </div>

              <div className="year-months">
                {yearMonths.map((m) => (
                  <div
                    key={m.label}
                    className={`year-month${m.current ? " current" : ""}`}
                  >
                    <div className="year-month-label">{m.label}</div>
                    <div className="year-month-count">{m.count}</div>
                    <div className="year-month-bar">
                      <div
                        className="year-month-bar-fill"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                    <div className="year-month-meta">{m.meta}</div>
                  </div>
                ))}
              </div>

              <div className="year-legend">
                <div className="year-legend-item">
                  <span className="box investor" />
                  Investor
                </div>
                <div className="year-legend-item">
                  <span className="box advisory" />
                  Advisory
                </div>
                <div className="year-legend-item">
                  <span className="box strategy" />
                  Strategy
                </div>
              </div>
            </div>

            {/* Annual Timetable: Gantt + Roster sub-toggle */}
            <div className="chart-wrap">
              <div className="chart-toolbar">
                <span className="section-num">03</span>
                <span className="chart-title">The Annual Timetable</span>
                <div className="legend">
                  <span className="legend-item">
                    <span className="legend-bar" style={{ background: "var(--gold)" }} />
                    MLB / Investor
                  </span>
                  <span className="legend-item">
                    <span className="legend-bar" style={{ background: "var(--mercury)" }} />
                    Advisory
                  </span>
                  <span className="legend-item">
                    <span className="legend-bar" style={{ background: "var(--gold-mid)" }} />
                    Strategic
                  </span>
                  <span className="legend-item">
                    <span className="legend-bar" style={{ background: "var(--gold-deep)" }} />
                    Legal
                  </span>
                </div>
              </div>

              <div className="year-sub-toggle">
                <button
                  type="button"
                  className={yearSub === "timeline" ? "active" : undefined}
                  onClick={() => setYearSub("timeline")}
                >
                  Timeline
                </button>
                <button
                  type="button"
                  className={yearSub === "roster" ? "active" : undefined}
                  onClick={() => setYearSub("roster")}
                >
                  Roster
                </button>
              </div>

              {yearSub === "timeline" && (
                <div className="year-sub-content">
                  <YearGanttSvg />
                  <MeetingTooltip />
                  <div className="footnote">
                    <span>
                      Each bar marks the active arc of a relationship. Each
                      tick marks a conversation.
                    </span>
                    <span>Source · Baseline Portal · n = 19</span>
                  </div>
                </div>
              )}

              {yearSub === "roster" && (
                <div className="year-sub-content roster">
                  {rosterSections.map((sec) => (
                    <div key={sec.num} className="roster-section">
                      <div className="roster-section-head">
                        <span className="roster-section-num">{sec.num}</span>
                        <span className="roster-section-title">{sec.title}</span>
                        <span className="roster-section-meta">{sec.meta}</span>
                      </div>
                      <div className="roster-grid">
                        {sec.entries.map((e) => (
                          <div
                            key={e.id}
                            className={`tomb ${e.tier}${e.isAggregate ? " aggregate" : ""}`}
                          >
                            <div className="tomb-eyebrow">{e.eyebrow}</div>
                            <div className="tomb-name">{e.name}</div>
                            <div className="tomb-role">{e.role}</div>
                            <div className="tomb-count">
                              <span className="num">{e.conversations}</span>
                              <span className="label">
                                {e.conversations === 1
                                  ? "Conversation"
                                  : sec.title === "Industry Advisory Board" &&
                                      e.name === "IAB · All-Hands"
                                    ? "Sessions"
                                    : sec.title === "Industry Advisory Board" &&
                                        e.isAggregate
                                      ? "Offers"
                                      : "Conversations"}
                              </span>
                            </div>
                            <div className="tomb-range">{e.range}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <BottomFooter brief="Baseline Analytics · Investor Portal · 03 · Meetings" />
      </div>

      <style>{`
        .page { max-width: 1480px; margin: 0 auto; padding: 56px 60px 120px; }

        /* Masthead grid */
        .meetings-masthead {
          display: grid;
          grid-template-columns: 1fr auto;
          column-gap: 40px;
          align-items: start;
        }
        .meetings-masthead .hero-left { grid-column: 1; grid-row: 1; }
        .meetings-masthead .view-toggle { grid-column: 1; grid-row: 2; margin-top: 28px; }
        .meetings-masthead .filter-row { grid-column: 1; grid-row: 3; margin-top: 32px; margin-bottom: 32px; }
        .meetings-masthead .mini-chart-wrap {
          grid-column: 2; grid-row: 1 / span 3;
          align-self: end; justify-self: end;
          display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
          min-width: 240px; padding-bottom: 32px;
        }

        .hero-kicker {
          font-size: 13px; letter-spacing: 0.28em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 18px;
        }
        .hero-headline {
          font-size: 84px; font-weight: 400; line-height: 1;
          letter-spacing: -0.04em; color: var(--mercury);
          display: flex; align-items: baseline; gap: 18px;
        }
        .hero-headline .count {
          color: var(--gold); font-weight: 400;
          font-variant-numeric: tabular-nums;
        }
        .hero-headline .dot { color: var(--gold); }

        /* Mini chart */
        .mini-chart { display: flex; align-items: flex-end; gap: 16px; padding-bottom: 8px; }
        .mini-week { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .mini-bars { display: flex; align-items: flex-end; gap: 3px; height: 48px; }
        .mini-bar { width: 9px; min-height: 3px; background: var(--gold); }
        .mini-bar.mid { background: var(--gold-mid); }
        .mini-bar.deep { background: var(--gold-deep); }
        .mini-week-label {
          font-size: 11px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .mini-chart-caption {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--gold-mid); text-transform: uppercase;
          padding-top: 10px; border-top: 1px solid rgba(229,229,229,0.14);
          align-self: stretch; text-align: right;
        }
        .mini-chart-caption em { color: var(--mercury-dim); font-style: normal; }

        /* View toggle */
        .view-toggle {
          display: inline-flex; padding: 4px;
          background: rgba(18,18,17,0.8); border: 1px solid var(--hairline-2);
          width: max-content;
        }
        .view-toggle button {
          padding: 10px 22px; background: transparent; border: none;
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--mercury-dim); text-transform: uppercase;
          font-weight: 500; cursor: pointer; transition: all 0.2s;
        }
        .view-toggle button.active { background: var(--gold); color: var(--black); }
        .view-toggle button:hover:not(.active) { color: var(--mercury); }

        /* Filter chips */
        .filter-row {
          display: flex; align-items: center; gap: 10px;
          padding-bottom: 20px; border-bottom: 1px solid var(--hairline-2);
          flex-wrap: wrap;
        }
        .filter-chip {
          padding: 10px 16px; background: transparent;
          border: 1px solid var(--hairline-2); color: var(--mercury-dim);
          font-size: 12px; letter-spacing: 0.22em;
          text-transform: uppercase; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .filter-chip:hover { border-color: var(--gold-mid); color: var(--mercury); }
        .filter-chip.active { border-color: var(--gold); color: var(--gold); background: rgba(255,198,85,0.06); }
        .filter-chip .count-pill {
          padding: 1px 7px; background: rgba(229,229,229,0.08);
          color: var(--mercury-dim); font-weight: 400; min-width: 20px; text-align: center;
        }
        .filter-chip.active .count-pill { background: rgba(255,198,85,0.2); color: var(--gold); }

        /* HYBRID delta — rolling summary + Vault CTA */
        .hybrid-wrap {
          display: grid; grid-template-columns: 1.4fr 1fr; gap: 36px;
          background: rgba(18,18,17,0.7); border: 1px solid var(--gold-mid);
          padding: 32px 36px; margin-bottom: 40px; position: relative;
          align-items: center;
        }
        .hybrid-wrap::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--gold);
        }
        .hybrid-eyebrow {
          font-size: 12px; letter-spacing: 0.24em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 12px;
        }
        .hybrid-title {
          font-size: 22px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.015em; line-height: 1.25; margin-bottom: 14px;
        }
        .hybrid-body {
          font-size: 15px; line-height: 1.6; color: var(--mercury-dim);
          font-weight: 400;
        }
        .hybrid-right { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
        .vault-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: var(--black);
          padding: 16px 26px; border: 1px solid var(--gold);
          font-size: 13px; letter-spacing: 0.24em; text-transform: uppercase;
          font-weight: 500; cursor: pointer; transition: all 0.2s;
          text-decoration: none;
        }
        .vault-cta:hover {
          background: #ffd37a; border-color: #ffd37a; transform: translateY(-1px);
        }
        .vault-cta span { transition: transform 0.2s; }
        .vault-cta:hover span { transform: translateX(4px); }
        .vault-cta-sub {
          font-size: 12px; letter-spacing: 0.16em;
          color: var(--mercury-faint); text-transform: uppercase;
          max-width: 220px; line-height: 1.5;
        }

        /* Meeting cards (call log) */
        .meetings-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          margin-bottom: 40px;
        }
        .meetings-empty {
          grid-column: 1 / -1;
          padding: 48px 28px; text-align: center;
          font-size: 14px; letter-spacing: 0.16em;
          color: var(--mercury-faint); text-transform: uppercase;
          border: 1px dashed var(--hairline-2);
        }
        .mtg-card {
          background: rgba(18,18,17,0.6); border: 1px solid var(--hairline-2);
          padding: 28px 28px 24px; display: flex; flex-direction: column;
          min-height: 260px; transition: all 0.2s; cursor: pointer;
        }
        .mtg-card:hover { border-color: var(--gold-mid); background: rgba(18,18,17,0.9); transform: translateY(-2px); }
        .mtg-head {
          display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px;
        }
        .mtg-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 11px; border: 1px solid;
          font-size: 11.5px; letter-spacing: 0.22em;
          text-transform: uppercase; font-weight: 500;
        }
        .mtg-pill::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: currentColor;
        }
        .mtg-pill.investor { color: var(--cat-investor); border-color: var(--cat-investor); background: rgba(255,198,85,0.08); }
        .mtg-pill.advisory { color: var(--cat-advisory); border-color: var(--cat-advisory); background: rgba(108,191,143,0.10); }
        .mtg-pill.strategy { color: var(--cat-strategy); border-color: var(--cat-strategy); background: rgba(108,168,229,0.10); }
        .mtg-pill.board    { color: var(--cat-board);    border-color: var(--cat-board);    background: rgba(196,155,229,0.10); }

        .mtg-date {
          font-size: 13px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .mtg-title {
          font-size: 19px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.01em; line-height: 1.25; margin-bottom: 12px;
        }
        .mtg-card:hover .mtg-title { color: var(--gold); }
        .mtg-body {
          font-size: 15px; line-height: 1.6; color: var(--mercury-dim);
          font-weight: 400; flex: 1; margin-bottom: 18px;
        }
        .mtg-footer {
          display: flex; align-items: center; gap: 10px;
          padding-top: 14px; border-top: 1px solid var(--hairline);
        }
        .mtg-avatar {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--mercury); border: 1px solid var(--hairline-2);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: var(--black); font-weight: 700;
          letter-spacing: 0.02em; flex-shrink: 0;
        }
        .mtg-org {
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-dim); text-transform: uppercase;
        }

        /* YEAR view — summary grid */
        .year-summary {
          background: rgba(18,18,17,0.6); border: 1px solid var(--hairline-2);
          padding: 32px 40px; margin-bottom: 32px;
        }
        .year-title {
          font-size: 13px; letter-spacing: 0.26em;
          color: var(--gold); text-transform: uppercase;
          margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--hairline-2);
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .year-title .total { font-size: 16px; color: var(--mercury); letter-spacing: 0.1em; font-weight: 500; }

        .year-months {
          display: grid; grid-template-columns: repeat(7, 1fr); gap: 14px;
          margin-bottom: 24px;
        }
        .year-month {
          padding: 18px 14px; border: 1px solid var(--hairline-2);
          background: rgba(0,0,0,0.4); cursor: pointer; transition: all 0.2s;
          text-align: center;
        }
        .year-month:hover { border-color: var(--gold-mid); background: rgba(18,18,17,0.9); }
        .year-month.current { border-color: var(--gold); background: rgba(255,198,85,0.06); }
        .year-month-label {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--mercury-dim); text-transform: uppercase; margin-bottom: 14px;
        }
        .year-month.current .year-month-label { color: var(--gold); }
        .year-month-count {
          font-size: 32px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }
        .year-month.current .year-month-count { color: var(--gold); }
        .year-month-bar {
          height: 4px; background: rgba(229,229,229,0.08); margin-bottom: 10px;
          position: relative; overflow: hidden;
        }
        .year-month-bar-fill { height: 100%; background: var(--gold-mid); }
        .year-month.current .year-month-bar-fill { background: var(--gold); }
        .year-month-meta {
          font-size: 11px; letter-spacing: 0.14em;
          color: var(--mercury-faint); text-transform: uppercase;
        }

        .year-legend {
          display: flex; gap: 24px; justify-content: center; align-items: center;
          padding-top: 20px; border-top: 1px solid var(--hairline);
        }
        .year-legend-item {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .year-legend-item .box { width: 12px; height: 12px; }
        .year-legend-item .box.investor { background: var(--gold); }
        .year-legend-item .box.advisory { background: var(--mercury); }
        .year-legend-item .box.strategy { background: var(--gold-mid); }

        /* Annual timetable toolbar */
        .chart-wrap { margin-top: 24px; }
        .chart-toolbar {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: 16px; border-bottom: 1px solid var(--hairline-2);
        }
        .chart-toolbar .section-num {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--gold-mid); text-transform: uppercase;
        }
        .chart-toolbar .chart-title {
          font-size: 22px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.01em; flex: 1; padding-left: 24px;
        }
        .chart-toolbar .legend {
          display: flex; gap: 20px;
          font-size: 11.5px; letter-spacing: 0.18em;
          color: var(--mercury-dim); text-transform: uppercase;
        }
        .legend-item { display: flex; align-items: center; gap: 8px; }
        .legend-bar { width: 14px; height: 3px; }

        .year-sub-toggle {
          display: inline-flex; border: 1px solid var(--hairline-2); background: var(--onyx);
          width: max-content; margin: 16px 0 0;
        }
        .year-sub-toggle button {
          background: transparent; border: none; color: var(--mercury-dim);
          padding: 10px 22px; font-size: 12px; letter-spacing: 0.22em;
          text-transform: uppercase; cursor: pointer; transition: all 0.2s ease;
          font-weight: 500;
        }
        .year-sub-toggle button:hover { color: var(--mercury); }
        .year-sub-toggle button.active { background: var(--gold); color: var(--black); }

        .year-sub-content { padding: 8px 0 0; }
        .year-sub-content.roster { padding: 32px 0 0; }

        svg.timetable {
          display: block; width: 100%; height: auto;
          margin-top: 20px; background: transparent;
        }
        .meeting-tick { cursor: pointer; transition: all 0.15s ease; }
        svg .meeting-tick:hover { filter: brightness(1.4); }
        .footnote {
          display: flex; justify-content: space-between; padding: 16px 0 0;
          font-size: 12px; letter-spacing: 0.18em;
          color: rgba(229,229,229,0.45); text-transform: uppercase;
        }

        /* Roster tombstones */
        .roster-section { margin-bottom: 40px; }
        .roster-section-head {
          display: flex; align-items: baseline; gap: 16px;
          padding-bottom: 12px; margin-bottom: 20px;
          border-bottom: 1px solid var(--hairline);
        }
        .roster-section-num {
          font-size: 12px; letter-spacing: 0.24em;
          color: var(--gold-mid); text-transform: uppercase;
        }
        .roster-section-title {
          font-size: 16px; font-weight: 500; color: var(--mercury); letter-spacing: -0.005em;
        }
        .roster-section-meta {
          margin-left: auto; font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .roster-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .tomb {
          position: relative; background: rgba(18,18,17,0.9);
          border: 1px solid rgba(229,229,229,0.32);
          padding: 22px 20px 20px;
          min-height: 180px; display: flex; flex-direction: column;
        }
        .tomb.mlb { border-color: var(--gold); background: rgba(255,198,85,0.06); }
        .tomb.aggregate {
          border-style: dashed; border-color: rgba(229,229,229,0.22);
          background: rgba(18,18,17,0.5);
        }
        .tomb::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: rgba(229,229,229,0.45);
        }
        .tomb.mlb::before, .tomb.investor::before { background: var(--gold); }
        .tomb.advisory::before { background: var(--mercury); }
        .tomb.legal::before { background: var(--gold-deep); }
        .tomb.strategic::before { background: var(--gold-mid); }
        .tomb-eyebrow {
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--gold-mid); text-transform: uppercase; margin-bottom: 12px;
        }
        .tomb.mlb .tomb-eyebrow { color: var(--gold); }
        .tomb-name {
          font-size: 16px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.01em; line-height: 1.2; margin-bottom: 4px;
        }
        .tomb.mlb .tomb-name { color: var(--gold); }
        .tomb-role {
          font-size: 11px; letter-spacing: 0.14em;
          color: var(--mercury-faint); text-transform: uppercase;
          line-height: 1.4; margin-bottom: 16px;
        }
        .tomb-count {
          display: flex; align-items: baseline; gap: 8px;
          margin-top: auto; margin-bottom: 10px;
        }
        .tomb-count .num {
          font-size: 32px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.02em; line-height: 1;
        }
        .tomb.mlb .tomb-count .num { color: var(--gold); }
        .tomb.aggregate .tomb-count .num { color: var(--mercury-dim); }
        .tomb-count .label {
          font-size: 11px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .tomb-range {
          font-size: 11px; letter-spacing: 0.14em;
          color: var(--mercury-faint); text-transform: uppercase;
          padding-top: 10px; border-top: 1px solid var(--hairline);
        }
        .tomb.mlb .tomb-range {
          color: rgba(255,198,85,0.55);
          border-top-color: rgba(255,198,85,0.2);
        }

        @media (max-width: 1100px) {
          .hybrid-wrap { grid-template-columns: 1fr; }
          .meetings-grid { grid-template-columns: repeat(2, 1fr); }
          .roster-grid { grid-template-columns: repeat(2, 1fr); }
          .year-months { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </>
  );
}
