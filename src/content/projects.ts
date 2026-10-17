/**
 * Project content. Sources:
 *   [PDF]   content/portfolio-garuda.pdf, pages 2–8 (the first seven projects)
 *   [FIGMA] Figma "Paramaananda's Portfolio" case-study frames (read-only): StuntCare, MindfulMe,
 *           NutriPrep, Day of Art, Lookawisata, Kaggle ML, Poverty Levels, AI Employment Risk Index
 *   [CV]    content/resume.pdf
 * Copy is rewritten for the site; facts, steps, numbers, and images come from those sources.
 * Images live in public/images/projects/<slug>/. Open questions: content/PERLU-KONFIRMASI.md.
 */
import type { Locale } from "@/i18n/config";

export type Category = "ai" | "design" | "web";
export type LinkKind = "github" | "publication" | "deck" | "figma" | "prototype" | "userflow";

export type Img = { src: string; width: number; height: number };
/** Gallery image with a description of what it shows (alt text), per locale. */
export type Figure = Img & { alt: { en: string; id: string } };
type L<T> = Record<Locale, T>;

export type Step = { image?: Img; copy: L<{ title: string; text: string }> };

/** Animated cover. Each kind is a short looping "showcase video" built from the project's own assets. */
export type Showcase =
  | { kind: "phones"; screens: Img[] }
  | { kind: "browser"; url: string; screens: Img[] }
  | { kind: "pan"; image: Img }
  | { kind: "rag"; nodes: string[]; metric: { label: string; value: string } }
  | { kind: "loop"; nodes: string[]; center: string }
  | { kind: "bars"; code: string; bars: { label: string; value: number }[]; unit: string }
  | { kind: "chart"; code: string; image: Img; chips: string[] }
  /** Recorded showcase video: small (card) and large (project page) encodes, plus a poster frame. */
  | { kind: "video"; card: string; hero: string; poster: string };

export type Project = {
  slug: string;
  /** Undefined when no source states the year. */
  year?: string;
  category: Category;
  roles: string[];
  tags: string[];
  links: { kind: LinkKind; href: string }[];
  /** Two colours for the cover background (mixed with the theme surface). */
  tint: [string, string];
  showcase: Showcase;
  copy: L<{ title: string; type: string; tagline: string; overview: string; role: string; outcome: string }>;
  journey: Step[];
  gallery: Figure[];
};

const im = (slug: string, file: string, width: number, height: number): Img => ({
  src: `/images/projects/${slug}/${file}`,
  width,
  height,
});

const fig = (img: Img, en: string, id: string): Figure => ({ ...img, alt: { en, id } });

const step = (en: [string, string], id: [string, string], image?: Img): Step => ({
  image,
  copy: { en: { title: en[0], text: en[1] }, id: { title: id[0], text: id[1] } },
});

/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  /* [PDF] p2 */
  {
    slug: "nutrition-rag-qa",
    year: "2025",
    category: "ai",
    roles: ["AI Engineer", "Researcher", "System Developer"],
    tags: ["RAG", "LLM", "Synthetic context", "Vector database", "Evaluation"],
    links: [
      { kind: "github", href: "https://github.com/NLP-UB/Synthetic-Context-Generation-for-Nutrition-QA" },
      { kind: "publication", href: "https://j-ptiik.ub.ac.id/index.php/j-ptiik/article/view/15928" },
      { kind: "deck", href: "https://canva.link/o3g802hte6tov76" },
    ],
    tint: ["#cfe0ff", "#e9e3ff"],
    showcase: {
      kind: "rag",
      // Stages from the thesis pipeline diagram (01.webp) plus the RAG step.
      nodes: ["Q&A dataset", "Prompt design", "LLM", "Synthetic context", "RAG answer"],
      metric: { label: "BERTScore-F1", value: "0.9252" },
    },
    copy: {
      en: {
        title: "Nutrition Q&A with RAG",
        type: "Thesis · AI system",
        tagline: "An AI question-answering system for pediatric nutrition, grounded in LLM-generated context.",
        overview:
          "Existing nutrition datasets held only question–answer pairs, with no supporting context for a retrieval system to ground its answers on. For my undergraduate thesis I used large language models to generate that context synthetically, then built a Retrieval-Augmented Generation (RAG) system that answers pediatric nutrition questions for nutrition professionals.",
        role: "I analysed the requirements, designed the end-to-end RAG architecture, built the synthetic-context pipeline, prepared the nutrition datasets, integrated the vector database and LLM APIs, and evaluated the system with quantitative metrics.",
        outcome:
          "I compared four set-ups: OpenAI and Ollama, each zero-shot and few-shot. Generated answers were scored against the dataset's reference answers with BERTScore-F1, plus RAG metrics such as faithfulness and context recall. OpenAI zero-shot scored highest (0.9252), ahead of OpenAI few-shot (0.9084) and Ollama (0.8337 zero-shot, 0.8356 few-shot). BERTScore measures how close an answer is to the reference text, not clinical accuracy: this is thesis research and a prototype, not a deployed medical tool.",
      },
      id: {
        title: "Tanya-Jawab Gizi dengan RAG",
        type: "Skripsi · Sistem AI",
        tagline: "Sistem tanya-jawab AI untuk gizi anak, berbasis konteks yang dihasilkan LLM.",
        overview:
          "Dataset gizi yang ada hanya berisi pasangan tanya-jawab, tanpa konteks pendukung yang bisa dijadikan dasar jawaban oleh sistem retrieval. Untuk skripsi, saya memakai large language model untuk membuat konteks tersebut secara sintetis, lalu membangun sistem Retrieval-Augmented Generation (RAG) yang menjawab pertanyaan gizi anak bagi tenaga profesional gizi.",
        role: "Saya menganalisis kebutuhan, merancang arsitektur RAG end-to-end, membangun pipeline konteks sintetis, menyiapkan dataset gizi, mengintegrasikan vector database dan API LLM, serta mengevaluasi sistem dengan metrik kuantitatif.",
        outcome:
          "Saya membandingkan empat skenario: OpenAI dan Ollama, masing-masing zero-shot dan few-shot. Jawaban yang dihasilkan dinilai terhadap jawaban rujukan di dataset dengan BERTScore-F1, ditambah metrik RAG seperti faithfulness dan context recall. OpenAI zero-shot meraih skor tertinggi (0,9252), di atas OpenAI few-shot (0,9084) dan Ollama (0,8337 zero-shot, 0,8356 few-shot). BERTScore mengukur kedekatan jawaban dengan teks rujukan, bukan akurasi klinis: ini riset skripsi dan prototipe, bukan alat medis yang sudah dipakai.",
      },
    },
    journey: [
      step(
        ["Requirement analysis", "Mapped what nutrition professionals need from a question-answering system, and why Q&A pairs alone were not enough."],
        ["Analisis kebutuhan", "Memetakan kebutuhan tenaga gizi dari sistem tanya-jawab, dan mengapa pasangan tanya-jawab saja tidak cukup."],
      ),
      step(
        ["Synthetic context generation", "Designed prompts so an LLM turns each question–answer pair into a supporting context passage."],
        ["Generasi konteks sintetis", "Merancang prompt agar LLM mengubah setiap pasangan tanya-jawab menjadi paragraf konteks pendukung."],
        im("nutrition-rag-qa", "01.webp", 1575, 505),
      ),
      step(
        ["RAG architecture", "Prepared the datasets, stored the contexts in a vector database, and connected retrieval to the LLM APIs."],
        ["Arsitektur RAG", "Menyiapkan dataset, menyimpan konteks di vector database, dan menghubungkan retrieval dengan API LLM."],
      ),
      step(
        ["Evaluation", "Compared OpenAI and Ollama in zero-shot and few-shot settings with BERTScore and RAG quality metrics."],
        ["Evaluasi", "Membandingkan OpenAI dan Ollama dalam skenario zero-shot dan few-shot dengan BERTScore serta metrik kualitas RAG."],
        im("nutrition-rag-qa", "02.webp", 542, 342),
      ),
    ],
    gallery: [
      fig(
        im("nutrition-rag-qa", "03.webp", 665, 334),
        "Radar charts of RAG quality metrics (faithfulness, answer relevancy, context precision and recall, semantic similarity, answer correctness) for OpenAI zero-shot and few-shot at four restriction levels.",
        "Grafik radar metrik kualitas RAG (faithfulness, answer relevancy, context precision dan recall, semantic similarity, answer correctness) untuk OpenAI zero-shot dan few-shot pada empat tingkat restriksi.",
      ),
      fig(
        im("nutrition-rag-qa", "04.webp", 665, 334),
        "The same RAG quality radar charts for Ollama zero-shot and few-shot at four restriction levels.",
        "Grafik radar metrik kualitas RAG yang sama untuk Ollama zero-shot dan few-shot pada empat tingkat restriksi.",
      ),
      fig(
        im("nutrition-rag-qa", "05.webp", 480, 360),
        "Thesis meeting: three people around a table with a laptop and a tablet.",
        "Pertemuan skripsi: tiga orang di sekitar meja dengan laptop dan tablet.",
      ),
    ],
  },

  /* [PDF] p3; outcome from the system diagram (02.webp) and Grafana dashboard (00.webp). */
  {
    slug: "mbg-sentiment-mlops",
    year: "2025",
    category: "ai",
    roles: ["MLOps Engineer", "Data Engineer"],
    tags: ["GitHub Actions", "Docker", "MLflow", "PostgreSQL", "MinIO", "Grafana"],
    links: [{ kind: "github", href: "https://github.com/indrabrata/mbg-sentiment-analysis" }],
    tint: ["#ffd9c2", "#ffe9b8"],
    showcase: {
      kind: "loop",
      // Stage names from the project's system-workflow figure (01.webp).
      nodes: ["Data collection", "Preprocessing", "Model training", "Deployment", "Monitoring", "Continuous improvement"],
      center: "MLOps",
    },
    copy: {
      en: {
        title: "MBG Sentiment MLOps Platform",
        type: "Team project · MLOps",
        tagline: "An automated pipeline that tracks public sentiment on Indonesia's free-meal program from X.",
        overview:
          "Our team built an end-to-end MLOps pipeline to analyse public sentiment toward Indonesia's Makan Bergizi Gratis (MBG) program using posts from X (Twitter). Every stage — data collection, preprocessing, training, deployment, monitoring, and continuous retraining — is automated, so the system stays scalable, reproducible, and maintainable.",
        role: "I focused on data engineering and MLOps: the data-collection workflow, dataset preprocessing, the training and retraining pipelines, and deployment and monitoring with GitHub Actions, Docker, MLflow, PostgreSQL, MinIO, and Grafana.",
        outcome:
          "The pipeline runs on a schedule. Posts from X are scraped and classified every day; expert-labelled data is versioned with DVC each week; the trainer retrains the model weekly, with runs tracked in MLflow and artifacts stored in MinIO; and each new model is picked up by the inference service. Predictions and metrics are saved to PostgreSQL and feed a Grafana dashboard of sentiment over the last seven days. It is a team project: my part was the data and MLOps layers.",
      },
      id: {
        title: "Platform MLOps Sentimen MBG",
        type: "Proyek tim · MLOps",
        tagline: "Pipeline otomatis yang memantau sentimen publik terhadap program Makan Bergizi Gratis dari X.",
        overview:
          "Tim kami membangun pipeline MLOps end-to-end untuk menganalisis sentimen publik terhadap program Makan Bergizi Gratis (MBG) dari unggahan di X (Twitter). Seluruh tahap — pengumpulan data, preprocessing, training, deployment, monitoring, hingga retraining berkelanjutan — berjalan otomatis sehingga sistem tetap skalabel, reproducible, dan mudah dirawat.",
        role: "Saya fokus pada data engineering dan MLOps: alur pengumpulan data, preprocessing dataset, pipeline training dan retraining, serta deployment dan monitoring dengan GitHub Actions, Docker, MLflow, PostgreSQL, MinIO, dan Grafana.",
        outcome:
          "Pipeline berjalan terjadwal. Unggahan dari X diambil dan diklasifikasi setiap hari; data berlabel pakar diversikan dengan DVC tiap minggu; trainer melatih ulang model setiap minggu, dengan run tercatat di MLflow dan artefak disimpan di MinIO; dan setiap model baru langsung dipakai layanan inference. Prediksi dan metrik disimpan di PostgreSQL dan mengisi dashboard Grafana berisi sentimen tujuh hari terakhir. Ini proyek tim: bagian saya adalah lapisan data dan MLOps.",
      },
    },
    journey: [
      step(
        ["System workflow", "Planned the loop the platform runs on: collect, preprocess, train, deploy, monitor, and improve."],
        ["Alur sistem", "Merancang siklus platform: kumpulkan, preprocessing, latih, deploy, pantau, lalu perbaiki."],
        im("mbg-sentiment-mlops", "01.webp", 908, 187),
      ),
      step(
        ["Data collection & preprocessing", "Built the workflow that gathers posts from X and cleans them into training-ready datasets."],
        ["Pengumpulan & preprocessing data", "Membangun alur yang mengambil unggahan dari X dan membersihkannya menjadi dataset siap latih."],
      ),
      step(
        ["Training & retraining", "Set up pipelines that train the sentiment model and retrain it as new data arrives, tracked in MLflow."],
        ["Training & retraining", "Menyiapkan pipeline yang melatih model sentimen dan melatihnya ulang saat data baru masuk, tercatat di MLflow."],
        im("mbg-sentiment-mlops", "02.webp", 925, 388),
      ),
      step(
        ["Deployment & monitoring", "Containerised the services with Docker, automated them with GitHub Actions, and watched them in Grafana."],
        ["Deployment & monitoring", "Membungkus layanan dengan Docker, mengotomatiskannya dengan GitHub Actions, dan memantaunya di Grafana."],
        im("mbg-sentiment-mlops", "00.webp", 758, 372),
      ),
    ],
    gallery: [
      fig(
        im("mbg-sentiment-mlops", "03.webp", 699, 344),
        "MLflow model metrics for an incremental retraining run (mbg-sentiment-incremental, 18 Dec 2025): epoch, eval accuracy, F1 macro, loss, and runtime.",
        "Metrik model di MLflow untuk satu run retraining inkremental (mbg-sentiment-incremental, 18 Des 2025): epoch, eval accuracy, F1 macro, loss, dan runtime.",
      ),
    ],
  },

  /* [PDF] p4 */
  {
    slug: "momenia",
    year: "2026",
    category: "design",
    roles: ["Product Designer", "Software Tester"],
    tags: ["Product design", "Web app", "User flows", "Responsive UI"],
    links: [
      {
        kind: "figma",
        href: "https://www.figma.com/design/df6llHayTtyDXoEgxApgEs/MOMENIA-%F0%9F%A6%8B-Paramaananda?node-id=3004-1128&t=6LOzIszRjU3JaL7R-1",
      },
    ],
    tint: ["#d9d4ff", "#f1d9ff"],
    // [USER] src/content/Showcase Momenia.mp4, re-encoded without audio (56 MB → 0.7 MB card, 2.2 MB hero).
    showcase: {
      kind: "video",
      card: "/videos/momenia/showcase-640.mp4",
      hero: "/videos/momenia/showcase-1280.mp4",
      poster: "/videos/momenia/poster.webp",
    },
    copy: {
      en: {
        title: "Momenia",
        type: "Startup project · Product design",
        tagline: "An affordable website builder for digital invitations, born from Bali's many ceremonies.",
        overview:
          "Bali hosts countless events, ceremonies, and celebrations that need digital invitations, yet invitation websites are often expensive, manual, or hard to customise without help. Momenia, a self-initiated project by Semeton Corp, lets anyone create, customise, publish, and manage invitations — with editable templates, responsive layouts, add-ons, payments, guest management, RSVP tracking, a guestbook, and after-party notes.",
        role: "As Product Designer I translated product requirements into user flows, wireframes, high-fidelity screens, and responsive concepts for both the user and the admin experience.",
        outcome:
          "I learned to turn a local market opportunity into a scalable product, structure a complex feature set into a clear journey, and prepare it for launch with a small startup team.",
      },
      id: {
        title: "Momenia",
        type: "Proyek startup · Desain produk",
        tagline: "Website builder undangan digital yang terjangkau, lahir dari banyaknya upacara di Bali.",
        overview:
          "Bali punya banyak acara, upacara, dan perayaan yang membutuhkan undangan digital, tetapi membuat website undangan sering mahal, manual, atau sulit diatur tanpa bantuan teknis. Momenia, proyek inisiatif Semeton Corp, memudahkan siapa saja membuat, menyesuaikan, memublikasikan, dan mengelola undangan — lengkap dengan template, layout responsif, add-on, pembayaran, manajemen tamu, RSVP, buku tamu, dan catatan after-party.",
        role: "Sebagai Product Designer, saya menerjemahkan kebutuhan produk menjadi user flow, wireframe, desain high-fidelity, dan konsep responsif untuk sisi pengguna maupun admin.",
        outcome:
          "Saya belajar mengubah peluang pasar lokal menjadi produk yang skalabel, menyusun fitur yang kompleks menjadi alur yang jelas, dan menyiapkannya untuk rilis bersama tim startup kecil.",
      },
    },
    journey: [
      step(
        ["Opportunity", "Observed how often Balinese events need invitations, and how costly or manual making one still is."],
        ["Peluang", "Mengamati seberapa sering acara di Bali butuh undangan, dan betapa mahal atau manualnya membuat satu undangan."],
        im("momenia", "02.webp", 800, 520),
      ),
      step(
        ["Requirements & user flows", "Turned the feature set — templates, payments, RSVP, guestbook — into clear user and admin journeys."],
        ["Kebutuhan & user flow", "Mengubah daftar fitur — template, pembayaran, RSVP, buku tamu — menjadi alur yang jelas untuk pengguna dan admin."],
      ),
      step(
        ["Wireframes & high-fidelity", "Designed the builder and admin screens, from wireframes to responsive high-fidelity UI."],
        ["Wireframe & high-fidelity", "Mendesain layar builder dan admin, dari wireframe hingga UI high-fidelity yang responsif."],
        im("momenia", "01.webp", 654, 364),
      ),
      step(
        ["Testing & launch prep", "Tested the product as Software Tester and prepared it for deployment with the team."],
        ["Pengujian & persiapan rilis", "Menguji produk sebagai Software Tester dan menyiapkannya untuk deployment bersama tim."],
        im("momenia", "00.webp", 692, 405),
      ),
    ],
    gallery: [],
  },

  /* [PDF] p5 */
  {
    slug: "memoribox",
    year: "2026",
    category: "design",
    roles: ["Product Designer", "Product Manager", "Software Tester"],
    tags: ["Client project", "Desktop app", "User flows", "UAT"],
    links: [
      { kind: "figma", href: "https://www.figma.com/design/6PQwV0m6Pwr1gVBvVrakCB/MemoriBox-ID-Design?node-id=1-2&t=AisYN66Tg0ZBodjd-1" },
      { kind: "userflow", href: "https://www.figma.com/board/GEoXB0wFAzs64bP9FbJGY9/Memoribox-User-Flow?node-id=0-1&t=KDmvHHRZgXlgxIST-1" },
    ],
    tint: ["#fff0b3", "#ffe1c7"],
    showcase: {
      kind: "browser",
      url: "memoribox.id",
      screens: [im("memoribox", "01.webp", 903, 447), im("memoribox", "00.webp", 518, 291)],
    },
    copy: {
      en: {
        title: "Memoribox Photobox",
        type: "Client project · Product",
        tagline: "A self-service digital photobooth for events, from payment to printed photo.",
        overview:
          "memoribox.id wanted to turn a conventional photobooth into a modern, efficient, and scalable system for events and daily operations. Built by Semeton Corp, the self-service platform covers a payment gateway, template selection, retakes, photo customisation, automatic printing, digital delivery, cloud storage, and an admin analytics dashboard.",
        role: "I gathered the client's requirements, defined user flows, designed wireframes and high-fidelity interfaces, and supported user acceptance testing with the client.",
        outcome:
          "Managing a real client product taught me to translate business needs into clear features while keeping the photobooth experience efficient and easy to use.",
      },
      id: {
        title: "Memoribox Photobox",
        type: "Proyek klien · Produk",
        tagline: "Photobooth digital swalayan untuk acara, dari pembayaran sampai foto tercetak.",
        overview:
          "memoribox.id ingin mengubah photobooth konvensional menjadi sistem yang modern, efisien, dan skalabel untuk acara maupun operasional harian. Dibangun oleh Semeton Corp, platform swalayan ini mencakup payment gateway, pilihan template, foto ulang, kustomisasi foto, cetak otomatis, pengiriman digital, cloud storage, dan dashboard analitik admin.",
        role: "Saya mengumpulkan kebutuhan klien, menyusun user flow, mendesain wireframe dan antarmuka high-fidelity, serta mendampingi user acceptance testing bersama klien.",
        outcome:
          "Mengelola produk klien sungguhan mengajarkan saya menerjemahkan kebutuhan bisnis menjadi fitur yang jelas, sambil menjaga pengalaman photobooth tetap efisien dan mudah dipakai.",
      },
    },
    journey: [
      step(
        ["Client requirements", "Gathered what memoribox.id needed to run photobooths at events and day to day."],
        ["Kebutuhan klien", "Mengumpulkan kebutuhan memoribox.id untuk menjalankan photobooth di acara maupun operasional harian."],
      ),
      step(
        ["User flows", "Mapped every path from payment and template choice to retakes, printing, and digital delivery."],
        ["User flow", "Memetakan setiap alur, dari pembayaran dan pilihan template hingga foto ulang, cetak, dan pengiriman digital."],
        im("memoribox", "02.webp", 767, 378),
      ),
      step(
        ["Wireframes & high-fidelity", "Designed the self-service screens and the admin analytics dashboard."],
        ["Wireframe & high-fidelity", "Mendesain layar swalayan dan dashboard analitik admin."],
        im("memoribox", "01.webp", 903, 447),
      ),
      step(
        ["User acceptance testing", "Ran UAT sessions with the client and refined the product from their feedback."],
        ["User acceptance testing", "Menjalankan sesi UAT bersama klien dan menyempurnakan produk dari masukan mereka."],
        im("memoribox", "04.webp", 1017, 572),
      ),
    ],
    gallery: [
      fig(
        im("memoribox", "03.webp", 754, 310),
        "Memoribox mascot sheet: colour palette, two illustrated characters, and the smiling yellow box mascot in photo-booth poses.",
        "Lembar maskot Memoribox: palet warna, dua karakter ilustrasi, dan maskot kotak kuning tersenyum dalam pose photobooth.",
      ),
    ],
  },

  /* [PDF] p6 */
  {
    slug: "travlr",
    year: "2025",
    category: "design",
    roles: ["UI/UX Designer Intern"],
    tags: ["Mobile app", "UX research", "Prototyping", "Maze"],
    links: [
      {
        kind: "prototype",
        href: "https://www.figma.com/proto/nNMUY343y6smI0JqborfFI/TRAVLR-Mobile-Apps-Paramaananda?node-id=2401-7485&p=f&viewport=559%2C400%2C0.03&t=fccMNpRSNjG5KxU4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2401%3A11578&show-proto-sidebar=1&page-id=2344%3A10598",
      },
      { kind: "figma", href: "https://www.figma.com/design/nNMUY343y6smI0JqborfFI/TRAVLR-Mobile-Apps-Paramaananda?node-id=2344-10598&t=z4v3R0X2GvwA9pbR-1" },
    ],
    tint: ["#c9e7ea", "#d8f0e2"],
    showcase: { kind: "pan", image: im("travlr", "00.webp", 758, 453) },
    copy: {
      en: {
        title: "TRAVLR Mobile App",
        type: "Internship · Mobile app",
        tagline: "Reimagining a web travel platform as a mobile-first app, tested with 23 users.",
        overview:
          "Research showed most TRAVLR users reached the platform on their phones, so we redesigned the existing web experience as a mobile-first app for discovering destinations, exploring stays, managing bookings, and planning trips.",
        role: "Working with one fellow UI/UX intern at PT TRAVLR GUIDES INDONESIA, I analysed user behaviour, demographics, internal data, and existing flows, then produced competitor analysis, user flows, wireframes, high-fidelity designs, prototypes, iterations, and the Travlr AI concept for personalised discovery.",
        outcome:
          "We validated the design with Maze usability testing — 23 respondents across 14 testing blocks — and refined it from real feedback. It was my first time balancing user needs, business goals, and technical constraints inside a company.",
      },
      id: {
        title: "Aplikasi Mobile TRAVLR",
        type: "Magang · Aplikasi mobile",
        tagline: "Mengubah platform travel berbasis web menjadi aplikasi mobile-first, diuji 23 pengguna.",
        overview:
          "Riset menunjukkan sebagian besar pengguna TRAVLR mengakses platform lewat ponsel, sehingga kami merancang ulang pengalaman web yang ada menjadi aplikasi mobile-first untuk menemukan destinasi, mencari penginapan, mengelola booking, dan merencanakan perjalanan.",
        role: "Bersama satu rekan UI/UX intern di PT TRAVLR GUIDES INDONESIA, saya menganalisis perilaku pengguna, demografi, data internal, dan alur yang ada, lalu membuat analisis kompetitor, user flow, wireframe, desain high-fidelity, prototipe, iterasi, serta konsep Travlr AI untuk rekomendasi perjalanan yang personal.",
        outcome:
          "Desain kami divalidasi lewat usability testing di Maze — 23 responden dalam 14 blok pengujian — lalu disempurnakan dari masukan nyata. Ini pengalaman pertama saya menyeimbangkan kebutuhan pengguna, tujuan bisnis, dan batasan teknis di lingkungan perusahaan.",
      },
    },
    journey: [
      step(
        ["Research", "Studied user behaviour, demographics, internal data, and existing flows to find where mobile could do better."],
        ["Riset", "Mempelajari perilaku pengguna, demografi, data internal, dan alur yang ada untuk menemukan peluang di mobile."],
        im("travlr", "02.webp", 1224, 689),
      ),
      step(
        ["Competitor analysis & flows", "Compared travel apps, then mapped the user flows for discovery, stays, bookings, and trip planning."],
        ["Analisis kompetitor & alur", "Membandingkan aplikasi travel, lalu memetakan user flow untuk pencarian, penginapan, booking, dan rencana perjalanan."],
      ),
      step(
        ["Wireframes to high-fidelity", "Designed the mobile app and the Travlr AI concept for personalised travel discovery."],
        ["Wireframe ke high-fidelity", "Mendesain aplikasi mobile dan konsep Travlr AI untuk rekomendasi perjalanan yang personal."],
        im("travlr", "00.webp", 758, 453),
      ),
      step(
        ["Usability testing", "Tested the prototype on Maze with 23 respondents across 14 blocks, then iterated on the findings."],
        ["Usability testing", "Menguji prototipe di Maze dengan 23 responden dalam 14 blok, lalu iterasi dari temuannya."],
        im("travlr", "01.webp", 768, 365),
      ),
    ],
    gallery: [],
  },

  /* [PDF] p8 + [FIGMA] StuntCare frame */
  {
    slug: "stuntcare",
    year: "2024",
    category: "design",
    roles: ["Product Designer"],
    tags: ["Health", "Mobile app", "Design thinking", "SUS"],
    links: [
      {
        kind: "prototype",
        href: "https://www.figma.com/proto/ACqFsSTXTJ7Z0TPaoCj9NM/StuntCare?node-id=89-218&viewport=2697%2C626%2C0.78&t=x07LgFKjVj1hrTei-1&scaling=scale-down&content-scaling=fixed&page-id=20%3A2",
      },
      { kind: "figma", href: "https://www.figma.com/design/ACqFsSTXTJ7Z0TPaoCj9NM/StuntCare?node-id=145-122&t=pd9l1Ba0bqdgOhjk-1" },
    ],
    tint: ["#f4cfe6", "#ddd0fb"],
    showcase: {
      kind: "phones",
      screens: [
        im("stuntcare", "screen-0.webp", 206, 420),
        im("stuntcare", "screen-1.webp", 209, 423),
        im("stuntcare", "screen-2.webp", 207, 422),
        im("stuntcare", "screen-3.webp", 207, 422),
        im("stuntcare", "screen-4.webp", 207, 421),
      ],
    },
    copy: {
      en: {
        title: "StuntCare",
        type: "Community program · Mobile app",
        tagline: "Helping expectant mothers prevent stunting from early pregnancy.",
        overview:
          "StuntCare supports pregnant women in preventing stunting from the earliest stage, with accessible health information, nutrition guidance, pregnancy tracking, and supportive features. It was built in Raion Community's internship program alongside product managers, designers, and programmers.",
        role: "I interviewed expectant mothers, built personas, identified their key needs, and designed from wireframes through high-fidelity screens to interactive prototypes. Following design thinking, the team shaped features such as Anti-Stunting, Procare, and Stream.",
        outcome:
          "The app reached a System Usability Scale score of 81.5. It showed me how a structured, multidisciplinary process can deliver a health product aligned with the SDGs for maternal and child health.",
      },
      id: {
        title: "StuntCare",
        type: "Program komunitas · Aplikasi mobile",
        tagline: "Membantu ibu hamil mencegah stunting sejak awal kehamilan.",
        overview:
          "StuntCare membantu ibu hamil mencegah stunting sejak tahap awal, lewat informasi kesehatan yang mudah diakses, panduan gizi, pemantauan kehamilan, dan fitur pendukung lainnya. Aplikasi ini dibuat dalam program magang Raion Community bersama product manager, desainer, dan programmer.",
        role: "Saya mewawancarai ibu hamil, menyusun persona, mengidentifikasi kebutuhan utama, dan mendesain mulai dari wireframe, high-fidelity, hingga prototipe interaktif. Dengan pendekatan design thinking, tim merancang fitur seperti Anti-Stunting, Procare, dan Stream.",
        outcome:
          "Aplikasi ini meraih skor System Usability Scale 81,5. Saya belajar bagaimana proses yang terstruktur dan multidisiplin bisa menghasilkan produk kesehatan yang selaras dengan SDGs untuk kesehatan ibu dan anak.",
      },
    },
    journey: [
      step(
        ["User persona", "Interviewed expectant mothers about medical information, prenatal reminders, nutrition advice, emotional support, and progress tracking, then built personas from it."],
        ["User persona", "Mewawancarai ibu hamil tentang informasi medis, pengingat kontrol, saran gizi, dukungan emosional, dan pemantauan kehamilan, lalu menyusun persona darinya."],
        im("stuntcare", "persona.webp", 577, 572),
      ),
      step(
        ["Design system", "Chose pink and purple for a caring tone, Poppins for readability, UI-compliant icons, and custom illustrations."],
        ["Design system", "Memilih warna pink dan ungu agar terasa hangat, Poppins agar mudah dibaca, ikon sesuai pedoman UI, dan ilustrasi khusus."],
        im("stuntcare", "system.webp", 603, 385),
      ),
      step(
        ["Wireframes", "Laid out structure and navigation first, so usability problems surfaced before any visual polish."],
        ["Wireframe", "Menyusun struktur dan navigasi lebih dulu, agar masalah usability terlihat sebelum masuk ke detail visual."],
        im("stuntcare", "wireframe.webp", 602, 356),
      ),
      step(
        ["High-fidelity design", "Brought the screens to life — onboarding, Anti-Stunting, Procare meal plans, and the Stream community."],
        ["High-fidelity design", "Menghidupkan layar — onboarding, Anti-Stunting, menu Procare, dan komunitas Stream."],
        im("stuntcare", "hifi.webp", 1179, 432),
      ),
      step(
        ["Prototype & testing", "Linked every flow into an interactive prototype and validated it with the System Usability Scale: 81.5."],
        ["Prototipe & pengujian", "Menghubungkan semua alur menjadi prototipe interaktif dan memvalidasinya dengan System Usability Scale: 81,5."],
        im("stuntcare", "prototype.webp", 602, 378),
      ),
    ],
    gallery: [],
  },

  /* [PDF] p7 + [FIGMA] MindfulMe frame */
  {
    slug: "mindfulme",
    year: "2024",
    category: "design",
    roles: ["Product Designer"],
    tags: ["Hackathon", "Mental health", "Mobile app", "SUS", "Maze"],
    links: [
      {
        kind: "prototype",
        href: "https://www.figma.com/proto/RabHgJPqElRv2J4BtcX2HL/Mindfullme-Apps?node-id=65-1955&p=f&viewport=314%2C159%2C0.07&t=6B1UyG4eoylGWZ8R-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=35%3A9072&show-proto-sidebar=1&page-id=35%3A2121",
      },
      { kind: "figma", href: "https://www.figma.com/design/RabHgJPqElRv2J4BtcX2HL/Mindfullme-Apps?node-id=35-2121&t=HEQyRWa2OlOuBbOC-1" },
    ],
    tint: ["#dcd8ff", "#cfe3ff"],
    showcase: {
      kind: "phones",
      screens: [
        im("mindfulme", "screen-1.webp", 210, 430),
        im("mindfulme", "screen-0.webp", 210, 429),
        im("mindfulme", "screen-3.webp", 209, 427),
        im("mindfulme", "screen-2.webp", 209, 428),
        im("mindfulme", "screen-4.webp", 212, 433),
      ],
    },
    copy: {
      en: {
        title: "MindfulMe",
        type: "Hackathon · Mobile app",
        tagline: "A safe space to journal, share stories, and reach a psychologist.",
        overview:
          "Built at Raion HackJam 2024 for an SDG-themed challenge, MindfulMe responds to the growing attention on mental health. User research and personas pointed to a need for a safe place to express emotions, track how you feel, share stories, and get professional support — which became daily journaling, read-and-write stories, psychologist consultation, and mood support.",
        role: "As UI/UX designer in a team of product managers, designers, and a programmer, I worked on brainstorming, user flows, interface design, prototyping, and usability testing with SUS and Maze.",
        outcome:
          "The project was nominated for Best Design. It taught me to move fast under hackathon constraints and to turn user insights into a meaningful product together with PM and engineering.",
      },
      id: {
        title: "MindfulMe",
        type: "Hackathon · Aplikasi mobile",
        tagline: "Ruang aman untuk menulis jurnal, berbagi cerita, dan terhubung dengan psikolog.",
        overview:
          "Dibuat di Raion HackJam 2024 untuk tantangan bertema SDGs, MindfulMe menjawab meningkatnya perhatian pada kesehatan mental. Riset pengguna dan persona menunjukkan kebutuhan akan ruang aman untuk mengekspresikan emosi, memantau kondisi mental, berbagi cerita, dan mendapat dukungan profesional — yang kemudian menjadi fitur jurnal harian, baca-tulis cerita, konsultasi psikolog, dan dukungan suasana hati.",
        role: "Sebagai UI/UX designer dalam tim berisi product manager, desainer, dan programmer, saya terlibat dalam brainstorming, user flow, desain antarmuka, prototyping, serta usability testing dengan SUS dan Maze.",
        outcome:
          "Proyek ini masuk nominasi Best Design. Saya belajar bergerak cepat di bawah batasan hackathon dan mengubah insight pengguna menjadi produk yang bermakna bersama PM dan engineer.",
      },
    },
    journey: [
      step(
        ["User persona", "Interviewed young professionals under work pressure about stress, self-care time, and affordable mental-health help."],
        ["User persona", "Mewawancarai pekerja muda yang tertekan pekerjaan tentang stres, waktu untuk diri sendiri, dan akses bantuan kesehatan mental yang terjangkau."],
        im("mindfulme", "persona.webp", 558, 591),
      ),
      step(
        ["Design system", "Built on calming purples with blue, orange, green, and yellow for emotions, the Urbanist typeface, and custom illustrations."],
        ["Design system", "Berbasis ungu yang menenangkan, dengan biru, oranye, hijau, dan kuning untuk emosi, typeface Urbanist, serta ilustrasi khusus."],
        im("mindfulme", "system.webp", 609, 468),
      ),
      step(
        ["High-fidelity design", "Designed onboarding, psychologist consultation, the daily mood journal, and the story space."],
        ["High-fidelity design", "Mendesain onboarding, konsultasi psikolog, jurnal suasana hati harian, dan ruang cerita."],
        im("mindfulme", "hifi.webp", 1179, 440),
      ),
      step(
        ["Prototype & testing", "Connected the flows into a prototype and tested its usability with SUS and Maze."],
        ["Prototipe & pengujian", "Menghubungkan alur menjadi prototipe dan menguji usability-nya dengan SUS dan Maze."],
        im("mindfulme", "prototype.webp", 617, 365),
      ),
      step(
        ["Posters", "Posters that present the app — and the project went on to earn a Best Design nomination."],
        ["Poster", "Poster yang memperkenalkan aplikasi — dan proyek ini kemudian masuk nominasi Best Design."],
        im("mindfulme", "01.webp", 540, 540),
      ),
    ],
    gallery: [],
  },

  /* [FIGMA] AI Employment Risk Index frame; [CV] IFEST 2024 Top 10 finalist */
  {
    slug: "ai-employment-risk",
    year: "2024",
    category: "ai",
    roles: ["Team project"],
    tags: ["Data analysis", "Regression", "scikit-learn", "XGBoost", "Competition"],
    links: [],
    tint: ["#ffd6cc", "#ffe8c2"],
    showcase: {
      kind: "chart",
      code: "rdf = RandomForestRegressor()",
      image: im("ai-employment-risk", "eval.webp", 474, 511),
      chips: ["Random Forest", "R² 0.99986", "RMSE 0.638"],
    },
    copy: {
      en: {
        title: "AI Employment Risk Index",
        type: "Competition · Data analysis",
        tagline: "Which jobs is AI most likely to reshape? A data story from the IFEST 2024 final.",
        overview:
          "For the final round of IFEST 2024, hosted by Universitas Padjadjaran, my team analysed the \"AI Employment Risk Index\" dataset: required skills, salary ranges, country data, AI models, tasks, domains, and the estimated AI impact on each occupation. The goal was to find which jobs are most exposed to automation and what that means for the workforce.",
        role: "In our team I explored and visualised the data, engineered the features, and trained and compared five regression models.",
        outcome: "Our team finished as a Top 10 finalist in the IFEST 2024 Data Analysis Competition.",
      },
      id: {
        title: "AI Employment Risk Index",
        type: "Kompetisi · Analisis data",
        tagline: "Pekerjaan mana yang paling mungkin diubah AI? Analisis data dari babak final IFEST 2024.",
        overview:
          "Di babak final IFEST 2024 yang diselenggarakan Universitas Padjadjaran, tim kami menganalisis dataset \"AI Employment Risk Index\": skill yang dibutuhkan, rentang gaji, data negara, model AI, tugas, domain, dan estimasi dampak AI pada tiap profesi. Tujuannya menemukan pekerjaan yang paling rentan otomatisasi dan dampaknya bagi dunia kerja.",
        role: "Dalam tim, saya mengeksplorasi dan memvisualisasikan data, menyiapkan fitur, serta melatih dan membandingkan lima model regresi.",
        outcome: "Tim kami menjadi Top 10 finalis Kompetisi Analisis Data IFEST 2024.",
      },
    },
    journey: [
      step(
        ["Data collecting", "Worked with the competition dataset: skills, salaries, countries, AI models, tasks, domains, and AI impact per job."],
        ["Pengumpulan data", "Mengolah dataset kompetisi: skill, gaji, negara, model AI, tugas, domain, dan dampak AI per pekerjaan."],
      ),
      step(
        ["Visualisation", "Explored the data with a correlation heatmap, pairplots, and job counts per country."],
        ["Visualisasi", "Mengeksplorasi data dengan heatmap korelasi, pairplot, dan jumlah pekerjaan per negara."],
        im("ai-employment-risk", "viz.webp", 1192, 352),
      ),
      step(
        ["Preprocessing", "Split jobs into high (≥0.6), medium (0.3–0.6), and low (<0.3) AI impact, dropped weak features, and label-encoded nine Southeast Asian countries."],
        ["Preprocessing", "Membagi pekerjaan menjadi dampak AI tinggi (≥0,6), sedang (0,3–0,6), dan rendah (<0,3), membuang fitur lemah, dan me-label-encode sembilan negara Asia Tenggara."],
        im("ai-employment-risk", "preprocess.webp", 469, 592),
      ),
      step(
        ["Modelling", "Predicted salary with five regressors on an 80/20 split: Gradient Boosting, Random Forest, SVR, Decision Tree, and XGBoost."],
        ["Modelling", "Memprediksi gaji dengan lima regressor pada pembagian 80/20: Gradient Boosting, Random Forest, SVR, Decision Tree, dan XGBoost."],
        im("ai-employment-risk", "model.webp", 455, 569),
      ),
      step(
        ["Evaluation", "Compared R² and RMSE with actual-vs-predicted plots. Random Forest led with R² 0.99986 and RMSE 0.638."],
        ["Evaluasi", "Membandingkan R² dan RMSE dengan grafik aktual vs prediksi. Random Forest unggul dengan R² 0,99986 dan RMSE 0,638."],
        im("ai-employment-risk", "eval.webp", 474, 511),
      ),
    ],
    gallery: [],
  },

  /* [FIGMA] Day of Art frame */
  {
    slug: "day-of-art",
    category: "web",
    roles: ["Team project"],
    tags: ["Website", "Requirements engineering", "Laravel", "Tailwind CSS", "MySQL"],
    links: [],
    tint: ["#ffd0ec", "#f4d8ff"],
    showcase: {
      kind: "browser",
      url: "dayofart",
      screens: [im("day-of-art", "page.webp", 454, 461), im("day-of-art", "hifi.webp", 1079, 524)],
    },
    copy: {
      en: {
        title: "Day of Art",
        type: "Website · Design & build",
        tagline: "An event website for a creative community that runs crafting workshops for women in Malang.",
        overview:
          "Day of Art hosts workshops and creative events focused on empowering women through crafting and art. Together with my team, I designed and built a web app where visitors browse events and check out tickets, while admins add, edit, and remove events.",
        role: "My team and I interviewed the event organisers, wrote the requirements, designed the system and screens, and implemented the website.",
        outcome:
          "A working website — registration, event browsing, and ticket purchase — that keeps the organisation's own look and photos at its centre.",
      },
      id: {
        title: "Day of Art",
        type: "Website · Desain & pengembangan",
        tagline: "Website acara untuk komunitas kreatif yang mengadakan workshop kerajinan bagi perempuan di Malang.",
        overview:
          "Day of Art mengadakan workshop dan acara kreatif yang berfokus memberdayakan perempuan lewat kerajinan dan seni. Bersama tim, saya merancang dan membangun aplikasi web tempat pengunjung melihat acara dan membeli tiket, sementara admin menambah, mengubah, dan menghapus acara.",
        role: "Bersama tim, saya mewawancarai penyelenggara acara, menyusun kebutuhan, merancang sistem dan tampilan, lalu mengimplementasikan websitenya.",
        outcome:
          "Website yang berfungsi — registrasi, penjelajahan acara, dan pembelian tiket — dengan identitas visual dan foto milik organisasi sebagai pusatnya.",
      },
    },
    journey: [
      step(
        ["Requirement analysis", "Interviewed the event organisers in Malang, then wrote use case diagrams, scenarios, and sequence diagrams."],
        ["Analisis kebutuhan", "Mewawancarai penyelenggara acara di Malang, lalu menyusun use case diagram, skenario, dan sequence diagram."],
        im("day-of-art", "usecase.webp", 409, 535),
      ),
      step(
        ["Design system", "Kept the organisation's signature pink, their own photos and posters, readable typography, and consistent icons."],
        ["Design system", "Mempertahankan pink khas organisasi, foto dan poster milik mereka, tipografi yang mudah dibaca, serta ikon yang konsisten."],
        im("day-of-art", "system.webp", 480, 458),
      ),
      step(
        ["High-fidelity design", "Designed the home page, login, personal data, checkout, e-ticket, and about pages."],
        ["High-fidelity design", "Mendesain halaman beranda, login, data diri, checkout, e-ticket, dan tentang kami."],
        im("day-of-art", "hifi.webp", 1079, 524),
      ),
      step(
        ["Prototype", "Linked the pages into an interactive prototype to check the flows with stakeholders before coding."],
        ["Prototipe", "Menghubungkan halaman menjadi prototipe interaktif untuk mengecek alur bersama stakeholder sebelum coding."],
        im("day-of-art", "prototype.webp", 576, 327),
      ),
      step(
        ["Implementation", "Built it with HTML, Tailwind CSS, and PHP on Laravel Breeze, with MySQL for users, events, and ticket transactions."],
        ["Implementasi", "Membangunnya dengan HTML, Tailwind CSS, dan PHP di Laravel Breeze, dengan MySQL untuk data pengguna, acara, dan transaksi tiket."],
      ),
    ],
    gallery: [],
  },

  /* [FIGMA] Lookawisata frame */
  {
    slug: "lookawisata",
    category: "web",
    roles: ["Team project"],
    tags: ["Website", "Travel", "Tailwind CSS", "Front-end"],
    links: [],
    tint: ["#e6d5c8", "#d3e6d4"],
    showcase: {
      kind: "browser",
      url: "lookawisata",
      screens: [im("lookawisata", "screen-hero.webp", 308, 228), im("lookawisata", "hifi.webp", 943, 437)],
    },
    copy: {
      en: {
        title: "Lookawisata",
        type: "Website · Design & front-end",
        tagline: "A travel website for discovering destinations across Indonesia.",
        overview:
          "Lookawisata helps people discover travel destinations across Indonesia — by region, by activity, and by what is trending. My team and I designed the experience and built the front end.",
        role: "My team and I created the design system, the high-fidelity pages, and the prototype, then developed the front end.",
        outcome: "A responsive front end with subtle animations that stays faithful to the high-fidelity design.",
      },
      id: {
        title: "Lookawisata",
        type: "Website · Desain & front-end",
        tagline: "Website wisata untuk menemukan destinasi di seluruh Indonesia.",
        overview:
          "Lookawisata membantu orang menemukan destinasi wisata di seluruh Indonesia — berdasarkan wilayah, aktivitas, dan yang sedang tren. Bersama tim, saya merancang pengalamannya dan membangun front end-nya.",
        role: "Bersama tim, saya membuat design system, halaman high-fidelity, dan prototipe, lalu mengembangkan front end-nya.",
        outcome: "Front end responsif dengan animasi halus yang tetap setia pada desain high-fidelity.",
      },
    },
    journey: [
      step(
        ["Design system", "Dark brown and deep green for Indonesia's tropical nature, the Poppins typeface, custom illustrations, and consistent icons."],
        ["Design system", "Cokelat tua dan hijau pekat yang mewakili alam tropis Indonesia, typeface Poppins, ilustrasi khusus, dan ikon yang konsisten."],
        im("lookawisata", "system.webp", 568, 378),
      ),
      step(
        ["High-fidelity design", "Designed the hero, most-popular destinations, events, regions, trending spots, and activities."],
        ["High-fidelity design", "Mendesain hero, destinasi terpopuler, acara, wilayah, tempat yang sedang tren, dan aktivitas."],
        im("lookawisata", "hifi.webp", 943, 437),
      ),
      step(
        ["Prototype", "Connected every page into a clickable prototype for testing before development."],
        ["Prototipe", "Menghubungkan setiap halaman menjadi prototipe yang bisa diklik untuk diuji sebelum pengembangan."],
        im("lookawisata", "prototype.webp", 611, 509),
      ),
      step(
        ["Front-end implementation", "Built the pages with HTML and Tailwind CSS, using Tailwind's animation utilities for subtle motion."],
        ["Implementasi front-end", "Membangun halaman dengan HTML dan Tailwind CSS, memakai utilitas animasi Tailwind untuk gerakan yang halus."],
      ),
    ],
    gallery: [],
  },

  /* [FIGMA] NutriPrep frame */
  {
    slug: "nutriprep",
    category: "design",
    roles: ["Team project"],
    tags: ["Mobile app", "Health", "Design system", "Prototype"],
    links: [],
    tint: ["#d7f0c8", "#eef5c6"],
    showcase: {
      kind: "phones",
      screens: [
        im("nutriprep", "screen-3.webp", 173, 442),
        im("nutriprep", "screen-0.webp", 169, 436),
        im("nutriprep", "screen-2.webp", 172, 438),
        im("nutriprep", "screen-1.webp", 168, 432),
      ],
    },
    copy: {
      en: {
        title: "NutriPrep",
        type: "Mobile app · UI design",
        tagline: "A diet-management app that plans meals for the whole family.",
        overview:
          "NutriPrep helps a family keep track of each member's health data and daily activity, then plans meals with clear calories and macros. My team and I designed the app from its design system to an interactive prototype.",
        role: "My team and I built the design system, designed the high-fidelity screens, and linked them into a prototype.",
        outcome: "A complete, clickable app design — family data, daily updates, personal information, and the nutrition planner.",
      },
      id: {
        title: "NutriPrep",
        type: "Aplikasi mobile · Desain UI",
        tagline: "Aplikasi pengatur diet yang merencanakan makanan untuk seluruh keluarga.",
        overview:
          "NutriPrep membantu keluarga mencatat data kesehatan dan aktivitas harian setiap anggota, lalu merencanakan menu dengan kalori dan makronutrien yang jelas. Bersama tim, saya mendesain aplikasi ini dari design system hingga prototipe interaktif.",
        role: "Bersama tim, saya membuat design system, mendesain layar high-fidelity, dan menghubungkannya menjadi prototipe.",
        outcome: "Desain aplikasi yang lengkap dan bisa diklik — data keluarga, update harian, informasi pribadi, dan nutrition planner.",
      },
    },
    journey: [
      step(
        ["Design system", "Greens for health and a sustainable lifestyle, SF Pro Display for clean readability, consistent icons, and custom illustrations."],
        ["Design system", "Hijau untuk kesehatan dan gaya hidup berkelanjutan, SF Pro Display agar mudah dibaca, ikon yang konsisten, dan ilustrasi khusus."],
        im("nutriprep", "system.webp", 618, 354),
      ),
      step(
        ["High-fidelity design", "Designed family data, daily updates, personal information, the nutrition planner, and the account screens."],
        ["High-fidelity design", "Mendesain data keluarga, update harian, informasi pribadi, nutrition planner, dan layar akun."],
        im("nutriprep", "hifi.webp", 1179, 448),
      ),
      step(
        ["Prototype", "Linked onboarding, login, and five main flows into one interactive prototype."],
        ["Prototipe", "Menghubungkan onboarding, login, dan lima alur utama menjadi satu prototipe interaktif."],
        im("nutriprep", "prototype.webp", 545, 477),
      ),
    ],
    gallery: [],
  },

  /* [FIGMA] Poverty Levels frame */
  {
    slug: "poverty-prediction",
    category: "ai",
    roles: ["Team project"],
    tags: ["Data analysis", "Neural network", "SDGs", "scikit-learn"],
    links: [],
    tint: ["#ffd3cf", "#ffe7b8"],
    showcase: {
      kind: "chart",
      code: "regr = MLPRegressor(max_iter=500)",
      image: im("poverty-prediction", "predict.webp", 439, 280),
      chips: ["MLPRegressor", "R² 0.479", "2023 forecast"],
    },
    copy: {
      en: {
        title: "Predicting Poverty Levels",
        type: "Data analysis · SDGs",
        tagline: "Forecasting poverty rates from GDP, the hunger index, and housing conditions.",
        overview:
          "Using official SDG data from unstats.un.org, my team and I modelled how GDP per capita, the hunger index, and the share of urban population in inadequate housing relate to poverty — then forecast poverty rates for 2023.",
        role: "My team and I merged and cleaned the indicator datasets, trained a neural-network regressor, and analysed the results.",
        outcome:
          "The model reached R² 0.512 on training and 0.479 on test data, and the forecast highlighted the five areas with the largest predicted change for 2023.",
      },
      id: {
        title: "Prediksi Tingkat Kemiskinan",
        type: "Analisis data · SDGs",
        tagline: "Memprediksi tingkat kemiskinan dari PDB, indeks kelaparan, dan kondisi hunian.",
        overview:
          "Dengan data resmi SDGs dari unstats.un.org, tim kami memodelkan hubungan PDB per kapita, indeks kelaparan, dan persentase penduduk kota di hunian tidak layak dengan kemiskinan — lalu memprediksi tingkat kemiskinan tahun 2023.",
        role: "Bersama tim, saya menggabungkan dan membersihkan dataset indikator, melatih regressor neural network, dan menganalisis hasilnya.",
        outcome:
          "Model meraih R² 0,512 pada data latih dan 0,479 pada data uji, dan prediksinya menyorot lima wilayah dengan perubahan terbesar di 2023.",
      },
    },
    journey: [
      step(
        ["Data collecting", "Gathered three SDG indicators — GDP per capita, the hunger index, and inadequate urban housing — tied to goals 1, 2, and 11."],
        ["Pengumpulan data", "Mengumpulkan tiga indikator SDGs — PDB per kapita, indeks kelaparan, dan hunian kota tidak layak — terkait tujuan 1, 2, dan 11."],
        im("poverty-prediction", "sdg.webp", 603, 186),
      ),
      step(
        ["Preprocessing", "Merged the feature and target files on GeoAreaName, filled gaps with zero or the mean, and dropped metadata columns."],
        ["Preprocessing", "Menggabungkan file fitur dan target berdasarkan GeoAreaName, mengisi data kosong dengan nol atau rata-rata, dan membuang kolom metadata."],
        im("poverty-prediction", "preprocess.webp", 546, 464),
      ),
      step(
        ["Modelling", "Trained scikit-learn's MLPRegressor on an 80/20 split with up to 500 iterations to capture non-linear patterns."],
        ["Modelling", "Melatih MLPRegressor dari scikit-learn pada pembagian 80/20 dengan maksimal 500 iterasi untuk menangkap pola non-linear."],
        im("poverty-prediction", "model.webp", 469, 435),
      ),
      step(
        ["Evaluation", "Scored the fit with R², studied feature correlations, and charted 2018–2022 history against the 2023 forecast."],
        ["Evaluasi", "Mengukur performa dengan R², mempelajari korelasi fitur, dan memetakan data 2018–2022 terhadap prediksi 2023."],
        im("poverty-prediction", "features.webp", 607, 304),
      ),
    ],
    gallery: [
      fig(
        im("poverty-prediction", "score.webp", 562, 213),
        "Notebook output of the regression score: 0.479 on the test set and 0.512 on the training set.",
        "Output notebook skor regresi: 0,479 pada data uji dan 0,512 pada data latih.",
      ),
      fig(
        im("poverty-prediction", "predict.webp", 439, 280),
        "Line chart of poverty rates for Viet Nam, Sweden, Bangladesh, Indonesia, and Ecuador from 2018 to 2022, with the 2023 prediction.",
        "Grafik garis tingkat kemiskinan Viet Nam, Swedia, Bangladesh, Indonesia, dan Ekuador tahun 2018–2022, beserta prediksi 2023.",
      ),
    ],
  },

  /* [FIGMA] Kaggle ML frame */
  {
    slug: "kaggle-ml",
    category: "ai",
    roles: ["Team project"],
    tags: ["Machine learning", "Classification", "Clustering", "Ensemble", "Kaggle"],
    links: [],
    tint: ["#c8e9fa", "#d9e4ff"],
    showcase: {
      kind: "bars",
      code: "gb.fit(x_train, y_train)",
      unit: "Spaceship Titanic · accuracy",
      // [FIGMA] "Spaceship Dataset Evaluation" accuracy scores.
      bars: [
        { label: "NB", value: 0.6958 },
        { label: "DT", value: 0.7349 },
        { label: "KNN", value: 0.7786 },
        { label: "SVM", value: 0.7792 },
        { label: "RF", value: 0.7826 },
        { label: "GB", value: 0.7987 },
      ],
    },
    copy: {
      en: {
        title: "ML Classification & Clustering",
        type: "Coursework · Machine learning",
        tagline: "Six Kaggle challenges, six classic models, and an ensemble vote.",
        overview:
          "Working with six Kaggle datasets provided by our lecturer — five classification tasks and one clustering task — my team and I built and compared classic machine-learning models, then combined them with a majority-vote ensemble.",
        role: "My team and I prepared each dataset, trained six scikit-learn models, and evaluated them on held-out data.",
        outcome: "On Spaceship Titanic, Gradient Boosting scored the best single-model accuracy at 0.799, and the ensemble made the final predictions more robust.",
      },
      id: {
        title: "Klasifikasi & Clustering ML",
        type: "Tugas kuliah · Machine learning",
        tagline: "Enam tantangan Kaggle, enam model klasik, dan voting ensemble.",
        overview:
          "Dengan enam dataset Kaggle dari dosen — lima tugas klasifikasi dan satu clustering — tim kami membangun dan membandingkan model machine learning klasik, lalu menggabungkannya dengan ensemble berbasis voting mayoritas.",
        role: "Bersama tim, saya menyiapkan setiap dataset, melatih enam model scikit-learn, dan mengevaluasinya pada data uji.",
        outcome: "Pada Spaceship Titanic, Gradient Boosting meraih akurasi model tunggal terbaik 0,799, dan ensemble membuat prediksi akhir lebih andal.",
      },
    },
    journey: [
      step(
        ["Data collecting", "Six Kaggle competitions: Unsupervised Clustering, Failures, Horse Health, Smoker Status, Bank Churn, and Spaceship Titanic."],
        ["Pengumpulan data", "Enam kompetisi Kaggle: Unsupervised Clustering, Failures, Horse Health, Smoker Status, Bank Churn, dan Spaceship Titanic."],
        im("kaggle-ml", "datasets.webp", 979, 284),
      ),
      step(
        ["Preprocessing", "Filled missing values with the mean or mode, reduced dimensions with PCA, encoded categories, and dropped irrelevant columns."],
        ["Preprocessing", "Mengisi data kosong dengan rata-rata atau modus, mereduksi dimensi dengan PCA, meng-encode kategori, dan membuang kolom yang tidak relevan."],
        im("kaggle-ml", "preprocess.webp", 515, 493),
      ),
      step(
        ["Modelling", "Trained KNN, Naive Bayes, Decision Tree, SVM, Random Forest, and Gradient Boosting on an 80/20 split."],
        ["Modelling", "Melatih KNN, Naive Bayes, Decision Tree, SVM, Random Forest, dan Gradient Boosting pada pembagian 80/20."],
        im("kaggle-ml", "model.webp", 439, 548),
      ),
      step(
        ["Evaluation", "Measured accuracy per model, then combined all predictions with a majority vote for a more reliable result."],
        ["Evaluasi", "Mengukur akurasi tiap model, lalu menggabungkan semua prediksi dengan voting mayoritas untuk hasil yang lebih andal."],
        im("kaggle-ml", "eval.webp", 765, 466),
      ),
    ],
    gallery: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
