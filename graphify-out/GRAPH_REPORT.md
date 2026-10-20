# Graph Report - Portfolio  (2026-10-20)

## Corpus Check
- 52 files · ~131,278 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 1, .ico 1, .patch 1)

## Summary
- 268 nodes · 557 edges · 12 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6309a043`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- project-grid.tsx
- Home Page Sections
- Package & Lint Config
- Header, Nav & Icons
- Root Layout & SEO
- Project Detail Page
- TypeScript Config
- Career & Content Sources
- Ember Design System & Audit
- Dev Dependencies
- showcase.tsx
- build-rag-demo.py

## God Nodes (most connected - your core abstractions)
1. `react` - 20 edges
2. `next` - 16 edges
3. `compilerOptions` - 16 edges
4. `ProjectPage()` - 13 edges
5. `ArrowUpRight()` - 13 edges
6. `Showcase()` - 12 edges
7. `hasLocale()` - 12 edges
8. `SectionLabel()` - 11 edges
9. `Dictionary` - 11 edges
10. `Locale` - 10 edges

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

### Community 0 - "project-grid.tsx"
Cohesion: 0.11
Nodes (19): Pause(), Play(), isPaused(), MotionToggle(), subscribe(), CardData, Filter, LG_SPAN (+11 more)

### Community 1 - "Home Page Sections"
Cohesion: 0.14
Nodes (24): react, Home(), CopyButton(), NeedsConfirmation(), OrgLogo(), SectionLabel(), About(), Contact() (+16 more)

### Community 2 - "Package & Lint Config"
Cohesion: 0.07
Nodes (28): eslintConfig, dependencies, next, react, react-dom, server-only, simple-icons, name (+20 more)

### Community 3 - "Header, Nav & Icons"
Cohesion: 0.17
Nodes (17): react-dom, ArrowUpRight(), base, CloseIcon(), IconProps, MenuIcon(), LangSwitch(), Logo() (+9 more)

### Community 4 - "Root Layout & SEO"
Cohesion: 0.10
Nodes (22): nextConfig, next, server-only, anton, geist, generateMetadata(), RootLayout(), viewport (+14 more)

### Community 5 - "Project Detail Page"
Cohesion: 0.10
Nodes (26): Block(), delay(), generateMetadata(), instant, ProjectPage(), ArrowRight(), MlopsPipeline(), pad() (+18 more)

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

### Community 10 - "showcase.tsx"
Cohesion: 0.26
Nodes (16): Bars(), Browser(), Chart(), Code(), Cursor(), delay(), DURATION, Loop() (+8 more)

### Community 11 - "build-rag-demo.py"
Cohesion: 0.29
Nodes (3): clip(), main(), pid()

## Knowledge Gaps
- **11 isolated node(s):** `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom`, `patch-package` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 102 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Root Layout & SEO` to `project-grid.tsx`, `Home Page Sections`, `Package & Lint Config`, `Header, Nav & Icons`, `Project Detail Page`, `showcase.tsx`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **What connects `@tailwindcss/turbopack`, `@types/node`, `@types/react` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `project-grid.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Home Page Sections` to `project-grid.tsx`, `Package & Lint Config`, `Header, Nav & Icons`, `Root Layout & SEO`, `Project Detail Page`, `showcase.tsx`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Should `Home Page Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.13704994192799072 - nodes in this community are weakly interconnected._
- **Why does `globals.css` connect `Ember Design System & Audit` to `Root Layout & SEO`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Should `Package & Lint Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._