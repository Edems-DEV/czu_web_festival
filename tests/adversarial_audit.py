import zipfile
import os
import json
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

print("=" * 70)
print("CHALLENGER 2 — ADVERSARIAL STRESS TEST & AUDIT")
print("=" * 70)

# 1. PPTX Deep OpenXML / ZIP validation
print("\n--- 1. DEEP PPTX ZIP & OPENXML AUDIT ---")
exercise_dirs = {
    2: "checkpoints/01-cv02-specifikace-data",
    3: "checkpoints/02-cv03-ux-prototyp",
    4: "checkpoints/03-cv04-implementace",
    5: "checkpoints/04-cv05-review-ready",
    6: "checkpoints/05-cv06-cross-review"
}
pptx_files = [f"{exercise_dirs[i]}/presentation/cv0{i}-prezentace.pptx" for i in range(2, 7)]
for p in pptx_files:
    assert os.path.exists(p), f"Missing {p}"
    with zipfile.ZipFile(p, "r") as zf:
        namelist = zf.namelist()
        slides = [n for n in namelist if n.startswith("ppt/slides/slide") and n.endswith(".xml")]
        content_types_ok = "[Content_Types].xml" in namelist
        pres_xml_ok = "ppt/presentation.xml" in namelist
        print(f"[{p}] Slides: {len(slides)}, [Content_Types].xml: {content_types_ok}, presentation.xml: {pres_xml_ok}")
        assert content_types_ok, f"Missing [Content_Types].xml in {p}"
        assert pres_xml_ok, f"Missing presentation.xml in {p}"
        assert len(slides) >= 4, f"Fewer than 4 slides in {p}"
        # Validate CRC of every entry by decompressing
        for name in namelist:
            data = zf.read(name)
            assert len(data) > 0 or name.endswith("/"), f"Empty compressed file {name} in {p}"
print("All PPTX files are fully intact OpenXML packages without CRC errors.")

# 2. Presentation Deck 4-Point Structure Audit
print("\n--- 2. MARP DECK 4-POINT STRUCTURE AUDIT ---")
for i in range(2, 7):
    md_file = f"{exercise_dirs[i]}/presentation/cv0{i}-prezentace.md"
    with open(md_file, encoding="utf-8") as f:
        content = f.read()
    
    # Requirement: 4 mandatory points
    req_patterns = [
        ("1. Co se udělalo", r"co (?:se|jsme)(?: od minula)? udělal[oi]"),
        ("2. Hlavní rozhodnutí", r"hlavní rozhodnutí"),
        ("3. Využití AI", r"využití ai"),
        ("4. Validace", r"validace|způsob ověření|výsledky testování")
    ]
    
    print(f"[{md_file}] Checking mandatory sections:")
    for label, pat in req_patterns:
        found = bool(re.search(pat, content, re.IGNORECASE))
        print(f"  - {label}: {'FOUND' if found else 'MISSING'}")
        assert found, f"Missing section for {label} in {md_file}"

# 3. Speaker Notes Timing & Defense Audit
print("\n--- 3. SPEAKER NOTES TIMING & DEFENSE AUDIT ---")
for i in range(2, 7):
    notes_file = f"{exercise_dirs[i]}/notes/cv0{i}-speaker-notes.md"
    with open(notes_file, encoding="utf-8") as f:
        content = f.read()
    
    has_timing = any(w in content.lower() for w in ["minut", "časový limit", "0:00", "harmonogram", "3-5"])
    has_defense = any(w in content.lower() for w in ["otázk", "obhajob", "zkoušejíc", "dotaz", "q&a", "reakce"])
    print(f"[{notes_file}] Timing breakdown: {has_timing}, Examiner Q&A defense: {has_defense}")
    assert has_timing, f"Missing timing in {notes_file}"
    assert has_defense, f"Missing defense/Q&A in {notes_file}"

# 4. Exhaustive Schedule Continuity & Boundary Edge Cases
print("\n--- 4. EXHAUSTIVE SCHEDULE BOUNDARIES & FESTIVAL OPERATIONAL WINDOW ---")
with open("data.json", encoding="utf-8") as f:
    data = json.load(f)

events = data["events"]
venues = {v["id"]: v["name"] for v in data["venues"]}
days = sorted(list({e["day"] for e in events}))
print(f"Festival spans {len(days)} days: {days}")
assert len(days) == 3, f"Expected 3 days, got {len(days)}"

# Check distribution
per_stage_count = {}
for e in events:
    per_stage_count[e["venueId"]] = per_stage_count.get(e["venueId"], 0) + 1
print(f"Events per venue: {per_stage_count}")
for v_id in venues:
    assert per_stage_count.get(v_id, 0) == 20, f"Expected 20 events on stage {v_id}, got {per_stage_count.get(v_id)}"

# Check chronological ordering and gaps per stage per day
for day in days:
    for v_id, v_name in venues.items():
        stage_events = [e for e in events if e["day"] == day and e["venueId"] == v_id]
        def to_min(t):
            h, m = map(int, t.split(":"))
            return h * 60 + m
        stage_events.sort(key=lambda x: to_min(x["startTime"]))
        
        print(f"\nSchedule for {v_name} on {day} ({len(stage_events)} events):")
        for i in range(len(stage_events)):
            curr = stage_events[i]
            c_start = to_min(curr["startTime"])
            c_end = c_start + curr["durationMin"]
            end_time_str = f"{c_end // 60:02d}:{c_end % 60:02d}"
            
            gap_info = ""
            if i < len(stage_events) - 1:
                next_e = stage_events[i + 1]
                n_start = to_min(next_e["startTime"])
                gap = n_start - c_end
                assert gap >= 0, f"Negative gap ({gap} min) between {curr['id']} and {next_e['id']}"
                gap_info = f" -> gap to next: {gap} min"
            
            print(f"  {curr['id']} [{curr['startTime']} - {end_time_str}] ({curr['durationMin']}m) - {curr['title']}{gap_info}")

# 5. Full WCAG Contrast Audit across all CSS colors
print("\n--- 5. FULL WCAG CONTRAST MATRIX ON ALL CSS TOKENS ---")
with open("web/css/style.css", encoding="utf-8") as f:
    css = f.read()

def srgb_linear(c):
    s = c / 255.0
    return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4

def luminance(hex_str):
    h = hex_str.lstrip("#")
    if len(h) == 3:
        h = "".join([c + c for c in h])
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0.2126 * srgb_linear(r) + 0.7152 * srgb_linear(g) + 0.0722 * srgb_linear(b)

def contrast(hex1, hex2):
    L1, L2 = luminance(hex1), luminance(hex2)
    return (max(L1, L2) + 0.05) / (min(L1, L2) + 0.05)

color_vars = {}
for line in css.splitlines():
    m = re.match(r"\s*(--[a-zA-Z0-9_-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\s*;", line)
    if m:
        color_vars[m.group(1)] = m.group(2)

print("Found color variables:", color_vars)

bg_main = color_vars["--bg-main"]
bg_surface = color_vars["--bg-surface"]
bg_elevated = color_vars.get("--bg-surface-elevated", color_vars.get("--bg-elevated", "#1e293b"))
bg_hover = color_vars.get("--bg-surface-hover", "#293548")
text_primary = color_vars["--text-primary"]
text_secondary = color_vars["--text-secondary"]
text_muted = color_vars["--text-muted"]

# Contrast checks
bg_list = [
    ("--bg-main", bg_main),
    ("--bg-surface", bg_surface),
    ("--bg-surface-elevated", bg_elevated),
    ("--bg-surface-hover", bg_hover)
]

for bg_name, bg_val in bg_list:
    r_prim = contrast(text_primary, bg_val)
    r_sec = contrast(text_secondary, bg_val)
    r_mut = contrast(text_muted, bg_val)
    print(f"On {bg_name} ({bg_val}):")
    print(f"  Primary ({text_primary}):     {r_prim:.2f}:1 (Required >= 7.0 AAA)")
    print(f"  Secondary ({text_secondary}): {r_sec:.2f}:1 (Required >= 4.5 AA)")
    print(f"  Muted ({text_muted}):         {r_mut:.2f}:1 (Required >= 4.5 AA)")
    assert r_prim >= 7.0, f"Primary contrast failed on {bg_name}"
    assert r_sec >= 4.5, f"Secondary contrast failed on {bg_name}"
    assert r_mut >= 4.5, f"Muted contrast failed on {bg_name}"

print("\n" + "=" * 70)
print("ALL ADVERSARIAL STRESS TESTS COMPLETED SUCCESSFULLY!")
print("=" * 70)
