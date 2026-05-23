import { TopNav } from "@/app/_components/TopNav";
import { Masthead } from "@/app/_components/Masthead";
import { StatLine } from "@/app/_components/StatLine";
import { AskCompact } from "@/app/_components/AskCompact";
import { Caption } from "@/app/_components/Caption";
import { BottomFooter } from "@/app/_components/BottomFooter";
import { milestones, milestonesStats } from "@/lib/mock-data";

// /milestones — H1 2026 progress ladder, in-motion timeline, delivered trophy cards.
// V4 page exactly as designed; no Chase deltas affect this route.

// Checkmark glyph used on the delivered trophy stamps + ladder ticks.
function CheckIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none">
      <path
        d="M3 9.5 L7 13 L15 5"
        stroke="#000"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MilestonesPage() {
  const ladder = milestones.slice(0, 5); // 5 ladder ticks
  const delivered = milestones.filter((m) => m.status === "delivered");
  const inMotion = milestones.filter((m) => m.status === "in_motion");

  // Days to go for the second in-motion card (V4 hard-codes 67; calc from target)
  const today = new Date("2026-04-24T00:00:00Z");
  const jun30 = new Date("2026-06-30T00:00:00Z");
  const daysToH1Close = Math.max(
    0,
    Math.round((jun30.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <>
      <TopNav active="milestones" />

      <div className="page">
        <Masthead
          dateline="Investor Portal · 23 April 2026"
          pub="Baseline Analytics · Stakeholder Brief 02"
          edition="Milestones"
          cycle="H1 2026 · January through June"
        />

        {/* Hero */}
        <div className="hero-wrap">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/brand_source/video/baseball_impact.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
          <h1 className="hero-headline">
            <span className="line">
              <span>Three cleared.</span>
            </span>
            <span className="line">
              <span className="em">Two in motion.</span>
            </span>
          </h1>
        </div>

        <p className="standfirst fade" style={{ animationDelay: "0.16s" }}>
          H1 2026 commitments against delivery. Each milestone a{" "}
          <em>stake in the ground</em>, each status a record of work already
          completed or in the field. Board of Directors set the targets in
          January. What follows is the accounting.
        </p>

        <AskCompact animationDelay="0.2s" />

        <StatLine stats={milestonesStats} />

        {/* Progress ladder */}
        <div className="progress-wrap fade" style={{ animationDelay: "0.32s" }}>
          <div className="progress-head">
            <span className="progress-label">H1 Progress Ladder</span>
            <span className="progress-count">
              {delivered.length} of {ladder.length} complete ·{" "}
              {Math.round((delivered.length / ladder.length) * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(delivered.length / ladder.length) * 100}%` }}
            />
            <div className="progress-ticks">
              {ladder.map((m, i) => (
                <div
                  key={m.id}
                  className={`tick${m.status === "delivered" ? " done" : ""}${i === ladder.length - 1 ? " last" : ""}`}
                >
                  <div className="tick-tip">
                    <div className="tick-tip-title">{m.title}</div>
                    <div className="tick-tip-date">
                      {m.tooltipDate ?? m.date}
                    </div>
                    <span
                      className={`tick-tip-status ${m.status === "delivered" ? "done" : "motion"}`}
                    >
                      {m.status === "delivered" ? "Delivered" : "In Motion"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* In Motion · Horizontal Timeline */}
        <div className="motion-lead fade" style={{ animationDelay: "0.4s" }}>
          <div className="motion-lead-title">
            <span className="ring" />
            In Motion
          </div>
          <div className="motion-lead-count">
            {inMotion.length} active · Window to H1 close
          </div>
        </div>

        <div className="motion-wrap fade" style={{ animationDelay: "0.5s" }}>
          <div className="tl-rail">
            <div className="tl-line" />

            <div className="tl-anchor today">
              <div className="tl-anchor-label">● Today</div>
              <div className="tl-dot" />
              <div className="tl-anchor-sub">Apr 24, 2026</div>
            </div>

            <div className="tl-marker active" style={{ left: "10%" }}>
              <div className="tl-marker-label">LOI · Two-Step</div>
            </div>

            <div
              className="tl-marker"
              style={{ left: "100%", transform: "translateX(-100%)" }}
            >
              <div
                className="tl-marker-label"
                style={{ left: "auto", right: 0, transform: "none" }}
              >
                IAB Expand
              </div>
            </div>

            <div className="tl-anchor close">
              <div className="tl-anchor-label">H1 Close ○</div>
              <div className="tl-dot" />
              <div className="tl-anchor-sub">Jun 30, 2026</div>
            </div>
          </div>

          <div className="tl-cards">
            {/* MLB LOI card — "In Two-Step Review" instead of countdown */}
            <div className="tl-card">
              <div className="tl-card-head">
                <div className="tl-card-left">
                  <div className="tl-card-status">
                    <span className="pulse-dot" />
                    Active Now
                  </div>
                  <div className="tl-card-date">Target · Apr 15, 2026</div>
                  <div className="tl-card-title">
                    Sign MLB Letter of Intent.
                  </div>
                </div>
                <div className="tl-countdown">
                  <div className="review">
                    In Two-Step
                    <br />
                    Review
                  </div>
                </div>
              </div>
              <div className="tl-card-desc">
                Formalize partnership with Major League Baseball through the
                two-step LOI process directed by <strong>Jeff Newman</strong>.
                The milestone that converts validated to capitalized.
              </div>
              <div className="tl-card-meta">
                <span className="accent">Commercial ·</span> Two-Step LOI ·
                Directed by Jeff Newman
              </div>
            </div>

            {/* IAB Expand — live countdown */}
            <div className="tl-card">
              <div className="tl-card-head">
                <div className="tl-card-left">
                  <div className="tl-card-status">
                    <span className="pulse-dot" />
                    Tracking to Target
                  </div>
                  <div className="tl-card-date">Target · Jun 30, 2026</div>
                  <div className="tl-card-title">
                    Expand Industry Advisory Board.
                  </div>
                </div>
                <div className="tl-countdown">
                  <span className="num">{daysToH1Close}</span>
                  <span className="unit">Days to Go</span>
                </div>
              </div>
              <div className="tl-card-desc">
                Add advisors with expertise in{" "}
                <strong>sports medicine, data science, and MLB operations</strong>.
                Widens the bench before the LOI is signed, not after.
              </div>
              <div className="tl-card-meta">
                <span className="accent">Governance ·</span> Sports Medicine ·
                Data Science · MLB Ops
              </div>
            </div>
          </div>
        </div>

        {/* Delivered · Trophy Case */}
        <div className="trophy-lead fade" style={{ animationDelay: "0.58s" }}>
          <div className="trophy-lead-title">
            <span className="seal">
              <CheckIcon />
            </span>
            Delivered
          </div>
          <div className="trophy-lead-count">
            {delivered.length} of {ladder.length} · Locked In
          </div>
        </div>

        <div className="trophy-grid fade" style={{ animationDelay: "0.64s" }}>
          {delivered.slice(0, 3).map((m) => (
            <div key={m.id} className="trophy-card">
              <div className="trophy-stamp">
                <CheckIcon />
              </div>
              <div className="trophy-date">{m.date}</div>
              <div className="trophy-title">{m.title}.</div>
              <div className="trophy-desc">{m.description ?? ""}</div>
              <div className="trophy-meta">
                <span className="accent">
                  {m.id === "iab-established"
                    ? "Seat 01 ·"
                    : m.id === "cto-recruited"
                    ? "Executive Leadership ·"
                    : "Validation ·"}
                </span>{" "}
                {m.id === "iab-established"
                  ? "Founding Members"
                  : m.id === "cto-recruited"
                  ? "Incoming CTO · Fmr Cisco"
                  : "Tempe Diablo · 4 MLB Officials"}
              </div>
            </div>
          ))}
        </div>

        <Caption
          animationDelay="0.6s"
          left={{
            anchor: "THE QUARTER BEHIND",
            headline:
              "Q1 closed with three milestones delivered inside eight weeks.",
            body: "Between January 7 and February 23, Baseline stood up the Industry Advisory Board, recruited an incoming CTO, and put the product in front of four senior MLB officials in Arizona. Three foundation-building actions, each compounding the next.",
          }}
          right={{
            anchor: "THE QUARTER AHEAD",
            headline: "Q2 is where validated becomes capitalized.",
            body: "The MLB Letter of Intent (mid-April) and expanded IAB seats (by end of June) are the two moves that convert this half from founding to funded. Both are in motion. The ladder tightens here.",
          }}
        />

        <BottomFooter brief="Baseline Analytics · Investor Portal · 02 · Milestones" />
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
          object-fit: cover; opacity: 0.4; z-index: 0;
          filter: contrast(1.1) brightness(0.8);
          pointer-events: none;
        }
        .hero-video-overlay {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(ellipse at center left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%),
                      linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.9) 100%);
        }
        .hero-wrap .hero-headline { position: relative; z-index: 2; }
        .hero-headline {
          font-size: 72px; font-weight: 400; line-height: 1.02;
          letter-spacing: -0.035em; color: var(--mercury); max-width: 1100px;
        }
        .hero-headline .line { display: block; overflow: hidden; }
        .hero-headline .line > span {
          display: inline-block;
          animation: heroSlide 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .hero-headline .line:nth-child(1) > span { animation-delay: 0.15s; }
        .hero-headline .line:nth-child(2) > span { animation-delay: 0.45s; }
        .hero-headline .em { color: var(--gold); font-weight: 400; }

        .standfirst {
          max-width: 760px; font-size: 17px; line-height: 1.55; color: var(--mercury-dim);
          font-weight: 400; margin-bottom: 56px; letter-spacing: -0.005em;
        }
        .standfirst em { color: var(--mercury); font-style: normal; }

        /* Progress ladder */
        .progress-wrap { margin-bottom: 56px; }
        .progress-head {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 14px;
        }
        .progress-label {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--gold-mid); text-transform: uppercase;
        }
        .progress-count {
          font-size: 13px; letter-spacing: 0.12em; color: var(--mercury-dim);
        }
        .progress-bar { height: 2px; background: rgba(229,229,229,0.1); position: relative; }
        .progress-fill {
          position: absolute; top: 0; left: 0; height: 100%; background: var(--gold);
        }
        .progress-ticks {
          position: absolute; inset: 0; display: grid; grid-template-columns: repeat(5, 1fr);
        }
        .tick {
          position: relative; border-right: 1px solid rgba(229,229,229,0.14);
          cursor: help;
        }
        .tick:last-child { border-right: none; }
        .tick::after {
          content: ''; position: absolute; right: -5px; top: -4px;
          width: 10px; height: 10px; border-radius: 50%; background: var(--black);
          border: 1.5px solid rgba(229,229,229,0.35);
          transition: transform 0.15s, border-color 0.15s, background 0.15s;
        }
        .tick.done::after { background: var(--gold); border-color: var(--gold); }
        .tick:hover::after { transform: scale(1.4); border-color: var(--gold); }
        .tick:first-child::after { display: none; }

        .tick-tip {
          position: absolute; bottom: calc(100% + 14px); right: -110px;
          min-width: 220px; padding: 12px 14px;
          background: rgba(18,18,17,0.96); border: 1px solid rgba(229,229,229,0.2);
          opacity: 0; pointer-events: none; transform: translateY(4px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          z-index: 50; backdrop-filter: blur(10px);
        }
        .tick:hover .tick-tip { opacity: 1; transform: translateY(0); }
        .tick-tip::after {
          content: ''; position: absolute; top: 100%; right: 105px;
          border: 6px solid transparent; border-top-color: rgba(229,229,229,0.2);
        }
        .tick-tip-title {
          font-size: 15px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.005em; line-height: 1.3; margin-bottom: 6px;
        }
        .tick-tip-date {
          font-size: 12px; letter-spacing: 0.14em;
          color: var(--mercury-faint); text-transform: uppercase; margin-bottom: 8px;
        }
        .tick-tip-status {
          display: inline-block; padding: 3px 9px;
          font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase; border: 1px solid;
        }
        .tick-tip-status.done { color: var(--gold); border-color: var(--gold); background: rgba(255,198,85,0.08); }
        .tick-tip-status.motion { color: var(--gold-mid); border-color: var(--gold-mid); background: rgba(174,142,81,0.12); }
        .tick.last .tick-tip { right: -20px; }
        .tick.last .tick-tip::after { right: 15px; }

        /* Motion section */
        .motion-lead {
          display: flex; justify-content: space-between; align-items: baseline;
          margin: 0 0 20px; padding-bottom: 14px;
          border-bottom: 1px solid var(--hairline-2);
        }
        .motion-lead-title {
          font-size: 14px; letter-spacing: 0.3em;
          color: var(--mercury); text-transform: uppercase;
          display: flex; align-items: center; gap: 12px;
        }
        .motion-lead-title .ring {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px dashed var(--gold); position: relative;
        }
        .motion-lead-title .ring::after {
          content: ''; position: absolute; inset: 3px; border-radius: 50%;
          background: var(--gold); opacity: 0.6;
          animation: motionPulse 1.6s ease-in-out infinite;
        }
        @keyframes motionPulse {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
        .motion-lead-count {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--mercury-dim); text-transform: uppercase;
        }
        .motion-wrap {
          padding: 56px 48px 48px;
          background: rgba(18,18,17,0.7);
          border: 1px solid var(--hairline-2);
          position: relative; overflow: hidden;
          margin-bottom: 40px;
        }
        .motion-wrap::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--gold-mid) 80%, transparent);
        }

        /* Timeline rail */
        .tl-rail { position: relative; margin: 60px 32px 24px; }
        .tl-line {
          position: relative; height: 2px;
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold) 6%,
                                      var(--gold-mid) 6%, var(--gold-mid) 100%);
        }
        .tl-anchor {
          position: absolute; top: -9px;
          display: flex; flex-direction: column; align-items: center;
        }
        .tl-anchor.today { left: 0; }
        .tl-anchor.close { right: 0; }
        .tl-dot {
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--black); position: relative; z-index: 2;
        }
        .tl-anchor.today .tl-dot {
          background: var(--gold); border: 3px solid var(--black);
          box-shadow: 0 0 0 2px var(--gold), 0 0 0 8px rgba(255,198,85,0.18);
          animation: todayPulse 2s ease-in-out infinite;
        }
        @keyframes todayPulse {
          0%, 100% { box-shadow: 0 0 0 2px var(--gold), 0 0 0 8px rgba(255,198,85,0.18); }
          50% { box-shadow: 0 0 0 2px var(--gold), 0 0 0 14px rgba(255,198,85,0); }
        }
        .tl-anchor.close .tl-dot {
          background: var(--black); border: 2px solid var(--mercury-faint);
          width: 16px; height: 16px; margin-top: 2px;
        }
        .tl-anchor-label {
          position: absolute; top: -42px; white-space: nowrap;
          font-size: 12.5px; letter-spacing: 0.24em;
          text-transform: uppercase; font-weight: 500;
        }
        .tl-anchor.today .tl-anchor-label { left: -8px; color: var(--gold); }
        .tl-anchor.close .tl-anchor-label { right: -8px; color: var(--mercury-dim); }
        .tl-anchor-sub {
          position: absolute; top: 34px; white-space: nowrap;
          font-size: 11px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--mercury-faint);
        }
        .tl-anchor.today .tl-anchor-sub { left: -4px; }
        .tl-anchor.close .tl-anchor-sub { right: -4px; }

        .tl-marker {
          position: absolute; top: -8px; transform: translateX(-50%);
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--gold); border: 3px solid var(--black);
          box-shadow: 0 0 0 2px var(--gold);
          z-index: 2;
        }
        .tl-marker.active { animation: activeMarker 2s ease-in-out infinite; }
        @keyframes activeMarker {
          0%, 100% { box-shadow: 0 0 0 2px var(--gold), 0 0 0 5px rgba(255,198,85,0.3); }
          50% { box-shadow: 0 0 0 2px var(--gold), 0 0 0 12px rgba(255,198,85,0); }
        }
        .tl-marker-label {
          position: absolute; top: -34px; left: 50%; transform: translateX(-50%);
          white-space: nowrap; font-size: 12px; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); font-weight: 500;
        }

        .tl-cards {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
          margin-top: 56px;
        }
        .tl-card {
          background: rgba(0,0,0,0.45);
          border: 1px solid var(--gold-mid);
          padding: 28px 30px 24px;
          position: relative; transition: all 0.25s ease;
        }
        .tl-card:hover { border-color: var(--gold); background: rgba(0,0,0,0.6); }
        .tl-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--gold);
        }
        .tl-card-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 20px; margin-bottom: 16px;
        }
        .tl-card-left { flex: 1; }
        .tl-card-status {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11.5px; letter-spacing: 0.24em;
          color: var(--gold); text-transform: uppercase;
          padding: 5px 10px; border: 1px solid var(--gold);
          background: rgba(255,198,85,0.06); margin-bottom: 14px;
        }
        .tl-card-status .pulse-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--gold);
          animation: motionPulse 1.6s ease-in-out infinite;
        }
        .tl-card-date {
          font-size: 13px; letter-spacing: 0.22em;
          color: var(--mercury-dim); text-transform: uppercase;
          margin-bottom: 10px; font-weight: 500;
        }
        .tl-card-title {
          font-size: 22px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.015em; line-height: 1.2;
        }
        .tl-countdown {
          text-align: right; flex-shrink: 0; padding-left: 16px;
          border-left: 1px solid var(--hairline-2);
        }
        .tl-countdown .num {
          font-size: 36px; font-weight: 400; color: var(--gold);
          letter-spacing: -0.03em; line-height: 1;
          font-variant-numeric: tabular-nums; display: block;
        }
        .tl-countdown .unit {
          display: block; font-size: 11px; letter-spacing: 0.22em;
          color: var(--mercury-faint); text-transform: uppercase;
          margin-top: 6px; font-weight: 400;
        }
        .tl-countdown .review {
          font-size: 12.5px; letter-spacing: 0.22em;
          color: var(--gold); text-transform: uppercase;
          font-weight: 500; line-height: 1.3; padding-top: 4px;
        }
        .tl-card-desc {
          font-size: 15px; line-height: 1.6; color: var(--mercury-dim);
          font-weight: 400; margin-bottom: 16px;
        }
        .tl-card-desc strong { color: var(--mercury); font-weight: 500; }
        .tl-card-meta {
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase;
          padding-top: 14px; border-top: 1px solid var(--hairline);
        }
        .tl-card-meta .accent { color: var(--gold-mid); }

        /* Trophy case */
        .trophy-lead {
          display: flex; justify-content: space-between; align-items: baseline;
          margin: 40px 0 20px; padding-bottom: 14px;
          border-bottom: 1px solid var(--hairline-2);
        }
        .trophy-lead-title {
          font-size: 14px; letter-spacing: 0.3em;
          color: var(--gold); text-transform: uppercase;
          display: flex; align-items: center; gap: 12px;
        }
        .trophy-lead-title .seal {
          width: 18px; height: 18px; border-radius: 50%; background: #8FD8A5;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .trophy-lead-title .seal svg { width: 11px; height: 11px; display: block; }
        .trophy-lead-count {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--mercury-dim); text-transform: uppercase;
        }

        .trophy-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          margin-bottom: 72px;
        }
        .trophy-card {
          background: rgba(255,198,85,0.03);
          border: 1px solid var(--gold-mid);
          padding: 32px 28px 26px;
          position: relative; display: flex; flex-direction: column;
          min-height: 280px; transition: all 0.25s ease;
        }
        .trophy-card:hover { border-color: var(--gold); background: rgba(255,198,85,0.06); }
        .trophy-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: var(--gold);
        }
        .trophy-stamp {
          position: absolute; top: 22px; right: 22px;
          width: 46px; height: 46px; border-radius: 50%;
          background: #8FD8A5;
          display: flex; align-items: center; justify-content: center;
        }
        .trophy-stamp::after {
          content: ''; position: absolute; inset: -5px; border-radius: 50%;
          border: 1px solid #8FD8A5; opacity: 0.35;
        }
        .trophy-stamp svg { width: 20px; height: 20px; display: block; }
        .trophy-date {
          font-size: 12.5px; letter-spacing: 0.22em;
          color: var(--gold-mid); text-transform: uppercase;
          margin-bottom: 18px; padding-right: 70px; font-weight: 500;
        }
        .trophy-title {
          font-size: 22px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.015em; line-height: 1.2; margin-bottom: 14px;
          padding-right: 40px;
        }
        .trophy-desc {
          font-size: 15px; line-height: 1.6; color: var(--mercury-dim);
          font-weight: 400; margin-bottom: 20px; flex: 1;
        }
        .trophy-desc strong { color: var(--mercury); font-weight: 500; }
        .trophy-meta {
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase;
          padding-top: 14px; border-top: 1px solid var(--hairline);
        }
        .trophy-meta .accent { color: var(--gold-mid); }
      `}</style>
    </>
  );
}
