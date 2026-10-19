# Project: Aurora 2026 — Web design (WEB) PEF ČZU

## Architecture
- **Type**: 100% Client-Side Pure Web Application (HTML5 semantic, CSS3, ES6+ Vanilla JavaScript) with zero runtime dependencies (no Node.js, bundlers, Docker, backend required).
- **Execution**: 100% offline compatible via direct `file:///` protocol and local HTTP servers.
- **Data Architecture**: Synchronous in-memory bootstrap adapter in `web/js/data.js` (`window.FESTIVAL_DATA`) eliminating CORS restrictions, coupled with canonical `data.json`.
- **Accessibility & Design**: WCAG 2.0 AA compliant (text contrast >= 4.5:1, primary text >= 7:1 AAA), mobile-first responsive layout, dark festival aesthetic, reduced-motion support.
- **Structured Data**: Schema.org JSON-LD integrated across all 7 pages (`MusicFestival`, `ItemList`, `MusicEvent`, `MusicGroup`, `MusicVenue`, `FAQPage`, `WebSite`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Timetable Collision Resolution | Fix 12 stage overlaps in `data.json` & `web/js/data.js` so no two events on same stage overlap | M1 | survey_architecture / spec |
| 2 | Semantic HTML5 Structure | Valid semantic markup (`header`, `nav`, `main`, `section`, `article`, `time`, `address`) across all 7 pages | M1 | ORIGINAL_REQUEST §R1 |
| 3 | WCAG 2.0 AA Contrast Upgrade | Update `--text-muted` to `#94a3b8` (>=5.7:1) and ensure all text >=4.5:1, primary >=7:1 | M1 | survey_architecture / spec |
| 4 | Reduced Motion Support | Add `@media (prefers-reduced-motion: reduce)` disabling transitions and heavy motion | M1 | survey_codebase |
| 5 | Schema.org JSON-LD Integration | Full JSON-LD structured data on all 7 pages (`index`, `program`, `performers`, `performer-detail`, `venues`, `practical-info`, `search`) | M1 | ORIGINAL_REQUEST §R1 |
| 6 | Offline file:/// Compatibility | Verify zero-CORS, local font fallbacks, zero external CDNs, graceful `location.search` fallback | M1 | ORIGINAL_REQUEST §R1 |
| 7 | Multi-Criteria Program Filter | Filter events by Day, Stage/Venue, and Format (concert, talk, workshop) with active state indicators | M1 | ORIGINAL_REQUEST §R1 |
| 8 | Real-Time Program Search | Instant client-side search filtering events by title, artist, genre, and description | M1 | ORIGINAL_REQUEST §R1 |
| 9 | My Schedule (LocalStorage) | Add/remove events to personal schedule stored in `localStorage` (with defensive Array.isArray guard) | M1 | ORIGINAL_REQUEST §R1 |
| 10 | Timetable Clash Warning | Automatic collision warning modal/alert when two events in My Schedule overlap in time | M1 | ORIGINAL_REQUEST §R1 |
| 11 | Performer Dynamic Detail | Dynamic profile rendering for any of 60 artists via query param or default fallback with full event schedule | M1 | ORIGINAL_REQUEST §R1 |
| 12 | Venue Overview & Accessibility | 3 festival stages with schedules, facilities, and accessibility information | M1 | ORIGINAL_REQUEST §R1 |
| 13 | Practical Information & FAQ | Interactive accordion FAQ, festival location, transit, rules, and services | M1 | ORIGINAL_REQUEST §R1 |
| 14 | Breadcrumb Navigation | Functional breadcrumb trails on all subpages for spatial orientation | M1 | ORIGINAL_REQUEST §R1 |
| 15 | Dedicated Search View | Global search page indexing artists, events, and venues with direct links | M1 | ORIGINAL_REQUEST §R1 |
| 16 | Project Specification Report | `project-specification.md`: Festival identity table, goals, 3 personas, IA, 3 user scenarios | M2 | ORIGINAL_REQUEST §R2 |
| 17 | Progress Report 02 | `docs/progress-02.md`: Low/mid-fi prototype, interactive features list, user needs alignment (Cv 3) | M2 | ORIGINAL_REQUEST §R2 |
| 18 | Progress Report 03 | `docs/progress-03.md`: Implementation description, UX/design best practices, trends, testing (Cv 4) | M2 | ORIGINAL_REQUEST §R2 |
| 19 | Progress Report 04 | `docs/progress-04.md`: Review-ready version, known defects, scenario test verification (Cv 5) | M2 | ORIGINAL_REQUEST §R2 |
| 20 | Comprehensive AI Log | `ai-log.md`: Complete audit of AI prompts, rejected hallucinations, human validation across all phases | M2 | ORIGINAL_REQUEST §R2 |
| 21 | Cv 2 Presentation Package | `presentations/cv02*`: Marp deck, HTML, PPTX (<50MB), and speaker notes (3-5 min + Q&A) | M3 | ORIGINAL_REQUEST §R3 |
| 22 | Cv 3 Presentation Package | `presentations/cv03*`: Marp deck, HTML, PPTX (<50MB), and speaker notes (3-5 min + Q&A) | M3 | ORIGINAL_REQUEST §R3 |
| 23 | Cv 4 Presentation Package | `presentations/cv04*`: Marp deck, HTML, PPTX (<50MB), and speaker notes (3-5 min + Q&A) | M3 | ORIGINAL_REQUEST §R3 |
| 24 | Cv 5 Presentation Package | `presentations/cv05*`: Marp deck, HTML, PPTX (<50MB), and speaker notes (3-5 min + Q&A) | M3 | ORIGINAL_REQUEST §R3 |
| 25 | Cv 6 Presentation Package | `presentations/cv06*`: Marp deck, HTML, PPTX (<50MB), and speaker notes (3-5 min + Q&A) | M3 | ORIGINAL_REQUEST §R3 |
| 26 | Standalone Speaker Notes Portfolio | `*-speaker-notes.md`: Strict 3-5 min breakdown, verbatim talking points, examiner defense Q&A | M3 | ORIGINAL_REQUEST §R3 |
| 27 | Formal Cross-Review Document | `review/review.md`: Peer project evaluation using >=2 formal methods (Heuristic Evaluation + Cognitive Walkthrough) with severity categorization | M4 | ORIGINAL_REQUEST §R2 |
| 28 | Comprehensive Final Report | `documentation.md`: Development overview, cross-review feedback resolution table, tooling, AI audit & reflection | M4 | ORIGINAL_REQUEST §R2 |
| 29 | Repository README & Guide | Updated `README.md`: project guide, structure, offline launch instructions, rubric mapping | M4 | survey_codebase |
| 30 | E2E Tier 1 Feature Verification | Pass 100% Tier 1 automated feature tests across all 60 events, 60 artists, 3 stages, 3 days | M5 | E2E Testing Track |
| 31 | E2E Tier 2 Boundary & Corner Cases | Pass 100% Tier 2 tests (clash edge cases, empty search, storage fallback, extreme inputs) | M5 | E2E Testing Track |
| 32 | E2E Tier 3 Cross-Feature Testing | Pass 100% Tier 3 tests (filter + search + schedule interactions, stage transitions) | M5 | E2E Testing Track |
| 33 | E2E Tier 4 Real-World Workload Testing | Pass 100% Tier 4 application scenarios (Persona 1-3 user journeys, offline browsing) | M5 | E2E Testing Track |
| 34 | Tier 5 Adversarial Coverage Hardening | White-box adversarial edge case fuzzing and stress testing by Challenger | M5 | Final Milestone Phase 2 |

## Milestones
| # | Name | Scope | Dependencies | Status | Key Outputs |
|---|------|-------|-------------|--------|-------------|
| M1 | Data Integrity & Web Application Hardening | Fix 12 timetable collisions, upgrade WCAG contrast, add reduced-motion, complete Schema.org JSON-LD across all 7 HTML pages, verify offline file:/// | none | **DONE** | 0 collisions, WCAG AAA/AA tokens, valid JSON-LD on all pages, offline zero-CORS |
| M2 | Academic Reports & Progress Documentation | Create `docs/progress-02.md`, `progress-03.md`, `progress-04.md`, audit `project-specification.md`, update `ai-log.md` | none | **DONE** | Complete progress reports for Cv 3, 4, 5, audited specification, and exhaustive AI audit log |
| M3 | Presentations Portfolio & Speaker Notes | Complete Marp decks for Cv 3..6, export HTML & PPTX (<50MB), create all `speaker-notes.md` with 3-5 min breakdown & Q&A | M2 | **DONE** | 20 presentation artifacts in `presentations/`, all PPTX <= 2.23 MB, 3–5 min notes |
| M4 | Formal Cross-Review & Final Synthesis Documentation | Create `review/review.md` (>=2 formal methods, severity tiers), `documentation.md` (feedback matrix, AI audit), update `README.md` | M1, M2 | **DONE** | Formal cross-review with 9 findings, comprehensive final report (15 pts), and project README |
| M5 | Final E2E Test Pass & Adversarial Hardening | Phase 1: Pass 100% of E2E test suite (Tiers 1-4). Phase 2: Tier 5 adversarial coverage hardening | M1, M2, M3, M4, TEST_READY.md | **DONE** | 98/98 tests passing (Tiers 1–5), Gate verified by Reviewers, Challengers, and Forensic Auditor |

## Parallel Track: E2E Testing Track
- **Owner**: E2E Testing Track (`test_writer_e2e_1`)
- **Scope**: Requirement-driven, opaque-box test infrastructure and test cases (Tiers 1-4) derived from `ORIGINAL_REQUEST.md`.
- **Status**: **DONE** (published `TEST_INFRA.md` and `TEST_READY.md`, expanded to 98 tests in Tier 5).

## Interface Contracts

### data.json & web/js/data.js ↔ Web App & E2E Tests
- Schema:
  - `festival`: `{ id: "aurora2026", name: string, year: number, dates: [3 ISO dates], location: string, ... }`
  - `venues`: `Array<{ id: string ("v1".."v3"), name: string, capacity: number, description: string, accessibility: object }>` (exactly 3 items)
  - `performers`: `Array<{ id: string ("p1".."p60"), name: string, genre: string, country: string, bio: string, ... }>` (exactly 60 items)
  - `events`: `Array<{ id: string ("e1".."e60"), title: string, performerId: string, venueId: string, day: string, startTime: "HH:MM", durationMin: number, format: string }>` (exactly 60 items)
- Constraint:
  - For any two events `e_a`, `e_b` where `e_a.venueId == e_b.venueId` and `e_a.day == e_b.day`:
    `[start_a, start_a + duration_a]` does NOT overlap `[start_b, start_b + duration_b]` (verified with 15-75 min buffers).
  - Global accessor in browser: `window.FESTIVAL_DATA` (identical content and SHA-256 to `data.json`).

### Web App ↔ Accessibility & Schema.org
- CSS tokens:
  - `--bg-main: #0b0f19`
  - `--bg-surface: #131c2e`
  - `--bg-elevated: #1e293b`
  - `--text-primary: #f8fafc` (>= 13.9:1, AAA)
  - `--text-secondary: #94a3b8` (>= 5.7:1, AA)
  - `--text-muted: #94a3b8` (>= 5.7:1, AA)
- Structured Data: Every HTML file includes valid `<script type="application/ld+json">`.

### Marp Presentations ↔ Moodle Constraints
- Command invocation: `npx @marp-team/marp-cli <input.md> --html --no-stdin -o <output.html>` and `npx @marp-team/marp-cli <input.md> --pptx --no-stdin -o <output.pptx>`
- File size constraint: Every `.pptx` and `.html` file is strictly `< 50 MB` (largest is 2.13 MB).
- Structure constraint: 4 mandatory points per deck (1. Co se udělalo, 2. Hlavní rozhodnutí, 3. Využití AI, 4. Validace).
- Timing constraint: Speaker notes structured for 3–5 minute presentation window (calibrated for 3:45–4:15 min).

## Code Layout
```
czu_web_festival/
├── PROJECT.md                    # Project blueprint, feature inventory, contracts
├── README.md                     # Repository entry point and guide
├── package.json                  # Developer scripts (test, sync, package, watch, check:sync)
├── project-specification.md      # MASTER CORE: Specification (Cv 2 deliverable)
├── data.json                     # MASTER CORE: Canonical database (3 days, 3 stages, 60 artists, 60 events)
├── ai-log.md                     # MASTER CORE: Comprehensive AI interaction and validation log
├── documentation.md              # MASTER CORE: Final semester project report & synthesis
├── web/                          # MASTER CORE: Pure client-side web application
│   ├── index.html                # Homepage
│   ├── program.html              # Filterable timetable
│   ├── performers.html           # Lineup overview
│   ├── performer-detail.html     # Parametric artist profile
│   ├── venues.html               # Stages overview & accessibility
│   ├── practical-info.html       # Practical info & FAQ
│   ├── search.html               # Dedicated multi-domain search
│   ├── css/
│   │   └── style.css             # Design tokens & responsive styles
│   └── js/
│       ├── data.js               # Synchronous offline data loader
│       ├── app.js                # Core UI utilities & localStorage favorites
│       └── schedule.js           # Timetable rendering & clash detection
├── checkpoints/                  # ACADEMIC CHECKPOINT PACKAGES (presentation | project | notes)
│   ├── 01-cv02-specifikace-data/ # Cv 2: Specification and dataset
│   │   ├── presentation/         # cv02 Marp deck (.md), HTML & PPTX (< 50MB)
│   │   ├── project/              # project-specification.md, data.json
│   │   └── notes/                # cv02-speaker-notes.md (3-5 min) & README.md
│   ├── 02-cv03-ux-prototyp/      # Cv 3: UX wireframe prototype & 3 interactive features
│   │   ├── presentation/         # cv03 Marp deck (.md), HTML & PPTX
│   │   ├── project/              # prototype/ (100% offline file:///), data.json
│   │   └── notes/                # progress-02.md, cv03-speaker-notes.md & README.md
│   ├── 03-cv04-implementace/     # Cv 4: Implementation & design trends
│   │   ├── presentation/         # cv04 Marp deck (.md), HTML & PPTX
│   │   ├── project/              # web/, data.json
│   │   └── notes/                # progress-03.md, cv04-speaker-notes.md & README.md
│   ├── 04-cv05-review-ready/     # Cv 5: Review-ready version
│   │   ├── presentation/         # cv05 Marp deck (.md), HTML & PPTX
│   │   ├── project/              # web/, project-specification.md, data.json
│   │   └── notes/                # progress-04.md, cv05-speaker-notes.md & README.md
│   ├── 05-cv06-cross-review/     # Cv 6: Peer cross-review presentation
│   │   ├── presentation/         # cv06 Marp deck (.md), HTML & PPTX
│   │   ├── project/              # review.md (formal evaluation of SoundWave Festival)
│   │   └── notes/                # cv06-speaker-notes.md & README.md
│   ├── 06-final-projekt/         # Final submission according to syllabus
│   │   ├── presentation/         # final-prezentace (.md/.html/.pptx)
│   │   ├── project/              # projekt/ (spec, prototype/, web/, data.json, review/)
│   │   └── notes/                # documentation.md, ai-log.md, final-defense-notes.md
│   └── archives/                 # Pre-generated standalone .zip archives for Moodle
├── scripts/                      # Checkpoint sync & packaging tools
│   ├── sync-checkpoints.js       # Node.js sync, packaging, watcher, and verification engine
│   └── sync-checkpoints.ps1      # PowerShell wrapper
├── tests/                        # Automated test suite (98 tests across Tiers 1-5)
│   ├── run_all.js                # Master test runner
│   ├── test_helpers.js           # Isolated sandbox & test utilities
│   ├── tier1_features.test.js    # Feature coverage (36 tests)
│   ├── tier2_boundaries.test.js  # Boundary & corner cases (24 tests)
│   ├── tier3_interactions.test.js# Cross-feature interactions (16 tests)
│   ├── tier4_scenarios.test.js   # Real-world persona journeys (4 tests)
│   ├── tier5_adversarial_challenger.test.js # Adversarial stress tests (18 tests)
│   ├── challenger_verifier.js    # Format & contrast verifier
│   └── adversarial_audit.py      # OpenXML & slot integrity audit
└── .agents/teamwork/             # Agent metadata & audit logs
```
