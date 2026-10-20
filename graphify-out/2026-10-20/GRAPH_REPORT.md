# Graph Report - Portfolio  (2026-10-20)

## Corpus Check
- 49 files · ~109,316 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 1, .ico 1, .patch 1)

## Summary
- 250 nodes · 533 edges · 12 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6309a043`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Showcase & Grid
- Home Page Sections
- Package & Lint Config
- Header, Nav & Icons
- Root Layout & SEO
- Project Detail Page
- TypeScript Config
- Career & Content Sources
- Ember Design System & Audit
- Dev Dependencies
- Motion Pause Toggle
- experience.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 19 edges
2. `next` - 16 edges
3. `compilerOptions` - 16 edges
4. `ArrowUpRight()` - 13 edges
5. `ProjectPage()` - 12 edges
6. `Showcase()` - 12 edges
7. `hasLocale()` - 12 edges
8. `SectionLabel()` - 11 edges
9. `Dictionary` - 11 edges
10. `Home()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `OpenGraph image alt text` --conceptually_related_to--> `Resume (CV) I Putu Paramaananda Tanaya`  [INFERRED]
  src/app/[lang]/opengraph-image.alt.txt → content/resume.pdf
- `Raion Community (UI/UX Designer)` --conceptually_related_to--> `Resume (CV) I Putu Paramaananda Tanaya`  [INFERRED]
  content/PERLU-KONFIRMASI.md → content/resume.pdf
- `UI/UX Intern, PT TRAVLR Guides Indonesia` --conceptually_related_to--> `13 Projects (7 PDF + 6 Figma)`  [INFERRED]
  content/resume.pdf → content/PERLU-KONFIRMASI.md
- `Universitas Brawijaya, Informatics Engineering` --references--> `Resume (CV) I Putu Paramaananda Tanaya`  [EXTRACTED]
  content/PERLU-KONFIRMASI.md → content/resume.pdf
- `PERLU KONFIRMASI (open questions log)` --references--> `Top 10 Finalist IFEST 2024 Data Analysis`  [EXTRACTED]
  content/PERLU-KONFIRMASI.md → content/resume.pdf

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Ember Minimal design system** — design_tokens_color_tokens, design_tokens_typography, design_tokens_dark_mode, design_tokens_motion, src_app_globals [EXTRACTED 1.00]
- **Portfolio content sources** — content_resume, content_portfolio_garuda, content_perlu_konfirmasi_open_questions [EXTRACTED 1.00]

## Communities (12 total, 0 thin omitted)

### Community 0 - "Project Showcase & Grid"
Cohesion: 0.11
Nodes (29): CardData, Filter, LG_SPAN, Props, SM_SPAN, Bars(), Browser(), Chart() (+21 more)

### Community 1 - "Home Page Sections"
Cohesion: 0.18
Nodes (16): server-only, generateMetadata(), Home(), CopyButton(), SectionLabel(), About(), Contact(), Projects() (+8 more)

### Community 2 - "Package & Lint Config"
Cohesion: 0.08
Nodes (25): eslintConfig, dependencies, next, react, react-dom, server-only, simple-icons, name (+17 more)

### Community 3 - "Header, Nav & Icons"
Cohesion: 0.15
Nodes (21): react, react-dom, ArrowUpRight(), base, CloseIcon(), IconProps, MenuIcon(), LangSwitch() (+13 more)

### Community 4 - "Root Layout & SEO"
Cohesion: 0.15
Nodes (11): nextConfig, next, anton, geist, RootLayout(), viewport, InlineScript(), SiteFooter() (+3 more)

### Community 5 - "Project Detail Page"
Cohesion: 0.10
Nodes (27): simple-icons, Block(), delay(), generateMetadata(), instant, ProjectPage(), ArrowRight(), MlopsPipeline() (+19 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "Career & Content Sources"
Cohesion: 0.21
Nodes (12): IT Intern, Garuda Indonesia (Business Alignment, MagangHub), PERLU KONFIRMASI (open questions log), 13 Projects (7 PDF + 6 Figma), Raion Community (UI/UX Designer), Universitas Brawijaya, Informatics Engineering, Portfolio deck (7 projects), Resume (CV) I Putu Paramaananda Tanaya, Top 10 Finalist IFEST 2024 Data Analysis (+4 more)

### Community 8 - "Ember Design System & Audit"
Cohesion: 0.24
Nodes (7): Apple HIG design audit, Ember Minimal design system, Color tokens (paper, ink, ember, signal-ink), Dark mode tokens (revision 7), Motion system (scroll-driven, View Transitions), Typography (Anton + Geist), globals.css

### Community 9 - "Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, patch-package, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+2 more)

### Community 10 - "Motion Pause Toggle"
Cohesion: 0.48
Nodes (6): Pause(), Play(), isPaused(), MotionToggle(), subscribe(), ProjectGrid()

### Community 11 - "experience.tsx"
Cohesion: 0.32
Nodes (8): NeedsConfirmation(), OrgLogo(), Experience(), Entry, ExperienceList(), Props, OrgLogo, orgLogos

## Knowledge Gaps
- **11 isolated node(s):** `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom`, `patch-package` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 91 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Root Layout & SEO` to `Project Showcase & Grid`, `Home Page Sections`, `Package & Lint Config`, `Header, Nav & Icons`, `Project Detail Page`, `experience.tsx`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **What connects `@tailwindcss/turbopack`, `@types/node`, `@types/react` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Showcase & Grid` be split into smaller, more focused modules?**
  _Cohesion score 0.1051693404634581 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Header, Nav & Icons` to `Project Showcase & Grid`, `Home Page Sections`, `Package & Lint Config`, `Root Layout & SEO`, `Project Detail Page`, `Motion Pause Toggle`, `experience.tsx`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Should `Package & Lint Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `globals.css` connect `Ember Design System & Audit` to `Root Layout & SEO`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Should `Header, Nav & Icons` be split into smaller, more focused modules?**
  _Cohesion score 0.14942528735632185 - nodes in this community are weakly interconnected._