// V4 Year Timeline — annual Gantt for 19 relationships across 5 tiers.
// Pulled directly from baseline-deploy/meetings/index.html lines ~717–878.
//
// Each meeting tick carries data-mt-title / data-mt-date / data-mt-cat
// attributes. The parent /meetings page listens for mouseover on these and
// renders a custom floating tooltip (much faster than the browser's native
// <title> tooltip, which has a ~500ms delay and zero styling).

export function YearGanttSvg() {
  return (
    <svg
      className="timetable"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="1440" height="820" fill="transparent" />

      {/* Year label */}
      <text
        x="739"
        y="26"
        textAnchor="middle"
        fill="rgba(229,229,229,0.45)"
        fontFamily="Manrope, -apple-system, sans-serif"
        fontSize="10"
        letterSpacing="0.28em"
      >
        2025 · 2026
      </text>

      {/* Month labels */}
      <g
        fontFamily="Manrope, -apple-system, sans-serif"
        fontSize="10"
        letterSpacing="0.2em"
        fill="rgba(229,229,229,0.55)"
      >
        <text x="280" y="66" textAnchor="start">OCT</text>
        <text x="380" y="66" textAnchor="start">NOV</text>
        <text x="557" y="66" textAnchor="start">DEC</text>
        <text x="740" y="66" textAnchor="start">JAN</text>
        <text x="923" y="66" textAnchor="start">FEB</text>
        <text x="1088" y="66" textAnchor="start">MAR</text>
        <text x="1270" y="66" textAnchor="start">APR</text>
      </g>

      <line x1="40" y1="80" x2="1400" y2="80" stroke="rgba(229,229,229,0.22)" strokeWidth="1" />

      {/* Month tick lines */}
      <g stroke="rgba(229,229,229,0.08)" strokeWidth="1">
        <line x1="280" y1="80" x2="280" y2="760" />
        <line x1="380" y1="80" x2="380" y2="760" />
        <line x1="557" y1="80" x2="557" y2="760" />
        <line x1="740" y1="80" x2="740" y2="760" />
        <line x1="923" y1="80" x2="923" y2="760" />
        <line x1="1088" y1="80" x2="1088" y2="760" />
        <line x1="1270" y1="80" x2="1270" y2="760" />
        <line x1="1400" y1="80" x2="1400" y2="760" />
      </g>

      {/* Milestone vertical guides */}
      <g>
        <line x1="280" y1="88" x2="280" y2="760" stroke="#FFC655" strokeWidth="1" opacity="0.4" strokeDasharray="2,3" />
        <text x="286" y="98" fill="#FFC655" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9.5" letterSpacing="0.18em" textAnchor="start">
          CORPORATE FORMATION · ✓
        </text>
        <line x1="852" y1="88" x2="852" y2="760" stroke="#FFC655" strokeWidth="1" opacity="0.4" strokeDasharray="2,3" />
        <text x="858" y="98" fill="#FFC655" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9.5" letterSpacing="0.18em" textAnchor="start">
          IAB ESTABLISHED · ✓
        </text>
        <line x1="1082" y1="88" x2="1082" y2="760" stroke="#FFC655" strokeWidth="1" opacity="0.4" strokeDasharray="2,3" />
        <text x="1088" y="98" fill="#FFC655" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9.5" letterSpacing="0.18em" textAnchor="start">
          SPRING TRAINING · ✓
        </text>
        <line x1="1400" y1="88" x2="1400" y2="760" stroke="#FFC655" strokeWidth="1.5" opacity="0.8" />
        <text x="1394" y="98" fill="#FFC655" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9.5" letterSpacing="0.18em" textAnchor="end">
          MLB LOI · ○
        </text>
      </g>

      {/* I · MAJOR LEAGUE BASEBALL */}
      <text x="40" y="138" fill="rgba(229,229,229,0.6)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10" letterSpacing="0.24em">
        I · MAJOR LEAGUE BASEBALL
      </text>
      <line x1="40" y1="146" x2="270" y2="146" stroke="#FFC655" strokeWidth="1" opacity="0.6" />

      <text x="40" y="170" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">Rob Engel</text>
      <text x="40" y="184" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        SVP SOFTWARE ENG · MLB
      </text>
      <rect x="863" y="172" width="537" height="6" fill="#FFC655" opacity="0.55" />
      <rect className="meeting-tick" x="861" y="166" width="4" height="18" fill="#FFC655"
        data-mt-title="Rob Engel Introduction · MLB" data-mt-date="Jan 22, 2026" data-mt-cat="Advisory Board" />
      <rect className="meeting-tick" x="1003" y="166" width="4" height="18" fill="#FFC655"
        data-mt-title="MLB Technical Architecture Review" data-mt-date="Feb 15, 2026" data-mt-cat="Strategic Planning" />
      <rect className="meeting-tick" x="1127" y="166" width="4" height="18" fill="#FFC655"
        data-mt-title="MLB Pilot Scoping Session" data-mt-date="Mar 8, 2026" data-mt-cat="Strategic Planning" />
      <rect className="meeting-tick" x="1274" y="166" width="4" height="18" fill="#FFC655"
        data-mt-title="MLB LOI Process Review" data-mt-date="Apr 2, 2026" data-mt-cat="Strategic Planning" />
      <rect className="meeting-tick" x="1397" y="164" width="5" height="22" fill="#FFC655"
        data-mt-title="MLB Letter of Intent Discussion" data-mt-date="Apr 23, 2026" data-mt-cat="Board Meeting" />
      <text x="1410" y="179" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10" letterSpacing="0.08em">5</text>

      {/* II · INVESTOR PIPELINE */}
      <text x="40" y="222" fill="rgba(229,229,229,0.6)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10" letterSpacing="0.24em">
        II · INVESTOR PIPELINE
      </text>
      <line x1="40" y1="230" x2="270" y2="230" stroke="#FFC655" strokeWidth="1" opacity="0.5" />

      <text x="40" y="254" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">Mark Shirman</text>
      <text x="40" y="268" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        PROSPECTIVE · FMR CEO RIVERMEADOW
      </text>
      <rect x="433" y="256" width="919" height="6" fill="#FFC655" opacity="0.4" />
      <rect className="meeting-tick" x="431" y="250" width="4" height="18" fill="#FFC655"
        data-mt-title="Mark Shirman Introduction (via Jeff Newman)" data-mt-date="Nov 10, 2025" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="579" y="250" width="4" height="18" fill="#FFC655"
        data-mt-title="Mark Shirman Follow-Up" data-mt-date="Dec 5, 2025" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="838" y="250" width="4" height="18" fill="#FFC655"
        data-mt-title="Mark Shirman Deep Dive" data-mt-date="Jan 18, 2026" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="1080" y="250" width="4" height="18" fill="#FFC655"
        data-mt-title="Mark Shirman Term Discussion" data-mt-date="Feb 28, 2026" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="1351" y="250" width="4" height="18" fill="#FFC655"
        data-mt-title="Mark Shirman Investor Discovery Call" data-mt-date="Apr 9, 2026" data-mt-cat="Investor Update" />
      <text x="1410" y="263" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">5</text>

      <text x="40" y="294" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">Scott Price</text>
      <text x="40" y="308" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        PROSPECTIVE · BEACON ORAL
      </text>
      <rect x="669" y="296" width="642" height="6" fill="#FFC655" opacity="0.4" />
      <rect className="meeting-tick" x="667" y="290" width="4" height="18" fill="#FFC655"
        data-mt-title="Scott Price Introduction (via Tom Castillo)" data-mt-date="Dec 20, 2025" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="974" y="290" width="4" height="18" fill="#FFC655"
        data-mt-title="Scott Price Follow-Up" data-mt-date="Feb 10, 2026" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="1310" y="290" width="4" height="18" fill="#FFC655"
        data-mt-title="Scott Price Investor Discovery Call" data-mt-date="Apr 7, 2026" data-mt-cat="Investor Update" />
      <text x="1410" y="303" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">3</text>

      <text x="40" y="334" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">BizAnalytica</text>
      <text x="40" y="348" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        STRATEGIC INVESTOR
      </text>
      <rect x="521" y="336" width="848" height="6" fill="#FFC655" opacity="0.4" />
      <rect className="meeting-tick" x="519" y="330" width="4" height="18" fill="#FFC655"
        data-mt-title="BizAnalytica Introduction" data-mt-date="Nov 25, 2025" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="909" y="330" width="4" height="18" fill="#FFC655"
        data-mt-title="BizAnalytica Deep Dive" data-mt-date="Jan 30, 2026" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="1197" y="330" width="4" height="18" fill="#FFC655"
        data-mt-title="BizAnalytica Strategic Review" data-mt-date="Mar 20, 2026" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="1368" y="330" width="4" height="18" fill="#FFC655"
        data-mt-title="BizAnalytica Follow-Up" data-mt-date="Apr 18, 2026" data-mt-cat="Investor Update" />
      <text x="1410" y="343" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">4</text>

      <text x="40" y="374" fill="rgba(229,229,229,0.78)" fontFamily="Manrope" fontSize="13" fontStyle="italic" fontWeight="300">
        + 2 more investor conversations
      </text>
      <text x="40" y="388" fill="rgba(229,229,229,0.35)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        EARLY DISCOVERY
      </text>
      <rect x="740" y="376" width="600" height="4" fill="#FFC655" opacity="0.22" />
      <rect className="meeting-tick" x="759" y="370" width="4" height="16" fill="#FFC655" opacity="0.6"
        data-mt-title="Early Discovery · Investor Conversation" data-mt-date="Jan 2026" data-mt-cat="Investor Update" />
      <rect className="meeting-tick" x="1199" y="370" width="4" height="16" fill="#FFC655" opacity="0.6"
        data-mt-title="Tom Castillo Follow-Up" data-mt-date="Mar 28, 2026" data-mt-cat="Investor Update" />
      <text x="1410" y="383" fill="rgba(229,229,229,0.4)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">2</text>

      {/* III · INDUSTRY ADVISORY BOARD */}
      <text x="40" y="428" fill="rgba(229,229,229,0.6)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10" letterSpacing="0.24em">
        III · INDUSTRY ADVISORY BOARD
      </text>
      <line x1="40" y1="436" x2="270" y2="436" stroke="#E5E5E5" strokeWidth="1" opacity="0.4" />

      <text x="40" y="464" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">TrackMan</text>
      <text x="40" y="478" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        ACTIVE MEMBER · TECH PARTNER
      </text>
      <rect x="763" y="466" width="559" height="6" fill="#E5E5E5" opacity="0.45" />
      <rect className="meeting-tick" x="761" y="460" width="4" height="18" fill="#E5E5E5"
        data-mt-title="TrackMan Initial Discussion" data-mt-date="Jan 5, 2026" data-mt-cat="Advisory Board" />
      <rect className="meeting-tick" x="1045" y="460" width="4" height="18" fill="#E5E5E5"
        data-mt-title="TrackMan Integration Review" data-mt-date="Feb 22, 2026" data-mt-cat="Advisory Board" />
      <rect className="meeting-tick" x="1321" y="460" width="4" height="18" fill="#E5E5E5"
        data-mt-title="TrackMan Momentum Call · Adam Katz" data-mt-date="Apr 2, 2026" data-mt-cat="Advisory Board" />
      <text x="1410" y="473" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">3</text>

      <text x="40" y="504" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">Rob Engel (IAB)</text>
      <text x="40" y="518" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        FOUNDING MEMBER
      </text>
      <rect x="863" y="506" width="518" height="6" fill="#E5E5E5" opacity="0.45" />
      <rect className="meeting-tick" x="861" y="500" width="4" height="18" fill="#E5E5E5"
        data-mt-title="Industry Advisory Board · Rob Engel Appointment" data-mt-date="Jan 7, 2026" data-mt-cat="Advisory Board" />
      <rect className="meeting-tick" x="1168" y="500" width="4" height="18" fill="#E5E5E5"
        data-mt-title="IAB Quarterly Session · Rob Engel" data-mt-date="Mar 15, 2026" data-mt-cat="Advisory Board" />
      <rect className="meeting-tick" x="1380" y="500" width="4" height="18" fill="#E5E5E5"
        data-mt-title="IAB Strategic Review · Rob Engel" data-mt-date="Apr 20, 2026" data-mt-cat="Advisory Board" />
      <text x="1410" y="513" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">3</text>

      <text x="40" y="544" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">IAB · Collective</text>
      <text x="40" y="558" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        ALL-HANDS ADVISORY SESSIONS
      </text>
      <rect x="852" y="546" width="548" height="6" fill="#E5E5E5" opacity="0.5" />
      <rect className="meeting-tick" x="850" y="540" width="5" height="18" fill="#E5E5E5"
        data-mt-title="IAB Q1 All-Hands Session" data-mt-date="Jan 20, 2026" data-mt-cat="Advisory Board" />
      <rect className="meeting-tick" x="1168" y="540" width="4" height="18" fill="#E5E5E5"
        data-mt-title="IAB Mid-Quarter Session" data-mt-date="Mar 15, 2026" data-mt-cat="Advisory Board" />
      <rect className="meeting-tick" x="1397" y="538" width="5" height="22" fill="#E5E5E5"
        data-mt-title="IAB Q2 Planning Session" data-mt-date="Apr 23, 2026" data-mt-cat="Advisory Board" />
      <text x="1410" y="553" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">3</text>

      <text x="40" y="584" fill="rgba(229,229,229,0.65)" fontFamily="Manrope" fontSize="13" fontStyle="italic" fontWeight="300">
        + 3 pending IAB offers
      </text>
      <text x="40" y="598" fill="rgba(229,229,229,0.35)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        OUTBOUND · AWAITING DECISION
      </text>
      <rect x="1082" y="586" width="318" height="4" fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4,3" opacity="0.55" />
      <circle className="meeting-tick" cx="1150" cy="590" r="4" fill="none" stroke="#E5E5E5" strokeWidth="1.5" opacity="0.75"
        data-mt-title="Edwin Prather IAB Discovery Call" data-mt-date="Apr 2, 2026" data-mt-cat="Advisory Board" />
      <circle className="meeting-tick" cx="1260" cy="590" r="4" fill="none" stroke="#E5E5E5" strokeWidth="1.5" opacity="0.75"
        data-mt-title="Stephen Piscotty IAB Discovery Call" data-mt-date="Apr 2, 2026" data-mt-cat="Advisory Board" />
      <circle className="meeting-tick" cx="1360" cy="590" r="4" fill="none" stroke="#E5E5E5" strokeWidth="1.5" opacity="0.75"
        data-mt-title="Joey Lucchesi · IAB Upcoming Offer" data-mt-date="Apr 15, 2026" data-mt-cat="Advisory Board" />
      <text x="1410" y="593" fill="rgba(229,229,229,0.4)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">3</text>

      {/* IV · LEGAL COUNSEL */}
      <text x="40" y="640" fill="rgba(229,229,229,0.6)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10" letterSpacing="0.24em">
        IV · LEGAL COUNSEL
      </text>
      <line x1="40" y1="648" x2="270" y2="648" stroke="#AE8E51" strokeWidth="1" opacity="0.5" />

      <text x="40" y="674" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">Kris Withrow</text>
      <text x="40" y="688" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        PARTNER · FENWICK &amp; WEST
      </text>
      <rect x="339" y="676" width="954" height="6" fill="#AE8E51" opacity="0.45" />
      <rect className="meeting-tick" x="337" y="670" width="4" height="18" fill="#AE8E51"
        data-mt-title="Kris Withrow · Initial Legal Consultation" data-mt-date="Oct 25, 2025" data-mt-cat="Strategic Planning" />
      <rect className="meeting-tick" x="803" y="670" width="4" height="18" fill="#AE8E51"
        data-mt-title="Fenwick & West · Legal Strategy Review" data-mt-date="Jan 12, 2026" data-mt-cat="Strategic Planning" />
      <rect className="meeting-tick" x="1292" y="670" width="4" height="18" fill="#AE8E51"
        data-mt-title="Kris Withrow · Fenwick & West" data-mt-date="Apr 2, 2026" data-mt-cat="Strategic Planning" />
      <text x="1410" y="683" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">3</text>

      <text x="40" y="714" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">Edwin Prather</text>
      <text x="40" y="728" fill="rgba(229,229,229,0.45)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="9" letterSpacing="0.12em">
        GC · ALEXANDER&apos;S STEAKHOUSE
      </text>
      <rect x="922" y="716" width="14" height="6" fill="#AE8E51" opacity="0.45" />
      <rect className="meeting-tick" x="920" y="710" width="4" height="18" fill="#AE8E51"
        data-mt-title="Edwin Prather · IAB Discovery Call" data-mt-date="Feb 1, 2026" data-mt-cat="Advisory Board" />
      <text x="1410" y="723" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">1</text>

      {/* V · STRATEGIC LEADERSHIP */}
      <text x="40" y="768" fill="rgba(229,229,229,0.6)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10" letterSpacing="0.24em">
        V · STRATEGIC LEADERSHIP
      </text>
      <line x1="40" y1="776" x2="270" y2="776" stroke="#AE8E51" strokeWidth="1" opacity="0.5" />

      <text x="40" y="799" fill="#E5E5E5" fontFamily="Manrope" fontSize="13" fontWeight="500">Jeff Newman</text>
      <rect x="1110" y="801" width="284" height="6" fill="#AE8E51" opacity="0.45" />
      <rect className="meeting-tick" x="1108" y="795" width="4" height="18" fill="#AE8E51"
        data-mt-title="Jeff Newman Onboarding · Incoming Chairman" data-mt-date="Mar 5, 2026" data-mt-cat="Strategic Planning" />
      <rect className="meeting-tick" x="1268" y="795" width="4" height="18" fill="#AE8E51"
        data-mt-title="Jeff Newman Director Call" data-mt-date="Apr 1, 2026" data-mt-cat="Strategic Planning" />
      <rect className="meeting-tick" x="1393" y="795" width="4" height="18" fill="#AE8E51"
        data-mt-title="Jeff Newman · Board Strategy Session" data-mt-date="Apr 22, 2026" data-mt-cat="Board Meeting" />
      <text x="1410" y="807" fill="rgba(229,229,229,0.55)" fontFamily="Manrope, -apple-system, sans-serif" fontSize="10">3</text>

      <line x1="40" y1="818" x2="1400" y2="818" stroke="rgba(229,229,229,0.22)" strokeWidth="1" />
    </svg>
  );
}
