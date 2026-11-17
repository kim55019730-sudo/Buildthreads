import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PostCard } from "@/components/tiulau/post-card";
import { collectPosts } from "@/lib/regs/generate";
import { personaById } from "@/lib/regs/personas";
import { LEVELS, TOPICS } from "@/lib/regs/topics";
import type { Level } from "@/lib/regs/types";

export function Feed({
  topic,
  q,
  who,
  level,
  mis,
}: {
  topic?: string;
  q?: string;
  who?: string;
  level?: string;
  mis?: string;
}) {
  const [count, setCount] = useState(7);
  const sentinel = useRef<HTMLDivElement>(null);
  const topicOk = TOPICS.some((item) => item.id === topic) ? topic : "all";
  const levelOk = LEVELS.some((item) => item.id === level) ? (level as Level | "all") : "all";
  const misOnly = mis === "1";
  const person = who ? personaById(who) : undefined;
  const query = (q ?? "").trim().toLowerCase();

  const result = useMemo(
    () =>
      collectPosts(count, (post) => {
        if (topicOk !== "all" && post.fact.topic !== topicOk) return false;
        if (levelOk !== "all" && post.level !== levelOk) return false;
        if (misOnly && !post.misread) return false;
        if (who && post.author.id !== who) return false;
        if (query && !post.searchText.includes(query)) return false;
        return true;
      }),
    [count, topicOk, levelOk, misOnly, who, query],
  );

  useEffect(() => {
    setCount(7);
  }, [topicOk, levelOk, misOnly, who, query]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || result.exhausted) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setCount((c) => c + 6);
      },
      { rootMargin: "700px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [result.exhausted, result.posts.length, topicOk, levelOk, misOnly, who, query]);

  return (
    <div>
      <div className="border-b border-line px-4 py-4">
        <p className="text-2xl font-semibold leading-tight">BuildThreads</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          建築條例時間線。約三分一係誤解帖，留言會@人糾正。拉到底仍然有。
        </p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {LEVELS.map((item) => {
            const active = item.id === levelOk;
            return (
              <Link
                key={item.id}
                to="/"
                search={(prev) => ({ ...prev, level: item.id === "all" ? undefined : item.id })}
                className={`inline-flex h-10 shrink-0 items-center rounded-full px-3 text-sm ${
                  active ? "bg-ink text-surface" : "bg-surface text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/"
            search={(prev) => ({ ...prev, mis: misOnly ? undefined : "1" })}
            className={`inline-flex h-10 shrink-0 items-center rounded-full px-3 text-sm ${
              misOnly ? "bg-accent text-ink" : "bg-surface text-ink"
            }`}
          >
            誤解
          </Link>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {TOPICS.map((item) => {
            const active = (item.id === "all" && topicOk === "all") || item.id === topicOk;
            return (
              <Link
                key={item.id}
                to="/"
                search={(prev) => ({
                  ...prev,
                  topic: item.id === "all" ? undefined : item.id,
                })}
                className={`inline-flex h-10 shrink-0 items-center rounded-full px-3 text-sm ${
                  active ? "bg-ink text-surface" : "bg-surface text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        {person ? (
          <p className="mt-3 text-sm">
            只看 {person.name}
            <Link to="/" search={(prev) => ({ ...prev, who: undefined })} className="ml-2 text-accent">
              清除
            </Link>
          </p>
        ) : null}
        {query ? (
          <p className="mt-2 text-sm text-muted">
            搜尋「{q}」
            <Link to="/" search={(prev) => ({ ...prev, q: undefined })} className="ml-2 text-accent">
              清除
            </Link>
          </p>
        ) : null}
      </div>

      {result.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {result.posts.length === 0 ? (
        <p className="px-4 py-16 text-center text-sm leading-relaxed text-muted">
          呢個篩選暫時冇人嘈。試下「地積」「走火」「DMUA」或者全部。
        </p>
      ) : result.exhausted ? (
        <p className="px-4 py-8 text-center text-sm text-muted">呢組關鍵字暫時嘈完。換個詞，時間線仲長。</p>
      ) : (
        <div ref={sentinel} className="px-4 py-8 text-center text-sm text-muted">
          仲有人喺度嘈…
        </div>
      )}
    </div>
  );
}
