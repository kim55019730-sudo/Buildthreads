import { Link } from "@tanstack/react-router";
import { Bookmark, Check, Copy, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/tiulau/avatar";
import { FactCard, SourceRow } from "@/components/tiulau/fact-card";
import { formatCount } from "@/lib/regs/format";
import { levelLabel, topicLabel } from "@/lib/regs/topics";
import type { Post } from "@/lib/regs/types";
import { SAVE_TAGS, useSocial } from "@/lib/social";

export function PostCard({ post, preview = true }: { post: Post; preview?: boolean }) {
  const social = useSocial();
  const [copied, setCopied] = useState(false);
  const [picking, setPicking] = useState(false);
  const liked = social.liked(post.id);
  const saved = social.saved(post.id);
  const tag = social.tag(post.id);
  const peek = preview ? post.comments.find((comment) => comment.anchors) ?? post.comments[0] : undefined;

  async function copyPoint() {
    const text = `${post.fact.code} ${post.fact.ref}\n${post.fact.title}\n${post.fact.point}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="feed-card border-b border-line px-4 py-4">
      <header className="flex gap-3">
        <Link to="/" search={(prev) => ({ ...prev, who: post.author.id })} aria-label={`${post.author.name}的帖`}>
          <Avatar persona={post.author} />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
            <Link to="/" search={(prev) => ({ ...prev, who: post.author.id })} className="font-semibold">
              {post.author.name}
            </Link>
            <span className="text-sm text-muted">@{post.author.handle}</span>
            <span className="text-sm text-muted">· {post.timeLabel}</span>
          </div>
          <p className="text-xs text-muted">
            {post.author.role}
            <span className="px-1">·</span>
            {topicLabel(post.fact.topic)}
            <span className="px-1">·</span>
            {levelLabel(post.level)}
            {post.fact.importance >= 5 ? <span className="text-accent"> · 高頻</span> : null}
            {post.misread ? <span className="text-accent"> · 誤解</span> : null}
          </p>
        </div>
      </header>

      <Link to="/p/$id" params={{ id: post.id }} className="mt-3 block whitespace-pre-wrap text-base leading-relaxed">
        {post.body}
      </Link>

      <div className="mt-3">{post.misread ? <SourceRow fact={post.fact} /> : <FactCard fact={post.fact} expanded={!preview} />}</div>

      {peek ? (
        <Link to="/p/$id" params={{ id: post.id }} className="mt-3 block rounded-2xl border border-line bg-surface px-3 py-2">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            <span className="font-medium text-ink">{peek.persona.name}</span>
            {"  "}
            {peek.text}
          </p>
        </Link>
      ) : null}

      <div className="mt-1 flex items-center gap-1">
        <Link
          to="/p/$id"
          params={{ id: post.id }}
          className="inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm text-muted hover:bg-accent-soft hover:text-ink"
          aria-label={`${post.comments.length}則留言`}
        >
          <MessageCircle className="size-5" />
          <span className="tabular-nums">{formatCount(post.comments.length)}</span>
        </Link>
        <button
          type="button"
          className={`inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm hover:bg-accent-soft ${
            liked ? "text-accent" : "text-muted"
          }`}
          aria-pressed={liked}
          onClick={() => social.toggleLike(post.id)}
        >
          <Heart className={`size-5 ${liked ? "fill-current" : ""}`} />
          <span className="tabular-nums">{formatCount(post.likes + (liked ? 1 : 0))}</span>
        </button>
        <button
          type="button"
          className={`inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm hover:bg-accent-soft ${
            saved ? "text-ink" : "text-muted"
          }`}
          aria-pressed={saved}
          onClick={() => {
            if (saved) {
              social.unsave(post.id);
              setPicking(false);
            } else {
              setPicking((open) => !open);
            }
          }}
        >
          <Bookmark className={`size-5 ${saved ? "fill-current" : ""}`} />
          <span>{saved ? tag || "已存" : "存低"}</span>
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1 rounded-full px-2 text-sm text-muted hover:bg-accent-soft hover:text-ink"
          onClick={copyPoint}
        >
          {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
          <span>{copied ? "已抄" : "抄重點"}</span>
        </button>
      </div>
      {picking ? (
        <div className="flex flex-wrap gap-2 px-1 pb-2">
          {SAVE_TAGS.map((item) => (
            <button
              key={item}
              type="button"
              className="h-10 rounded-full bg-surface px-3 text-sm"
              onClick={() => {
                social.save(post.id, item);
                setPicking(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </article>
  );
}
