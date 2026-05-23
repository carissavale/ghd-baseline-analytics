"use client";

// Full-width "Ask the Portal · Executive Briefing" CTA card.
// V4 uses this on /milestones, /deal-intel, /vault — taller than the AskWrap
// strip on /overview.

import { useRouter } from "next/navigation";
import { useState } from "react";

export type AskCompactProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string; // text wrapped in <em> after the title
  sub?: string;
  animationDelay?: string;
};

export function AskCompact({
  eyebrow = "Ask the Portal · Executive Briefing",
  title = "Ask a question.",
  titleAccent = "The portal answers.",
  sub = "Plain-English questions across meetings, milestones, materials, and roster.",
  animationDelay,
}: AskCompactProps) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function go(query: string) {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/ask?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div
      className="ask-compact fade"
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div>
        <div className="ask-compact-eyebrow">{eyebrow}</div>
        <div className="ask-compact-title">
          {title} <em>{titleAccent}</em>
        </div>
        <div className="ask-compact-sub">{sub}</div>
      </div>
      <form
        className="ask-compact-form"
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
      >
        <input
          type="text"
          name="q"
          className="ask-compact-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What do you need to know?"
          autoComplete="off"
        />
        <button type="submit" className="ask-compact-send">
          Ask →
        </button>
      </form>

      <style>{`
        .ask-compact {
          margin: 0 0 56px; padding: 28px 36px;
          border: 1px solid var(--gold-mid); background: rgba(18,18,17,0.7);
          position: relative; display: flex; flex-direction: column; gap: 20px;
        }
        .ask-compact::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--gold);
        }
        .ask-compact-eyebrow {
          font-size: 12px; letter-spacing: 0.24em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 10px;
        }
        .ask-compact-title {
          font-size: 28px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 8px;
        }
        .ask-compact-title em { color: var(--gold); font-style: normal; font-weight: 400; }
        .ask-compact-sub {
          font-size: 16px; color: var(--mercury-dim); font-weight: 400;
          max-width: 620px; line-height: 1.5;
        }
        .ask-compact-form { display: flex; gap: 10px; }
        .ask-compact-input {
          flex: 1; background: rgba(0,0,0,0.5); border: 1px solid var(--hairline-2);
          color: var(--mercury); padding: 14px 18px;
          font-family: inherit; font-size: 15px; font-weight: 400; letter-spacing: -0.005em;
          outline: none; transition: border-color 0.2s;
        }
        .ask-compact-input::placeholder { color: var(--mercury-faint); }
        .ask-compact-input:focus { border-color: var(--gold); }
        .ask-compact-send {
          background: var(--gold); color: var(--black); border: none;
          padding: 0 28px; font-size: 13px; letter-spacing: 0.22em;
          text-transform: uppercase; font-weight: 500;
          cursor: pointer; transition: background 0.2s; white-space: nowrap;
        }
        .ask-compact-send:hover { background: #ffd37a; }
      `}</style>
    </div>
  );
}
