"use client";

// Floating tooltip for the Year Gantt SVG ticks.
// Mounts a single fixed-position card and listens for mouseover on any element
// carrying data-mt-title (set on each <rect>/<circle> in YearGanttSvg).
//
// Replaces native <title> browser tooltips, which take ~500ms to appear and
// can't be styled. V4 uses this pattern in baseline-deploy/meetings/index.html.

import { useEffect, useState } from "react";

type Tip = {
  title: string;
  date: string;
  cat: string;
  catClass: string; // "advisoryboard" / "investorupdate" / "strategicplanning" / "boardmeeting"
  x: number;
  y: number;
};

function tipKey(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, "");
}

export function MeetingTooltip() {
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    function onOver(e: MouseEvent) {
      const target = e.target as Element | null;
      const tick = target?.closest<HTMLElement | SVGElement>(
        "[data-mt-title]",
      );
      if (!tick) return;
      const title = tick.getAttribute("data-mt-title") ?? "";
      const date = tick.getAttribute("data-mt-date") ?? "";
      const cat = tick.getAttribute("data-mt-cat") ?? "Meeting";
      setTip({
        title,
        date,
        cat,
        catClass: tipKey(cat),
        x: e.clientX + 14,
        y: e.clientY + 14,
      });
    }

    function onMove(e: MouseEvent) {
      setTip((prev) => {
        if (!prev) return prev;
        let x = e.clientX + 14;
        let y = e.clientY + 14;
        // Keep within viewport — flip to the left/above when near edges
        if (x + 320 > window.innerWidth) x = e.clientX - 336;
        if (y + 120 > window.innerHeight) y = e.clientY - 130;
        return { ...prev, x, y };
      });
    }

    function onOut(e: MouseEvent) {
      const target = e.target as Element | null;
      const tick = target?.closest<HTMLElement | SVGElement>(
        "[data-mt-title]",
      );
      if (tick) setTip(null);
    }

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        className={`mt-tip${tip ? " visible" : ""}`}
        style={tip ? { left: tip.x, top: tip.y } : undefined}
        role="tooltip"
        aria-hidden={tip ? undefined : true}
      >
        {tip && (
          <>
            <div className="tt-title">{tip.title}</div>
            <div className="tt-date">{tip.date}</div>
            <span className={`tt-cat ${tip.catClass}`}>{tip.cat}</span>
          </>
        )}
      </div>

      <style>{`
        .mt-tip {
          position: fixed; pointer-events: none; z-index: 1000;
          background: rgba(18,18,17,0.96);
          border: 1px solid rgba(229,229,229,0.22);
          padding: 14px 16px; max-width: 320px;
          opacity: 0; transform: translateY(-4px);
          transition: opacity 0.12s ease, transform 0.12s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          left: 0; top: 0;
        }
        .mt-tip.visible { opacity: 1; transform: translateY(0); }
        .mt-tip .tt-title {
          font-size: 15px; font-weight: 500;
          color: var(--mercury); letter-spacing: -0.005em;
          line-height: 1.35; margin-bottom: 8px;
        }
        .mt-tip .tt-date {
          font-size: 12px; letter-spacing: 0.14em;
          color: var(--mercury-faint); text-transform: uppercase;
          margin-bottom: 10px;
        }
        .mt-tip .tt-cat {
          display: inline-block; padding: 3px 10px;
          font-size: 11px; letter-spacing: 0.16em;
          text-transform: uppercase; border: 1px solid;
        }
        /* Category colors — keys are lowercased + space-stripped category names */
        .mt-tip .tt-cat.advisoryboard {
          color: var(--mercury); border-color: rgba(229,229,229,0.5);
        }
        .mt-tip .tt-cat.investorupdate {
          color: var(--gold); border-color: var(--gold);
        }
        .mt-tip .tt-cat.strategicplanning {
          color: var(--gold-mid); border-color: var(--gold-mid);
        }
        .mt-tip .tt-cat.boardmeeting {
          color: var(--gold); border-color: var(--gold);
          background: rgba(255,198,85,0.08);
        }
      `}</style>
    </>
  );
}
