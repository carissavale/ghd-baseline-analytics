import type { ReactNode } from "react";

// Editorial section heading — gold-mid section number, large title, meta on right.

export type SectionHeadingProps = {
  num: string; // "01", "02", "Interface"
  title: string;
  meta?: ReactNode;
};

export function SectionHeading({ num, title, meta }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="num">{num}</span>
      <span className="title">{title}</span>
      {meta != null && <span className="meta">{meta}</span>}

      <style>{`
        .section-heading {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: 16px; border-bottom: 1px solid var(--hairline-2);
          margin-bottom: 32px;
        }
        .section-heading .num {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--gold-mid); text-transform: uppercase;
        }
        .section-heading .title {
          font-size: 26px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.01em; flex: 1; padding-left: 24px;
        }
        .section-heading .meta {
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury-dim); text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
