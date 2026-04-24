#!/usr/bin/env python3
"""Rebuild artifacts_light/ from artifacts/ by swapping dark → light theme."""
import re, shutil
from pathlib import Path

SRC = Path('/Users/carissavale/ghd-baseline-analytics/pitch/artifacts')
DST = Path('/Users/carissavale/ghd-baseline-analytics/pitch/artifacts_light')

SKIP_DIRS = ('login', 'mission')

if DST.exists():
    shutil.rmtree(DST)
shutil.copytree(SRC, DST)

LIGHT_ROOT = '''  :root {
    --black: #FAFAF7; --onyx: #F0EEE7; --onyx-2: #E5E1D5;
    --gold: #AE8E51; --gold-mid: #63553C; --gold-deep: #3E3624;
    --mercury: #121211; --mercury-dim: rgba(18,18,17,0.7);
    --mercury-faint: rgba(18,18,17,0.45);
    --hairline: rgba(18,18,17,0.1); --hairline-2: rgba(18,18,17,0.18);
  }'''

ROOT_PATTERN = re.compile(r"  :root \{[^}]+\}", re.DOTALL)

# Literal string replacements (applied AFTER rgba/root swaps)
REPLACEMENTS = [
    # ::selection
    ("::selection { background: var(--gold); color: var(--black); }",
     "::selection { background: #FFC655; color: #121211; }"),
    # Topnav blur bg
    ("background: rgba(0,0,0,0.85); backdrop-filter: blur(20px);",
     "background: rgba(255,255,255,0.92); backdrop-filter: blur(20px);"),
    # CTA text colors — force dark on gold buttons
    ("color: var(--black)", "color: #121211"),
    ("color:var(--black)", "color:#121211"),
    # Gold hover: deep instead of light
    ("#ffd37a", "#8A6F3F"),
    # SVG mercury fills → dark
    ('fill="#E5E5E5"', 'fill="#121211"'),
    ('stroke="#E5E5E5"', 'stroke="#121211"'),
    # Literal light color references in CSS rules
    ('color: #E5E5E5', 'color: #121211'),
    ('color:#E5E5E5', 'color:#121211'),
    # tl-banner: muddy dark → cream tint
    ('background: rgba(18,18,17,0.45);\n    font-size: 15px; line-height: 1.55; color: var(--mercury-dim);\n    font-style: italic;',
     'background: rgba(174,142,81,0.06);\n    font-size: 15px; line-height: 1.55; color: var(--mercury-dim);\n    font-style: italic;'),
    # Specific dark input/card bgs that should flip white
    ("background: rgba(0,0,0,0.5);", "background: rgba(255,255,255,0.6);"),
    ("background: rgba(0,0,0,0.45);", "background: rgba(255,255,255,0.6);"),
    ("background: rgba(0,0,0,0.4);", "background: rgba(255,255,255,0.5);"),
    ("background: rgba(0,0,0,0.6);", "background: rgba(255,255,255,0.65);"),
    ("background:rgba(0,0,0,0.5)", "background:rgba(255,255,255,0.6)"),
    ("background:rgba(0,0,0,0.4)", "background:rgba(255,255,255,0.5)"),
    # Overview hero video + overlay — light wash instead of dark
    ("opacity: 0.5;\n    z-index: 0;\n    filter: contrast(1.08) brightness(0.85);",
     "opacity: 0.18;\n    z-index: 0;\n    filter: contrast(0.95) brightness(1.25) saturate(0.8);"),
    ("background: radial-gradient(ellipse at center left, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%),\n                linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.85) 100%);",
     "background: radial-gradient(ellipse at center left, rgba(250,248,243,0.55) 0%, rgba(250,248,243,0.7) 40%, rgba(250,248,243,0.92) 100%),\n                linear-gradient(180deg, rgba(250,248,243,0.6) 0%, rgba(250,248,243,0.5) 45%, rgba(250,248,243,0.95) 100%);"),
]

def swap_dark_rgba(m):
    alpha = float(m.group(1))
    if alpha >= 0.8:
        return '#FFFFFF'
    if alpha >= 0.5:
        return f'rgba(255,255,255,{alpha})'
    return f'rgba(18,18,17,{alpha})'

def swap_hover_dark(m):
    alpha = float(m.group(1))
    return f'rgba(240,238,231,{alpha})'

def swap_onyx2(m):
    alpha = float(m.group(1))
    return f'rgba(230,226,218,{alpha})'

def swap_mercury(m):
    alpha = float(m.group(1))
    return f'rgba(18,18,17,{alpha})'

# Page-specific post-processors (run AFTER generic swaps)
def post_buzz(content):
    """Darker buzz-pill category colors for light readability."""
    swaps = [
        ('.buzz-pill.case-study   { color: #FFC655; border-color: #FFC655; background: rgba(255,198,85,0.1); }',
         '.buzz-pill.case-study   { color: #AE8E51; border-color: #AE8E51; background: rgba(174,142,81,0.12); }'),
        ('.buzz-pill.leadership   { color: #B19CD9; border-color: #B19CD9; background: rgba(177,156,217,0.1); }',
         '.buzz-pill.leadership   { color: #6B4FA6; border-color: #6B4FA6; background: rgba(107,79,166,0.1); }'),
        ('.buzz-pill.market-intel { color: #7FC89A; border-color: #7FC89A; background: rgba(127,200,154,0.1); }',
         '.buzz-pill.market-intel { color: #3E8E5E; border-color: #3E8E5E; background: rgba(62,142,94,0.1); }'),
        ('.buzz-pill.governance   { color: #6FA7D4; border-color: #6FA7D4; background: rgba(111,167,212,0.1); }',
         '.buzz-pill.governance   { color: #3D7CAA; border-color: #3D7CAA; background: rgba(61,124,170,0.1); }'),
        ('.buzz-pill.brand        { color: #E89B5F; border-color: #E89B5F; background: rgba(232,155,95,0.1); }',
         '.buzz-pill.brand        { color: #BE6E2E; border-color: #BE6E2E; background: rgba(190,110,46,0.1); }'),
        ('.buzz-pill.partnership  { color: #5FC9C5; border-color: #5FC9C5; background: rgba(95,201,197,0.1); }',
         '.buzz-pill.partnership  { color: #2F908C; border-color: #2F908C; background: rgba(47,144,140,0.1); }'),
    ]
    for old, new in swaps:
        content = content.replace(old, new)
    return content

def post_meetings(content):
    """Darker gold + bumped opacities for the SVG gantt chart."""
    content = content.replace('#FFC655', '#8A6F3F')
    opacity_swaps = [
        ('opacity="0.22"', 'opacity="0.5"'),
        ('opacity="0.4"',  'opacity="0.7"'),
        ('opacity="0.45"', 'opacity="0.75"'),
        ('opacity="0.5"',  'opacity="0.8"'),
        ('opacity="0.55"', 'opacity="0.85"'),
        ('opacity="0.6"',  'opacity="0.85"'),
        ('opacity="0.75"', 'opacity="0.9"'),
    ]
    for old, new in opacity_swaps:
        content = content.replace(old, new)
    return content

def post_overview(content):
    """Buzz teaser pill colors on the Overview page."""
    swaps = [
        # Leadership inline pill (Sheldon's Power Statement card)
        ('color:var(--mercury); border:1px solid rgba(18,18,17,0.4); margin-bottom:14px"><span style="width:5px; height:5px; border-radius:50%; background:var(--mercury)"></span>Leadership',
         'color:#6B4FA6; border:1px solid #6B4FA6; background:rgba(107,79,166,0.1); margin-bottom:14px"><span style="width:5px; height:5px; border-radius:50%; background:#6B4FA6"></span>Leadership'),
        # Market Intel inline pill (Marketplace Comparables)
        ('color:var(--gold-mid); border:1px solid var(--gold-mid); background:rgba(174,142,81,0.08); margin-bottom:14px"><span style="width:5px; height:5px; border-radius:50%; background:var(--gold-mid)"></span>Market Intel',
         'color:#3E8E5E; border:1px solid #3E8E5E; background:rgba(62,142,94,0.1); margin-bottom:14px"><span style="width:5px; height:5px; border-radius:50%; background:#3E8E5E"></span>Market Intel'),
    ]
    for old, new in swaps:
        content = content.replace(old, new)
    return content

POST_PROCESSORS = {
    'buzz': post_buzz,
    'meetings': post_meetings,
    'overview': post_overview,
}

def process(html_file):
    if any(s in html_file.parts for s in SKIP_DIRS):
        return
    content = html_file.read_text()

    # Step 1: rgba swaps on original dark content (swallow everything)
    content = re.sub(r'rgba\(18,\s*18,\s*17,\s*([\d.]+)\)', swap_dark_rgba, content)
    content = re.sub(r'rgba\(30,\s*28,\s*24,\s*([\d.]+)\)', swap_hover_dark, content)
    content = re.sub(r'rgba\(26,\s*25,\s*22,\s*([\d.]+)\)', swap_onyx2, content)
    content = re.sub(r'rgba\(229,\s*229,\s*229,\s*([\d.]+)\)', swap_mercury, content)

    # Step 2: Replace :root with known-good light values (undo any damage to :root)
    content = ROOT_PATTERN.sub(LIGHT_ROOT, content, count=1)

    # Step 3: Literal replacements
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)

    # Step 4: Page-specific post-processing (based on parent directory name)
    parent = html_file.parent.name
    if parent in POST_PROCESSORS:
        content = POST_PROCESSORS[parent](content)

    html_file.write_text(content)
    print(f"  {html_file.relative_to(DST)}")

print(f"Rebuilding {DST} from {SRC}")
for html in DST.rglob("*.html"):
    process(html)
print("Done.")
