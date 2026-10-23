// Copy is written fresh for this site. Facts behind it come from [PDF] content/portfolio-garuda.pdf,
// [CV] content/resume.pdf (latest CV before the Garuda internship) and [USER] the brief.
const en = {
  meta: {
    title: "I Putu Paramaananda Tanaya — AI & Product Portfolio",
    description:
      "I Putu Paramaananda Tanaya builds AI systems and designs digital products — from RAG pipelines and MLOps to usability-tested mobile apps.",
  },
  a11y: {
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    switchLang: "Switch language",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
  },
  nav: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Work",
    contact: "Contact",
  },
  hero: {
    word: "Build",
    tagline: ["Systems that think.", "Products people enjoy."],
    cta: "View work",
    statusLabel: "Currently",
    // [USER] 16 Oct 2026: IT Intern at Garuda Indonesia (Business Alignment) via MagangHub
    status: ["IT Intern,", "Garuda Indonesia"],
    statusDetail: "Business Alignment · MagangHub",
    // [CV] Education: Universitas Brawijaya, Informatics Engineering, Aug 2022 - Jan 2026.
    // GPA and study length intentionally not shown (user request, 16 Oct 2026).
    eduLabel: "Graduate",
    eduMajor: "Informatics Engineering",
    eduSchool: "Universitas Brawijaya",
    eduPeriod: "2022 – 2026",
    portraitAlt: "I Putu Paramaananda Tanaya in a graduation gown",
  },
  about: {
    label: "About",
    // Display heading stays English on every locale, like the hero word.
    heading: ["Design", "Data"],
    // Identity sentence (audit, 17 Oct 2026), repositioned to the [CV 2026-10] headline:
    // IT Business Analyst | System Analyst | UI/UX Design | Data & AI (user, 22 Oct 2026).
    lead: "I'm I Putu Paramaananda Tanaya. I turn business needs into working products, as an IT business analyst and UI/UX designer with hands-on data and AI.",
    // [CV] TRAVLR + Raion (UI/UX); [PDF] p2 thesis RAG QA, p3 MLOps pipeline with continuous retraining;
    // [USER] current role at Garuda Indonesia
    body: [
      // [CV] summary: fresh graduate in Informatics Engineering
      "An Informatics Engineering graduate of Universitas Brawijaya, I started in UI/UX — talking to users, mapping flows, and testing prototypes until they feel effortless.",
      "That curiosity pulled me into the data side: a RAG-based question-answering system for my thesis, and an MLOps pipeline that keeps a sentiment model retraining on fresh data. Today I'm an IT Intern at Garuda Indonesia.",
    ],
    pillars: [
      {
        title: "Product & UX design",
        text: "User research, flows, wireframes, high-fidelity UI, and usability testing.",
        // [CV] TRAVLR: "usability testing using Maze with 23 respondents"
        proof: "TRAVLR app · tested with 23 users on Maze",
      },
      {
        title: "Data & AI",
        text: "Turning data into answers with analysis, machine learning, and LLM-powered retrieval.",
        // [PDF] p2 thesis
        proof: "Thesis · RAG Q&A for pediatric nutrition",
      },
      {
        title: "MLOps & delivery",
        text: "Keeping models reliable in production with pipelines, containers, tracking, and monitoring.",
        // [PDF] p3: GitHub Actions, Docker, MLflow, PostgreSQL, MinIO, Grafana
        proof: "MBG sentiment pipeline · Docker, MLflow, Grafana",
      },
    ],
  },
  // [CV] Tools list. Kept to logos only (user request, 16 Oct 2026).
  skills: {
    label: "Skills",
    heading: "Toolkit",
    lead: "The tools I work with every day, from the first sketch to a running pipeline.",
  },
  // [CV] "Pengalaman Kerja", "Organizational Experience", "Pendidikan"; [USER] Garuda internship.
  experience: {
    label: "Experience",
    heading: "Track record",
    lead: "Where I've practised the craft: industry internships, a student developer community, and teams I've led.",
    now: "Now",
    groups: { work: "Work experience", org: "Organizations" },
    entries: [
      // [CV 2026-10] I Putu Paramaananda Tanaya_CV.pdf (user, 22 Oct 2026): role, unit, programme, points.
      {
        group: "work",
        current: true,
        role: "IT Intern, JKTDX",
        org: "PT Garuda Indonesia (Persero) Tbk",
        meta: "IT Business Alignment, Digital Transformation · MagangHub, Ministry of Manpower · Tangerang",
        period: "Aug 2026 – Present",
        confirm: "",
        points: [
          "Coordinated business, data, design, and developer teams for the Journey to Reward loyalty programme (Sky Rewards) from product brief to go-live; it now serves 2,700+ users and is still growing.",
          "Wrote its Business Case with page flows, user flows, and use case diagrams, and aligned content, coupon data, the leaderboard feature, and GarudaMiles validation with users and developers.",
          "Prepared the E-ITL Business Case (functional and technical requirements, timeline, mockups, cost-benefit analysis, budget, risks) and presented it to VPs and Senior Managers at the Enterprise Architecture Board.",
          "Evaluated vendors for the Customer Data Platform (CDP) procurement, a Board-level strategic programme, through vendor presentations, a proof of concept, clarification and negotiation, and vendor scoring.",
          "Tested booking and payment on the Garuda Indonesia website and the Fly GA app (PNR issuance, rescheduling, Upgrade Family Fare, Payment Orchestrator) and logged findings for the developers.",
          "Wrote service requests, minutes of meetings, and a mandays-based Business Case for GarudaMiles Anniversary, and supported JKTDX's annual IT portfolio inventory.",
        ],
      },
      // [CV 2026-10] + [LinkedIn Experience]
      {
        group: "work",
        current: false,
        role: "UI/UX Intern",
        org: "PT TRAVLR GUIDES INDONESIA",
        meta: "Denpasar, Bali · The Bali Bible",
        period: "Feb – Jun 2025",
        confirm: "",
        points: [
          "Redesigned a web-based travel platform as an end-to-end mobile app with a user-centred approach, alongside one fellow UI/UX intern.",
          "Analysed user behaviour, demographics, internal data, and Google Analytics 4, plus competitors, to ground design decisions in data.",
          "Produced user flows, wireframes, high-fidelity designs, and prototypes, including the Travlr AI concept for personalised trip recommendations.",
          "Validated the design with Maze usability testing (23 respondents, 14 blocks) and refined it with the Product, Data, and Engineering teams.",
        ],
      },
      // Organizations: [LinkedIn Volunteering] + the UNIKAHIDHA entry from [LinkedIn Experience] (user request, 17 Oct 2026).
      // BUT = Bulan Ulang Tahun, HBCC = Hindu Brahmacharya Competition & Charity ([CV]).
      // [LinkedIn Experience] Raion Community, UI/UX Designer (contract); details from [CV].
      {
        group: "org",
        current: false,
        role: "UI/UX Designer, Hipster Division",
        org: "Raion Community",
        meta: "Faculty of Computer Science, Universitas Brawijaya · Hybrid",
        period: "Mar 2024 – Jan 2026",
        confirm: "",
        points: [
          "Built digital product concepts with mixed teams in internal HackJam hackathons, including MindfulMe.",
          "Served on the organizing committee of RAION Insight 2024.",
          "Joined the community's workshops and skill-development programs on product development.",
        ],
      },
      {
        group: "org",
        current: false,
        role: "Steering Committee, DDM Division",
        org: "Bulan Ulang Tahun UNIKAHIDHA 2024",
        meta: "UNIKAHIDHA · Arts and culture",
        period: "Jun – Dec 2024",
        confirm: "",
        points: [
          "Supervised the planning, execution, and evaluation of the Design, Documentation & Multimedia division.",
          "Helped solve design and documentation problems and coordinated with the other divisions.",
        ],
      },
      {
        group: "org",
        current: false,
        role: "Steering Committee, DDM Division",
        org: "Hindu Brahmacharya Competition & Charity 2024",
        meta: "UNIKAHIDHA · Education",
        period: "Feb – May 2024",
        confirm: "",
        points: [
          "Supervised the planning, execution, and evaluation of the Design, Documentation & Multimedia division.",
          "Helped solve design and documentation problems and coordinated with the other divisions.",
        ],
      },
      // [LinkedIn Experience] Raion Community, UI/UX Designer Intern; StuntCare from [PDF] p8.
      {
        group: "org",
        current: false,
        role: "UI/UX Designer Intern",
        org: "Raion Community",
        meta: "Faculty of Computer Science, Universitas Brawijaya · Hybrid",
        period: "Feb – Mar 2024",
        confirm: "",
        points: [
          "Designed StuntCare in the community's internship program, alongside product managers, designers, and programmers.",
        ],
      },
      {
        group: "org",
        current: false,
        role: "Creative Media",
        org: "UNIKAHIDHA",
        meta: "Hindu Student Organization, Universitas Brawijaya · Malang · Hybrid",
        period: "Jan 2023 – Jan 2024",
        confirm: "",
        points: [],
      },
      {
        group: "org",
        current: false,
        role: "Coordinator, DDM Division",
        org: "Bulan Ulang Tahun UNIKAHIDHA 2023",
        meta: "UNIKAHIDHA · Arts and culture",
        period: "Jun – Dec 2023",
        confirm: "",
        points: [
          "Led an 8-person division covering design, decoration, and multimedia for the event.",
          "Managed publications and social media in line with the brand, on an Instagram account with 2,000+ followers.",
          "Oversaw photo and video documentation for an event of 150+ participants.",
        ],
      },
      {
        group: "org",
        current: false,
        role: "Coordinator, DDM Division",
        org: "Hindu Brahmacharya Competition & Charity 2023",
        meta: "UNIKAHIDHA · National-scale event",
        period: "Feb – May 2023",
        confirm: "",
        points: [
          "Led a 5-person division and kept the branding consistent across a national event.",
          "Managed event designs for publications and a 1,000+ follower Instagram account.",
          "Organised photo and video documentation, plus live-streaming on YouTube.",
        ],
      },
      {
        group: "org",
        current: false,
        role: "Staff, DDM Division",
        org: "Bulan Ulang Tahun UNIKAHIDHA 2022",
        meta: "UNIKAHIDHA · Arts and culture",
        period: "Jun – Dec 2022",
        confirm: "",
        points: [
          "Created visual and multimedia materials for the event.",
          "Supported design and documentation work and collaborated closely with the other divisions.",
        ],
      },
    ],
    // Shown as its own block below the timeline (user request, 16 Oct 2026).
    education: {
      label: "Education",
      items: [
        {
          // [CV 2026-10] Pendidikan: S.Kom., GPA 3.72 (shown here only, not in the hero; user 22 Oct 2026).
          school: "Universitas Brawijaya",
          program: "Informatics Engineering",
          meta: "Bachelor of Computer Science (S.Kom.) · GPA 3.72/4.00 · Malang",
          period: "Sep 2022 – Jan 2026 · 3.5 years",
          confirm: "",
        },
        {
          // [USER] 16 Oct 2026: 2019 – 2022; 17 Oct 2026: major and 3.5-year duration
          school: "SMA Negeri 3 Denpasar",
          program: "Mathematics and Natural Sciences",
          meta: "Senior High School · Denpasar, Bali",
          period: "2019 – 2022",
          confirm: "",
        },
      ],
    },
    // [CV 2026-10] Penghargaan & Pelatihan.
    awards: {
      label: "Awards & training",
      items: [
        { title: "Top 10 Finalist, Data Analysis Competition", org: "IFEST 2024 · Universitas Padjadjaran", year: "2024" },
        { title: "Data Visualization class (16 hours)", org: "Dicoding", year: "2025" },
      ],
    },
  },
  projects: {
    label: "Projects",
    heading: "Selected work",
    lead: "Projects across AI systems, data, product design, and the web — each with the full journey from first insight to result.",
    filters: { all: "All", ai: "AI & Data", design: "Product design", web: "Web" },
    filterLabel: "Filter projects",
    process: "Process",
    ragDemo: {
      title: "Try it",
      lead: "Pick a patient case from the thesis evaluation set and a set-up, then run it to see each step of the RAG pipeline.",
      note: "Recorded results from the thesis evaluation, not live model calls. Cases are anonymised and in Indonesian, as in the dataset. Scores measure agreement with the reference answer, not clinical accuracy.",
      caseLabel: "Case",
      model: "Model",
      prompting: "Prompting",
      zeroShot: "Zero-shot",
      fewShot: "Few-shot",
      restriction: "Context restriction",
      levels: ["High", "Mid-high", "Mid-low", "Low"],
      run: "Run the pipeline",
      rerun: "Run again",
      steps: ["Question", "Retrieved context", "LLM answer", "Compared with the reference"],
      reference: "Reference answer",
      answer: "Generated answer",
      passages: "passages retrieved",
      loading: "Loading the evaluation data…",
      error: "The demo data could not be loaded. Refresh the page to try again.",
    },
    pipeline: {
      title: "Pipeline",
      lead: "The loop the platform runs on. Select a stage to see what happens there, how often, and with which tools.",
      tablist: "Pipeline stages",
      stage: "Stage",
      mine: "My part of the build",
      team: "Handled by the rest of the team",
      tools: "Tools",
      platform: "Every stage runs in Docker, automated with GitHub Actions.",
    },
    processLead: "How the project came together, step by step.",
    step: "Step",
    teamProject: "Team project",
    more: {
      title: "More experiments on GitHub",
      text: "Notebooks, coursework, and side projects that didn't make this list.",
      cta: "Open GitHub",
    },
    view: "View project",
    motion: { pause: "Pause animations", play: "Play animations" },
    back: "All projects",
    next: "Next project",
    facts: { year: "Year", role: "Role", type: "Type" },
    sections: { overview: "Overview", role: "My role", outcome: "Outcome" },
    linksLabel: "Links",
    links: {
      github: "GitHub repo",
      publication: "Publication",
      deck: "Presentation deck",
      figma: "Figma file",
      prototype: "Prototype",
      userflow: "User flow",
    },
    gallery: "Gallery",
    figure: "visual",
  },
  contact: {
    label: "Contact",
    // Display heading is English on every locale.
    heading: "Let's talk",
    lead: "Have a project, a role, or just a question? My inbox is open.",
    emailLabel: "Email",
    copy: "Copy",
    copied: "Copied",
    elsewhere: "Elsewhere",
  },
  footer: {
    rights: "All rights reserved.",
  },
};

export default en;
export type Dictionary = typeof en;
