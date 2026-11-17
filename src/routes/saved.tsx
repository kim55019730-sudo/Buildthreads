import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PostCard } from "@/components/tiulau/post-card";
import { Shell } from "@/components/tiulau/shell";
import { generatePost } from "@/lib/regs/generate";
import { SAVE_TAGS, useSocial } from "@/lib/social";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [{ title: "已存 · BuildThreads" }],
  }),
  component: SavedPage,
});

function SavedPage() {
  const social = useSocial();
  const [tag, setTag] = useState<string>("全部");
  const ids = social.savedIds
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id >= 0 && (tag === "全部" || social.tag(String(id)) === tag))
    .sort((a, b) => a - b);

  return (
    <Shell>
      <div className="border-b border-line px-4 py-4">
        <h1 className="text-2xl font-semibold">已存</h1>
        <p className="mt-1 text-sm text-muted">標籤只留喺呢部機。</p>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {["全部", ...SAVE_TAGS].map((item) => (
            <button
              key={item}
              type="button"
              className={`h-10 shrink-0 rounded-full px-3 text-sm ${tag === item ? "bg-ink text-surface" : "bg-surface"}`}
              onClick={() => setTag(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {!social.ready ? (
        <p className="px-4 py-8 text-sm text-muted">讀緊你存低嘅帖…</p>
      ) : ids.length === 0 ? (
        <p className="px-4 py-12 text-sm leading-relaxed text-muted">呢個標籤未有帖。存低時揀考試、地盤、要背或者誤解。</p>
      ) : (
        ids.map((id) => <PostCard key={id} post={generatePost(id)} />)
      )}
    </Shell>
  );
}
