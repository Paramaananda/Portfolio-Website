/**
 * MBG Sentiment MLOps pipeline, stage by stage.
 * Sources: system diagram public/images/projects/mbg-sentiment-mlops/02.webp (stages, cadence, tools),
 * Grafana dashboard 00.webp (seven-day view), and [PDF] p3 (my role; GitHub Actions + Docker).
 * `mine` marks stages my role covered per [PDF] p3; labeling and versioning are not claimed.
 */
import {
  siDocker,
  siDvc,
  siGithubactions,
  siGrafana,
  siMinio,
  siMlflow,
  siPostgresql,
  siX,
  type SimpleIcon,
} from "simple-icons";

export type PipelineTool = { name: string; icon?: SimpleIcon };
type Copy = { name: string; cadence: string; text: string };
export type PipelineStage = { id: string; mine: boolean; tools: PipelineTool[]; copy: { en: Copy; id: Copy } };

export const pipelineStages: PipelineStage[] = [
  {
    id: "collect",
    mine: true,
    tools: [{ name: "X", icon: siX }, { name: "Scraper agent" }],
    copy: {
      en: {
        name: "Collect",
        cadence: "Every day",
        text: "A scraper agent pulls new posts about the MBG program from X and saves them as a daily artifact.",
      },
      id: {
        name: "Kumpulkan",
        cadence: "Setiap hari",
        text: "Scraper agent mengambil unggahan baru tentang program MBG dari X dan menyimpannya sebagai artefak harian.",
      },
    },
  },
  {
    id: "label",
    mine: false,
    tools: [{ name: "Expert labeling" }],
    copy: {
      en: {
        name: "Label",
        cadence: "Every day",
        text: "Experts label each day's artifact by sentiment, so the model learns from checked examples.",
      },
      id: {
        name: "Labeli",
        cadence: "Setiap hari",
        text: "Pakar melabeli artefak harian berdasarkan sentimen, sehingga model belajar dari contoh yang sudah diperiksa.",
      },
    },
  },
  {
    id: "version",
    mine: false,
    tools: [{ name: "DVC", icon: siDvc }],
    copy: {
      en: {
        name: "Version",
        cadence: "Every week",
        text: "After a week of labels, the data is pushed with DVC to the data registry, so every training run uses a known dataset version.",
      },
      id: {
        name: "Versikan",
        cadence: "Setiap minggu",
        text: "Setelah seminggu pelabelan, data di-push dengan DVC ke data registry, sehingga setiap training memakai versi dataset yang jelas.",
      },
    },
  },
  {
    id: "retrain",
    mine: true,
    tools: [{ name: "DVC", icon: siDvc }, { name: "MLflow", icon: siMlflow }, { name: "MinIO", icon: siMinio }],
    copy: {
      en: {
        name: "Retrain",
        cadence: "Every week",
        text: "The trainer agent pulls the latest data with DVC, retrains the sentiment model, versions it in MLflow, and stores the artifacts in MinIO.",
      },
      id: {
        name: "Latih ulang",
        cadence: "Setiap minggu",
        text: "Trainer agent menarik data terbaru dengan DVC, melatih ulang model sentimen, mencatat versinya di MLflow, dan menyimpan artefaknya di MinIO.",
      },
    },
  },
  {
    id: "deploy",
    mine: true,
    tools: [{ name: "MLflow", icon: siMlflow }, { name: "Docker", icon: siDocker }],
    copy: {
      en: {
        name: "Deploy",
        cadence: "Each new model",
        text: "When MLflow holds a new model, the inference app picks it up and classifies the newly scraped posts.",
      },
      id: {
        name: "Deploy",
        cadence: "Tiap model baru",
        text: "Saat MLflow punya model baru, aplikasi inference langsung memakainya untuk mengklasifikasi unggahan yang baru diambil.",
      },
    },
  },
  {
    id: "monitor",
    mine: true,
    tools: [{ name: "PostgreSQL", icon: siPostgresql }, { name: "Grafana", icon: siGrafana }],
    copy: {
      en: {
        name: "Monitor",
        cadence: "Continuous",
        text: "Predictions and metrics are saved to PostgreSQL and shown in a Grafana dashboard of public sentiment over the last seven days.",
      },
      id: {
        name: "Pantau",
        cadence: "Terus-menerus",
        text: "Prediksi dan metrik disimpan di PostgreSQL dan ditampilkan di dashboard Grafana berisi sentimen publik tujuh hari terakhir.",
      },
    },
  },
];

/** Shown under the pipeline: what runs every stage. [PDF] p3 */
export const pipelinePlatform: PipelineTool[] = [
  { name: "GitHub Actions", icon: siGithubactions },
  { name: "Docker", icon: siDocker },
];
