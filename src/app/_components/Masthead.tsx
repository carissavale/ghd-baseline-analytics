// Editorial masthead — dateline + pub on left, edition + cycle on right.

export type MastheadProps = {
  dateline: string; // "Investor Portal · 23 April 2026"
  pub: string; // "Baseline Analytics · Stakeholder Brief 01"
  edition: string; // "Overview"
  cycle: string; // "Cycle · 24 Mar to 23 Apr 2026"
};

export function Masthead({ dateline, pub, edition, cycle }: MastheadProps) {
  return (
    <div className="masthead fade">
      <div className="masthead-left">
        <div className="dateline">{dateline}</div>
        <div className="pub">{pub}</div>
      </div>
      <div className="masthead-right">
        <div className="ed">{edition}</div>
        <div>{cycle}</div>
      </div>

      <style>{`
        .masthead {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding-bottom: 20px; border-bottom: 1px solid var(--hairline-2);
          margin-bottom: 56px;
        }
        .masthead-left .dateline {
          font-size: 12px; letter-spacing: 0.26em; color: var(--gold-mid);
          text-transform: uppercase; margin-bottom: 8px;
        }
        .masthead-left .pub { font-size: 15px; color: var(--mercury-dim); letter-spacing: 0.02em; }
        .masthead-right {
          text-align: right; font-size: 12px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .masthead-right .ed { color: var(--mercury-dim); }
      `}</style>
    </div>
  );
}
