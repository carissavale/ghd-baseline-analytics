import re
import pathlib

BASE = pathlib.Path("/Users/carissavale/ghd-baseline-analytics/pitch/artifacts")

# Files to update (each with the page slug used to mark active)
pages = {
    "overview":          "overview",
    "deal_intel":        "deal_intel",
    "milestones":        "milestones",
    "meetings":          "meetings",
    "vault":             "vault",
    "buzz":              "buzz",
    "team":              "about",      # About dropdown (team)
    "advisory":          "about",      # About dropdown (advisory)
    "ask_portal":        "ask",
    "annual_timetable":  None,
    "timeline":          None,
}

def build_nav(slug):
    """Return the updated <div class="topnav-links">…</div> block for a given active-slug."""
    def a(href, label, key):
        cls = ' class="active"' if slug == key else ''
        return f'    <a href="{href}"{cls}>{label}</a>'

    active_about = (slug == 'about')
    team_active = ' class="active"' if slug == 'team' else ''
    advisory_active = ' class="active"' if slug == 'advisory' else ''
    dd_class = 'dropdown active' if active_about else 'dropdown'

    # Note: "About" dropdown with its children
    lines = [
        '  <div class="topnav-links">',
        a("../overview/index.html",   "Overview",   "overview"),
        a("../deal_intel/index.html", "Deal Intel", "deal_intel"),
        a("../milestones/index.html", "Milestones", "milestones"),
        a("../meetings/index.html",   "Meetings",   "meetings"),
        a("../vault/index.html",      "Vault",      "vault"),
        a("../buzz/index.html",       "Buzz",       "buzz"),
        f'    <div class="{dd_class}">',
        '      <button class="trigger">About Us</button>',
        '      <div class="dropdown-menu">',
        f'        <a href="../team/index.html"{team_active}>Meet the Team</a>',
        f'        <a href="../advisory/index.html"{advisory_active}>Advisory Board</a>',
        '      </div>',
        '    </div>',
        a("../ask_portal/index.html", "Ask", "ask"),
        '  </div>',
    ]
    return "\n".join(lines)

# Regex to match the whole existing topnav-links block (from <div class="topnav-links"> to its closing </div>)
pattern = re.compile(
    r'  <div class="topnav-links">.*?\n  </div>',
    re.DOTALL,
)

updated = []
skipped = []
for folder, slug in pages.items():
    # For team/advisory use 'team' or 'advisory' so the dropdown child active state is set.
    if folder == "team": slug = "team"
    if folder == "advisory": slug = "advisory"

    fp = BASE / folder / "index.html"
    if not fp.exists():
        skipped.append(f"MISSING: {fp}")
        continue
    text = fp.read_text()
    new_nav = build_nav(slug)
    new_text, n = pattern.subn(new_nav, text)
    if n == 0:
        skipped.append(f"NO MATCH: {fp}")
        continue
    fp.write_text(new_text)
    updated.append(f"{folder}  (active={slug})")

print("UPDATED:")
for u in updated:
    print(" ", u)
if skipped:
    print("\nSKIPPED:")
    for s in skipped:
        print(" ", s)
