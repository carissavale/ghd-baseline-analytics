#!/usr/bin/env python3
"""Inject stat counter animation + brand pattern divider CSS across dark pages."""
import re
from pathlib import Path

BASE = Path('/Users/carissavale/ghd-baseline-analytics/pitch/artifacts')

# Pages to touch
PAGES = ['overview', 'deal_intel', 'milestones', 'meetings', 'vault', 'buzz', 'team', 'advisory', 'ask_portal']

# Brand asset pattern (vertical gold bars) — used as a subtle section divider
BRAND_DIVIDER_CSS = """
  /* Brand asset pattern — vertical gold rules as section divider */
  .brand-divider {
    display: flex; gap: 3px; align-items: flex-end; height: 20px;
    margin: 40px 0; padding: 0; opacity: 0.6;
  }
  .brand-divider span { width: 3px; background: var(--gold); display: block; }
  .brand-divider span:nth-child(1) { height: 10px; background: var(--gold-mid); }
  .brand-divider span:nth-child(2) { height: 16px; }
  .brand-divider span:nth-child(3) { height: 20px; }
  .brand-divider span:nth-child(4) { height: 14px; }
  .brand-divider span:nth-child(5) { height: 8px;  background: var(--gold-mid); }
"""

# Stat counter animation: animate .num/.stat .num / .comp-num elements that are pure numbers
STAT_COUNTER_JS = """
<script>
  // Animated stat counters — numeric stats count up on scroll into view
  (function() {
    const selector = '.stat .num, .mission-stat strong, .comp-num, .pitch-stats strong';
    const parseStat = (text) => {
      const t = text.trim();
      // $6B+, $641M, 1 in 3, 5×, etc. — handle dollar, suffix, separator
      const m = t.match(/^([$])?([\\d,.]+)(B\\+?|M\\+?|K|×|x|\\+)?$/i);
      if (!m) return null;
      const prefix = m[1] || '';
      const raw = m[2].replace(/,/g, '');
      const suffix = m[3] || '';
      const target = parseFloat(raw);
      if (isNaN(target)) return null;
      const decimals = (raw.split('.')[1] || '').length;
      const hasComma = m[2].includes(',');
      return { prefix, target, suffix, decimals, hasComma };
    };
    const fmt = (n, p) => {
      let s = n.toFixed(p.decimals);
      if (p.hasComma) s = parseFloat(s).toLocaleString('en-US', { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals });
      return p.prefix + s + p.suffix;
    };
    const animate = (el, p) => {
      const dur = 1100;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(p.target * eased, p);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const p = el._statParse;
        if (p) animate(el, p);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(selector).forEach(el => {
      const p = parseStat(el.textContent);
      if (!p) return;
      el._statParse = p;
      el.textContent = fmt(0, p);
      obs.observe(el);
    });
  })();
</script>
"""

def inject(html_file):
    content = html_file.read_text()
    changed = False

    # Inject brand divider CSS before </style> (first occurrence in <head>)
    if '.brand-divider' not in content:
        content = content.replace('</style>', BRAND_DIVIDER_CSS + '\n</style>', 1)
        changed = True

    # Inject stat counter script before </body>
    if 'Animated stat counters' not in content:
        content = content.replace('</body>', STAT_COUNTER_JS + '\n</body>', 1)
        changed = True

    if changed:
        html_file.write_text(content)
        print(f"  ✓ {html_file.relative_to(BASE.parent)}")
    else:
        print(f"  - {html_file.relative_to(BASE.parent)} (no change)")

for p in PAGES:
    fp = BASE / p / 'index.html'
    if fp.exists():
        inject(fp)

print("\nDone.")
