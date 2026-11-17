import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/tiulau/avatar";
import { FactCard } from "@/components/tiulau/fact-card";
import { PostCard } from "@/components/tiulau/post-card";
import { Shell } from "@/components/tiulau/shell";
import { formatCount } from "@/lib/regs/format";
import { generatePost } from "@/lib/regs/generate";

export const Route = createFileRoute("/p/$id")({
  head: () => ({
    meta: [{ title: "討論 · BuildThreads" }],
  }),
  component: ThreadPage,
});

function ThreadPage() {
  const { id } = Route.useParams();
  const index = Number(id);
  const valid = Number.isInteger(index) && index >= 0 && index < 500000;

  return (
    <Shell>
      <div className="px-4 py-2">
        <Link to="/" className="inline-flex h-11 items-center gap-2 text-sm font-medium">
          <ArrowLeft className="size-4" />
          返回時間線
        </Link>
      </div>
      {valid ? <Thread index={index} /> : <p className="px-4 py-8 text-sm text-muted">搵唔到呢條討論。</p>}
    </Shell>
  );
}

function Thread({ index }: { index: number }) {
  const post = generatePost(index);
  return (
    <>
      <PostCard post={post} preview={false} />
      <ol>
        {post.comments.map((comment) => (
          <li key={comment.id} className="flex gap-3 border-b border-line px-4 py-4">
            <Avatar persona={comment.persona} size="sm" />
            <div className="min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{comment.persona.name}</span>
                <span className="text-muted"> @{comment.persona.handle}</span>
                <span className="text-muted"> · {comment.persona.role}</span>
                {comment.anchors ? <span className="text-accent"> · 條文</span> : null}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{comment.text}</p>
              <p className="mt-2 text-xs text-muted tabular-nums">{formatCount(comment.likes)} 讚</p>
            </div>
          </li>
        ))}
      </ol>
      {post.misread ? (
        <div className="px-4 py-4">
          <p className="mb-2 text-sm font-medium">正確理解</p>
          <FactCard fact={post.fact} expanded />
        </div>
      ) : null}
      <p className="px-4 py-6 text-xs leading-relaxed text-muted">
        留言可以錯、可以嘈。標咗「條文」嘅先係跟重點卡。交圖前對原文。
      </p>
    </>
  );
}
