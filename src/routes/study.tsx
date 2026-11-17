import { createFileRoute } from "@tanstack/react-router";
import { SOURCES } from "@/components/tiulau/sources";
import { StudyPeek } from "@/components/tiulau/study-peek";
import { Shell } from "@/components/tiulau/shell";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [{ title: "測驗 · BuildThreads" }],
  }),
  component: StudyPage,
});

function StudyPage() {
  return (
    <Shell>
      <div className="px-4 py-4">
        <h1 className="text-2xl font-semibold">測驗</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          揀一句。答完先顯示出處。誤解帖的正確版本喺討論最底。
        </p>
        <div className="mt-4">
          <StudyPeek />
        </div>
        <section className="mt-6 rounded-2xl border border-line bg-surface p-4 xl:hidden">
          <h2 className="text-lg font-semibold">原文</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {SOURCES.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer" className="text-sm leading-snug hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          數字同條款用嚟溫習。屋宇署改完 PDF，以改完嗰版為準。
        </p>
      </div>
    </Shell>
  );
}
