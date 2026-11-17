import { useState } from "react";
import { FACTS } from "@/lib/regs/facts";
import { topicLabel } from "@/lib/regs/topics";
import type { Fact } from "@/lib/regs/types";

function optionsFor(fact: Fact, n: number) {
  const correct = fact.point.split("。")[0] ?? fact.point;
  const items = [
    { text: correct, ok: true },
    { text: fact.traps[0] ?? "不用翻原文", ok: false },
    { text: fact.traps[1] ?? fact.traps[0] ?? "全部都啱", ok: false },
  ];
  const shift = n % items.length;
  return [...items.slice(shift), ...items.slice(0, shift)];
}

export function StudyPeek() {
  const [cursor, setCursor] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, seen: 0 });
  const fact = FACTS[cursor % FACTS.length]!;
  const options = optionsFor(fact, cursor);
  const answered = picked !== null;

  function choose(index: number) {
    if (answered) return;
    setPicked(index);
    setScore((s) => ({ right: s.right + (options[index]?.ok ? 1 : 0), seen: s.seen + 1 }));
  }

  function next() {
    setCursor((c) => (c + 1) % FACTS.length);
    setPicked(null);
  }

  return (
    <section className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">測驗</h2>
        <span className="text-xs text-muted">
          {topicLabel(fact.topic)} · {score.seen === 0 ? "未作答" : `${score.right}/${score.seen}`}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed">
        {fact.code} {fact.ref}。邊句先啱？
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {options.map((option, index) => {
          const show = answered && (option.ok || index === picked);
          const tone = !show ? "border-line" : option.ok ? "border-ink bg-ink text-surface" : "border-accent text-accent";
          return (
            <button
              key={`${index}-${option.ok}`}
              type="button"
              className={`rounded-2xl border px-3 py-3 text-left text-sm leading-relaxed ${tone}`}
              onClick={() => choose(index)}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {answered ? (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          出處：{fact.sourceLabel}。{fact.detail}
        </p>
      ) : null}
      <div className="mt-4 flex gap-2">
        <a
          href={fact.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-line text-sm"
        >
          官方連結
        </a>
        <button type="button" className="h-11 flex-1 rounded-full bg-ink text-sm font-medium text-surface" onClick={next}>
          下一題
        </button>
      </div>
    </section>
  );
}
