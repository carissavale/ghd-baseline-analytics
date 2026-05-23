"use client";

import { useMemo, useState } from "react";
import { TopNav } from "@/app/_components/TopNav";
import { Masthead } from "@/app/_components/Masthead";
import { SectionHeading } from "@/app/_components/SectionHeading";
import { StatLine } from "@/app/_components/StatLine";
import { AskCompact } from "@/app/_components/AskCompact";
import { Caption } from "@/app/_components/Caption";
import { BottomFooter } from "@/app/_components/BottomFooter";
import {
  vaultDocuments,
  vaultStats,
  type VaultCategory,
} from "@/lib/mock-data";

// /vault — Document library.
//
// Chase delta (May 22, 2026): the Birdsong case study moves from Buzz to here.
// V4 already listed it as a Vault row; the delta promotes it to a featured
// card above the standard list so the case-study positioning is preserved
// after the Buzz page is removed from the portal.

const CATEGORY_CHIPS: ReadonlyArray<{ label: "All" | VaultCategory }> = [
  { label: "All" },
  { label: "Intel" },
  { label: "Governance" },
  { label: "Brand" },
  { label: "Case Study" },
  { label: "Deck" },
  { label: "Lead Copy" },
];

export default function VaultPage() {
  const [activeCat, setActiveCat] = useState<"All" | VaultCategory>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: vaultDocuments.length };
    for (const d of vaultDocuments) {
      c[d.category] = (c[d.category] ?? 0) + 1;
    }
    return c;
  }, []);

  const featured = vaultDocuments.find((d) => d.isFeatured);
  const standardDocs = vaultDocuments.filter((d) => !d.isFeatured);

  const visibleDocs =
    activeCat === "All"
      ? standardDocs
      : standardDocs.filter((d) => d.category === activeCat);

  const featuredVisible =
    featured &&
    (activeCat === "All" || activeCat === "Case Study");

  return (
    <>
      <TopNav active="vault" />

      <div className="page">
        <Masthead
          dateline="Investor Portal · 23 April 2026"
          pub="Baseline Analytics · Stakeholder Brief 09"
          edition="Vault"
          cycle="Document Library · Q2 2026"
        />

        {/* Hero */}
        <div className="hero-kicker fade" style={{ animationDelay: "0.1s" }}>
          Document Vault
        </div>
        <h1 className="hero-headline">
          <span className="line">
            <span>
              Materials<span className="em">.</span>
            </span>
          </span>
        </h1>

        <p className="standfirst fade" style={{ animationDelay: "0.3s" }}>
          The full cycle&apos;s working materials, organized by category.{" "}
          <em>Intel, governance, brand, case study, deck, and lead copy.</em>{" "}
          All dated, attributed, and linked.
        </p>

        <AskCompact animationDelay="0.33s" />

        <StatLine stats={vaultStats} />

        {/* Featured case study (Chase delta — promoted from former Buzz page) */}
        {featuredVisible && featured && (
          <div
            className="featured-case fade"
            style={{ animationDelay: "0.38s" }}
          >
            <div className="featured-left">
              <div className="featured-pill">
                <span className="dot" />
                Case Study · Featured
              </div>
              <h2 className="featured-title">{featured.title}.</h2>
              <p className="featured-body">
                Deep-dive on SF Giants pitcher Hayden Birdsong&apos;s
                biomechanical markers through the ACIS lens.{" "}
                <strong>
                  Cornerstone proof-of-concept for investor conversations
                </strong>{" "}
                · shows ACIS working on a live pitcher, not a hypothetical.
              </p>
              <div className="featured-meta">
                <span>{featured.author}</span>
                <span className="sep">·</span>
                <span>{featured.date}</span>
                {featured.isDraft && (
                  <>
                    <span className="sep">·</span>
                    <span className="draft-pill">Draft</span>
                  </>
                )}
              </div>
            </div>

            {/* Right column — diagrammatic case-study graphic (no real asset
                in V4 yet; this stands in for the Buzz illustration) */}
            <div className="featured-right" aria-hidden="true">
              <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="vault-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(229,229,229,0.06)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="320" height="220" fill="url(#vault-grid)" />

                {/* Pitcher silhouette */}
                <circle cx="135" cy="60" r="11" fill="none" stroke="rgba(229,229,229,0.55)" strokeWidth="1.5" />
                <line x1="135" y1="71" x2="145" y2="130" stroke="rgba(229,229,229,0.6)" strokeWidth="1.8" />
                <line x1="145" y1="130" x2="118" y2="100" stroke="rgba(229,229,229,0.4)" strokeWidth="1.6" />
                <line x1="145" y1="130" x2="180" y2="95" stroke="rgba(229,229,229,0.65)" strokeWidth="2" />
                <line x1="180" y1="95" x2="225" y2="78" stroke="rgba(229,229,229,0.7)" strokeWidth="2" />
                <line x1="225" y1="78" x2="262" y2="62" stroke="rgba(229,229,229,0.75)" strokeWidth="2" />
                <line x1="118" y1="100" x2="100" y2="138" stroke="rgba(229,229,229,0.4)" strokeWidth="1.5" />
                <line x1="145" y1="130" x2="172" y2="186" stroke="rgba(229,229,229,0.6)" strokeWidth="2" />
                <line x1="172" y1="186" x2="202" y2="208" stroke="rgba(229,229,229,0.55)" strokeWidth="2" />
                <line x1="145" y1="130" x2="110" y2="184" stroke="rgba(229,229,229,0.5)" strokeWidth="1.6" />
                <line x1="110" y1="184" x2="86" y2="208" stroke="rgba(229,229,229,0.45)" strokeWidth="1.6" />

                {/* Markers — same 6 ACIS points, smaller */}
                <circle cx="180" cy="95" r="4" fill="#FFC655">
                  <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" begin="0s" />
                </circle>
                <circle cx="225" cy="78" r="4" fill="#FFC655">
                  <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" begin="0.3s" />
                </circle>
                <circle cx="262" cy="62" r="5" fill="#FFC655" stroke="rgba(255,198,85,0.3)" strokeWidth="3">
                  <animate attributeName="opacity" values="1;0.45;1" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                </circle>
                <circle cx="145" cy="130" r="4" fill="#FFC655">
                  <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" begin="0.9s" />
                </circle>
                <circle cx="172" cy="186" r="4" fill="#FFC655">
                  <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" begin="1.2s" />
                </circle>
                <circle cx="202" cy="208" r="4" fill="#FFC655">
                  <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" begin="1.5s" />
                </circle>

                {/* Corner labels */}
                <text x="14" y="22" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="2.5" fill="#FFC655">
                  CASE · BIRDSONG
                </text>
                <rect x="14" y="26" width="64" height="2" fill="#FFC655" opacity="0.3" />
                <text x="14" y="40" fontFamily="Manrope, -apple-system, sans-serif" fontSize="8" letterSpacing="2" fill="rgba(229,229,229,0.5)">
                  SF GIANTS · ACIS
                </text>
                <text x="306" y="22" textAnchor="end" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="2.5" fill="rgba(229,229,229,0.55)">
                  6 MARKERS
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* Section heading + filter chips */}
        <div className="fade" style={{ animationDelay: "0.4s" }}>
          <SectionHeading
            num="01"
            title="Document Library"
            meta="Latest · By Release Date"
          />

          <div className="cat-chips">
            {CATEGORY_CHIPS.map((c) => {
              const count = counts[c.label] ?? 0;
              return (
                <button
                  key={c.label}
                  type="button"
                  className={`cat-chip${activeCat === c.label ? " active" : ""}`}
                  onClick={() => setActiveCat(c.label)}
                >
                  {c.label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Document list — featured filtered above */}
          <div className="doc-list">
            {visibleDocs.length === 0 && !featuredVisible ? (
              <div className="doc-empty">
                Nothing in this category yet. Try a different filter.
              </div>
            ) : (
              visibleDocs.map((d) => {
                const inner = (
                  <>
                    <div className={`doc-badge ${d.badge.toLowerCase()}`}>
                      {d.badge}
                    </div>
                    <div className="doc-info">
                      <div className="doc-title">{d.title}</div>
                      <div className="doc-meta">
                        <span className="cat">{d.category}</span>
                        <span className="sep">·</span>
                        <span>{d.size}</span>
                        <span className="sep">·</span>
                        <span>{d.date}</span>
                        {d.isDraft && (
                          <>
                            <span className="sep">·</span>
                            <span className="draft">Draft</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="doc-author">
                      <div className="label">Authored By</div>
                      <div>{d.author}</div>
                    </div>
                    <span className={`doc-view${d.isDraft ? " draft" : ""}`}>
                      {d.isDraft ? "Draft" : "View →"}
                    </span>
                  </>
                );
                return d.href ? (
                  <a
                    key={d.id}
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                    className="doc-row"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={d.id} className="doc-row doc-row-locked">
                    {inner}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <Caption
          animationDelay="0.58s"
          left={{
            anchor: "WHAT LIVES HERE",
            headline: "The working file cabinet for stakeholders.",
            body: "Every material created this cycle, attributed and dated. Intel briefs for market positioning, governance for the IAB, brand standards for external use, case studies for investor conversations, the live deck, and the lead-generation copy that drives introductions.",
          }}
          right={{
            anchor: "HOW IT'S ORGANIZED",
            headline: "By category. By cycle. By author.",
            body: "Released materials are downloadable. Drafts stay visible but protected until they clear internal review. New documents appear at the top as each cycle closes, creating a running record of the work behind the milestones.",
          }}
        />

        <BottomFooter brief="Baseline Analytics · Investor Portal · 09 · Vault" />
      </div>

      <style>{`
        .page { max-width: 1480px; margin: 0 auto; padding: 72px 60px 120px; }

        .hero-kicker {
          font-size: 12px; letter-spacing: 0.28em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 20px;
        }
        .hero-headline {
          font-size: 72px; font-weight: 400; line-height: 1.02;
          letter-spacing: -0.035em; color: var(--mercury);
          max-width: 1100px; margin-bottom: 28px;
        }
        .hero-headline .line { display: block; overflow: hidden; padding: 0.12em 0; }
        .hero-headline .line > span {
          display: inline-block;
          animation: heroSlide 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .hero-headline .line:nth-child(1) > span { animation-delay: 0.15s; }
        .hero-headline .em { color: var(--gold); font-weight: 400; }

        .standfirst {
          max-width: 860px; font-size: 17px; line-height: 1.55;
          color: var(--mercury-dim); font-weight: 400;
          margin-bottom: 48px; letter-spacing: -0.005em;
        }
        .standfirst em { color: var(--mercury); font-style: normal; }

        /* Featured case study card */
        .featured-case {
          display: grid; grid-template-columns: 1.4fr 1fr; gap: 36px;
          background: rgba(18,18,17,0.7); border: 1px solid var(--gold-mid);
          padding: 36px 40px; margin-bottom: 56px; position: relative;
          align-items: center;
        }
        .featured-case::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--gold);
        }
        .featured-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 5px 12px; border: 1px solid var(--gold);
          background: rgba(255,198,85,0.08);
          font-size: 11.5px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); font-weight: 500;
          margin-bottom: 16px;
        }
        .featured-pill .dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--gold);
        }
        .featured-title {
          font-size: 30px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 14px;
        }
        .featured-body {
          font-size: 16px; line-height: 1.6; color: var(--mercury-dim);
          font-weight: 400; margin-bottom: 18px;
        }
        .featured-body strong { color: var(--mercury); font-weight: 500; }
        .featured-meta {
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase;
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        }
        .featured-meta .sep { opacity: 0.4; }
        .featured-meta .draft-pill {
          color: #D4854B; border: 1px solid rgba(212,133,75,0.4);
          padding: 2px 8px; background: rgba(212,133,75,0.08);
        }
        .featured-right {
          background: rgba(0,0,0,0.5); border: 1px solid var(--hairline-2);
          padding: 14px;
        }
        .featured-right svg { width: 100%; height: auto; display: block; }

        /* Category chips */
        .cat-chips { display: flex; gap: 8px; margin-bottom: 32px; flex-wrap: wrap; }
        .cat-chip {
          padding: 7px 14px; background: transparent;
          border: 1px solid var(--hairline-2); color: var(--mercury-dim);
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s;
        }
        .cat-chip:hover { border-color: var(--gold-mid); color: var(--mercury); }
        .cat-chip.active {
          border-color: var(--gold); color: var(--gold);
          background: rgba(255,198,85,0.06);
        }
        .cat-chip span {
          margin-left: 6px; padding: 1px 6px;
          background: rgba(255,198,85,0.14); color: var(--gold); font-weight: 500;
        }

        /* Document list */
        .doc-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 56px; }
        .doc-row {
          display: grid; grid-template-columns: 72px 1fr auto auto;
          gap: 24px; align-items: center;
          padding: 22px 28px;
          background: rgba(18,18,17,0.7); border: 1px solid var(--hairline-2);
          transition: all 0.2s; text-decoration: none; color: inherit;
        }
        .doc-row:hover {
          border-color: var(--gold-mid); background: rgba(18,18,17,0.95);
          transform: translateX(2px);
        }
        .doc-row-locked:hover { transform: none; }
        .doc-badge {
          width: 56px; height: 56px;
          background: rgba(255,198,85,0.08); border: 1px solid var(--gold-mid);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; letter-spacing: 0.16em;
          color: var(--gold); font-weight: 500;
        }
        .doc-badge.doc {
          color: var(--mercury); border-color: rgba(229,229,229,0.3);
          background: rgba(229,229,229,0.04);
        }
        .doc-badge.pptx {
          color: var(--gold-mid); border-color: var(--gold-mid);
          background: rgba(174,142,81,0.1);
        }
        .doc-info { min-width: 0; }
        .doc-title {
          font-size: 19px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.01em; line-height: 1.3; margin-bottom: 6px;
        }
        .doc-row:hover .doc-title { color: var(--gold); }
        .doc-row-locked:hover .doc-title { color: var(--mercury); }
        .doc-meta {
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase;
          display: flex; gap: 14px; align-items: center; flex-wrap: wrap;
        }
        .doc-meta .sep { opacity: 0.4; }
        .doc-meta .cat { color: var(--gold-mid); font-weight: 500; }
        .doc-meta .draft {
          color: #D4854B; border: 1px solid rgba(212,133,75,0.4);
          padding: 2px 8px; background: rgba(212,133,75,0.08);
        }
        .doc-author {
          text-align: right;
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-dim); text-transform: uppercase;
        }
        .doc-author .label {
          color: var(--mercury-faint); display: block;
          margin-bottom: 2px; font-size: 11px;
        }
        .doc-view {
          padding: 12px 22px; background: transparent;
          border: 1px solid var(--gold-mid); color: var(--gold);
          font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
          font-weight: 500; cursor: pointer; transition: all 0.2s;
          text-decoration: none; display: inline-block;
        }
        .doc-row:hover .doc-view {
          background: var(--gold); color: var(--black); border-color: var(--gold);
        }
        .doc-view.draft {
          border-color: rgba(229,229,229,0.2); color: var(--mercury-faint);
          cursor: not-allowed;
        }
        .doc-row:hover .doc-view.draft {
          background: transparent; color: var(--mercury-faint);
        }

        .doc-empty {
          padding: 48px 28px; text-align: center;
          font-size: 14px; letter-spacing: 0.16em;
          color: var(--mercury-faint); text-transform: uppercase;
          border: 1px dashed var(--hairline-2);
        }

        @media (max-width: 900px) {
          .featured-case { grid-template-columns: 1fr; }
          .doc-row { grid-template-columns: 56px 1fr; row-gap: 12px; }
          .doc-author, .doc-view { grid-column: 1 / -1; text-align: left; }
        }
      `}</style>
    </>
  );
}
