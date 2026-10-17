/**
 * Tools from [CV] content/resume.pdf, "Skills & Achievements → Tools", plus Jira ([USER] 17 Oct 2026).
 * Ordered by weight (user request): languages, ML/dev tooling, web, design, data/BI, then work tools.
 * Logos come from simple-icons (CC0). Brands it no longer ships (Adobe, Microsoft, Java)
 * and generic entries (SQL) use a text monogram instead of a look-alike logo.
 */
import {
  siCss,
  siDocker,
  siFigma,
  siGithub,
  siHtml5,
  siJira,
  siJavascript,
  siMaze,
  siMlflow,
  siPython,
  siSelenium,
  siTailwindcss,
  siTrello,
  type SimpleIcon,
} from "simple-icons";

export type Tool = { name: string; icon?: SimpleIcon; mono?: string };

export const tools: Tool[] = [
  { name: "Python", icon: siPython },
  { name: "Java", mono: "Java" },
  { name: "JavaScript", icon: siJavascript },
  { name: "SQL", mono: "SQL" },
  { name: "MLflow", icon: siMlflow },
  { name: "Docker", icon: siDocker },
  { name: "GitHub", icon: siGithub },
  { name: "Selenium", icon: siSelenium },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "HTML", icon: siHtml5 },
  { name: "CSS", icon: siCss },
  { name: "Figma", icon: siFigma },
  { name: "Maze", icon: siMaze },
  { name: "Adobe Illustrator", mono: "Ai" },
  { name: "Adobe Creative Cloud", mono: "Cc" },
  { name: "Looker Studio", mono: "LS" },
  { name: "Jira", icon: siJira },
  { name: "Trello", icon: siTrello },
];
