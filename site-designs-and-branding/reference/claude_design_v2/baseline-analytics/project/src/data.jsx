// Sample data — preserved verbatim from portal_v1_dark_glass.jsx
// Plus new: DEAL COMPS, VELOCITY series

const MEETINGS = [
  {id:1,type:"INVESTOR",date:"Apr 9",dateISO:"2026-04-09",title:"Mark Shirman Investor Discovery Call",summary:"Discovery call with Mark Shirman, former CEO of RiverMeadow Software (connection via Jeff Newman). Strong investment interest expressed.",org:"BizAnalytica"},
  {id:2,type:"INVESTOR",date:"Apr 7",dateISO:"2026-04-07",title:"Scott Price Investor Discovery Call",summary:"Discovery call with Scott Price, President at Beacon Oral Specialists (via Tom Castillo). Personal investment interest discussed.",org:"Beacon Oral"},
  {id:3,type:"ADVISORY",date:"Apr 2",dateISO:"2026-04-02",title:"Edwin Prather IAB Discovery Call",summary:"Discovery call with Edwin Prather, Bay Area attorney and General Counsel at Alexander's Steakhouse.",org:"Prather"},
  {id:4,type:"INVESTOR",date:"Apr 2",dateISO:"2026-04-02",title:"Kris Withrow — Fenwick & West",summary:"Strategic legal framework and investor introduction opportunities.",org:"Fenwick"},
  {id:5,type:"STRATEGY",date:"Apr 2",dateISO:"2026-04-02",title:"TrackMan Momentum Call — Adam Katz",summary:"Integration possibilities and data partnership alignment for the platform.",org:"TrackMan"},
  {id:6,type:"ADVISORY",date:"Apr 2",dateISO:"2026-04-02",title:"Stephen Piscotty IAB Discovery Call",summary:"IAB candidacy — former league experience and player development connections.",org:"Piscotty"},
  {id:7,type:"INVESTOR",date:"Mar 28",dateISO:"2026-03-28",title:"Tom Castillo Follow-Up",summary:"Investment terms, timeline, and next steps for formalizing commitment.",org:"Castillo"},
  {id:8,type:"STRATEGY",date:"Mar 25",dateISO:"2026-03-25",title:"ACIS Positioning Review",summary:"ACIS positioning vs. Digital Athlete and Second Spectrum comparables.",org:"Internal"}
];

const BUZZ = [
  {id:1,type:"CASE STUDY",title:"Hayden Birdsong Case Study",author:"Chase Spivey",role:"CEO",date:"Apr 14",desc:"Deep-dive on SF Giants pitcher Hayden Birdsong's biomechanical markers through the ACIS lens. Demonstrates predictive injury detection with real league data — cornerstone proof-of-concept for investor conversations.",pull:"A cornerstone proof-of-concept for investor conversations — predictive injury detection, demonstrated against real league data."},
  {id:2,type:"LEADERSHIP",title:"Sheldon's Power Statement",author:"Sheldon McClelland",role:"COO",date:"Apr 11",desc:"COO's definitive positioning statement on Baseline Analytics' market authority and competitive moat. Articulates the 'why now' and 'why us' for external-facing communications.",pull:"Articulates the 'why now' and 'why us' for every external conversation we'll have this year."},
  {id:3,type:"MARKET INTEL",title:"Marketplace Comparables Doc",author:"Sheldon McClelland",role:"COO",date:"Apr 8",desc:"League-wide sports tech deal comparables — $6B+ in documented transactions. Positions ACIS pricing against BAMTech, Digital Athlete, Second Spectrum.",pull:"$6B+ in documented transactions. ACIS now has a defensible comparable set."},
  {id:4,type:"GOVERNANCE",title:"IAB Program Framework Finalized",author:"Jeff Newman",role:"Chairman",date:"Apr 5",desc:"Advisory Board governance completed — roles, seat terms, honorarium structure, quarterly cadence."},
  {id:5,type:"BRAND",title:"Brand Guidelines v1.0 Delivered",author:"PERKK Studio",role:"Design",date:"Apr 3",desc:"Full identity system — logo lockups, color palette, typography, brand asset patterns, mockups."},
  {id:6,type:"PARTNERSHIP",title:"TrackMan Integration Pathway",author:"Chase Spivey",role:"CEO",date:"Mar 30",desc:"Technical alignment confirmed with TrackMan for data feed integration within ACIS."},
  {id:7,type:"CASE STUDY",title:"Reliever Workload Model — Prototype",author:"Chase Spivey",role:"CEO",date:"Mar 28",desc:"Workload fatigue model prototype, validated against three clubs' bullpen data. Early results show meaningful lead on acute overuse indicators."},
  {id:8,type:"GOVERNANCE",title:"Q1 Board Meeting Minutes",author:"Jeff Newman",role:"Chairman",date:"Mar 26",desc:"Formal minutes from Q1 board session — cap table, runway, hiring plan ratified."}
];

// Deal comparables — sports-tech transactions. $M normalized. Values from public deal disclosures.
// ACIS bookended as our range. sorted by deal size ASC for ladder effect.
const DEALS = [
  {id:1, deal:"League-Wide Streaming Tech Acquisition", year:2017, usdM:1580, type:"Acquisition", note:"Streaming infrastructure, 75% stake"},
  {id:2, deal:"League Data-Partnership (multi-year)", year:2021, usdM:250, type:"Partnership", note:"Equity + annual. 10-year framework"},
  {id:3, deal:"Digital Athlete (football)", year:2023, usdM:180, type:"Partnership", note:"Cumulative public disclosures"},
  {id:4, deal:"Second Spectrum (basketball)", year:2022, usdM:84, type:"Annual", note:"~$42M/yr · multi-year"},
  {id:5, deal:"Biomechanics Startup — Acq.", year:2024, usdM:55, type:"Acquisition", note:"Strategic acq. · undisclosed terms est."},
  {id:6, deal:"ACIS — Baseline Analytics", year:2026, usdM:50, type:"Our Range", note:"$15–50M/yr · proposed", highlight:true},
  {id:7, deal:"Wearable Telemetry Deal", year:2023, usdM:38, type:"Annual", note:"Multi-club contract"},
  {id:8, deal:"Video Analytics — League Add-on", year:2022, usdM:22, type:"Partnership", note:"Renewed 2024"},
];

// Meeting velocity — past 30 days, daily counts by type
// Date: Mar 24 — Apr 23, 2026 (31 days). Indexes 0-30.
const VELOCITY = (() => {
  const days = [];
  const start = new Date(2026,2,24); // Mar 24
  for(let i=0;i<31;i++){
    const d = new Date(start); d.setDate(start.getDate()+i);
    days.push({i, date: d, inv:0, adv:0, str:0});
  }
  // Map real meetings onto the 30-day grid (approx distribution)
  const map = {
    "Mar 25":{str:1},
    "Mar 28":{inv:1},
    "Apr 2":{inv:1,adv:2,str:1},
    "Apr 7":{inv:1},
    "Apr 9":{inv:1},
    "Apr 11":{str:1},
    "Apr 14":{adv:1},
    "Apr 17":{inv:1,str:1},
    "Apr 21":{inv:1},
  };
  days.forEach(d=>{
    const mo = d.date.toLocaleString('en',{month:'short'});
    const day = d.date.getDate();
    const key = `${mo} ${day}`;
    if(map[key]){ Object.assign(d, map[key]); }
  });
  return days;
})();

const DOCS = [
  {name:"Sports Tech Deal Comparables",ext:"PDF",pages:"5 pg",date:"Mar 2026",cat:"Market Intel"},
  {name:"IAB Overview & Governance",ext:"PDF",pages:"3 pg",date:"Mar 2026",cat:"Governance"},
  {name:"Brand Guidelines v1.0",ext:"PDF",pages:"42 pg",date:"Jan 2026",cat:"Brand"},
  {name:"Hayden Birdsong Case Study",ext:"DOC",pages:"Draft",date:"Apr 2026",cat:"Case Study"},
  {name:"Investor Deck — Q1 2026",ext:"PPTX",pages:"18 sl",date:"Apr 2026",cat:"Investor"},
  {name:"Power Statement — McClelland",ext:"DOC",pages:"1 pg",date:"Apr 2026",cat:"Leadership"}
];

const QS = [
  "How many investor meetings this cycle?",
  "Latest on IAB onboarding?",
  "Summarize the Birdsong case study",
  "Deal comparables overview",
  "Materials created this cycle?",
  "Next advisory board call?"
];

const ANS = {
  "How many investor meetings this cycle?":"4 investor meetings in the current cycle — Mark Shirman (BizAnalytica), Scott Price (Beacon Oral), Kris Withrow (Fenwick & West), and a Tom Castillo follow-up. All indicate active interest.",
  "Latest on IAB onboarding?":"Framework finalized — roles, seat terms, honorarium, quarterly cadence. Two discovery calls this cycle: Edwin Prather and Stephen Piscotty. Both expressed strong interest.",
  "Summarize the Birdsong case study":"Biomechanical-marker analysis of a named league pitcher, surfaced through the ACIS lens. Demonstrates predictive injury detection against real league data — the cornerstone proof-of-concept for investor conversations.",
  "Deal comparables overview":"Seven documented sports-tech transactions totaling $6B+. ACIS proposed range ($15–50M/yr) sits alongside mid-tier annual deals — defensible against Digital Athlete and Second Spectrum benchmarks.",
  "Materials created this cycle?":"Birdsong Case Study (Chase), Power Statement (Sheldon), Comparables Doc (Sheldon), IAB Framework (Jeff), Brand Guidelines v1.0 (PERKK), TrackMan memo (Chase).",
  "Next advisory board call?":"No date confirmed. IAB is set for 4 quarterly meetings/year. Next window: late April / early May 2026."
};

const CTX = `You are the Baseline Analytics Stakeholder Portal briefing assistant. Respond in 2–4 sentences, professional and specific, using names/dates/numbers from the portal.
MEETINGS: ${MEETINGS.map(m=>`${m.date}: ${m.title}`).join("|")}
BUZZ: ${BUZZ.map(b=>`${b.date}: ${b.title} by ${b.author}`).join("|")}
KEY: CEO Chase Spivey, COO Sheldon McClelland, Chairman Jeff Newman. ACIS = predictive injury detection for professional baseball. Comps: $6B+, ACIS $15–50M/yr.`;

// Meeting-type accents
const MT = {
  INVESTOR:  {color:"#FFC655", label:"INVESTOR",  glyph:"01"},
  ADVISORY:  {color:"#E5E5E5", label:"ADVISORY",  glyph:"02"},
  STRATEGY:  {color:"#AE8E51", label:"STRATEGY",  glyph:"03"},
};

// Buzz-category editorial treatments — each category drives its own look
const BT = {
  "CASE STUDY":  {color:"#FFC655", hue:42,  label:"CASE STUDY",  num:"I",   tone:"gold"},
  "LEADERSHIP":  {color:"#E5E5E5", hue:0,   label:"LEADERSHIP",  num:"II",  tone:"mercury"},
  "MARKET INTEL":{color:"#FFC655", hue:42,  label:"MARKET INTEL",num:"III", tone:"gold"},
  "GOVERNANCE":  {color:"#AE8E51", hue:38,  label:"GOVERNANCE",  num:"IV",  tone:"limed"},
  "BRAND":       {color:"#E5E5E5", hue:0,   label:"BRAND",       num:"V",   tone:"mercury"},
  "PARTNERSHIP": {color:"#FFC655", hue:42,  label:"PARTNERSHIP", num:"VI",  tone:"gold"},
};

Object.assign(window, { MEETINGS, BUZZ, DEALS, VELOCITY, DOCS, QS, ANS, CTX, MT, BT });
