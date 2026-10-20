"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";

/** Shape of public/data/rag-demo.json (built by scripts/build-rag-demo.py from the thesis repo's RAGAS results). */
type Scores = Record<(typeof METRICS)[number], number>;
type Run = { contexts: number[]; answer: string; scores: Scores };
type DemoData = {
  source: string;
  /** Retrieved passages, stored once and referenced by index from each run. */
  passages: string[];
  cases: {
    label: Record<Locale, string>;
    question: string;
    reference: string;
  }[];
  runs: Record<string, Run[]>;
};

export type RagDemoLabels = {
  title: string;
  lead: string;
  note: string;
  caseLabel: string;
  model: string;
  prompting: string;
  zeroShot: string;
  fewShot: string;
  restriction: string;
  levels: string[];
  run: string;
  rerun: string;
  steps: string[];
  reference: string;
  answer: string;
  passages: string;
  loading: string;
  error: string;
};

const METRICS = [
  "answer_correctness",
  "semantic_similarity",
  "faithfulness",
  "answer_relevancy",
  "context_precision",
  "context_recall",
] as const;
const METRIC_NAMES: Record<(typeof METRICS)[number], string> = {
  answer_correctness: "Answer correctness",
  semantic_similarity: "Semantic similarity",
  faithfulness: "Faithfulness",
  answer_relevancy: "Answer relevancy",
  context_precision: "Context precision",
  context_recall: "Context recall",
};
const MODELS = [
  { id: "openai", name: "OpenAI" },
  { id: "ollama", name: "Ollama" },
] as const;
const STEP_MS = 650;

function Segmented<T extends string | number>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="label text-ink-3">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.value)}
              className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-2 hover:border-ink-3 hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Replays one row of the thesis evaluation: question → retrieved context → LLM answer →
 * RAGAS scores against the reference. Data is fetched once, when the section is first shown.
 */
export function RagDemo({
  lang,
  labels,
}: {
  lang: Locale;
  labels: RagDemoLabels;
}) {
  const [data, setData] = useState<DemoData | null>(null);
  const [failed, setFailed] = useState(false);
  const [caseIdx, setCaseIdx] = useState(0);
  const [model, setModel] = useState<"openai" | "ollama">("openai");
  const [shot, setShot] = useState<"zeroshot" | "fewshot">("zeroshot");
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState(1); // steps shown: 1 = question only, 4 = all
  const root = useRef<HTMLElement>(null);
  const timers = useRef<number[]>([]);

  // Fetch the data the first time the section comes near the viewport.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        fetch("/data/rag-demo.json")
          .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
          .then((d: DemoData) => setData(d))
          .catch(() => setFailed(true));
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase(1);
  };

  const run = () => {
    reset();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(4);
      return;
    }
    [2, 3, 4].forEach((p, i) => {
      timers.current.push(
        window.setTimeout(() => setPhase(p), STEP_MS * (i + 1)),
      );
    });
  };

  const c = data?.cases[caseIdx];
  const r = data?.runs[`${model}-${shot}-${level}`]?.[caseIdx];

  return (
    <section
      ref={root}
      aria-labelledby="rag-demo-title"
      className="mt-20 lg:mt-28"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
        <h2
          id="rag-demo-title"
          lang="en"
          className="reveal-wipe font-display text-h2 uppercase lg:col-span-5"
        >
          {labels.title}
        </h2>
        <p className="reveal text-lg text-ink-2 lg:col-span-7 lg:pb-2">
          {labels.lead}
        </p>
      </div>

      <div className="mt-10 grid gap-8 rounded-frame bg-surface p-5 sm:p-8 lg:mt-12 lg:grid-cols-12 lg:gap-10 lg:p-10">
        {/* Controls */}
        <div className="space-y-6 lg:col-span-4">
          <fieldset>
            <legend className="label text-ink-3">{labels.caseLabel}</legend>
            <div className="mt-2 grid gap-2">
              {(data?.cases ?? []).map((cs, i) => {
                const on = i === caseIdx;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setCaseIdx(i);
                      reset();
                    }}
                    className={`flex min-h-11 items-center gap-3 rounded-[14px] border px-3 text-left text-sm transition-colors ${
                      on
                        ? "border-ink bg-paper font-medium text-ink"
                        : "border-line text-ink-2 hover:border-ink-3 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-xs tabular-nums ${
                        on ? "bg-ember-500 text-night" : "bg-line text-ink-2"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {cs.label[lang]}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <Segmented
            legend={labels.model}
            value={model}
            onChange={(v) => {
              setModel(v);
              reset();
            }}
            options={MODELS.map((m) => ({ value: m.id, label: m.name }))}
          />
          <Segmented
            legend={labels.prompting}
            value={shot}
            onChange={(v) => {
              setShot(v);
              reset();
            }}
            options={[
              { value: "zeroshot", label: labels.zeroShot },
              { value: "fewshot", label: labels.fewShot },
            ]}
          />
          <Segmented
            legend={labels.restriction}
            value={level}
            onChange={(v) => {
              setLevel(v);
              reset();
            }}
            options={labels.levels.map((l, i) => ({ value: i + 1, label: l }))}
          />

          <button
            type="button"
            onClick={run}
            disabled={!r}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-6 text-sm font-semibold tracking-wide text-night uppercase transition-transform duration-300 ease-out-soft hover:-translate-y-0.5 disabled:opacity-50"
          >
            {phase === 4 ? labels.rerun : labels.run}
          </button>
        </div>

        {/* Steps */}
        <div className="lg:col-span-8">
          {!data && (
            <p className="text-ink-2">
              {failed ? labels.error : labels.loading}
            </p>
          )}
          {c && r && (
            <ol className="relative space-y-4">
              <span
                aria-hidden
                className="absolute top-4 bottom-4 left-[17px] w-px bg-line"
              />
              {labels.steps.map((title, i) => {
                const shown = phase >= i + 1;
                return (
                  <li key={title} className="relative flex gap-4">
                    <span
                      className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold tabular-nums transition-colors duration-300 ${
                        shown
                          ? "border-ember-500 bg-ember-500 text-night"
                          : "border-line bg-paper text-ink-3"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div
                      className={`min-w-0 flex-1 rounded-card bg-paper p-4 transition-[opacity,transform] duration-500 ease-out-soft sm:p-5 ${
                        shown
                          ? "translate-y-0 opacity-100"
                          : "translate-y-1 opacity-40"
                      }`}
                    >
                      <p className="label text-ink-3">{title}</p>
                      {i === 0 && (
                        <p className="mt-2 leading-relaxed">{c.question}</p>
                      )}
                      {i === 1 &&
                        (shown ? (
                          <>
                            <p className="mt-2 text-sm text-ink-3">
                              {r.contexts.length} {labels.passages}
                            </p>
                            <ul className="mt-2 max-h-56 space-y-2 overflow-y-auto pr-1">
                              {r.contexts.map((p, k) => (
                                <li
                                  key={k}
                                  className="rounded-[10px] border border-line p-3 text-sm leading-relaxed text-ink-2"
                                >
                                  {data.passages[p]}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <p className="mt-2 text-ink-3">—</p>
                        ))}
                      {i === 2 && (
                        <p className="mt-2 leading-relaxed">
                          {shown ? r.answer : "—"}
                        </p>
                      )}
                      {i === 3 &&
                        (shown ? (
                          <>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <div>
                                <p className="text-xs font-medium text-ink-3">
                                  {labels.answer}
                                </p>
                                <p className="mt-1 text-sm leading-relaxed">
                                  {r.answer}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-ink-3">
                                  {labels.reference}
                                </p>
                                <p className="mt-1 text-sm leading-relaxed">
                                  {c.reference}
                                </p>
                              </div>
                            </div>
                            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                              {METRICS.map((m) => (
                                <div key={m}>
                                  <div className="flex items-baseline justify-between gap-2 text-sm">
                                    <dt className="text-ink-2">
                                      {METRIC_NAMES[m]}
                                    </dt>
                                    <dd className="font-medium tabular-nums">
                                      {r.scores[m].toFixed(2)}
                                    </dd>
                                  </div>
                                  <div
                                    aria-hidden
                                    className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line"
                                  >
                                    <div
                                      className="h-full origin-left rounded-full bg-ember-500 transition-transform duration-700 ease-out-soft"
                                      style={{
                                        transform: `scaleX(${r.scores[m]})`,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </dl>
                          </>
                        ) : (
                          <p className="mt-2 text-ink-3">—</p>
                        ))}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          <p className="sr-only" aria-live="polite">
            {phase > 1 ? `${labels.steps[phase - 1]} (${phase}/4)` : ""}
          </p>
        </div>
      </div>

      <p className="mt-4 max-w-[80ch] text-sm leading-relaxed text-ink-3">
        {labels.note}{" "}
        {data && (
          <a
            href={data.source}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-ink"
          >
            GitHub
          </a>
        )}
      </p>
    </section>
  );
}
