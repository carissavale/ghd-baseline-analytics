import type { MeetingCategory } from "@/lib/types";
import { MEETING_CATEGORY_LABELS } from "@/lib/types";

// Activity card — gold-left-bar variants per category. Used on /overview Recent Activity grid.

export type ActivityCardProps = {
  date: string;
  category: MeetingCategory;
  title: string;
  description: string;
  org: string;
  orgInitial: string;
};

export function ActivityCard({
  date,
  category,
  title,
  description,
  org,
  orgInitial,
}: ActivityCardProps) {
  return (
    <div className={`activity-card ${category}`}>
      <div className="activity-head">
        <span className="activity-date">{date}</span>
        <span className={`activity-cat ${category}`}>
          {MEETING_CATEGORY_LABELS[category]}
        </span>
      </div>
      <div className="activity-title">{title}</div>
      <p className="activity-desc">{description}</p>
      <div className="activity-org">
        <span className="dot">{orgInitial}</span>
        {org}
      </div>

      <style>{`
        .activity-card {
          background: rgba(18,18,17,0.9); border: 1px solid var(--hairline-2);
          border-left: 2px solid var(--gold-mid);
          padding: 22px 20px 20px;
          cursor: pointer; transition: all 0.25s ease;
          display: flex; flex-direction: column; min-height: 220px;
        }
        .activity-card:hover {
          border-color: var(--gold); border-left-color: var(--gold);
          background: rgba(30,28,24,0.95); transform: translateY(-2px);
        }
        .activity-card.investor  { border-left-color: var(--cat-investor); }
        .activity-card.advisory  { border-left-color: var(--cat-advisory); }
        .activity-card.strategy  { border-left-color: var(--cat-strategy); }
        .activity-card.board     { border-left-color: var(--cat-board); }

        .activity-head {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 12px;
        }
        .activity-date {
          font-size: 12px; letter-spacing: 0.18em;
          color: var(--mercury); text-transform: uppercase;
        }
        .activity-cat {
          font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase; padding: 3px 8px; border: 1px solid;
        }
        .activity-cat.investor  { color: var(--cat-investor); border-color: var(--cat-investor); }
        .activity-cat.advisory  { color: var(--cat-advisory); border-color: var(--cat-advisory); }
        .activity-cat.strategy  { color: var(--cat-strategy); border-color: var(--cat-strategy); }
        .activity-cat.board     { color: var(--cat-board);    border-color: var(--cat-board); }

        .activity-title {
          font-size: 15px; font-weight: 500; color: var(--mercury);
          line-height: 1.3; letter-spacing: -0.005em; margin-bottom: 10px;
        }
        .activity-desc {
          font-size: 14px; line-height: 1.55; color: var(--mercury-dim); font-weight: 400;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
          overflow: hidden; flex: 1;
        }
        .activity-org {
          margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--hairline);
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; letter-spacing: 0.16em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .activity-org .dot {
          width: 22px; height: 22px; border-radius: 5px;
          background: var(--mercury);
          border: 1px solid var(--hairline-2);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--black); font-weight: 700; letter-spacing: 0.02em;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
