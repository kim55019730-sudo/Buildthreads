import type { Fact } from "@/lib/regs/types";

export function SourceRow({ fact }: { fact: Fact }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-accent">{fact.code}</p>
        <p className="truncate text-sm">{fact.ref}</p>
      </div>
      <a
        href={fact.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 text-sm font-medium underline-offset-2 hover:underline"
      >
        官方
      </a>
    </div>
  );
}

export function FactCard({ fact, expanded = false }: { fact: Fact; expanded?: boolean }) {
  return (
    <aside className="rounded-2xl border border-line bg-surface px-3 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-semibold text-accent">{fact.code}</p>
        <p className="truncate text-xs text-muted">{fact.ref}</p>
      </div>
      <h3 className="mt-1 text-lg font-semibold leading-snug">{fact.title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{fact.point}</p>
      {expanded ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">{fact.detail}</p>
      ) : (
        <details className="group mt-2">
          <summary className="inline-flex min-h-11 items-center text-sm font-medium">展開依據</summary>
          <p className="pb-1 text-sm leading-relaxed text-muted">{fact.detail}</p>
        </details>
      )}
      <div className="mt-2 flex items-center justify-between gap-3">
        <a
          href={fact.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium underline-offset-2 hover:underline"
        >
          {fact.sourceLabel}
        </a>
        <span className="text-xs text-muted">卡先算數</span>
      </div>
    </aside>
  );
}
