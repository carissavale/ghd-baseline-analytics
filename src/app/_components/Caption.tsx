// Two-column editorial marginalia at the bottom of section pages.
// Used on /overview, /milestones, /deal-intel, /vault, etc.

export type CaptionPair = {
  anchor: string; // "THE CYCLE JUST CLOSED"
  headline: string;
  body: string;
};

export type CaptionProps = {
  left: CaptionPair;
  right: CaptionPair;
  animationDelay?: string;
};

export function Caption({ left, right, animationDelay }: CaptionProps) {
  return (
    <div
      className="caption fade"
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div className="caption-col">
        <div className="anchor">{left.anchor}</div>
        <div className="headline">{left.headline}</div>
        <div className="body">{left.body}</div>
      </div>
      <div className="caption-col">
        <div className="anchor">{right.anchor}</div>
        <div className="headline">{right.headline}</div>
        <div className="body">{right.body}</div>
      </div>

      <style>{`
        .caption {
          margin-top: 32px; display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; padding-top: 28px; border-top: 1px solid var(--hairline-2);
        }
        .caption-col .anchor {
          font-size: 12px; letter-spacing: 0.22em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .caption-col .anchor::before {
          content: ''; width: 18px; height: 1px; background: var(--gold);
        }
        .caption-col .headline {
          font-size: 20px; font-weight: 400; color: var(--mercury);
          line-height: 1.3; letter-spacing: -0.01em; margin-bottom: 10px;
        }
        .caption-col .body {
          font-size: 15px; line-height: 1.65; color: var(--mercury-dim); font-weight: 400;
        }
      `}</style>
    </div>
  );
}
