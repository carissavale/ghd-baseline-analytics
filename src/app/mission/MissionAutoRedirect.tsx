"use client";

// Renders the "Enter Portal →" / "Skip Intro →" controls in the top-right
// of /mission and runs the countdown that auto-forwards to /overview.

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type MissionAutoRedirectProps = {
  seconds: number;
  target: string;
};

export function MissionAutoRedirect({
  seconds,
  target,
}: MissionAutoRedirectProps) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          router.push(target);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [router, target]);

  function skip() {
    router.push(target);
  }

  return (
    <div className="mission-controls">
      <button type="button" className="enter-btn" onClick={skip}>
        Enter the Portal →
      </button>
      <button type="button" className="skip" onClick={skip}>
        Skip Intro →
      </button>
      <span className="auto-note">
        Auto-advancing in <span className="count">{remaining}</span>s
      </span>

      <style>{`
        .mission-controls {
          display: flex; align-items: center; gap: 16px;
        }
        .mission-controls .enter-btn {
          background: var(--gold); color: var(--black); border: none;
          padding: 12px 22px;
          font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase;
          font-weight: 500; cursor: pointer;
          transition: all 0.2s;
        }
        .mission-controls .enter-btn:hover {
          background: #ffd37a; transform: translateY(-1px);
        }
        .mission-controls .skip {
          background: none; border: none; padding: 0;
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--mercury-faint); text-transform: uppercase;
          cursor: pointer; transition: color 0.2s;
        }
        .mission-controls .skip:hover { color: var(--gold); }
        .mission-controls .auto-note {
          font-size: 12px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .mission-controls .auto-note .count {
          color: var(--gold); font-weight: 500;
          min-width: 14px; display: inline-block;
        }
      `}</style>
    </div>
  );
}
