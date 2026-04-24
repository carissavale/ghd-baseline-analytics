#!/usr/bin/env python3
"""Generate V3 (Dark Sidebar) pages — shared chrome + per-page content blocks."""
from pathlib import Path

BASE = Path('/Users/carissavale/ghd-baseline-analytics/pitch/artifacts_sidebar')

# =============================================================================
# SHARED CHROME: CSS tokens, sidebar, main-head
# =============================================================================

HEAD_OPEN = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{title}</title>
<style>
  @font-face { font-family: 'GT America'; src: url('../../brand_source/fonts_2/GT-America-Standard-Light-Trial.otf') format('opentype'); font-weight: 300; }
  @font-face { font-family: 'GT America'; src: url('../../brand_source/fonts_2/GT-America-Standard-Regular-Trial.otf') format('opentype'); font-weight: 400; }
  @font-face { font-family: 'GT America'; src: url('../../brand_source/fonts_2/GT-America-Standard-Medium-Trial.otf') format('opentype'); font-weight: 500; }
  @font-face { font-family: 'GT America'; src: url('../../brand_source/fonts_2/GT-America-Standard-Bold-Trial.otf') format('opentype'); font-weight: 700; }
  @font-face { font-family: 'GT America Mono'; src: url('../../brand_source/fonts_1/GT-America-Mono-Regular-Trial.otf') format('opentype'); font-weight: 400; }
  @font-face { font-family: 'GT America Mono'; src: url('../../brand_source/fonts_1/GT-America-Mono-Medium-Trial.otf') format('opentype'); font-weight: 500; }

  :root {
    --black: #000; --onyx: #121211; --onyx-2: #1a1916; --onyx-3: #0a0a09;
    --gold: #FFC655; --gold-mid: #AE8E51; --gold-deep: #63553C;
    --mercury: #E5E5E5; --mercury-dim: rgba(229,229,229,0.62);
    --mercury-faint: rgba(229,229,229,0.32);
    --hairline: rgba(229,229,229,0.08); --hairline-2: rgba(229,229,229,0.14);
    --sidebar-w: 220px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: var(--black); color: var(--mercury); font-family: 'GT America', -apple-system, sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; min-height: 100vh; }
  ::selection { background: var(--gold); color: var(--black); }

  /* ========== SIDEBAR ========== */
  .sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: var(--sidebar-w); background: var(--onyx-3); border-right: 1px solid var(--hairline-2); display: flex; flex-direction: column; z-index: 50; padding: 24px 0; }
  .sb-brand { padding: 4px 22px 28px; border-bottom: 1px solid var(--hairline); margin-bottom: 22px; display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit; }
  .sb-mark { width: 24px; height: 32px; display: flex; gap: 2px; align-items: flex-start; }
  .sb-mark span { width: 3px; background: var(--gold); display: block; }
  .sb-mark span:nth-child(1) { height: 19px; background: var(--gold-mid); }
  .sb-mark span:nth-child(2) { height: 28px; }
  .sb-mark span:nth-child(3) { height: 32px; }
  .sb-mark span:nth-child(4) { height: 24px; }
  .sb-mark span:nth-child(5) { height: 17px; background: var(--gold-mid); }
  .sb-brand .name { font-size: 12px; font-weight: 500; color: var(--mercury); letter-spacing: 0.02em; line-height: 1.2; }
  .sb-brand .sub { font-family: 'GT America Mono', monospace; font-size: 8.5px; letter-spacing: 0.22em; color: var(--gold-mid); text-transform: uppercase; margin-top: 3px; }
  .sb-section-label { font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.24em; color: var(--mercury-faint); text-transform: uppercase; padding: 0 22px; margin-bottom: 10px; }
  .sb-nav { display: flex; flex-direction: column; gap: 1px; flex: 1; }
  .sb-link { display: flex; align-items: center; gap: 12px; padding: 10px 22px; text-decoration: none; font-size: 13px; color: var(--mercury-dim); transition: all 0.15s; cursor: pointer; border: none; background: transparent; font-family: inherit; text-align: left; width: 100%; position: relative; }
  .sb-link:hover { color: var(--mercury); background: rgba(255,255,255,0.02); }
  .sb-link.active { color: var(--gold); background: rgba(255,198,85,0.06); }
  .sb-link.active::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--gold); }
  .sb-link .dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(229,229,229,0.2); flex-shrink: 0; }
  .sb-link.active .dot { background: var(--gold); }
  .sb-link:hover .dot { background: rgba(229,229,229,0.5); }
  .sb-group { margin: 0; }
  .sb-group-trigger .caret { margin-left: auto; width: 5px; height: 5px; border-right: 1.2px solid currentColor; border-bottom: 1.2px solid currentColor; transform: rotate(45deg); transition: transform 0.2s; margin-bottom: 2px; }
  .sb-group.open .sb-group-trigger .caret { transform: rotate(225deg); margin-top: 2px; margin-bottom: 0; }
  .sb-subnav { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.22s ease; }
  .sb-group.open .sb-subnav { grid-template-rows: 1fr; }
  .sb-subnav-inner { overflow: hidden; }
  .sb-sublink { display: block; padding: 8px 22px 8px 42px; font-size: 12.5px; color: var(--mercury-dim); text-decoration: none; transition: all 0.15s; }
  .sb-sublink:hover { color: var(--gold); background: rgba(255,198,85,0.04); }
  .sb-sublink.active { color: var(--gold); }
  .sb-divider { height: 1px; background: var(--hairline); margin: 18px 22px; }
  .sb-user { padding: 16px 22px; border-top: 1px solid var(--hairline); display: flex; align-items: center; gap: 10px; }
  .sb-user .avatar { width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--gold-mid); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--gold); font-weight: 500; font-family: 'GT America Mono', monospace; }
  .sb-user .meta { display: flex; flex-direction: column; line-height: 1.2; }
  .sb-user .name { font-size: 12px; color: var(--mercury); font-weight: 500; }
  .sb-user .role { font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.16em; color: var(--mercury-faint); text-transform: uppercase; margin-top: 3px; }

  /* ========== MAIN ========== */
  .main { margin-left: var(--sidebar-w); min-height: 100vh; }
  .main-head { position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between; padding: 16px 48px; background: rgba(0,0,0,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--hairline); }
  .main-head-left { display: flex; align-items: baseline; gap: 16px; font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; }
  .main-head-left .crumb { color: var(--mercury-faint); }
  .main-head-left .sep { color: var(--mercury-faint); }
  .main-head-left .cur { color: var(--gold); }
  .main-head-right { display: flex; align-items: center; gap: 24px; font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--mercury-faint); text-transform: uppercase; }
  .main-head-right .live { display: inline-flex; align-items: center; gap: 8px; color: var(--gold); }
  .main-head-right .live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  .content { padding: 40px 48px 80px; }

  /* ========== HERO ========== */
  .hero { margin-bottom: 40px; }
  .hero-kicker { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.28em; color: var(--gold); text-transform: uppercase; margin-bottom: 18px; }
  .hero-head { font-size: 56px; font-weight: 400; line-height: 1.08; letter-spacing: -0.03em; color: var(--mercury); max-width: 900px; margin-bottom: 18px; }
  .hero-head .em { color: var(--gold); font-weight: 400; font-style: italic; }
  .hero-sub { max-width: 720px; font-size: 15px; line-height: 1.58; color: var(--mercury-dim); font-weight: 300; letter-spacing: -0.005em; }
  .hero-sub em { color: var(--mercury); font-style: normal; }

  /* ========== STATS ========== */
  .stat-row { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--hairline-2); border-bottom: 1px solid var(--hairline-2); margin-bottom: 40px; }
  .stat { padding: 22px 28px; border-right: 1px solid var(--hairline); }
  .stat:first-child { padding-left: 0; }
  .stat:last-child { border-right: none; padding-right: 0; }
  .stat .num { font-size: 46px; font-weight: 300; letter-spacing: -0.025em; line-height: 1; color: var(--mercury); font-variant-numeric: tabular-nums; }
  .stat .num.accent { color: var(--gold); }
  .stat .num.compact { font-size: 26px; padding-top: 10px; letter-spacing: -0.01em; }
  .stat .label { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: var(--mercury-faint); text-transform: uppercase; margin-top: 10px; }

  /* ========== PANEL / SECTION ========== */
  .panel { background: rgba(18,18,17,0.5); border: 1px solid var(--hairline-2); display: flex; flex-direction: column; margin-bottom: 28px; }
  .panel-head { display: flex; align-items: baseline; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--hairline); }
  .panel-head-left { display: flex; align-items: baseline; gap: 12px; }
  .panel-num { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--gold-mid); text-transform: uppercase; }
  .panel-title { font-size: 15px; font-weight: 500; color: var(--mercury); letter-spacing: -0.005em; }
  .panel-count { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.16em; color: var(--mercury-faint); text-transform: uppercase; }
  .panel-all { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--gold); text-transform: uppercase; text-decoration: none; }
  .panel-all:hover { color: #ffd37a; }

  /* ========== TABLE ROWS (enterprise-tool pattern) ========== */
  .data-table { display: flex; flex-direction: column; }
  .data-row { display: grid; align-items: center; gap: 14px; padding: 14px 20px; border-bottom: 1px solid var(--hairline); text-decoration: none; color: inherit; transition: background 0.15s; cursor: pointer; }
  .data-row:last-child { border-bottom: none; }
  .data-row:hover { background: rgba(255,255,255,0.02); }
  .cell-date { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.14em; color: var(--mercury-faint); text-transform: uppercase; }
  .cell-pill { display: inline-flex; justify-content: center; padding: 3px 8px; font-family: 'GT America Mono', monospace; font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; border: 1px solid; text-align: center; }
  .cell-title { font-size: 13px; font-weight: 500; color: var(--mercury); letter-spacing: -0.005em; line-height: 1.3; }
  .data-row:hover .cell-title { color: var(--gold); }
  .cell-meta { font-family: 'GT America Mono', monospace; font-size: 9.5px; letter-spacing: 0.16em; color: var(--mercury-faint); text-transform: uppercase; }
  .cell-actions { font-family: 'GT America Mono', monospace; font-size: 9.5px; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; }

  /* ========== ASK PERSIST (Overview only per spec) ========== */
  .ask-persist { display: flex; align-items: center; gap: 14px; padding: 14px 18px; margin-bottom: 36px; background: var(--onyx); border: 1px solid var(--gold-mid); position: relative; }
  .ask-persist::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--gold); }
  .ask-persist-label { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.24em; color: var(--gold); text-transform: uppercase; white-space: nowrap; }
  .ask-persist-form { display: flex; gap: 8px; flex: 1; }
  .ask-persist-input { flex: 1; background: rgba(0,0,0,0.5); border: 1px solid var(--hairline-2); color: var(--mercury); padding: 10px 14px; font-family: 'GT America', sans-serif; font-size: 14px; font-weight: 300; letter-spacing: -0.005em; outline: none; transition: border-color 0.2s; }
  .ask-persist-input::placeholder { color: var(--mercury-faint); }
  .ask-persist-input:focus { border-color: var(--gold); }
  .ask-persist-send { background: var(--gold); color: #121211; border: none; padding: 0 20px; font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
  .ask-persist-send:hover { background: #ffd37a; }
  .ask-persist-chips { display: flex; gap: 6px; }
  .ask-persist-chip { padding: 6px 10px; background: transparent; border: 1px solid var(--hairline-2); font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mercury-dim); cursor: pointer; transition: all 0.15s; white-space: nowrap; }
  .ask-persist-chip:hover { border-color: var(--gold); color: var(--gold); }

  /* ========== FOOT ========== */
  .foot { padding-top: 24px; border-top: 1px solid var(--hairline-2); display: flex; justify-content: space-between; align-items: center; font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--mercury-faint); text-transform: uppercase; }
  .foot em { color: var(--gold); font-style: normal; font-weight: 400; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .fade { animation: fadeUp 0.8s ease-out both; }

{extra_css}
</style>
</head>
<body>
"""

def sidebar(active_slug):
    """Generate sidebar HTML with the given slug marked active."""
    def link(slug, label, href):
        cls = 'sb-link active' if active_slug == slug else 'sb-link'
        return f'    <a href="{href}" class="{cls}"><span class="dot"></span>{label}</a>'

    about_open = 'open' if active_slug in ('team','advisory') else ''
    team_active = ' active' if active_slug == 'team' else ''
    adv_active = ' active' if active_slug == 'advisory' else ''

    return f'''<aside class="sidebar">
  <a class="sb-brand" href="../overview/index.html">
    <div class="sb-mark"><span></span><span></span><span></span><span></span><span></span></div>
    <div>
      <div class="name">Baseline Analytics</div>
      <div class="sub">Investor Portal</div>
    </div>
  </a>
  <div class="sb-section-label">Portal</div>
  <nav class="sb-nav">
{link('overview', 'Overview', '../overview/index.html')}
{link('deal_intel', 'Deal Intel', '../deal_intel/index.html')}
{link('milestones', 'Milestones', '../milestones/index.html')}
{link('meetings', 'Meetings', '../meetings/index.html')}
{link('vault', 'Vault', '../vault/index.html')}
{link('buzz', 'Buzz', '../buzz/index.html')}
    <div class="sb-group {about_open}" id="aboutGroup">
      <button class="sb-link sb-group-trigger" id="aboutTrigger">
        <span class="dot"></span>About Us<span class="caret"></span>
      </button>
      <div class="sb-subnav">
        <div class="sb-subnav-inner">
          <a href="../team/index.html" class="sb-sublink{team_active}">Meet the Team</a>
          <a href="../advisory/index.html" class="sb-sublink{adv_active}">Advisory Board</a>
        </div>
      </div>
    </div>
    <div class="sb-divider"></div>
{link('ask', 'Ask the Portal', '../ask_portal/index.html')}
  </nav>
  <div class="sb-user">
    <div class="avatar">C</div>
    <div class="meta">
      <span class="name">Chase</span>
      <span class="role">Founder · CEO</span>
    </div>
  </div>
</aside>'''

def main_head(current_label):
    return f'''<div class="main-head">
    <div class="main-head-left">
      <span class="crumb">Baseline Analytics</span>
      <span class="sep">/</span>
      <span class="cur">{current_label}</span>
    </div>
    <div class="main-head-right">
      <span>Cycle 04 · 24 Mar to 23 Apr 2026</span>
      <span class="live">Live</span>
    </div>
  </div>'''

COMMON_SCRIPT = '''<script>
  // Sidebar About Us expand/collapse
  const aboutGroup = document.getElementById('aboutGroup');
  const aboutTrigger = document.getElementById('aboutTrigger');
  if (aboutTrigger) aboutTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    aboutGroup.classList.toggle('open');
  });
</script>'''

FOOT = '''<div class="foot">
      <span><em>Every Athlete</em> Deserves a Baseline.</span>
      <span>Baseline Analytics · Investor Portal · V3 · Dark Sidebar</span>
    </div>'''

def page(slug, title, breadcrumb, content_html, extra_css='', extra_script=''):
    # HEAD_OPEN uses { } placeholders — so we can't .format with @font-face rules in it.
    # Easier: do manual string replacements.
    head = HEAD_OPEN.replace('{title}', title).replace('{extra_css}', extra_css)
    body = f'''
{sidebar(slug)}

<main class="main">
  {main_head(breadcrumb)}
  <div class="content">
{content_html}
    {FOOT}
  </div>
</main>

{COMMON_SCRIPT}
{extra_script}
</body>
</html>'''
    return head + body


# =============================================================================
# PAGE DEFINITIONS
# =============================================================================

# ---------- DEAL INTEL ----------
DEAL_INTEL_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">Investor Portal · Deal Intel</div>
      <h1 class="hero-head">The only <span class="em">league-wide AI-powered</span> pitcher injury prevention system.</h1>
      <p class="hero-sub">Sports-tech comparables have cleared <em>$6B+ in documented transactions</em>. Baseline positions ACIS against BAMTech, NFL Digital Athlete, Second Spectrum, and Hawk-Eye — the operating layer the category has been missing.</p>
    </div>

    <div class="stat-row fade" style="animation-delay:0.1s">
      <div class="stat"><div class="num accent">$6B+</div><div class="label">Aggregate Comparables</div></div>
      <div class="stat"><div class="num">$641M</div><div class="label">Annual MLB Pitcher IL Cost</div></div>
      <div class="stat"><div class="num">$15–50M</div><div class="label">ACIS Annual Target</div></div>
      <div class="stat"><div class="num">17%</div><div class="label">NFL Concussion Reduction Benchmark</div></div>
    </div>

    <section class="panel fade" style="animation-delay:0.15s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">Deal Comparables Matrix</span>
          <span class="panel-count">8 deals · $6B+ aggregate</span>
        </div>
      </div>
      <div class="data-table comparables-table">
        <div class="data-row header">
          <span class="cell-date">Year</span>
          <span class="cell-title" style="font-family:'GT America Mono',monospace; font-size:10px; letter-spacing:0.2em; color:var(--mercury-faint); text-transform:uppercase; font-weight:500">Deal</span>
          <span class="cell-meta">Buyer / Category</span>
          <span class="cell-meta">Value</span>
          <span class="cell-meta">Relevance</span>
        </div>
        <div class="data-row"><span class="cell-date">2017</span><span class="cell-title">BAMTech</span><span class="cell-meta">Disney · Streaming</span><span class="cell-meta">$1.58B</span><span class="cell-pill acis">High</span></div>
        <div class="data-row"><span class="cell-date">2021</span><span class="cell-title">NFL Digital Athlete</span><span class="cell-meta">AWS Partnership</span><span class="cell-meta">Strategic</span><span class="cell-pill acis">Direct</span></div>
        <div class="data-row"><span class="cell-date">2021</span><span class="cell-title">Second Spectrum</span><span class="cell-meta">Genius · NBA Tracking</span><span class="cell-meta">$200M</span><span class="cell-pill acis">High</span></div>
        <div class="data-row"><span class="cell-date">2011</span><span class="cell-title">Hawk-Eye</span><span class="cell-meta">Sony · Officiating</span><span class="cell-meta">Undisclosed</span><span class="cell-pill med">Adjacent</span></div>
        <div class="data-row"><span class="cell-date">2021</span><span class="cell-title">Sportradar IPO</span><span class="cell-meta">NASDAQ Listing</span><span class="cell-meta">$8.08B</span><span class="cell-pill med">Context</span></div>
        <div class="data-row"><span class="cell-date">2021</span><span class="cell-title">Genius Sports</span><span class="cell-meta">SPAC · DMYD</span><span class="cell-meta">$1.5B</span><span class="cell-pill med">Context</span></div>
        <div class="data-row"><span class="cell-date">2019</span><span class="cell-title">Zebra Sports</span><span class="cell-meta">NFL RFID</span><span class="cell-meta">$42M/yr</span><span class="cell-pill med">Adjacent</span></div>
        <div class="data-row acis-row"><span class="cell-date">2026</span><span class="cell-title" style="color:var(--gold)">ACIS · Baseline</span><span class="cell-meta" style="color:var(--gold-mid)">MLB · Pitcher Injury</span><span class="cell-meta" style="color:var(--gold-mid)">$15–50M/yr target</span><span class="cell-pill acis">Pitch</span></div>
      </div>
    </section>

    <section class="panel fade" style="animation-delay:0.22s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">02</span>
          <span class="panel-title">Annual-Rate Positioning</span>
          <span class="panel-count">5 deals · Scaled</span>
        </div>
      </div>
      <div style="padding: 28px 20px;">
        <div class="bar-row"><span class="bar-label">Sportradar<br/><span class="bar-meta">$720M/yr rev</span></span><div class="bar-track"><div class="bar-fill" style="width:100%; background:var(--mercury-dim)"></div></div><span class="bar-value">$720M</span></div>
        <div class="bar-row"><span class="bar-label">Genius Sports<br/><span class="bar-meta">$410M/yr rev</span></span><div class="bar-track"><div class="bar-fill" style="width:57%; background:var(--mercury-dim)"></div></div><span class="bar-value">$410M</span></div>
        <div class="bar-row"><span class="bar-label">Second Spectrum<br/><span class="bar-meta">$70M/yr rev</span></span><div class="bar-track"><div class="bar-fill" style="width:10%; background:var(--mercury-dim)"></div></div><span class="bar-value">$70M</span></div>
        <div class="bar-row"><span class="bar-label">Zebra Sports<br/><span class="bar-meta">$42M/yr NFL</span></span><div class="bar-track"><div class="bar-fill" style="width:6%; background:var(--mercury-dim)"></div></div><span class="bar-value">$42M</span></div>
        <div class="bar-row acis"><span class="bar-label" style="color:var(--gold)">ACIS · Target<br/><span class="bar-meta" style="color:var(--gold-mid)">$15–50M/yr</span></span><div class="bar-track"><div class="bar-fill" style="width:7%; background:var(--gold)"></div></div><span class="bar-value" style="color:var(--gold)">$15–50M</span></div>
      </div>
    </section>

    <div class="insight-callout fade" style="animation-delay:0.3s">
      <div class="insight-eyebrow">Key Insight</div>
      <div class="insight-text">ACIS is not a bet on a new category. It's a bet on the <em>only uncaptured seat</em> in a category worth $6B in documented transactions — the pitcher injury prevention seat inside MLB's existing data stack.</div>
    </div>
'''

DEAL_INTEL_CSS = '''
  .comparables-table .data-row { grid-template-columns: 80px 1fr 1.2fr 120px 80px; }
  .cell-pill.acis { color: var(--gold); border-color: var(--gold); background: rgba(255,198,85,0.08); }
  .cell-pill.med { color: var(--mercury-dim); border-color: rgba(229,229,229,0.3); }
  .data-row.acis-row { background: rgba(255,198,85,0.04); border-left: 2px solid var(--gold); }
  .data-row.header { background: rgba(0,0,0,0.4); cursor: default; }
  .data-row.header:hover { background: rgba(0,0,0,0.4); }

  .bar-row { display: grid; grid-template-columns: 200px 1fr 120px; gap: 20px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--hairline); }
  .bar-row:last-child { border-bottom: none; }
  .bar-row.acis { padding: 16px 0; }
  .bar-label { font-size: 13px; font-weight: 500; color: var(--mercury); line-height: 1.4; }
  .bar-meta { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.14em; color: var(--mercury-faint); text-transform: uppercase; font-weight: 400; }
  .bar-track { height: 8px; background: rgba(229,229,229,0.05); position: relative; }
  .bar-fill { height: 100%; }
  .bar-value { font-family: 'GT America Mono', monospace; font-size: 11px; letter-spacing: 0.14em; color: var(--mercury); text-transform: uppercase; text-align: right; font-variant-numeric: tabular-nums; }

  .insight-callout { background: rgba(255,198,85,0.04); border: 1px solid var(--gold-mid); border-left: 3px solid var(--gold); padding: 28px 32px; margin-bottom: 32px; }
  .insight-eyebrow { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.24em; color: var(--gold); text-transform: uppercase; margin-bottom: 14px; }
  .insight-text { font-size: 17px; font-weight: 400; color: var(--mercury); line-height: 1.5; letter-spacing: -0.01em; }
  .insight-text em { color: var(--gold); font-style: italic; font-weight: 500; }
'''

# ---------- MILESTONES ----------
MILESTONES_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">Investor Portal · Milestones</div>
      <h1 class="hero-head">H1 2026 <span class="em">on schedule.</span></h1>
      <p class="hero-sub">Three delivered. Two in motion. Every milestone tied to a date, a deliverable, and a disclosure cycle.</p>
    </div>

    <div class="stat-row fade" style="animation-delay:0.1s">
      <div class="stat"><div class="num accent">3</div><div class="label">Delivered</div></div>
      <div class="stat"><div class="num">2</div><div class="label">In Motion</div></div>
      <div class="stat"><div class="num compact">H1 2026</div><div class="label">Target Half</div></div>
      <div class="stat"><div class="num compact">On Schedule</div><div class="label">Status</div></div>
    </div>

    <section class="panel fade" style="animation-delay:0.15s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">H1 Progress Ladder</span>
          <span class="panel-count">3 of 5 · 60%</span>
        </div>
      </div>
      <div class="ladder">
        <div class="ladder-step done"><span class="step-num">01</span><span class="step-check">✓</span><div class="step-title">Corporate Formation</div><div class="step-meta">Oct 2025 · Wyoming C-Corp</div></div>
        <div class="ladder-step done"><span class="step-num">02</span><span class="step-check">✓</span><div class="step-title">Industry Advisory Board Established</div><div class="step-meta">Jan 7, 2026 · Founding Seats</div></div>
        <div class="ladder-step done"><span class="step-num">03</span><span class="step-check">✓</span><div class="step-title">Spring Training Validation</div><div class="step-meta">Feb 23, 2026 · Tempe Diablo · 4 MLB Officials</div></div>
        <div class="ladder-step motion"><span class="step-num">04</span><span class="step-check">○</span><div class="step-title">MLB Letter of Intent · Two-Step</div><div class="step-meta">Target Apr 23, 2026</div></div>
        <div class="ladder-step motion"><span class="step-num">05</span><span class="step-check">○</span><div class="step-title">IAB Expansion · Full Roster</div><div class="step-meta">Target H1 Close · Pitcher Seats</div></div>
      </div>
    </section>

    <section class="panel fade" style="animation-delay:0.2s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">02</span>
          <span class="panel-title">Delivered</span>
          <span class="panel-count">3 · Locked In</span>
        </div>
      </div>
      <div class="data-table ms-table">
        <a href="#" class="data-row"><span class="cell-date">Jan 7 · 2026</span><span class="cell-pill done">Delivered</span><span class="cell-title">Industry Advisory Board Established</span><span class="cell-meta">Rob Engel · Robbie Erlin · Founding Seats</span></a>
        <a href="#" class="data-row"><span class="cell-date">Feb 16 · 2026</span><span class="cell-pill done">Delivered</span><span class="cell-title">CTO Recruited</span><span class="cell-meta">Ramesh Bobba · Incoming · Fmr Cisco</span></a>
        <a href="#" class="data-row"><span class="cell-date">Feb 23 · 2026</span><span class="cell-pill done">Delivered</span><span class="cell-title">Spring Training Validation</span><span class="cell-meta">Tempe Diablo · 4 MLB Officials</span></a>
      </div>
    </section>

    <section class="panel fade" style="animation-delay:0.25s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">03</span>
          <span class="panel-title">In Motion</span>
          <span class="panel-count">2 · Window to H1 Close</span>
        </div>
      </div>
      <div class="data-table ms-table">
        <a href="#" class="data-row"><span class="cell-date">Apr 23 · 2026</span><span class="cell-pill motion">In Motion</span><span class="cell-title">MLB Letter of Intent · Two-Step</span><span class="cell-meta">Rob Engel · MLB Tech Track · LOI Process Review Apr 2</span></a>
        <a href="#" class="data-row"><span class="cell-date">H1 Close</span><span class="cell-pill motion">In Motion</span><span class="cell-title">IAB Expansion · Full Roster</span><span class="cell-meta">11 active · 2 pending · 1 upcoming pitcher seat</span></a>
      </div>
    </section>
'''

MILESTONES_CSS = '''
  .ms-table .data-row { grid-template-columns: 110px 110px 1fr 2fr; }
  .cell-pill.done { color: #8FD8A5; border-color: #8FD8A5; background: rgba(143,216,165,0.1); }
  .cell-pill.motion { color: var(--gold-mid); border-color: var(--gold-mid); background: rgba(174,142,81,0.1); }

  .ladder { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; padding: 20px; }
  .ladder-step { position: relative; padding: 24px 20px 20px; border: 1px solid var(--hairline); border-right: none; background: rgba(0,0,0,0.3); }
  .ladder-step:last-child { border-right: 1px solid var(--hairline); }
  .ladder-step.done { border-top: 2px solid #8FD8A5; background: rgba(143,216,165,0.03); }
  .ladder-step.motion { border-top: 2px solid var(--gold-mid); background: rgba(174,142,81,0.03); }
  .step-num { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--gold-mid); text-transform: uppercase; }
  .step-check { position: absolute; top: 20px; right: 20px; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: var(--black); }
  .ladder-step.done .step-check { background: #8FD8A5; }
  .ladder-step.motion .step-check { background: transparent; border: 1.5px solid var(--gold-mid); color: var(--gold-mid); }
  .step-title { font-size: 14px; font-weight: 500; color: var(--mercury); margin-top: 14px; line-height: 1.3; }
  .step-meta { font-family: 'GT America Mono', monospace; font-size: 9.5px; letter-spacing: 0.14em; color: var(--mercury-faint); text-transform: uppercase; margin-top: 8px; line-height: 1.5; }
'''

# ---------- MEETINGS ----------
MEETINGS_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">Investor Portal · Meetings</div>
      <h1 class="hero-head"><span class="em">8</span> meetings this cycle.</h1>
      <p class="hero-sub">Every active stakeholder conversation between 24 Mar and 23 Apr 2026. Four investor, two advisory, two strategy.</p>
    </div>

    <div class="stat-row fade" style="animation-delay:0.1s">
      <div class="stat"><div class="num accent">8</div><div class="label">This Cycle</div></div>
      <div class="stat"><div class="num">38</div><div class="label">Year to Date</div></div>
      <div class="stat"><div class="num">19</div><div class="label">Active Relationships</div></div>
      <div class="stat"><div class="num compact">Cycle 04</div><div class="label">24 Mar → 23 Apr</div></div>
    </div>

    <div class="filter-bar fade" style="animation-delay:0.14s">
      <button class="filter-chip active" data-cat="all">All <span class="chip-count">8</span></button>
      <button class="filter-chip" data-cat="investor">Investor <span class="chip-count">4</span></button>
      <button class="filter-chip" data-cat="advisory">Advisory <span class="chip-count">2</span></button>
      <button class="filter-chip" data-cat="strategy">Strategy <span class="chip-count">2</span></button>
    </div>

    <section class="panel fade" style="animation-delay:0.18s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">Cycle 04 Meetings</span>
          <span class="panel-count" id="mtgCount">8 of 8</span>
        </div>
      </div>
      <div class="data-table mtg-table">
        <a href="#" class="data-row" data-cat="investor"><span class="cell-date">Apr 9</span><span class="cell-pill investor">Investor</span><span class="cell-title">Mark Shirman Investor Discovery Call</span><span class="cell-meta">RiverMeadow · Fmr CEO</span></a>
        <a href="#" class="data-row" data-cat="investor"><span class="cell-date">Apr 7</span><span class="cell-pill investor">Investor</span><span class="cell-title">Scott Price Investor Discovery Call</span><span class="cell-meta">Beacon Oral · President</span></a>
        <a href="#" class="data-row" data-cat="advisory"><span class="cell-date">Apr 2</span><span class="cell-pill advisory">Advisory</span><span class="cell-title">Edwin Prather IAB Discovery Call</span><span class="cell-meta">Alexander's Steakhouse · GC</span></a>
        <a href="#" class="data-row" data-cat="investor"><span class="cell-date">Apr 2</span><span class="cell-pill investor">Investor</span><span class="cell-title">Kris Withrow · Fenwick &amp; West</span><span class="cell-meta">Partner · Legal Strategy</span></a>
        <a href="#" class="data-row" data-cat="strategy"><span class="cell-date">Apr 2</span><span class="cell-pill strategy">Strategy</span><span class="cell-title">TrackMan Momentum Call · Adam Katz</span><span class="cell-meta">TrackMan · Integration Path</span></a>
        <a href="#" class="data-row" data-cat="advisory"><span class="cell-date">Apr 2</span><span class="cell-pill advisory">Advisory</span><span class="cell-title">Stephen Piscotty IAB Discovery Call</span><span class="cell-meta">Fmr MLB · IAB Candidacy</span></a>
        <a href="#" class="data-row" data-cat="investor"><span class="cell-date">Mar 28</span><span class="cell-pill investor">Investor</span><span class="cell-title">Tom Castillo Follow-Up</span><span class="cell-meta">IAB · Investor · Advisor</span></a>
        <a href="#" class="data-row" data-cat="strategy"><span class="cell-date">Mar 25</span><span class="cell-pill strategy">Strategy</span><span class="cell-title">ACIS Positioning Review</span><span class="cell-meta">Internal · Comparables</span></a>
      </div>
    </section>

    <section class="panel fade" style="animation-delay:0.22s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">02</span>
          <span class="panel-title">Annual Timetable · Oct 2025 to Apr 2026</span>
          <span class="panel-count">19 Relationships · 38 Conversations</span>
        </div>
      </div>
      <div class="data-table year-table">
        <div class="data-row header"><span class="cell-date" style="color:var(--mercury-faint)">Month</span><span class="cell-title" style="font-family:'GT America Mono',monospace; font-size:10px; letter-spacing:0.2em; color:var(--mercury-faint); text-transform:uppercase; font-weight:500">Theme</span><span class="cell-meta">Count</span><span class="cell-meta">Highlight</span></div>
        <a href="#" class="data-row"><span class="cell-date">Oct '25</span><span class="cell-title">Founding</span><span class="cell-meta">3</span><span class="cell-meta">Corporate Formation · Fenwick onboarded</span></a>
        <a href="#" class="data-row"><span class="cell-date">Nov '25</span><span class="cell-title">Investor Lane Opens</span><span class="cell-meta">4</span><span class="cell-meta">Mark Shirman · Joe Revels · BizAnalytica intro</span></a>
        <a href="#" class="data-row"><span class="cell-date">Dec '25</span><span class="cell-title">Partnerships</span><span class="cell-meta">4</span><span class="cell-meta">TrackMan intro · Scott Price intro</span></a>
        <a href="#" class="data-row"><span class="cell-date">Jan '26</span><span class="cell-title">IAB Seated</span><span class="cell-meta">4</span><span class="cell-meta">Rob Engel · Robbie Erlin · Legal framework</span></a>
        <a href="#" class="data-row"><span class="cell-date">Feb '26</span><span class="cell-title">CTO + Spring Training</span><span class="cell-meta">6</span><span class="cell-meta">Ramesh Bobba · Spring Training validation</span></a>
        <a href="#" class="data-row"><span class="cell-date">Mar '26</span><span class="cell-title">Positioning</span><span class="cell-meta">6</span><span class="cell-meta">Comparables filed · ACIS review</span></a>
        <a href="#" class="data-row current"><span class="cell-date">Apr '26</span><span class="cell-title">LOI In Sight</span><span class="cell-meta">11</span><span class="cell-meta">MLB LOI · IAB expansion · investor discovery</span></a>
      </div>
    </section>
'''

MEETINGS_CSS = '''
  .filter-bar { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
  .filter-chip { padding: 8px 14px; background: transparent; border: 1px solid var(--hairline-2); color: var(--mercury-dim); font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .filter-chip:hover { border-color: var(--gold-mid); color: var(--mercury); }
  .filter-chip.active { border-color: var(--gold); color: var(--gold); background: rgba(255,198,85,0.06); }
  .chip-count { padding: 1px 6px; background: rgba(229,229,229,0.08); color: var(--mercury-dim); font-size: 9px; min-width: 18px; text-align: center; }
  .filter-chip.active .chip-count { background: rgba(255,198,85,0.2); color: var(--gold); }

  .mtg-table .data-row { grid-template-columns: 60px 84px 1fr 1.4fr; }
  .cell-pill.investor { color: var(--gold); border-color: var(--gold); background: rgba(255,198,85,0.08); }
  .cell-pill.advisory { color: var(--mercury); border-color: rgba(229,229,229,0.4); }
  .cell-pill.strategy { color: var(--gold-mid); border-color: var(--gold-mid); background: rgba(174,142,81,0.1); }

  .year-table .data-row { grid-template-columns: 90px 1fr 60px 2fr; }
  .year-table .data-row.header { background: rgba(0,0,0,0.4); cursor: default; }
  .year-table .data-row.header:hover { background: rgba(0,0,0,0.4); }
  .year-table .data-row.current { background: rgba(255,198,85,0.04); border-left: 2px solid var(--gold); }
'''

MEETINGS_SCRIPT = '''<script>
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;
      let visible = 0;
      document.querySelectorAll('.mtg-table .data-row').forEach(row => {
        const match = (cat === 'all' || row.dataset.cat === cat);
        row.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      const count = document.getElementById('mtgCount');
      if (count) count.textContent = visible + ' of 8';
    });
  });
</script>'''

# ---------- VAULT ----------
VAULT_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">Investor Portal · Vault</div>
      <h1 class="hero-head">The <span class="em">source of record.</span></h1>
      <p class="hero-sub">Every material the stakeholder portal references — case studies, governance, positioning, and brand — stored, versioned, and link-accessible for cycle-level review.</p>
    </div>

    <div class="stat-row fade" style="animation-delay:0.1s">
      <div class="stat"><div class="num accent">6</div><div class="label">Documents</div></div>
      <div class="stat"><div class="num">4</div><div class="label">Released</div></div>
      <div class="stat"><div class="num">2</div><div class="label">Drafts</div></div>
      <div class="stat"><div class="num compact">Cycle 04</div><div class="label">Active Period</div></div>
    </div>

    <div class="filter-bar fade" style="animation-delay:0.14s">
      <button class="filter-chip active" data-cat="all">All <span class="chip-count">6</span></button>
      <button class="filter-chip" data-cat="intel">Intel <span class="chip-count">2</span></button>
      <button class="filter-chip" data-cat="governance">Governance <span class="chip-count">1</span></button>
      <button class="filter-chip" data-cat="brand">Brand <span class="chip-count">1</span></button>
      <button class="filter-chip" data-cat="case">Case Study <span class="chip-count">1</span></button>
      <button class="filter-chip" data-cat="deck">Deck <span class="chip-count">1</span></button>
    </div>

    <section class="panel fade" style="animation-delay:0.18s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">Cycle 04 Materials</span>
          <span class="panel-count">6 documents</span>
        </div>
      </div>
      <div class="data-table vault-table">
        <a href="../../artifacts/vault/docs/Sports_Tech_Deal_Comparables.pdf" target="_blank" class="data-row" data-cat="intel"><span class="cell-badge pdf">PDF</span><span class="cell-title">Sports Tech Deal Comparables</span><span class="cell-meta">Market Intel · Deal Comparables</span><span class="cell-meta">Sheldon McClelland · Apr 8</span><span class="cell-actions">View →</span></a>
        <a href="../../artifacts/vault/docs/IAB_Overview.pdf" target="_blank" class="data-row" data-cat="governance"><span class="cell-badge pdf">PDF</span><span class="cell-title">IAB Program Framework</span><span class="cell-meta">Governance · Advisory Board</span><span class="cell-meta">Jeff Newman · Apr 4</span><span class="cell-actions">View →</span></a>
        <a href="#" class="data-row" data-cat="brand"><span class="cell-badge pdf">PDF</span><span class="cell-title">Brand Guidelines v1.0</span><span class="cell-meta">Brand · PERKK Branding Studio</span><span class="cell-meta">External · Jan 2026</span><span class="cell-actions">View →</span></a>
        <a href="#" class="data-row draft" data-cat="case"><span class="cell-badge doc">DOC</span><span class="cell-title">Hayden Birdsong Case Study <span class="draft-tag">Draft</span></span><span class="cell-meta">Case Study · ACIS</span><span class="cell-meta">Chase Spivey · Apr 14</span><span class="cell-actions">View →</span></a>
        <a href="../../artifacts/vault/docs/Investor_Deck.pdf" target="_blank" class="data-row" data-cat="deck"><span class="cell-badge pptx">PPTX</span><span class="cell-title">Investor Deck</span><span class="cell-meta">Deck · Capital Strategy</span><span class="cell-meta">Chase Spivey · Apr 10</span><span class="cell-actions">View →</span></a>
        <a href="#" class="data-row draft" data-cat="intel"><span class="cell-badge doc">DOC</span><span class="cell-title">Power Statement <span class="draft-tag">Draft</span></span><span class="cell-meta">Leadership · Positioning</span><span class="cell-meta">Sheldon McClelland · Apr 11</span><span class="cell-actions">View →</span></a>
      </div>
    </section>
'''

VAULT_CSS = '''
  .filter-bar { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
  .filter-chip { padding: 8px 14px; background: transparent; border: 1px solid var(--hairline-2); color: var(--mercury-dim); font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .filter-chip:hover { border-color: var(--gold-mid); color: var(--mercury); }
  .filter-chip.active { border-color: var(--gold); color: var(--gold); background: rgba(255,198,85,0.06); }
  .chip-count { padding: 1px 6px; background: rgba(229,229,229,0.08); color: var(--mercury-dim); font-size: 9px; min-width: 18px; text-align: center; }
  .filter-chip.active .chip-count { background: rgba(255,198,85,0.2); color: var(--gold); }

  .vault-table .data-row { grid-template-columns: 60px 1fr 1fr 1fr 80px; }
  .cell-badge { display: inline-flex; justify-content: center; padding: 4px 0; font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; border: 1px solid; }
  .cell-badge.pdf { color: var(--gold); border-color: var(--gold); background: rgba(255,198,85,0.08); }
  .cell-badge.doc { color: var(--mercury); border-color: rgba(229,229,229,0.4); }
  .cell-badge.pptx { color: var(--gold-mid); border-color: var(--gold-mid); }
  .draft-tag { display: inline-block; margin-left: 8px; padding: 2px 6px; font-family: 'GT America Mono', monospace; font-size: 8px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold-mid); border: 1px solid var(--gold-mid); background: rgba(174,142,81,0.08); }
'''

VAULT_SCRIPT = '''<script>
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;
      document.querySelectorAll('.vault-table .data-row').forEach(row => {
        row.style.display = (cat === 'all' || row.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
</script>'''

# ---------- BUZZ ----------
BUZZ_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">Investor Portal · Recent Buzz</div>
      <h1 class="hero-head">Cycle 04 <span class="em">buzz.</span></h1>
      <p class="hero-sub">The most important differentiating feature of the portal. <em>Six items worth knowing</em> from this 30-day cycle — materials, governance, positioning. Everything resets at cycle end.</p>
    </div>

    <div class="stat-row fade" style="animation-delay:0.1s">
      <div class="stat"><div class="num accent">6</div><div class="label">This Cycle</div></div>
      <div class="stat"><div class="num">1</div><div class="label">Featured</div></div>
      <div class="stat"><div class="num">5</div><div class="label">Contributors</div></div>
      <div class="stat"><div class="num compact">30 Day</div><div class="label">Reset Cadence</div></div>
    </div>

    <section class="panel fade" style="animation-delay:0.15s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">Cycle 04 Items</span>
          <span class="panel-count">6 items · Pinned first</span>
        </div>
      </div>
      <div class="buzz-list">

        <article class="buzz-row open pinned" data-cat="case">
          <div class="buzz-head">
            <span class="buzz-cat case">Case Study</span>
            <div class="buzz-title-wrap"><span class="pin-tag">★ Pinned</span><div class="buzz-title">Hayden Birdsong Case Study</div></div>
            <div class="buzz-meta-wrap"><span class="buzz-date">Apr 14</span><span class="chevron"></span></div>
          </div>
          <div class="buzz-body"><div class="buzz-body-inner"><div class="buzz-body-content">
            Deep-dive on SF Giants pitcher <strong>Hayden Birdsong's</strong> biomechanical markers through the ACIS lens. Cornerstone proof-of-concept for investor conversations — demonstrates the predictive layer that separates Baseline from every other pitch-tracking tool in the market.
            <div class="buzz-body-meta"><span class="author">Chase Spivey</span><span>·</span><span>CEO</span><span>·</span><span>Investor-ready</span></div>
          </div></div></div>
        </article>

        <article class="buzz-row" data-cat="leadership">
          <div class="buzz-head">
            <span class="buzz-cat leadership">Leadership</span>
            <div class="buzz-title-wrap"><div class="buzz-title">Sheldon's Power Statement</div></div>
            <div class="buzz-meta-wrap"><span class="buzz-date">Apr 11</span><span class="chevron"></span></div>
          </div>
          <div class="buzz-body"><div class="buzz-body-inner"><div class="buzz-body-content">
            COO's definitive positioning statement on market authority and competitive moat. Captures why Baseline is the only league-wide pitcher-injury prevention system — and why that matters to an investor reading the deck cold.
            <div class="buzz-body-meta"><span class="author">Sheldon McClelland</span><span>·</span><span>COO</span><span>·</span><span>Internal</span></div>
          </div></div></div>
        </article>

        <article class="buzz-row" data-cat="market">
          <div class="buzz-head">
            <span class="buzz-cat market">Market Intel</span>
            <div class="buzz-title-wrap"><div class="buzz-title">Marketplace Comparables Doc</div></div>
            <div class="buzz-meta-wrap"><span class="buzz-date">Apr 8</span><span class="chevron"></span></div>
          </div>
          <div class="buzz-body"><div class="buzz-body-inner"><div class="buzz-body-content">
            <strong>$6B+ in documented sports-tech transactions.</strong> Positions ACIS against BAMTech, Digital Athlete, Second Spectrum. Grounds Baseline's valuation thesis in real, filed comparables rather than analogues.
            <div class="buzz-body-meta"><span class="author">Sheldon McClelland</span><span>·</span><span>COO</span><span>·</span><span>Deal Intel</span></div>
          </div></div></div>
        </article>

        <article class="buzz-row" data-cat="governance">
          <div class="buzz-head">
            <span class="buzz-cat governance">Governance</span>
            <div class="buzz-title-wrap"><div class="buzz-title">IAB Program Framework Finalized</div></div>
            <div class="buzz-meta-wrap"><span class="buzz-date">Apr 4</span><span class="chevron"></span></div>
          </div>
          <div class="buzz-body"><div class="buzz-body-inner"><div class="buzz-body-content">
            Advisory Board governance completed. Roles, seat terms, honorarium structure, quarterly cadence. Ready for expansion through Q2. Built with Jeff Newman as Portal Architect.
            <div class="buzz-body-meta"><span class="author">Jeff Newman</span><span>·</span><span>Executive Chairman</span><span>·</span><span>IAB Architect</span></div>
          </div></div></div>
        </article>

        <article class="buzz-row" data-cat="brand">
          <div class="buzz-head">
            <span class="buzz-cat brand">Brand</span>
            <div class="buzz-title-wrap"><div class="buzz-title">Brand Guidelines v1.0 Delivered</div></div>
            <div class="buzz-meta-wrap"><span class="buzz-date">Apr 2</span><span class="chevron"></span></div>
          </div>
          <div class="buzz-body"><div class="buzz-body-inner"><div class="buzz-body-content">
            Full identity system — logo lockups, color palette, typography, brand asset patterns, application mockups. 42 pages from PERKK Branding Studio. Portal, deck, and external comms now pull from a single source.
            <div class="buzz-body-meta"><span class="author">PERKK Branding Studio</span><span>·</span><span>External</span><span>·</span><span>v1.0</span></div>
          </div></div></div>
        </article>

        <article class="buzz-row" data-cat="partnership">
          <div class="buzz-head">
            <span class="buzz-cat partnership">Partnership</span>
            <div class="buzz-title-wrap"><div class="buzz-title">TrackMan Integration Pathway</div></div>
            <div class="buzz-meta-wrap"><span class="buzz-date">Apr 2</span><span class="chevron"></span></div>
          </div>
          <div class="buzz-body"><div class="buzz-body-inner"><div class="buzz-body-content">
            Momentum call with Adam Katz, TrackMan. Integration path identified for the biomechanical data layer. Opens the technical conversation that underpins the LOI deliverable.
            <div class="buzz-body-meta"><span class="author">Chase Spivey</span><span>·</span><span>CEO</span><span>·</span><span>Partnership</span></div>
          </div></div></div>
        </article>

      </div>
    </section>
'''

BUZZ_CSS = '''
  .buzz-list { display: flex; flex-direction: column; }
  .buzz-row { border-bottom: 1px solid var(--hairline); transition: background 0.15s; }
  .buzz-row:last-child { border-bottom: none; }
  .buzz-row.open { background: rgba(255,198,85,0.03); }
  .buzz-row.pinned .buzz-head { background: rgba(255,198,85,0.04); }
  .buzz-row[data-cat="case"]        { border-left: 2px solid #FFC655; }
  .buzz-row[data-cat="leadership"]  { border-left: 2px solid #B19CD9; }
  .buzz-row[data-cat="market"]      { border-left: 2px solid #7FC89A; }
  .buzz-row[data-cat="governance"]  { border-left: 2px solid #6FA7D4; }
  .buzz-row[data-cat="brand"]       { border-left: 2px solid #E89B5F; }
  .buzz-row[data-cat="partnership"] { border-left: 2px solid #5FC9C5; }

  .buzz-head { display: grid; grid-template-columns: 110px 1fr auto; align-items: center; gap: 14px; padding: 16px 20px; cursor: pointer; transition: all 0.15s; }
  .buzz-head:hover { background: rgba(255,255,255,0.02); }
  .buzz-cat { font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
  .buzz-cat.case        { color: #FFC655; }
  .buzz-cat.leadership  { color: #B19CD9; }
  .buzz-cat.market      { color: #7FC89A; }
  .buzz-cat.governance  { color: #6FA7D4; }
  .buzz-cat.brand       { color: #E89B5F; }
  .buzz-cat.partnership { color: #5FC9C5; }

  .buzz-title-wrap { display: flex; align-items: center; gap: 10px; }
  .pin-tag { font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: var(--gold); text-transform: uppercase; padding: 3px 8px; border: 1px solid var(--gold); background: rgba(255,198,85,0.1); }
  .buzz-title { font-size: 14px; font-weight: 500; color: var(--mercury); letter-spacing: -0.005em; line-height: 1.3; }
  .buzz-row.open .buzz-title { color: var(--gold); }

  .buzz-meta-wrap { display: flex; align-items: center; gap: 12px; }
  .buzz-date { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.14em; color: var(--mercury-faint); text-transform: uppercase; }
  .buzz-row .chevron { width: 6px; height: 6px; border-right: 1.2px solid var(--mercury-faint); border-bottom: 1.2px solid var(--mercury-faint); transform: rotate(45deg); transition: transform 0.2s; margin-bottom: 2px; }
  .buzz-row.open .chevron { transform: rotate(225deg); border-color: var(--gold); margin-top: 2px; margin-bottom: 0; }

  .buzz-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.25s ease; }
  .buzz-row.open .buzz-body { grid-template-rows: 1fr; }
  .buzz-body-inner { overflow: hidden; }
  .buzz-body-content { padding: 0 20px 20px 110px; font-size: 13.5px; line-height: 1.6; color: var(--mercury-dim); font-weight: 300; }
  .buzz-body-content strong { color: var(--mercury); font-weight: 500; }
  .buzz-body-meta { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--hairline); font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.14em; color: var(--mercury-faint); text-transform: uppercase; display: flex; gap: 10px; flex-wrap: wrap; }
  .buzz-body-meta .author { color: var(--mercury-dim); }
'''

BUZZ_SCRIPT = '''<script>
  document.querySelectorAll('.buzz-head').forEach(head => {
    head.addEventListener('click', () => {
      head.closest('.buzz-row').classList.toggle('open');
    });
  });
</script>'''

# ---------- TEAM ----------
TEAM_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">About Us · Leadership</div>
      <h1 class="hero-head">Executive <span class="em">team.</span></h1>
      <p class="hero-sub">Two co-founders, the executive chairman, the incoming CTO, and the lead engineer on the MLB deliverable. Three key portal stakeholders in bold.</p>
    </div>

    <div class="stat-row fade" style="animation-delay:0.1s">
      <div class="stat"><div class="num accent">5</div><div class="label">Executive Seats</div></div>
      <div class="stat"><div class="num">2</div><div class="label">Co-Founders</div></div>
      <div class="stat"><div class="num">3</div><div class="label">Key Portal Stakeholders</div></div>
      <div class="stat"><div class="num compact">Wyoming</div><div class="label">C-Corporation</div></div>
    </div>

    <section class="panel fade" style="animation-delay:0.15s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">Executive Leadership</span>
          <span class="panel-count">5 Seats</span>
        </div>
      </div>
      <div class="data-table team-table">
        <div class="data-row header"><span class="cell-meta">Name</span><span class="cell-meta">Role</span><span class="cell-meta">Portal Role</span><span class="cell-meta">Bio</span></div>
        <div class="data-row key"><span class="cell-title">Chase Spivey</span><span class="cell-meta" style="color:var(--gold)">CEO · Co-Founder</span><span class="cell-pill portal">Portal · Champion</span><span class="cell-meta">Founding CEO and primary content creator. Drives MLB relationship, capital strategy, and commercial direction.</span></div>
        <div class="data-row key"><span class="cell-title">Sheldon McClelland</span><span class="cell-meta" style="color:var(--gold)">COO · Co-Founder</span><span class="cell-pill portal">Portal · Positioning</span><span class="cell-meta">Founding COO. Creates Power Statement, Comparables Doc. Owns operational architecture and cycle cadence.</span></div>
        <div class="data-row key"><span class="cell-title">Jeff Newman</span><span class="cell-meta" style="color:var(--gold)">Executive Chairman</span><span class="cell-pill portal">Portal · Architect</span><span class="cell-meta">Defined the portal concept and Recent Buzz requirements. IAB architect. Onboarded 05 Mar 2026.</span></div>
        <div class="data-row"><span class="cell-title">Ramesh Bobba</span><span class="cell-meta">Incoming CTO</span><span class="cell-meta">—</span><span class="cell-meta">Fmr Cisco VP Engineering. Leads the ACIS biomechanical pipeline and TrackMan integration.</span></div>
        <div class="data-row"><span class="cell-title">John Mendez</span><span class="cell-meta">Lead Developer</span><span class="cell-meta">—</span><span class="cell-meta">Lead engineer on the MLB deliverable. Owns the portal, ingest layer, and ACIS integration.</span></div>
      </div>
    </section>

    <section class="panel fade" style="animation-delay:0.2s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">02</span>
          <span class="panel-title">Corporate &amp; Governance</span>
          <span class="panel-count">Formation · Counsel · Cadence</span>
        </div>
      </div>
      <div class="data-table gov-table">
        <div class="data-row"><span class="cell-meta" style="color:var(--gold-mid)">Entity</span><span class="cell-title">Baseline Analytics, Inc.</span><span class="cell-meta">Wyoming C-Corporation · Formed Oct 2025</span></div>
        <div class="data-row"><span class="cell-meta" style="color:var(--gold-mid)">Counsel</span><span class="cell-title">Fenwick &amp; West</span><span class="cell-meta">Kris Withrow, Partner · Corporate &amp; Securities</span></div>
        <div class="data-row"><span class="cell-meta" style="color:var(--gold-mid)">Cycle</span><span class="cell-title">Monthly Stakeholder Brief</span><span class="cell-meta">Cycle 04 · 24 Mar to 23 Apr 2026</span></div>
      </div>
    </section>

    <div class="cross-link-row fade" style="animation-delay:0.24s">
      <a href="../advisory/index.html" class="cross-link">View Industry Advisory Board →</a>
    </div>
'''

TEAM_CSS = '''
  .team-table .data-row { grid-template-columns: 180px 180px 180px 1fr; align-items: start; padding: 18px 20px; }
  .team-table .data-row.header { background: rgba(0,0,0,0.4); cursor: default; align-items: center; padding: 14px 20px; }
  .team-table .data-row.header:hover { background: rgba(0,0,0,0.4); }
  .team-table .data-row.key { background: rgba(255,198,85,0.03); border-left: 2px solid var(--gold); }
  .cell-pill.portal { color: var(--gold); border-color: var(--gold); background: rgba(255,198,85,0.08); align-self: start; }

  .gov-table .data-row { grid-template-columns: 120px 280px 1fr; }

  .cross-link-row { text-align: center; margin: 32px 0 40px; }
  .cross-link { display: inline-flex; padding: 14px 28px; background: rgba(18,18,17,0.7); border: 1px solid var(--gold-mid); color: var(--mercury); font-family: 'GT America Mono', monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; transition: all 0.2s; }
  .cross-link:hover { border-color: var(--gold); color: var(--gold); background: rgba(255,198,85,0.06); }
'''

# ---------- ADVISORY ----------
ADVISORY_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">About Us · Governance</div>
      <h1 class="hero-head">Industry <span class="em">advisory board.</span></h1>
      <p class="hero-sub">Domain experts from <em>MLB, sports medicine, and technology</em> guiding product, market, and governance strategy. Eleven active, two pending, one upcoming.</p>
    </div>

    <div class="stat-row fade" style="animation-delay:0.1s">
      <div class="stat"><div class="num accent">11</div><div class="label">Active Members</div></div>
      <div class="stat"><div class="num">2</div><div class="label">Pending</div></div>
      <div class="stat"><div class="num">1</div><div class="label">Upcoming</div></div>
      <div class="stat"><div class="num compact">Quarterly</div><div class="label">Meeting Cadence</div></div>
    </div>

    <section class="panel fade" style="animation-delay:0.13s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">Composition</span>
          <span class="panel-count">Pitcher-heavy · League-anchored</span>
        </div>
      </div>
      <div class="comp-grid">
        <div class="comp-cell"><div class="comp-num">4</div><div class="comp-label">Pitchers</div><div class="comp-meta">Active + Pending · MLB</div></div>
        <div class="comp-cell"><div class="comp-num">2</div><div class="comp-label">League Operators</div><div class="comp-meta">MLB SVP · Active Scout</div></div>
        <div class="comp-cell"><div class="comp-num">3</div><div class="comp-label">Investor Advisors</div><div class="comp-meta">Capital + Strategy</div></div>
        <div class="comp-cell"><div class="comp-num">4</div><div class="comp-label">Industry &amp; Strategic</div><div class="comp-meta">Market · Product · GTM</div></div>
      </div>
    </section>

    <section class="panel fade" style="animation-delay:0.17s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">02</span>
          <span class="panel-title">Active Members</span>
          <span class="panel-count">11 Seats · Quarterly Cadence</span>
        </div>
      </div>
      <div class="data-table adv-table">
        <div class="data-row header"><span class="cell-meta">Name</span><span class="cell-meta">Status</span><span class="cell-meta">Role</span><span class="cell-meta">Contribution</span></div>
        <div class="data-row active"><span class="cell-title">Rob Engel</span><span class="cell-pill active">Founding</span><span class="cell-meta">SVP Software Eng, MLB</span><span class="cell-meta">League-office anchor. Opens the direct MLB technical track and carries the LOI conversation.</span></div>
        <div class="data-row active"><span class="cell-title">Joe Revels</span><span class="cell-pill active">Active</span><span class="cell-meta">Industry Advisor</span><span class="cell-meta">Sports-tech operator. Early investor-lane introductions and positioning counsel.</span></div>
        <div class="data-row active"><span class="cell-title">Cindy Leeper</span><span class="cell-pill active">Active</span><span class="cell-meta">Industry Advisor</span><span class="cell-meta">Operations and GTM advisor. Commercial cadence and stakeholder programming.</span></div>
        <div class="data-row active"><span class="cell-title">Tom Castillo</span><span class="cell-pill active">Active</span><span class="cell-meta">Investor · Advisor</span><span class="cell-meta">Source of the Scott Price intro. Bridges investor pipeline and the board.</span></div>
        <div class="data-row active"><span class="cell-title">Ryan Pollace</span><span class="cell-pill active">Active</span><span class="cell-meta">Investor · Advisor</span><span class="cell-meta">Capital-markets advisor. Supports term-sheet framing and diligence prep.</span></div>
        <div class="data-row active"><span class="cell-title">Robbie Erlin</span><span class="cell-pill active">Active</span><span class="cell-meta">Fmr MLB · Dodgers Coach</span><span class="cell-meta">Former MLB pitcher, Dodgers org coach. Pitcher-side credibility and investor.</span></div>
        <div class="data-row active"><span class="cell-title">Guy Gandenberger</span><span class="cell-pill active">Active</span><span class="cell-meta">Industry Advisor</span><span class="cell-meta">Sports and technology advisor. Positioning against NFL / NBA comparables.</span></div>
        <div class="data-row active"><span class="cell-title">Tom Kunis</span><span class="cell-pill active">Active</span><span class="cell-meta">Current MLB Scout</span><span class="cell-meta">Active MLB scout. Ground truth on talent evaluation and pitcher-workload signal relevance.</span></div>
        <div class="data-row active"><span class="cell-title">Mark Webster</span><span class="cell-pill active">Active</span><span class="cell-meta">Strategic Advisor</span><span class="cell-meta">Senior strategic advisor. Narrative, partner strategy, and board-level counsel.</span></div>
        <div class="data-row active"><span class="cell-title">Tyson Ross</span><span class="cell-pill active">Active</span><span class="cell-meta">Fmr MLB Pitcher</span><span class="cell-meta">Voice of the pitcher on product design and clinical framing.</span></div>
        <div class="data-row active"><span class="cell-title">Adam Cimber</span><span class="cell-pill active">Active</span><span class="cell-meta">Fmr MLB Pitcher</span><span class="cell-meta">Relief-arm workload perspective and pitcher-network introductions.</span></div>
      </div>
    </section>

    <section class="panel fade" style="animation-delay:0.21s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">03</span>
          <span class="panel-title">Pending &amp; Upcoming</span>
          <span class="panel-count">2 Pending · 1 Upcoming</span>
        </div>
      </div>
      <div class="data-table adv-table">
        <div class="data-row pending"><span class="cell-title">Tony Gonsolin</span><span class="cell-pill pending">Pending</span><span class="cell-meta">MLB Pitcher · Free Agent</span><span class="cell-meta">Active-era MLB pitcher. Offer extended; decision pending.</span></div>
        <div class="data-row pending"><span class="cell-title">Stephen Piscotty</span><span class="cell-pill pending">Pending</span><span class="cell-meta">Fmr MLB Hitter</span><span class="cell-meta">Discovery call held Apr 2. Broadens the clubhouse-side perspective.</span></div>
        <div class="data-row upcoming"><span class="cell-title">Joey Lucchesi</span><span class="cell-pill upcoming">Upcoming</span><span class="cell-meta">MLB Pitcher · SF Giants</span><span class="cell-meta">Current MLB pitcher. Offer sequenced for post-LOI window.</span></div>
      </div>
    </section>

    <div class="cross-link-row fade" style="animation-delay:0.25s">
      <a href="../team/index.html" class="cross-link">View Executive Team →</a>
    </div>
'''

ADVISORY_CSS = '''
  .comp-grid { display: grid; grid-template-columns: repeat(4, 1fr); padding: 20px; gap: 0; }
  .comp-cell { padding: 16px 22px; border-right: 1px solid var(--hairline); }
  .comp-cell:last-child { border-right: none; }
  .comp-num { font-size: 32px; font-weight: 300; color: var(--gold); letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; }
  .comp-label { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: var(--mercury); text-transform: uppercase; margin: 10px 0 4px; }
  .comp-meta { font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.14em; color: var(--mercury-faint); text-transform: uppercase; line-height: 1.5; }

  .adv-table .data-row { grid-template-columns: 180px 110px 200px 1fr; align-items: start; padding: 16px 20px; }
  .adv-table .data-row.header { background: rgba(0,0,0,0.4); cursor: default; align-items: center; padding: 14px 20px; }
  .adv-table .data-row.header:hover { background: rgba(0,0,0,0.4); }
  .adv-table .data-row.active { border-left: 2px solid var(--gold); }
  .adv-table .data-row.pending { border-left: 2px dashed var(--gold-mid); }
  .adv-table .data-row.upcoming { border-left: 1px dashed var(--gold-mid); background: rgba(255,198,85,0.02); }
  .cell-pill.active { color: var(--gold); border-color: var(--gold); background: rgba(255,198,85,0.08); align-self: start; }
  .cell-pill.pending { color: var(--gold-mid); border-color: var(--gold-mid); background: rgba(174,142,81,0.1); align-self: start; }
  .cell-pill.upcoming { color: var(--mercury-dim); border-color: var(--hairline-2); align-self: start; }

  .cross-link-row { text-align: center; margin: 32px 0 40px; }
  .cross-link { display: inline-flex; padding: 14px 28px; background: rgba(18,18,17,0.7); border: 1px solid var(--gold-mid); color: var(--mercury); font-family: 'GT America Mono', monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; transition: all 0.2s; }
  .cross-link:hover { border-color: var(--gold); color: var(--gold); background: rgba(255,198,85,0.06); }
'''

# ---------- ASK PORTAL ----------
ASK_CONTENT = '''
    <div class="hero fade">
      <div class="hero-kicker">Investor Portal · Ask Interface</div>
      <h1 class="hero-head">Ask a question. <span class="em">The portal answers.</span></h1>
      <p class="hero-sub">Natural-language queries across meetings, milestones, materials, and roster. <em>Plain English in, structured briefing out.</em></p>
    </div>

    <div class="ask-hero fade" style="animation-delay:0.08s">
      <form class="ask-hero-form" onsubmit="event.preventDefault(); handleAsk(this.q.value);">
        <input type="text" name="q" class="ask-hero-input" placeholder="What do you need to know?" autocomplete="off" autofocus />
        <button type="submit" class="ask-hero-send">Ask →</button>
      </form>
    </div>

    <div class="prompt-grid fade" style="animation-delay:0.12s">
      <button class="prompt-card" onclick="handleAsk('How many investor meetings this month?')">
        <div class="prompt-cat">Meetings</div>
        <div class="prompt-q">How many investor meetings this month?</div>
      </button>
      <button class="prompt-card" onclick="handleAsk('Latest on IAB onboarding?')">
        <div class="prompt-cat">Advisory</div>
        <div class="prompt-q">Latest on IAB onboarding?</div>
      </button>
      <button class="prompt-card" onclick="handleAsk('Summarize the Birdsong case study')">
        <div class="prompt-cat">Case Study</div>
        <div class="prompt-q">Summarize the Birdsong case study</div>
      </button>
      <button class="prompt-card" onclick="handleAsk('Deal comparables overview')">
        <div class="prompt-cat">Deal Intel</div>
        <div class="prompt-q">Deal comparables overview</div>
      </button>
      <button class="prompt-card" onclick="handleAsk('Materials created this cycle?')">
        <div class="prompt-cat">Vault</div>
        <div class="prompt-q">Materials created this cycle?</div>
      </button>
      <button class="prompt-card" onclick="handleAsk('Next advisory board call?')">
        <div class="prompt-cat">Calendar</div>
        <div class="prompt-q">Next advisory board call?</div>
      </button>
    </div>

    <section class="panel fade" style="animation-delay:0.16s">
      <div class="panel-head">
        <div class="panel-head-left">
          <span class="panel-num">01</span>
          <span class="panel-title">Sample Answer</span>
          <span class="panel-count">Query: "How many investor meetings this month?"</span>
        </div>
      </div>
      <div class="sample-answer">
        <div class="sample-head">
          <div class="sample-source">Portal data · Cycle 04 · 24 Mar – 23 Apr 2026</div>
        </div>
        <div class="sample-body">
          <p><strong>Four investor meetings in Cycle 04.</strong></p>
          <ul class="sample-list">
            <li><span class="sample-date">Apr 9</span><span class="sample-item">Mark Shirman Investor Discovery Call — Fmr CEO, RiverMeadow (via Jeff Newman)</span></li>
            <li><span class="sample-date">Apr 7</span><span class="sample-item">Scott Price Investor Discovery Call — President, Beacon Oral (via Tom Castillo)</span></li>
            <li><span class="sample-date">Apr 2</span><span class="sample-item">Kris Withrow · Fenwick &amp; West — Legal framework + investor intros</span></li>
            <li><span class="sample-date">Mar 28</span><span class="sample-item">Tom Castillo Follow-Up — Terms, timeline, next steps</span></li>
          </ul>
          <p class="sample-insight">Pace: 4 in 30 days. On track with the trailing-cycle average of 3–5 investor touches per month since November.</p>
        </div>
      </div>
    </section>
'''

ASK_CSS = '''
  .ask-hero { background: var(--onyx); border: 1px solid var(--gold-mid); padding: 20px; margin-bottom: 24px; position: relative; }
  .ask-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--gold); }
  .ask-hero-form { display: flex; gap: 10px; }
  .ask-hero-input { flex: 1; background: rgba(0,0,0,0.5); border: 1px solid var(--hairline-2); color: var(--mercury); padding: 16px 20px; font-family: 'GT America', sans-serif; font-size: 17px; font-weight: 300; letter-spacing: -0.005em; outline: none; transition: border-color 0.2s; }
  .ask-hero-input::placeholder { color: var(--mercury-faint); }
  .ask-hero-input:focus { border-color: var(--gold); }
  .ask-hero-send { background: var(--gold); color: #121211; border: none; padding: 0 32px; font-family: 'GT America Mono', monospace; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
  .ask-hero-send:hover { background: #ffd37a; }

  .prompt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 40px; }
  .prompt-card { background: rgba(18,18,17,0.6); border: 1px solid var(--hairline-2); padding: 18px 20px; text-align: left; cursor: pointer; transition: all 0.2s; font-family: inherit; color: inherit; }
  .prompt-card:hover { border-color: var(--gold-mid); background: rgba(18,18,17,0.9); }
  .prompt-cat { font-family: 'GT America Mono', monospace; font-size: 9px; letter-spacing: 0.22em; color: var(--gold-mid); text-transform: uppercase; margin-bottom: 10px; }
  .prompt-q { font-size: 14px; color: var(--mercury); line-height: 1.4; }
  .prompt-card:hover .prompt-q { color: var(--gold); }

  .sample-answer { padding: 24px 28px; }
  .sample-head { margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--hairline); }
  .sample-source { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: var(--gold-mid); text-transform: uppercase; }
  .sample-body { font-size: 14px; line-height: 1.6; color: var(--mercury-dim); }
  .sample-body strong { color: var(--mercury); font-weight: 500; }
  .sample-body p { margin-bottom: 16px; }
  .sample-list { list-style: none; padding: 0; margin: 0 0 16px; border-top: 1px solid var(--hairline); }
  .sample-list li { display: grid; grid-template-columns: 70px 1fr; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--hairline); align-items: baseline; }
  .sample-date { font-family: 'GT America Mono', monospace; font-size: 10px; letter-spacing: 0.14em; color: var(--gold); text-transform: uppercase; }
  .sample-item { font-size: 13.5px; color: var(--mercury-dim); line-height: 1.5; }
  .sample-insight { font-size: 13px; color: var(--mercury); font-style: italic; padding: 14px 18px; background: rgba(255,198,85,0.05); border-left: 2px solid var(--gold); margin: 0; }
'''

ASK_SCRIPT = '''<script>
  function handleAsk(q) {
    if (!q || !q.trim()) return;
    // In production: wire to the ask engine. For the mock, echo into the input.
    const input = document.querySelector('.ask-hero-input');
    if (input) { input.value = q.trim(); input.focus(); }
  }
</script>'''

# =============================================================================
# BUILD
# =============================================================================

PAGES = [
    ('deal_intel', 'Baseline Analytics — Deal Intel (V3)', 'Deal Intel', DEAL_INTEL_CONTENT, DEAL_INTEL_CSS, ''),
    ('milestones', 'Baseline Analytics — Milestones (V3)', 'Milestones', MILESTONES_CONTENT, MILESTONES_CSS, ''),
    ('meetings',   'Baseline Analytics — Meetings (V3)',   'Meetings',   MEETINGS_CONTENT,   MEETINGS_CSS,   MEETINGS_SCRIPT),
    ('vault',      'Baseline Analytics — Vault (V3)',      'Vault',      VAULT_CONTENT,      VAULT_CSS,      VAULT_SCRIPT),
    ('buzz',       'Baseline Analytics — Recent Buzz (V3)','Recent Buzz',BUZZ_CONTENT,       BUZZ_CSS,       BUZZ_SCRIPT),
    ('team',       'Baseline Analytics — Team (V3)',       'Team',       TEAM_CONTENT,       TEAM_CSS,       ''),
    ('advisory',   'Baseline Analytics — Advisory Board (V3)', 'Advisory Board', ADVISORY_CONTENT, ADVISORY_CSS, ''),
    ('ask',        'Baseline Analytics — Ask the Portal (V3)', 'Ask the Portal', ASK_CONTENT, ASK_CSS, ASK_SCRIPT),
]

DIR_MAP = {'ask': 'ask_portal'}  # slug -> directory name

for slug, title, crumb, content, extra_css, extra_script in PAGES:
    dir_name = DIR_MAP.get(slug, slug)
    out = BASE / dir_name / 'index.html'
    html = page(slug, title, crumb, content, extra_css=extra_css, extra_script=extra_script)
    out.write_text(html)
    print(f"  wrote {out.relative_to(BASE.parent)}  ({len(html):,} chars)")

print("\nDone.")
