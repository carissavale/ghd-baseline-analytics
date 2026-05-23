import { TopNav } from "@/app/_components/TopNav";
import { Masthead } from "@/app/_components/Masthead";
import { SectionHeading } from "@/app/_components/SectionHeading";
import { StatLine } from "@/app/_components/StatLine";
import { AskCompact } from "@/app/_components/AskCompact";
import { Caption } from "@/app/_components/Caption";
import { BottomFooter } from "@/app/_components/BottomFooter";
import {
  annualRateRows,
  dealIntelStats,
  dealMatrix,
} from "@/lib/mock-data";

// /deal-intel — Sports-tech comparables matrix + ACIS positioning.
// V4 page exactly as designed; no Chase deltas affect this route.

export default function DealIntelPage() {
  return (
    <>
      <TopNav active="deal-intel" />

      <div className="page">
        <Masthead
          dateline="Investor Portal · 23 April 2026"
          pub="Baseline Analytics · Stakeholder Brief 08"
          edition="Deal Intel"
          cycle="Market Intelligence · Q2 2026"
        />

        {/* Hero with video bg */}
        <div className="hero-wrap">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source
              src="/brand_source/video/baseball_impact.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-video-overlay" />
          <div
            className="hero-kicker fade"
            style={{ animationDelay: "0.1s" }}
          >
            Market Intelligence
          </div>
          <h1 className="hero-headline">
            <span className="line">
              <span>Deal</span>
            </span>
            <span className="line">
              <span className="em">Comparables.</span>
            </span>
          </h1>
          <p className="standfirst fade" style={{ animationDelay: "0.3s" }}>
            Seven league-wide technology deals totaling <em>$6B+</em> in
            documented value. ACIS positioned at{" "}
            <em>$15 to 50M per year</em>. Two to eight percent of MLB&apos;s
            $641M annual pitcher injury cost.
          </p>
        </div>

        <AskCompact animationDelay="0.33s" />

        <StatLine stats={dealIntelStats} />

        {/* 00 · What ACIS Sees */}
        <div className="fade" style={{ animationDelay: "0.42s", marginBottom: 56 }}>
          <SectionHeading
            num="00"
            title="What ACIS Sees"
            meta="Biomechanical marker layer · Proprietary"
          />
          <div className="acis-wrap">
            <div className="acis-graphic">
              <svg
                viewBox="0 0 480 420"
                className="acis-svg"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Stylized pitcher with ACIS biomechanical markers"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(229,229,229,0.05)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                  <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFC655" stopOpacity="1" />
                    <stop offset="100%" stopColor="#AE8E51" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <rect width="480" height="420" fill="url(#grid)" />

                <line x1="0" y1="380" x2="480" y2="380" stroke="rgba(229,229,229,0.18)" strokeWidth="1" />
                <line x1="60" y1="380" x2="420" y2="380" stroke="#FFC655" strokeWidth="1.5" opacity="0.4" />

                {/* Pitcher wireframe */}
                <circle cx="200" cy="95" r="18" fill="none" stroke="rgba(229,229,229,0.5)" strokeWidth="1.5" />
                <line x1="200" y1="113" x2="215" y2="215" stroke="rgba(229,229,229,0.6)" strokeWidth="2" />
                <line x1="215" y1="215" x2="170" y2="160" stroke="rgba(229,229,229,0.4)" strokeWidth="2" />
                <line x1="215" y1="215" x2="270" y2="150" stroke="rgba(229,229,229,0.6)" strokeWidth="2.5" />
                <line x1="270" y1="150" x2="340" y2="120" stroke="rgba(229,229,229,0.65)" strokeWidth="2.5" />
                <line x1="340" y1="120" x2="400" y2="95" stroke="rgba(229,229,229,0.7)" strokeWidth="2.5" />
                <line x1="170" y1="160" x2="145" y2="220" stroke="rgba(229,229,229,0.35)" strokeWidth="2" />
                <line x1="215" y1="215" x2="260" y2="300" stroke="rgba(229,229,229,0.55)" strokeWidth="2.5" />
                <line x1="260" y1="300" x2="305" y2="378" stroke="rgba(229,229,229,0.5)" strokeWidth="2.5" />
                <line x1="215" y1="215" x2="165" y2="295" stroke="rgba(229,229,229,0.45)" strokeWidth="2" />
                <line x1="165" y1="295" x2="120" y2="370" stroke="rgba(229,229,229,0.4)" strokeWidth="2" />

                {/* Pitch arc */}
                <path
                  d="M 400 95 Q 430 140 460 200"
                  fill="none"
                  stroke="#FFC655"
                  strokeWidth="1"
                  strokeDasharray="3,4"
                  opacity="0.55"
                />

                {/* ACIS markers — pulsing */}
                <g>
                  <circle cx="270" cy="150" r="6" fill="#FFC655">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0s" />
                  </circle>
                  <circle cx="340" cy="120" r="6" fill="#FFC655">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.25s" />
                  </circle>
                  <circle cx="400" cy="95" r="7" fill="#FFC655" stroke="rgba(255,198,85,0.3)" strokeWidth="4">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                  </circle>
                  <circle cx="215" cy="215" r="6" fill="#FFC655">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.75s" />
                  </circle>
                  <circle cx="260" cy="300" r="5" fill="#FFC655">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1s" />
                  </circle>
                  <circle cx="305" cy="378" r="5" fill="#FFC655">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1.25s" />
                  </circle>
                </g>

                {/* Callout labels */}
                <g
                  fontFamily="Manrope, -apple-system, sans-serif"
                  fontSize="9"
                  letterSpacing="2"
                  fill="rgba(229,229,229,0.55)"
                >
                  <line x1="280" y1="150" x2="310" y2="150" stroke="rgba(229,229,229,0.2)" strokeWidth="0.5" />
                  <text x="314" y="154">SHOULDER · M1</text>
                  <line x1="350" y1="120" x2="380" y2="100" stroke="rgba(229,229,229,0.2)" strokeWidth="0.5" />
                  <text x="384" y="104">ELBOW · M2</text>
                  <line x1="405" y1="87" x2="430" y2="60" stroke="rgba(229,229,229,0.2)" strokeWidth="0.5" />
                  <text x="434" y="64" fill="#FFC655" fontWeight="500">
                    RELEASE · M3
                  </text>
                  <line x1="225" y1="215" x2="260" y2="225" stroke="rgba(229,229,229,0.2)" strokeWidth="0.5" />
                  <text x="264" y="229">HIP · M4</text>
                  <line x1="270" y1="300" x2="305" y2="320" stroke="rgba(229,229,229,0.2)" strokeWidth="0.5" />
                  <text x="310" y="325">KNEE · M5</text>
                  <line x1="315" y1="378" x2="340" y2="365" stroke="rgba(229,229,229,0.2)" strokeWidth="0.5" />
                  <text x="344" y="369">STRIDE · M6</text>
                </g>

                {/* Corner HUD */}
                <text x="20" y="30" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="3" fill="#FFC655">
                  ACIS · LIVE
                </text>
                <rect x="20" y="35" width="70" height="2" fill="#FFC655" opacity="0.3" />
                <text x="20" y="52" fontFamily="Manrope, -apple-system, sans-serif" fontSize="8" letterSpacing="2" fill="rgba(229,229,229,0.45)">
                  6 MARKERS · 120 HZ
                </text>
                <text x="460" y="30" textAnchor="end" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="3" fill="rgba(229,229,229,0.55)">
                  FRAME 0248
                </text>
              </svg>
            </div>

            <div className="acis-body">
              <div className="acis-eyebrow">
                Proprietary · Not reverse-engineerable from box scores
              </div>
              <div className="acis-headline">
                Six markers. <em>One risk signal.</em>
              </div>
              <p className="acis-copy">
                Baseline&apos;s Arm Care Intelligence System reads the
                biomechanical points the stat sheet can&apos;t · shoulder
                separation, elbow angle at release, hip-shoulder rotation,
                stride mechanics · and triangulates them into a single
                injury-risk signal <strong>before</strong> the injury appears
                on a DL list.
              </p>
              <div className="acis-meta">
                <div className="acis-meta-item">
                  <span className="acis-meta-num">6</span>
                  <span className="acis-meta-label">Biomechanical Markers</span>
                </div>
                <div className="acis-meta-item">
                  <span className="acis-meta-num">
                    120<span className="acis-meta-unit">hz</span>
                  </span>
                  <span className="acis-meta-label">Capture Rate</span>
                </div>
                <div className="acis-meta-item">
                  <span className="acis-meta-num">1</span>
                  <span className="acis-meta-label">Risk Signal Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 01 · Deal Comparison Matrix */}
        <div className="fade" style={{ animationDelay: "0.46s" }}>
          <SectionHeading
            num="01"
            title="Deal Comparison Matrix"
            meta="All league-wide partnerships · MLB · NBA · NFL"
          />
          <div className="matrix-wrap">
            <table className="matrix">
              <thead>
                <tr>
                  <th>Deal</th>
                  <th>Value</th>
                  <th>Duration</th>
                  <th>Structure</th>
                  <th>ACIS Relevance</th>
                </tr>
              </thead>
              <tbody>
                {dealMatrix.map((d) => (
                  <tr key={d.id} className={d.isAcis ? "acis" : undefined}>
                    <td>
                      <div className="deal-name">{d.name}</div>
                      <div className={`deal-tag ${d.tag}`}>{d.tagLabel}</div>
                    </td>
                    <td className="val">{d.value}</td>
                    <td className="dur">{d.duration}</td>
                    <td className="struct">{d.structure}</td>
                    <td>
                      <div className="relevance-cell">
                        <div className="relevance-bar">
                          <div
                            className={`relevance-fill ${d.relevanceTier}`}
                            style={{ width: `${d.relevancePct}%` }}
                          />
                        </div>
                        <div className="relevance-label">{d.relevanceLabel}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 02 · Annual Rate Comparison */}
        <div className="fade" style={{ animationDelay: "0.52s" }}>
          <SectionHeading
            num="02"
            title="Annual-Rate Comparison"
            meta="Where Applicable · Per Year"
          />
          <div className="rate-wrap">
            {annualRateRows.map((r) => (
              <div
                key={r.name}
                className={`rate-row${r.isAcis ? " acis" : ""}`}
              >
                <div className="rate-name">{r.name}</div>
                <div className="rate-track">
                  <div
                    className={`rate-bar${r.isAcis ? " acis" : ""}`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <div className="rate-value">{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key insight */}
        <div className="fade" style={{ animationDelay: "0.6s" }}>
          <div className="insight">
            <div className="insight-eyebrow">The Case, In One Sentence</div>
            <div className="insight-headline">
              Baseline is priced <em>inside the comp set</em> and positioned
              against <em>the single biggest uninsured cost</em> MLB carries on
              its pitching roster.
            </div>
            <p className="insight-body">
              The ACIS target band of{" "}
              <strong>$15 to 50M per year</strong> sits below the data
              distribution mega-deals ($100M+/yr) and above per-team
              subscription aggregates. Against MLB&apos;s{" "}
              <strong>$641M annual pitcher injury cost</strong>, a league-wide
              ACIS deployment represents just{" "}
              <strong>2 to 8% of the problem&apos;s economic value</strong>. The
              BAMTech precedent established MLB&apos;s preferred structure: cash
              plus equity plus league-wide deployment. Baseline is the only
              AI-powered pitcher injury prevention system in motion with MLB in
              2026.
            </p>
          </div>
        </div>

        <Caption
          animationDelay="0.68s"
          left={{
            anchor: "WHY THIS MATRIX MATTERS",
            headline: "MLB has a twenty-five year playbook for league-wide tech.",
            body: "Seven deals, one consistent pattern. MLB wants equity participation, centralized deployment, and long-term alignment. The Sportradar deal formalized the cash-plus-equity structure. The BAMTech precedent established the return profile. Baseline's ACIS deal will be structured against this playbook.",
          }}
          right={{
            anchor: "WHAT'S DIFFERENT ABOUT ACIS",
            headline: "The analytics layer, not the hardware layer.",
            body: "Baseline sits on top of Statcast, Hawk-Eye, and KinaTrax biomechanical data. It's the intelligence layer that makes existing data actionable for injury prevention. Neither Hawk-Eye nor KinaTrax does this at league scale. The moat is the model, the relationship with the league office, and the proprietary biomechanical marker layer.",
          }}
        />

        <BottomFooter brief="Baseline Analytics · Investor Portal · 08 · Deal Intel" />
      </div>

      <style>{`
        .page { max-width: 1480px; margin: 0 auto; padding: 72px 60px 120px; }

        /* Hero */
        .hero-wrap {
          position: relative; overflow: hidden;
          margin: -24px -60px 28px -60px; padding: 72px 60px 48px;
        }
        .hero-video {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover; opacity: 0.42; z-index: 0;
          filter: contrast(1.1) brightness(0.8);
          pointer-events: none;
        }
        .hero-video-overlay {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(ellipse at center left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%),
                      linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.9) 100%);
        }
        .hero-wrap .hero-kicker, .hero-wrap .hero-headline, .hero-wrap .standfirst { position: relative; z-index: 2; }
        .hero-kicker {
          font-size: 12px; letter-spacing: 0.28em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 20px;
        }
        .hero-headline {
          font-size: 72px; font-weight: 400; line-height: 1.02;
          letter-spacing: -0.035em; color: var(--mercury); max-width: 1100px;
          margin-bottom: 28px;
        }
        .hero-headline .line { display: block; overflow: hidden; padding: 0.12em 0; }
        .hero-headline .line > span {
          display: inline-block;
          animation: heroSlide 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .hero-headline .line:nth-child(1) > span { animation-delay: 0.15s; }
        .hero-headline .line:nth-child(2) > span { animation-delay: 0.45s; }
        .hero-headline .em { color: var(--gold); font-weight: 400; }

        .standfirst {
          max-width: 860px; font-size: 17px; line-height: 1.55; color: var(--mercury-dim);
          font-weight: 400; margin-bottom: 48px; letter-spacing: -0.005em;
        }
        .standfirst em { color: var(--gold); font-style: normal; font-weight: 400; }

        /* ACIS visualization */
        .acis-wrap {
          display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px;
          background: rgba(18,18,17,0.6); border: 1px solid var(--hairline-2);
          border-left: 3px solid var(--gold);
          padding: 40px 44px; align-items: center;
        }
        .acis-graphic { position: relative; }
        .acis-svg { width: 100%; height: auto; max-height: 460px; display: block; }
        .acis-body { padding-left: 8px; }
        .acis-eyebrow {
          font-size: 12px; letter-spacing: 0.24em;
          color: var(--gold); text-transform: uppercase; margin-bottom: 16px;
        }
        .acis-headline {
          font-size: 30px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 18px;
        }
        .acis-headline em { color: var(--gold); font-style: italic; font-weight: 400; }
        .acis-copy {
          font-size: 15px; line-height: 1.6; color: var(--mercury-dim);
          font-weight: 400; margin-bottom: 28px;
        }
        .acis-copy strong { color: var(--mercury); font-weight: 500; }
        .acis-meta {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          padding-top: 20px; border-top: 1px solid var(--hairline);
        }
        .acis-meta-item { display: flex; flex-direction: column; gap: 10px; }
        .acis-meta-num {
          font-size: 32px; font-weight: 400; color: var(--gold);
          letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums;
        }
        .acis-meta-unit { font-size: 15px; color: var(--gold-mid); letter-spacing: 0.08em; margin-left: 4px; }
        .acis-meta-label {
          font-size: 11.5px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }

        /* Deal matrix */
        .matrix-wrap {
          margin-bottom: 72px; background: rgba(18,18,17,0.6);
          border: 1px solid var(--hairline-2); overflow: hidden;
        }
        .matrix { width: 100%; border-collapse: collapse; }
        .matrix thead th {
          text-align: left; padding: 18px 24px;
          font-size: 11.5px; letter-spacing: 0.22em;
          color: var(--mercury-faint); text-transform: uppercase; font-weight: 500;
          border-bottom: 1px solid var(--hairline-2);
          background: rgba(0,0,0,0.4);
        }
        .matrix tbody tr { border-bottom: 1px solid var(--hairline); transition: background 0.2s; }
        .matrix tbody tr:last-child { border-bottom: none; }
        .matrix tbody tr:hover { background: rgba(255,198,85,0.03); }
        .matrix tbody tr.acis {
          background: rgba(255,198,85,0.06);
          border-top: 1px solid var(--gold-mid);
          border-bottom: 1px solid var(--gold-mid);
        }
        .matrix tbody tr.acis:hover { background: rgba(255,198,85,0.1); }
        .matrix td { padding: 20px 24px; vertical-align: middle; }
        .deal-name { font-size: 15px; font-weight: 500; color: var(--mercury); letter-spacing: -0.005em; margin-bottom: 4px; }
        .matrix tr.acis .deal-name { color: var(--gold); font-weight: 500; }
        .deal-tag { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--mercury-faint); }
        .deal-tag.ai { color: var(--cat-advisory); }
        .deal-tag.data { color: var(--cat-strategy); }
        .deal-tag.infra { color: var(--cat-board); }
        .deal-tag.incubated { color: var(--gold-mid); }
        .matrix tr.acis .deal-tag.ai { color: var(--gold); }
        .matrix .val {
          font-size: 16px; color: var(--mercury); font-weight: 500;
          letter-spacing: -0.005em; font-variant-numeric: tabular-nums;
        }
        .matrix tr.acis .val { color: var(--gold); }
        .matrix .dur { font-size: 14px; color: var(--mercury-dim); letter-spacing: 0.02em; }
        .matrix .struct { font-size: 15px; color: var(--mercury-dim); line-height: 1.4; max-width: 280px; }
        .relevance-cell { display: flex; align-items: center; gap: 14px; min-width: 240px; }
        .relevance-bar { flex: 1; height: 6px; background: rgba(229,229,229,0.08); position: relative; overflow: hidden; }
        .relevance-fill { position: absolute; top: 0; left: 0; height: 100%; background: var(--mercury-faint); }
        .relevance-fill.foundational { background: var(--gold-mid); }
        .relevance-fill.highest { background: var(--gold); }
        .relevance-fill.very-high { background: var(--gold-mid); }
        .relevance-fill.complementary { background: var(--gold-mid); opacity: 0.7; }
        .relevance-fill.structural { background: var(--mercury-faint); }
        .relevance-fill.pricing { background: var(--mercury-faint); }
        .relevance-fill.entrenchment { background: var(--mercury-faint); opacity: 0.6; }
        .relevance-fill.acis { background: var(--gold); }
        .relevance-label {
          font-size: 12px; letter-spacing: 0.16em;
          color: var(--mercury-dim); text-transform: uppercase;
          white-space: nowrap; min-width: 150px;
        }
        .matrix tr.acis .relevance-label { color: var(--gold); font-weight: 500; }

        /* Annual rate comparison */
        .rate-wrap {
          margin-bottom: 72px; background: rgba(18,18,17,0.6);
          border: 1px solid var(--hairline-2); padding: 36px 44px;
        }
        .rate-row {
          display: grid; grid-template-columns: 220px 1fr 140px; gap: 18px;
          align-items: center; padding: 14px 0; border-bottom: 1px solid var(--hairline);
        }
        .rate-row:last-child { border-bottom: none; }
        .rate-row.acis { border-color: var(--gold-mid); }
        .rate-name { font-size: 16px; color: var(--mercury-dim); font-weight: 400; letter-spacing: -0.005em; }
        .rate-row.acis .rate-name { color: var(--gold); font-weight: 500; }
        .rate-track { height: 26px; background: rgba(229,229,229,0.06); position: relative; overflow: hidden; }
        .rate-bar {
          position: absolute; top: 0; left: 0; height: 100%;
          background: var(--mercury-faint);
          transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .rate-bar.acis { background: linear-gradient(90deg, var(--gold), var(--gold-mid)); }
        .rate-value {
          font-size: 15px; color: var(--mercury); letter-spacing: 0.01em;
          text-align: right; font-variant-numeric: tabular-nums;
        }
        .rate-row.acis .rate-value { color: var(--gold); font-weight: 500; }

        /* Key insight callout */
        .insight {
          margin-bottom: 56px; padding: 36px 44px;
          background: rgba(18,18,17,0.8); border: 1px solid var(--gold-mid);
          position: relative;
        }
        .insight::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--gold);
        }
        .insight-eyebrow {
          font-size: 12px; letter-spacing: 0.24em;
          color: var(--gold); text-transform: uppercase; margin-bottom: 14px;
        }
        .insight-headline {
          font-size: 28px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 14px;
          max-width: 920px;
        }
        .insight-headline em { color: var(--gold); font-style: normal; font-weight: 400; }
        .insight-body {
          font-size: 14.5px; line-height: 1.65; color: var(--mercury-dim);
          font-weight: 400; max-width: 820px;
        }
        .insight-body strong { color: var(--mercury); font-weight: 500; }
      `}</style>
    </>
  );
}
