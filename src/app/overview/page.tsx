import { TopNav } from "@/app/_components/TopNav";
import { Masthead } from "@/app/_components/Masthead";
import { SectionHeading } from "@/app/_components/SectionHeading";
import { StatLine } from "@/app/_components/StatLine";
import { ActivityCard } from "@/app/_components/ActivityCard";
import { AskWrap } from "@/app/_components/AskWrap";
import { PageTile } from "@/app/_components/PageTile";
import { Caption } from "@/app/_components/Caption";
import { BottomFooter } from "@/app/_components/BottomFooter";
import {
  cycleSummary,
  overviewStats,
  recentMeetings,
  shortDate,
} from "@/lib/mock-data";

// /overview — V4 dashboard landing page.
// Buzz section removed per Chase delta (May 22, 2026); sections renumbered.
// Section order: 01 Recent Activity → 02 Continue → bottom caption.

export default function OverviewPage() {
  return (
    <>
      <TopNav active="overview" />

      <div className="page">
        <Masthead
          dateline="Investor Portal · 23 April 2026"
          pub="Baseline Analytics · Stakeholder Brief 01"
          edition="Overview"
          cycle={`Cycle · ${cycleSummary.cycle}`}
        />

        {/* Hero with baseball video background */}
        <div className="hero-wrap">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source
              src="/brand_source/video/baseball_impact.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-video-overlay" />
          <div className="hero-kicker">Investor Portal · {cycleSummary.cycleLabel}</div>
          <h1 className="hero-headline">
            <span className="line">
              <span>If every pitch matters,</span>
            </span>
            <span className="line">
              <span className="em">
                <span className="noit">so does </span>every pitcher.
              </span>
            </span>
          </h1>
          <p className="standfirst">
            Baseline Analytics is the only league-wide AI-powered pitcher injury
            prevention system in motion with Major League Baseball in 2026.{" "}
            <em>
              This is the investor-facing brief for the fourth stakeholder cycle.
            </em>
          </p>
          <div className="hero-ctas">
            <a href="/ask" className="hero-cta primary">
              Ask the Portal →
            </a>
            <a href="/meetings" className="hero-cta secondary">
              View the Timeline →
            </a>
          </div>
        </div>

        {/* Stat line */}
        <StatLine stats={overviewStats} />

        {/* Ask the Portal · compact executive briefing strip */}
        <AskWrap />

        {/* Dual pitch · For Investors + For Teams */}
        <div className="pitch-dual fade" style={{ animationDelay: "0.38s" }}>
          <div className="pitch-card pitch-investor">
            <div className="pitch-eyebrow">For Investors · The Case</div>
            <div className="pitch-headline">
              A category the majors{" "}
              <em>can&apos;t afford to lose.</em>
            </div>
            <p className="pitch-body">
              Baseline Analytics is the{" "}
              <strong>
                only league-wide AI-powered pitcher injury prevention system
              </strong>{" "}
              in motion with Major League Baseball in 2026. Pitcher injuries
              alone cost MLB clubs <strong>$641M a year</strong> in disabled-list
              salary. The fix isn&apos;t another radar gun. It&apos;s a
              predictive operating system. Sports-tech comparables have cleared{" "}
              <strong>$6B+ in documented transactions</strong>. Baseline holds
              the first-mover lane, a direct MLB league-office relationship, and
              a proprietary biomechanical marker layer (ACIS) that can&apos;t be
              reverse-engineered from box scores.
            </p>
            <div className="pitch-stats">
              <div>
                <strong>$641M</strong>
                <span>Annual MLB Pitcher IL Cost</span>
              </div>
              <div>
                <strong>$6B+</strong>
                <span>Sports-Tech Comparables</span>
              </div>
              <div>
                <strong>30</strong>
                <span>MLB Clubs in Reach</span>
              </div>
            </div>
          </div>

          <div className="pitch-card pitch-teams">
            <div className="pitch-eyebrow">For Teams · The Mission</div>
            <div className="pitch-headline">
              Every athlete deserves a <em>baseline.</em>
            </div>
            <p className="pitch-body">
              <strong>One in three</strong> active MLB pitchers has undergone
              Tommy John surgery. Youth rates have climbed roughly{" "}
              <strong>5x since 2000</strong>, and the average return from UCL
              reconstruction runs a full season or more. Baseline&apos;s ACIS
              layer reads the biomechanical markers of injury{" "}
              <strong>before</strong> the injury happens. It works for any
              roster at any level: big-league clubhouses, minor-league
              affiliates, NCAA programs on the docket with{" "}
              <strong>Stanford and Wake Forest</strong>, and the high-school
              arms feeding the pipeline. Keep the arm healthy. Keep the career.
            </p>
            <div className="pitch-stats">
              <div>
                <strong>1 in 3</strong>
                <span>MLB Pitchers Post-UCL</span>
              </div>
              <div>
                <strong>5×</strong>
                <span>Rise in Youth Tommy John</span>
              </div>
              <div>
                <strong>12 to 18</strong>
                <span>Months to Return</span>
              </div>
            </div>
          </div>
        </div>

        {/* 01 · Recent Activity */}
        <div className="fade" style={{ animationDelay: "0.4s" }}>
          <SectionHeading
            num="01"
            title="Recent Activity"
            meta={`Latest Cycle · ${recentMeetings.length} Meetings`}
          />
          <div className="activity-grid">
            {recentMeetings.map((m) => (
              <ActivityCard
                key={m.id}
                date={shortDate(m.meeting_date)}
                category={m.category}
                title={m.title}
                description={m.summary}
                org={m.organization_name ?? "Internal"}
                orgInitial={m.organization_initial ?? "·"}
              />
            ))}
          </div>
        </div>

        {/* About This Portal — kept (no Buzz section means this moves up) */}
        <div className="portal-about fade" style={{ animationDelay: "0.46s" }}>
          <div className="portal-about-head">
            <div>
              <div className="portal-about-eyebrow">About This Portal</div>
              <h2 className="portal-about-headline">
                Why this portal <em>exists.</em>
              </h2>
            </div>
            <div>
              <p className="portal-about-copy">
                A centralized,{" "}
                <strong>login-protected information hub</strong> for Baseline
                Analytics investors, advisors, and strategic partners. Born from
                a challenge raised by Executive Chairman Jeff Newman · the
                burden of managing multiple informative call workloads with
                stakeholders who each need the same, consistent updates.
              </p>
              <div className="portal-about-quote">
                &ldquo;Everyone with access gets the same message, delivered the
                same way, on the same cadence.&rdquo;
                <span className="attrib">
                  Jeff Newman · Executive Chairman · Portal Architect
                </span>
              </div>
            </div>
          </div>

          <div className="portal-objectives-label">Core Objectives · Four</div>
          <div className="portal-objectives">
            <div className="obj-card">
              <div className="obj-num">01</div>
              <div className="obj-title">One Signal</div>
              <div className="obj-desc">
                Send the same, consistent message to every stakeholder with
                access.
              </div>
            </div>
            <div className="obj-card">
              <div className="obj-num">02</div>
              <div className="obj-title">Disclosure Control</div>
              <div className="obj-desc">
                Control the flow of information shared with the outside world.
              </div>
            </div>
            <div className="obj-card">
              <div className="obj-num">03</div>
              <div className="obj-title">No Dark Spots</div>
              <div className="obj-desc">
                No investor or stakeholder can complain of being kept in the
                dark.
              </div>
            </div>
            <div className="obj-card">
              <div className="obj-num">04</div>
              <div className="obj-title">High Satisfaction</div>
              <div className="obj-desc">
                Sustain stakeholder satisfaction through well-managed BA
                infotainment.
              </div>
            </div>
          </div>
        </div>

        {/* 02 · Continue */}
        <div className="fade" style={{ animationDelay: "0.54s" }}>
          <SectionHeading
            num="02"
            title="Continue"
            meta="Six Stakeholder Briefs"
          />
          <div className="pages-grid">
            <PageTile
              num="Brief 02"
              name="Milestones"
              desc="H1 2026 commitments against delivery. Three cleared, two in motion."
              href="/milestones"
            />
            <PageTile
              num="Brief 03"
              name="Meetings"
              desc="Rolling summary, call log, and the full Year Timeline."
              href="/meetings"
            />
            <PageTile
              num="Brief 04"
              name="Advisory Board"
              desc="Eleven active industry advisors. Three pending. One upcoming."
              href="/advisory-board"
            />
            <PageTile
              num="Brief 05"
              name="Team"
              desc="Executive leadership. Chase Spivey, Sheldon McClelland, Jeff Newman, Ramesh Bobba, John Mendez."
              href="/team"
            />
            <PageTile
              num="Brief 09"
              name="Vault"
              desc="Intel, governance, brand, case study, deck, and lead copy. Dated and attributed."
              href="/vault"
            />
            <PageTile
              num="Interface"
              name="Ask the Portal"
              desc="Ask a question. The full cycle dataset answers."
              arrowLabel="Open"
              href="/ask"
            />
          </div>
        </div>

        {/* Caption row */}
        <Caption
          animationDelay="0.62s"
          left={{
            anchor: "THE CYCLE JUST CLOSED",
            headline: cycleSummary.closedTitle,
            body: cycleSummary.closedBody,
          }}
          right={{
            anchor: "THE CYCLE AHEAD",
            headline: cycleSummary.aheadTitle,
            body: cycleSummary.aheadBody,
          }}
        />

        <BottomFooter brief="Baseline Analytics · Investor Portal · 01 · Overview" />
      </div>

      <style>{`
        .page { max-width: 1480px; margin: 0 auto; padding: 72px 60px 120px; }

        /* Hero */
        .hero-wrap {
          position: relative; overflow: hidden;
          margin: -24px -60px 28px -60px;
          padding: 72px 60px 48px;
        }
        .hero-video {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.5; z-index: 0;
          filter: contrast(1.08) brightness(0.85);
          pointer-events: none;
        }
        .hero-video-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center left, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%),
                      linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .hero-kicker {
          font-size: 12px; letter-spacing: 0.28em;
          color: var(--gold); text-transform: uppercase;
          margin-bottom: 20px;
          position: relative; z-index: 2;
          opacity: 0; animation: fadeIn 1.4s ease 0.6s both;
        }
        .hero-headline {
          font-size: 60px; font-weight: 400; line-height: 1.08;
          letter-spacing: -0.03em; color: var(--mercury);
          max-width: 1100px;
          position: relative; z-index: 2;
        }
        .hero-headline .line { display: block; overflow: hidden; padding: 0.12em 0; }
        .hero-headline .line > span {
          display: inline-block;
          animation: heroSlide 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .hero-headline .line:nth-child(1) > span { animation-delay: 0.15s; }
        .hero-headline .line:nth-child(2) > span { animation-delay: 0.45s; }
        .hero-headline .em { color: var(--gold); font-weight: 400; font-style: italic; }
        .hero-headline .em .noit { font-style: normal; }

        .standfirst {
          max-width: 760px; font-size: 16px; line-height: 1.5; color: var(--mercury-dim);
          font-weight: 400; margin: 28px 0 24px; letter-spacing: -0.005em;
          position: relative; z-index: 2;
        }
        .standfirst em { color: var(--mercury); font-style: normal; }

        .hero-ctas {
          display: flex; gap: 12px; flex-wrap: wrap;
          margin-top: 4px; position: relative; z-index: 2;
          opacity: 0; animation: fadeIn 1.2s ease 1.2s forwards;
        }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 24px;
          font-size: 13px; letter-spacing: 0.24em;
          text-transform: uppercase; font-weight: 500;
          text-decoration: none; cursor: pointer; transition: all 0.2s;
          border: 1px solid; background: transparent;
        }
        .hero-cta.primary { background: var(--gold); color: var(--black); border-color: var(--gold); }
        .hero-cta.primary:hover { background: #ffd37a; border-color: #ffd37a; transform: translateY(-1px); }
        .hero-cta.secondary { color: var(--mercury); border-color: rgba(229,229,229,0.38); }
        .hero-cta.secondary:hover { color: var(--gold); border-color: var(--gold); background: rgba(255,198,85,0.06); }

        /* Activity grid */
        .activity-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
          margin-bottom: 72px;
        }

        /* Pitch dual */
        .pitch-dual {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
          margin-bottom: 72px;
        }
        .pitch-card {
          background: rgba(18,18,17,0.85); border: 1px solid var(--hairline-2);
          padding: 40px 44px 36px; position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .pitch-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
        }
        .pitch-investor::before { background: var(--gold); }
        .pitch-teams::before { background: var(--gold-mid); }
        .pitch-eyebrow {
          font-size: 12px; letter-spacing: 0.24em;
          text-transform: uppercase; margin-bottom: 18px;
        }
        .pitch-investor .pitch-eyebrow { color: var(--gold); }
        .pitch-teams .pitch-eyebrow { color: var(--gold-mid); }
        .pitch-headline {
          font-size: 26px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.015em; line-height: 1.2; margin-bottom: 18px;
        }
        .pitch-headline em { color: var(--gold); font-style: italic; font-weight: 400; }
        .pitch-body {
          font-size: 15px; line-height: 1.6; color: var(--mercury-dim);
          font-weight: 400; margin-bottom: 24px; flex: 1;
        }
        .pitch-body strong { color: var(--mercury); font-weight: 500; }
        .pitch-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
          border-top: 1px solid var(--hairline-2); padding-top: 20px;
        }
        .pitch-stats > div { padding-right: 14px; }
        .pitch-stats > div + div { padding-left: 14px; border-left: 1px solid var(--hairline); }
        .pitch-stats strong {
          display: block; font-size: 28px; font-weight: 400; color: var(--gold);
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }
        .pitch-teams .pitch-stats strong { color: var(--gold-mid); }
        .pitch-stats span {
          display: block; font-size: 11px; letter-spacing: 0.18em;
          color: var(--mercury-faint); text-transform: uppercase; line-height: 1.35;
        }

        /* About This Portal */
        .portal-about {
          background: rgba(18,18,17,0.6); border: 1px solid var(--hairline-2);
          border-left: 3px solid var(--gold);
          padding: 40px 44px; margin-bottom: 72px;
        }
        .portal-about-head {
          display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px;
          padding-bottom: 32px; margin-bottom: 32px;
          border-bottom: 1px solid var(--hairline);
          align-items: start;
        }
        .portal-about-eyebrow {
          font-size: 12px; letter-spacing: 0.28em;
          color: var(--gold); text-transform: uppercase; margin-bottom: 18px;
        }
        .portal-about-headline {
          font-size: 28px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.015em; line-height: 1.15;
        }
        .portal-about-headline em { color: var(--gold); font-style: italic; font-weight: 400; }
        .portal-about-copy {
          font-size: 16px; line-height: 1.55; color: var(--mercury-dim); font-weight: 400;
        }
        .portal-about-copy strong { color: var(--mercury); font-weight: 500; }
        .portal-about-quote {
          margin-top: 18px; padding-left: 16px;
          border-left: 2px solid var(--gold-mid);
          font-size: 16px; line-height: 1.55; color: var(--mercury); font-style: italic;
        }
        .portal-about-quote .attrib {
          display: block; margin-top: 8px; font-style: normal;
          font-size: 12px; letter-spacing: 0.16em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .portal-objectives-label {
          font-size: 12px; letter-spacing: 0.24em;
          color: var(--gold-mid); text-transform: uppercase;
          margin-bottom: 20px;
        }
        .portal-objectives {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
        }
        .obj-card {
          background: rgba(0,0,0,0.4); border: 1px solid var(--hairline-2);
          padding: 22px 22px 20px; display: flex; flex-direction: column;
          position: relative; min-height: 160px;
        }
        .obj-num {
          font-size: 12px; letter-spacing: 0.22em;
          color: var(--gold); text-transform: uppercase;
          margin-bottom: 14px;
        }
        .obj-title {
          font-size: 15px; font-weight: 500; color: var(--mercury);
          letter-spacing: -0.005em; line-height: 1.25; margin-bottom: 10px;
        }
        .obj-desc {
          font-size: 12.5px; line-height: 1.5; color: var(--mercury-dim);
          font-weight: 400; flex: 1;
        }

        /* Pages grid */
        .pages-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          margin-bottom: 72px;
        }
      `}</style>
    </>
  );
}
