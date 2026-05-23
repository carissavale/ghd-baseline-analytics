import { MissionAutoRedirect } from "./MissionAutoRedirect";

// /mission — splash intro page with 18s auto-redirect to /overview.
// Skip Intro button cuts the countdown. Lines slide in one at a time.

const AUTO_SECONDS = 18;

export default function MissionPage() {
  return (
    <>
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/brand_source/video/baseball_impact.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay" />
      <div className="vignette" />

      <div className="top-bar">
        <div className="brand">Baseline Analytics · Investor Portal</div>
        <MissionAutoRedirect seconds={AUTO_SECONDS} target="/overview" />
      </div>

      <div className="stage">
        <div className="eyebrow">The Mission</div>

        <h1 className="mission-head">
          <span className="line">
            <span>Every athlete deserves</span>
          </span>
          <span className="line">
            <span className="em">a baseline.</span>
          </span>
        </h1>

        <div className="mission-body">
          <p>
            <strong>One in three active MLB pitchers</strong> has undergone Tommy
            John surgery. Youth rates have climbed fivefold in twenty years.
            Baseline Analytics is the <em>only</em> league-wide AI-powered
            pitcher injury prevention system in motion with Major League
            Baseball · reading the biomechanical markers of injury before the
            injury happens. We see what the eye can&apos;t. We protect what the
            game can&apos;t afford to lose.
          </p>
        </div>

        <div className="mission-stats">
          <div className="mission-stat">
            <strong>1 in 3</strong>
            <span>
              MLB Pitchers
              <br />
              Post-UCL Surgery
            </span>
          </div>
          <div className="mission-stat">
            <strong>5×</strong>
            <span>
              Rise in Youth
              <br />
              Tommy John Since 2000
            </span>
          </div>
          <div className="mission-stat">
            <strong>$641M</strong>
            <span>
              Annual MLB
              <br />
              Pitcher Injury Cost
            </span>
          </div>
        </div>
      </div>

      <div className="bottom-tag">
        <em>Every Athlete</em> Deserves a Baseline.
      </div>

      <div className="progress" />

      <style>{`
        html, body {
          min-height: 100vh; width: 100vw; overflow-x: hidden;
        }

        .bg-video {
          position: fixed; inset: 0; width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
          opacity: 0.72; filter: contrast(1.1) brightness(0.82) saturate(1.05);
          pointer-events: none;
        }
        .bg-overlay {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background:
            radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.62) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.48) 100%);
        }
        .vignette {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          box-shadow: inset 0 0 260px rgba(0,0,0,0.8);
        }

        .top-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 10;
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 48px;
        }
        .top-bar .brand {
          font-size: 12px; letter-spacing: 0.26em;
          color: var(--gold); text-transform: uppercase;
        }

        .stage {
          position: relative; z-index: 5;
          height: 100vh; width: 100%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 80px 48px 64px; text-align: center;
        }

        .eyebrow {
          font-size: 13px; letter-spacing: 0.34em;
          color: var(--gold); text-transform: uppercase;
          margin-bottom: 24px; opacity: 0;
          animation: fadeIn 1.2s ease 0.3s forwards;
        }
        .eyebrow::before, .eyebrow::after {
          content: ''; display: inline-block; width: 28px; height: 1px;
          background: var(--gold); vertical-align: middle; margin: 0 18px;
        }

        .mission-head {
          font-size: 56px; font-weight: 400; line-height: 1.08;
          letter-spacing: -0.03em; color: var(--mercury);
          max-width: 1060px; margin-bottom: 28px;
          text-shadow: 0 2px 18px rgba(0,0,0,0.6);
        }
        .mission-head .line {
          display: block; overflow: hidden; padding: 0.08em 0;
        }
        .mission-head .line > span {
          display: inline-block;
          animation: lineSlide 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .mission-head .line:nth-child(1) > span { animation-delay: 0.7s; }
        .mission-head .line:nth-child(2) > span { animation-delay: 1.1s; }
        .mission-head .em { color: var(--gold); font-weight: 400; font-style: italic; }

        .mission-body {
          max-width: 820px; margin: 0 auto 32px;
          font-size: 18px; line-height: 1.62;
          color: var(--mercury-dim); font-weight: 400;
          letter-spacing: -0.005em;
          text-shadow: 0 1px 12px rgba(0,0,0,0.55);
          opacity: 0; animation: fadeUp 1.4s ease 1.8s forwards;
        }
        .mission-body strong { color: var(--mercury); font-weight: 500; }
        .mission-body em { color: var(--gold); font-style: normal; font-weight: 400; }

        .mission-stats {
          display: flex; gap: 40px; justify-content: center;
          margin-bottom: 32px; padding: 20px 0;
          border-top: 1px solid var(--hairline-2); border-bottom: 1px solid var(--hairline-2);
          width: 100%; max-width: 780px;
          opacity: 0; animation: fadeUp 1.4s ease 2.2s forwards;
        }
        .mission-stat { text-align: center; flex: 1; }
        .mission-stat strong {
          display: block; font-size: 38px; font-weight: 400; color: var(--gold);
          letter-spacing: -0.025em; line-height: 1;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 2px 14px rgba(0,0,0,0.55);
        }
        .mission-stat span {
          display: block; font-size: 11px; letter-spacing: 0.22em;
          color: var(--mercury-faint); text-transform: uppercase;
          margin-top: 10px; line-height: 1.4;
        }

        .progress {
          position: fixed; bottom: 0; left: 0; height: 2px;
          background: var(--gold); width: 0%;
          animation: progressFill ${AUTO_SECONDS}s linear 2.9s forwards;
          z-index: 10;
        }

        .bottom-tag {
          position: fixed; bottom: 18px; left: 48px; z-index: 10;
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .bottom-tag em { color: var(--gold); font-style: normal; }

        @media (max-width: 700px) {
          .mission-head { font-size: 38px; }
          .mission-body { font-size: 16px; }
          .mission-stats { flex-direction: column; gap: 20px; }
          .mission-stat strong { font-size: 32px; }
        }
      `}</style>
    </>
  );
}
