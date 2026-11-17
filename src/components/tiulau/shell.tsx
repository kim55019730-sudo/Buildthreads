import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bookmark, BookOpen, Home, Search } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { StudyPeek } from "@/components/tiulau/study-peek";
import { SOURCES } from "@/components/tiulau/sources";
import { TOPICS } from "@/lib/regs/topics";

const NAV = [
  { to: "/", label: "時間線", icon: Home },
  { to: "/study", label: "測驗", icon: BookOpen },
  { to: "/saved", label: "已存", icon: Bookmark },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    void navigate({ to: "/", search: query ? { q: query } : {} });
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[14.5rem_minmax(0,1fr)] xl:grid-cols-[14.5rem_minmax(0,38rem)_20rem]">
        <aside className="sticky top-0 hidden h-screen flex-col gap-6 overflow-y-auto px-4 py-5 lg:flex">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-ink text-lg font-semibold text-surface">B</span>
            <span>
              <span className="block text-xl font-semibold leading-none">BuildThreads</span>
              <span className="text-xs text-muted">建築條例，拉唔完</span>
            </span>
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex h-11 items-center gap-3 rounded-full px-3 text-base ${
                    active ? "bg-ink text-surface" : "hover:bg-accent-soft"
                  }`}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div>
            <p className="px-3 text-xs font-semibold text-muted">條例</p>
            <div className="mt-2 flex flex-col">
              {TOPICS.map((topic) => (
                <Link
                  key={topic.id}
                  to="/"
                  search={topic.id === "all" ? {} : { topic: topic.id }}
                  className="flex h-10 items-center justify-between rounded-full px-3 text-sm hover:bg-accent-soft"
                >
                  <span>{topic.label}</span>
                  <span className="text-xs text-muted">{topic.hint}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 pb-24 lg:border-x lg:border-line lg:pb-10">
          <header className="sticky top-0 z-10 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between gap-3 lg:hidden">
              <Link to="/" className="text-lg font-semibold">
                BuildThreads
              </Link>
              <span className="text-xs text-muted">刷住溫 · 卡先算數</span>
            </div>
            <form onSubmit={onSearch} className="mt-3 flex gap-2 lg:mt-0">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">搜尋條例</span>
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="地積、走火、無障礙、123I"
                  className="h-11 w-full rounded-full border border-line bg-surface pr-3 pl-10 text-sm outline-none focus:border-ink"
                />
              </label>
              <button type="submit" className="h-11 shrink-0 rounded-full bg-ink px-4 text-sm font-medium text-surface">
                搜
              </button>
            </form>
          </header>
          {children}
        </div>

        <aside className="sticky top-0 hidden h-screen flex-col gap-4 overflow-y-auto px-4 py-5 xl:flex">
          <StudyPeek />
          <section className="rounded-2xl border border-line bg-surface p-4">
            <h2 className="text-lg font-semibold">原文</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {SOURCES.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="text-sm leading-snug hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <p className="text-xs leading-relaxed text-muted">
            帖同留言係隨機口吻，可以嘈、可以錯。重點卡先用來溫。交圖、考試、地盤決定之前，對屋宇署現行 PDF 同電子版法例。
          </p>
        </aside>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-3">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex h-14 flex-col items-center justify-center gap-0.5 text-xs ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
