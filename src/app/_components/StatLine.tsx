"use client";

// Four-column stat row — animated count-up on scroll into view.
// V4 parsing rules: $ prefix, B+/M+/K/×/+ suffixes, comma separators.

import { useEffect, useRef } from "react";

export type Stat = {
  value: string; // raw display, may contain $ prefix or suffix
  label: string;
  accent?: boolean;
  compact?: boolean; // for short text values like "H1 2026"
};

export type StatLineProps = {
  stats: ReadonlyArray<Stat>;
};

type Parsed = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  hasComma: boolean;
};

function parseStat(text: string): Parsed | null {
  const t = text.trim();
  const m = t.match(/^([$])?([\d,.]+)(B\+?|M\+?|K|×|x|\+)?$/i);
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  const target = parseFloat(raw);
  if (Number.isNaN(target)) return null;
  return {
    prefix: m[1] ?? "",
    target,
    suffix: m[3] ?? "",
    decimals: (raw.split(".")[1] ?? "").length,
    hasComma: m[2].includes(","),
  };
}

function fmt(n: number, p: Parsed): string {
  let s = n.toFixed(p.decimals);
  if (p.hasComma) {
    s = parseFloat(s).toLocaleString("en-US", {
      minimumFractionDigits: p.decimals,
      maximumFractionDigits: p.decimals,
    });
  }
  return p.prefix + s + p.suffix;
}

export function StatLine({ stats }: StatLineProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLDivElement>(".num:not(.compact)"),
    );

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLDivElement;
          const p = parseStat(el.dataset.raw ?? el.textContent ?? "");
          if (!p) {
            obs.unobserve(el);
            return;
          }
          el.textContent = fmt(0, p);
          const dur = 1100;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = fmt(p.target * eased, p);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        });
      },
      { threshold: 0.4 },
    );

    targets.forEach((el) => {
      el.dataset.raw = el.textContent ?? "";
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <div className="stat-line fade" ref={rootRef}>
      {stats.map((s, i) => (
        <div className="stat" key={`${s.label}-${i}`}>
          <div
            className={`num${s.accent ? " accent" : ""}${s.compact ? " compact" : ""}`}
          >
            {s.value}
          </div>
          <div className="label">{s.label}</div>
        </div>
      ))}

      <style>{`
        .stat-line {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--hairline-2);
          border-bottom: 1px solid var(--hairline-2);
          margin-bottom: 64px;
        }
        .stat { padding: 28px 32px; border-right: 1px solid var(--hairline); }
        .stat:first-child { padding-left: 0; }
        .stat:last-child { border-right: none; padding-right: 0; }
        .stat .num {
          font-size: 48px; font-weight: 400; letter-spacing: -0.025em; line-height: 1;
          color: var(--mercury); font-variant-numeric: tabular-nums;
        }
        .stat .num.accent { color: var(--gold); }
        .stat .num.compact { font-size: 28px; padding-top: 10px; letter-spacing: -0.015em; }
        .stat .label {
          font-size: 12px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase; margin-top: 12px;
        }
      `}</style>
    </div>
  );
}
