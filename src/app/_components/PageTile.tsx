import Link from "next/link";
import type { Route } from "next";

// Single tile in the "Continue" grid on /overview — three-column at 1480px.

export type PageTileProps = {
  num: string;
  name: string;
  desc: string;
  arrowLabel?: string;
  href: Route;
};

export function PageTile({
  num,
  name,
  desc,
  arrowLabel = "View",
  href,
}: PageTileProps) {
  return (
    <Link href={href} className="page-tile">
      <div className="num">{num}</div>
      <div className="name">{name}</div>
      <div className="desc">{desc}</div>
      <div className="arrow">
        {arrowLabel} <span>→</span>
      </div>

      <style>{`
        .page-tile {
          background: rgba(18,18,17,0.7); border: 1px solid var(--hairline-2);
          padding: 32px 28px; cursor: pointer; transition: all 0.25s;
          display: flex; flex-direction: column; text-decoration: none;
          min-height: 180px; position: relative; overflow: hidden;
        }
        .page-tile:hover {
          border-color: var(--gold-mid); background: rgba(30,28,24,0.95);
          transform: translateY(-2px);
        }
        .page-tile .num {
          font-size: 12px; letter-spacing: 0.24em;
          color: var(--gold-mid); margin-bottom: 20px;
          text-transform: uppercase;
        }
        .page-tile .name {
          font-size: 22px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.015em; line-height: 1.22; margin-bottom: 10px;
        }
        .page-tile .desc {
          font-size: 16px; line-height: 1.55; color: var(--mercury-dim);
          font-weight: 400; flex: 1;
        }
        .page-tile .arrow {
          margin-top: 20px; font-size: 12px; letter-spacing: 0.22em;
          color: var(--gold); text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
        }
        .page-tile .arrow span { display: inline-block; transition: transform 0.25s; }
        .page-tile:hover .arrow span { transform: translateX(4px); }
      `}</style>
    </Link>
  );
}
