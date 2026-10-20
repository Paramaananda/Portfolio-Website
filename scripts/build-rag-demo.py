"""Build public/data/rag-demo.json for the RAG demo (src/components/rag-demo.tsx).

Input: the 16 RAGAS result files from the thesis repo
  https://github.com/NLP-UB/Synthetic-Context-Generation-for-Nutrition-QA (evaluation/ragas/)
downloaded flat into one folder as  {zeroshot|fewshot}_{1..4}_{openai|ollama}.json.

Usage: python scripts/build-rag-demo.py <folder-with-json>
"""
import json
import sys
from pathlib import Path

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "data" / "rag-demo.json"
REPO = "https://github.com/NLP-UB/Synthetic-Context-Generation-for-Nutrition-QA"
MAX_PASSAGE = 600  # characters shown per retrieved passage
METRICS = ["answer_correctness", "semantic_similarity", "faithfulness", "answer_relevancy", "context_precision", "context_recall"]

# Picked cases (row index in every file) and their short labels. Row 24 is kept on purpose:
# in several set-ups the retriever brings back another patient and the model answers
# "informasi tidak tersedia", which shows the system's limits honestly.
CASES = [
    (0, "Diet principle · girl, 4 y 3 m", "Prinsip diet · perempuan, 4 th 3 bln"),
    (3, "Screening method · boy, 1 y 2 m", "Metode skrining · laki-laki, 1 th 2 bln"),
    (8, "Diet goal · boy, 3 m 15 d", "Tujuan diet · laki-laki, 3 bln 15 hr"),
    (14, "Diet principle · premature boy, 10 d", "Prinsip diet · bayi prematur, 10 hr"),
    (24, "Nutrition status · girl, 1 y 4 m", "Status gizi · perempuan, 1 th 4 bln"),
]


def clip(text: str) -> str:
    text = " ".join(text.split())
    return text if len(text) <= MAX_PASSAGE else text[:MAX_PASSAGE].rsplit(" ", 1)[0] + " …"


def main() -> None:
    passages: list[str] = []
    index: dict[str, int] = {}

    def pid(text: str) -> int:
        t = clip(text)
        if t not in index:
            index[t] = len(passages)
            passages.append(t)
        return index[t]

    base = json.loads((SRC / "zeroshot_1_openai.json").read_text(encoding="utf-8"))["detailed_results"]
    cases = [{"label": {"en": en, "id": id_}, "question": base[i]["user_input"], "reference": base[i]["reference"]} for i, en, id_ in CASES]

    runs = {}
    for model in ("openai", "ollama"):
        for shot in ("zeroshot", "fewshot"):
            for level in (1, 2, 3, 4):
                rows = json.loads((SRC / f"{shot}_{level}_{model}.json").read_text(encoding="utf-8"))["detailed_results"]
                out = []
                for i, *_ in CASES:
                    row = rows[i]
                    assert row["user_input"] == base[i]["user_input"], (shot, level, model, i)
                    out.append(
                        {
                            "contexts": [pid(c) for c in row["retrieved_contexts"]],
                            "answer": row["response"],
                            "scores": {m: round(float(row[m] or 0), 3) for m in METRICS},
                        }
                    )
                runs[f"{model}-{shot}-{level}"] = out

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"source": REPO, "passages": passages, "cases": cases, "runs": runs}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{OUT} · {OUT.stat().st_size / 1024:.1f} KB · {len(passages)} passages")


if __name__ == "__main__":
    main()
