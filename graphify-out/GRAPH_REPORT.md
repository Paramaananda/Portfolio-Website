# Graph Report - Portfolio  (2026-10-18)

## Corpus Check
- 47 files · ~99,716 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 1, .ico 1, .patch 1)

## Summary
- 232 nodes · 490 edges · 11 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.86)
- Token cost: 92,517 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `react` - 17 edges
2. `compilerOptions` - 16 edges
3. `next` - 15 edges
4. `ArrowUpRight()` - 13 edges
5. `Showcase()` - 12 edges
6. `hasLocale()` - 12 edges
7. `SectionLabel()` - 11 edges
8. `Dictionary` - 11 edges
9. `ProjectPage()` - 10 edges
10. `Home()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `OpenGraph image alt text` --conceptually_related_to--> `Resume (CV) I Putu Paramaananda Tanaya`  [INFERRED]
  src/app/[lang]/opengraph-image.alt.txt → content/resume.pdf
- `Raion Community (UI/UX Designer)` --conceptually_related_to--> `Resume (CV) I Putu Paramaananda Tanaya`  [INFERRED]
  content/PERLU-KONFIRMASI.md → content/resume.pdf
- `PERLU KONFIRMASI (open questions log)` --references--> `Portfolio deck (7 projects)`  [EXTRACTED]
  content/PERLU-KONFIRMASI.md → content/portfolio-garuda.pdf
- `PERLU KONFIRMASI (open questions log)` --references--> `Top 10 Finalist IFEST 2024 Data Analysis`  [EXTRACTED]
  content/PERLU-KONFIRMASI.md → content/resume.pdf
- `PERLU KONFIRMASI (open questions log)` --references--> `Resume Tools list`  [EXTRACTED]
  content/PERLU-KONFIRMASI.md → content/resume.pdf

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Portfolio content sources** — content_resume, content_portfolio_garuda, content_perlu_konfirmasi_open_questions [EXTRACTED 1.00]
- **Ember Minimal design system** — design_tokens_color_tokens, design_tokens_typography, design_tokens_dark_mode, design_tokens_motion, src_app_globals [EXTRACTED 1.00]

## Communities (11 total, 0 thin omitted)

### Community 0 - "Project Showcase & Grid"
Cohesion: 0.11
Nodes (28): Filter, LG_SPAN, Props, SM_SPAN, Bars(), Browser(), Chart(), Code() (+20 more)

### Community 1 - "Home Page Sections"
Cohesion: 0.17
Nodes (20): react, Home(), CopyButton(), NeedsConfirmation(), SectionLabel(), About(), Contact(), Experience() (+12 more)

### Community 2 - "Package & Lint Config"
Cohesion: 0.07
Nodes (28): eslintConfig, dependencies, next, react, react-dom, server-only, simple-icons, name (+20 more)

### Community 3 - "Header, Nav & Icons"
Cohesion: 0.16
Nodes (19): react-dom, ArrowUpRight(), base, CloseIcon(), IconProps, MenuIcon(), LangSwitch(), Logo() (+11 more)

### Community 4 - "Root Layout & SEO"
Cohesion: 0.14
Nodes (12): nextConfig, next, anton, geist, RootLayout(), viewport, InlineScript(), SiteFooter() (+4 more)

### Community 5 - "Project Detail Page"
Cohesion: 0.16
Nodes (18): server-only, generateMetadata(), Block(), delay(), generateMetadata(), instant, ProjectPage(), ArrowRight() (+10 more)

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
Cohesion: 0.60
Nodes (5): Pause(), Play(), isPaused(), MotionToggle(), subscribe()

## Knowledge Gaps
- **11 isolated node(s):** `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom`, `patch-package` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 87 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Root Layout & SEO` to `Project Showcase & Grid`, `Home Page Sections`, `Package & Lint Config`, `Header, Nav & Icons`, `Project Detail Page`?**
  _High betweenness centrality (0.195) - this node is a cross-community bridge._
- **What connects `@tailwindcss/turbopack`, `@types/node`, `@types/react` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Showcase & Grid` be split into smaller, more focused modules?**
  _Cohesion score 0.10984848484848485 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Home Page Sections` to `Project Showcase & Grid`, `Package & Lint Config`, `Header, Nav & Icons`, `Root Layout & SEO`, `Project Detail Page`, `Motion Pause Toggle`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `Package & Lint Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Why does `globals.css` connect `Ember Design System & Audit` to `Root Layout & SEO`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `Root Layout & SEO` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._