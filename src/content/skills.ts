/**
 * Tools from [CV 2026-10] I Putu Paramaananda Tanaya_CV.pdf, "Keahlian" (user, 22 Oct 2026), plus Jira and
 * Kotlin ([USER]). Ordered by weight (user request): languages, data & ML, MLOps, web, testing, design,
 * BI, then work tools. Logos come from simple-icons (CC0). Brands it does not ship (Adobe, Java,
 * XGBoost, Looker Studio) and generic entries (SQL) use a text monogram instead of a look-alike logo.
 */
import {
  siCss,
  siDocker,
  siDvc,
  siFastapi,
  siFigma,
  siGithub,
  siGrafana,
  siHtml5,
  siJavascript,
  siJira,
  siKotlin,
  siMaze,
  siMinio,
  siMlflow,
  siNextdotjs,
  siNginx,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siSelenium,
  siTailwindcss,
  siTrello,
  type SimpleIcon,
} from "simple-icons";

export type Tool = { name: string; icon?: SimpleIcon; mono?: string };

export const tools: Tool[] = [
  // Languages
  { name: "Python", icon: siPython },
  { name: "SQL", mono: "SQL" },
  { name: "Java", mono: "Java" },
  { name: "Kotlin", icon: siKotlin },
  { name: "JavaScript", icon: siJavascript },
  // Data & machine learning
  { name: "Pandas", icon: siPandas },
  { name: "NumPy", icon: siNumpy },
  { name: "scikit-learn", icon: siScikitlearn },
  { name: "XGBoost", mono: "XGB" },
  // MLOps & DevOps
  { name: "MLflow", icon: siMlflow },
  { name: "DVC", icon: siDvc },
  { name: "Docker", icon: siDocker },
  { name: "GitHub", icon: siGithub },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MinIO", icon: siMinio },
  { name: "Grafana", icon: siGrafana },
  { name: "Nginx", icon: siNginx },
  // Web
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "FastAPI", icon: siFastapi },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "HTML", icon: siHtml5 },
  { name: "CSS", icon: siCss },
  // Testing
  { name: "Selenium", icon: siSelenium },
  // Design
  { name: "Figma", icon: siFigma },
  { name: "Maze", icon: siMaze },
  { name: "Adobe Creative Cloud", mono: "Cc" },
  // BI & work tools
  { name: "Looker Studio", mono: "LS" },
  { name: "Jira", icon: siJira },
  { name: "Trello", icon: siTrello },
];
