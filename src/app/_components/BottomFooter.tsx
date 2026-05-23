// Page-bottom footer — tagline on left, mono brief label on right.

export type BottomFooterProps = {
  brief: string; // "Baseline Analytics · Investor Portal · 01 · Overview"
};

export function BottomFooter({ brief }: BottomFooterProps) {
  return (
    <div className="bottom">
      <div className="tagline">
        <em>Every Athlete</em> Deserves a Baseline.
      </div>
      <div className="bottom-mono">{brief}</div>

      <style>{`
        .bottom {
          margin-top: 80px; padding-top: 24px;
          border-top: 1px solid var(--hairline-2);
          display: flex; justify-content: space-between; align-items: center;
        }
        .tagline { font-size: 15px; font-weight: 400; color: var(--mercury-dim); letter-spacing: 0.02em; }
        .tagline em { color: var(--gold); font-style: normal; font-weight: 400; }
        .bottom-mono {
          font-size: 12px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
