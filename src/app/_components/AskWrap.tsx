"use client";

// Compact executive briefing strip — single-line ask input + chip prompts.
// Posts to /ask with ?q= preselected. V4 puts this at top of /overview and /vault.

import { useRouter } from "next/navigation";
import { useState } from "react";

export type AskWrapProps = {
  eyebrow?: string;
  prompts?: ReadonlyArray<{ label: string; query: string }>;
};

const DEFAULT_PROMPTS = [
  { label: "Investor meetings", query: "How many investor meetings this month?" },
  { label: "IAB status", query: "Latest on IAB onboarding?" },
  { label: "Comparables", query: "Deal comparables overview" },
  { label: "Materials", query: "Materials created this cycle?" },
] as const;

export function AskWrap({
  eyebrow = "Executive Briefing",
  prompts = DEFAULT_PROMPTS,
}: AskWrapProps) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function go(query: string) {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/ask?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="ask-wrap fade">
      <span className="ask-eyebrow">{eyebrow}</span>
      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
      >
        <input
          type="text"
          name="q"
          className="ask-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Query portal data in natural language…"
          autoComplete="off"
        />
        <button type="submit" className="ask-send">
          Ask →
        </button>
      </form>
      <div className="ask-prompts">
        {prompts.map((p) => (
          <button
            key={p.query}
            type="button"
            className="ask-prompt"
            onClick={() => go(p.query)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <style>{`
        .ask-wrap {
          background: rgba(18,18,17,0.75); border: 1px solid var(--gold-mid);
          padding: 18px 22px; margin-bottom: 56px; position: relative;
          display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
        }
        .ask-wrap::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--gold);
        }
        .ask-eyebrow {
          font-size: 12px; letter-spacing: 0.24em; color: var(--gold);
          text-transform: uppercase; white-space: nowrap; flex-shrink: 0;
        }
        .ask-form { display: flex; gap: 8px; flex: 1; min-width: 280px; }
        .ask-input {
          flex: 1; background: rgba(0,0,0,0.5); border: 1px solid var(--hairline-2);
          color: var(--mercury); padding: 10px 14px;
          font-size: 16px; font-weight: 400; letter-spacing: -0.005em;
          outline: none; transition: border-color 0.2s;
        }
        .ask-input::placeholder { color: var(--mercury-faint); }
        .ask-input:focus { border-color: var(--gold); }
        .ask-send {
          background: var(--gold); color: var(--black); border: none;
          padding: 0 20px; font-size: 12px; letter-spacing: 0.22em;
          text-transform: uppercase; font-weight: 500;
          cursor: pointer; transition: background 0.2s; white-space: nowrap;
        }
        .ask-send:hover { background: #ffd37a; }
        .ask-prompts { display: flex; gap: 6px; flex-wrap: wrap; }
        .ask-prompt {
          background: transparent; border: 1px solid var(--hairline-2);
          padding: 7px 12px; cursor: pointer; transition: all 0.2s;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--mercury-dim); white-space: nowrap;
        }
        .ask-prompt:hover {
          border-color: var(--gold); color: var(--gold);
          background: rgba(255,198,85,0.06);
        }
      `}</style>
    </div>
  );
}
