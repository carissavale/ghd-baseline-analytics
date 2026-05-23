import { LoginForm } from "./LoginForm";

// /login — V4 full-bleed baseball video, gold-accent login card.
// Server component renders the chrome; LoginForm is client-side for auth.

export default function LoginPage() {
  return (
    <>
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/brand_source/video/baseball_impact.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay" />
      <div className="vignette" />

      <div className="top-bar">
        <div className="brand">Baseline Analytics · Investor Portal</div>
        <div className="auth-meta">Confidential · Invitation Only</div>
      </div>

      <div className="stage">
        <div className="logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand_source/Full Stack - Sunglow Shades & Mercury.svg"
            alt="Baseline Analytics"
          />
        </div>

        <div className="tagline">
          <em>Every Athlete</em> Deserves a Baseline.
        </div>

        <LoginForm />
      </div>

      <div className="bottom-bar">
        <div className="tagline-small">
          Baseline Analytics · <em>2026</em>
        </div>
        <div>Prepared for invited stakeholders</div>
      </div>

      <style>{`
        html, body { overflow: hidden; height: 100vh; width: 100vw; }

        .bg-video {
          position: fixed; inset: 0; width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
          opacity: 0.55; filter: contrast(1.1) brightness(0.9);
          pointer-events: none;
        }
        .bg-overlay {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background:
            radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.7) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.55) 100%);
        }
        .vignette {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          box-shadow: inset 0 0 240px rgba(0,0,0,0.85);
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
        .top-bar .auth-meta {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--mercury-faint); text-transform: uppercase;
        }

        .stage {
          position: relative; z-index: 5;
          min-height: 100vh; width: 100%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 48px;
        }

        .logo-wrap {
          margin-bottom: 48px; opacity: 0;
          animation: logoFade 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
        }
        .logo-wrap img { width: 280px; height: auto; display: block; }

        .tagline {
          font-size: 15px; color: var(--mercury-dim); font-weight: 400;
          letter-spacing: -0.005em; font-style: italic;
          margin-bottom: 64px; text-align: center;
          opacity: 0; animation: fadeUp 1.2s ease 0.9s forwards;
        }
        .tagline em { color: var(--gold); font-style: italic; font-weight: 400; }

        .bottom-bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 10;
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 48px;
          font-size: 12px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .bottom-bar .tagline-small em { color: var(--gold); font-style: normal; }
      `}</style>
    </>
  );
}
