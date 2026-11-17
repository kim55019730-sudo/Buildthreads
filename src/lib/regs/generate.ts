import { FACTS } from "@/lib/regs/facts";
import { PERSONAS } from "@/lib/regs/personas";
import { levelOf } from "@/lib/regs/topics";
import type { Comment, Fact, Persona, Post } from "@/lib/regs/types";

function mix(n: number): number {
  return Math.imul(n + 1, 2654435761) >>> 0;
}

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pick<T>(rand: () => number, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length)]!;
}

const OPENERS = [
  "認真問。",
  "半夜溫書。",
  "地盤茶水間。",
  "考試前。",
  "補料到眼紅。",
  "唔好笑完唔答。",
  "我接受對罵。",
  "新人問，老手唔好裝睇唔到。",
  "宣告。",
  "呢單我栽過。",
  "有無人仲記得。",
  "交圖之前最後一次確認。",
];

function timeLabel(index: number): string {
  const minutes = 2 + index * 11 + (index % 7) * 3;
  if (minutes < 60) return `${minutes}分鐘`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小時`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days}日`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks}星期`;
  return `${Math.floor(days / 30)}個月`;
}

function likesFor(importance: Fact["importance"], rand: () => number): number {
  const band: Record<Fact["importance"], [number, number]> = {
    5: [1400, 22000],
    4: [320, 6400],
    3: [70, 980],
    2: [14, 160],
    1: [2, 28],
  };
  const [lo, hi] = band[importance];
  const skewed = Math.pow(rand(), 1.35);
  return Math.round(lo + skewed * (hi - lo));
}

function say(
  persona: Persona,
  kind: "wrong" | "anchor" | "panic" | "site" | "aside",
  fact: Fact,
  rand: () => number,
  at: string,
  trap: string,
): string {
  const bite = fact.point.split("。")[0] ?? fact.point;
  const to = `@${at}`;

  if (persona.voice === "tw") {
    if (kind === "wrong") return `${to} 等一下，我在台灣是記成「${trap}」。來香港之後開始懷疑人生。`;
    if (kind === "anchor") return `${to} 我重看了一次。你們香港的寫法是：${bite}。容積率這個詞我先收起來。`;
    if (kind === "panic") return `${to} 這也差太多。我把「${fact.title}」抄進筆記。`;
    return `${to} 真的假的。${fact.code} ${fact.ref} 這條我昨晚才第一次打開。`;
  }

  if (kind === "wrong") {
    return pick(rand, [
      `${to} 我一直記「${trap}」。做咗咁多年都冇人講我錯。`,
      `${to} ${trap}。你張卡如果唔係咁寫，我就當你溫錯書。`,
      `${to} 收皮之前聽我講：${trap}。地盤係咁做。`,
    ]);
  }
  if (kind === "anchor") {
    return pick(rand, [
      `${to} 唔好再教。${bite}。`,
      `${to} ${fact.code} ${fact.ref}。${bite}。交圖前對原文，唔好背我呢句。`,
      `${to} 錯嘅嗰句好大聲，啱嘅呢句先算：${bite}。`,
      `${to} 章號同數字分開記。${bite}。`,
    ]);
  }
  if (kind === "panic") {
    return pick(rand, [
      `${to} 即係我聽日如果寫「${bite}」，有冇人會話我簡化到錯？`,
      `${to} 我抄低咗「${fact.title}」。求你哋唔好凌晨先話我記反。`,
      `${to} 呢條再錯我就真係放棄背表。`,
    ]);
  }
  if (kind === "site") {
    return pick(rand, [
      `${to} 現場唔使演講。照呢句做：${bite}。`,
      `${to} 上次補料就係栽喺「${trap}」。`,
      `${to} 判頭可以嘈，條文唔可以嘈。${fact.code} 擺上台。`,
    ]);
  }
  return pick(rand, [
    `${to} 讚數高只代表大家都不熟。默返一次先好瞓。`,
    `${to} ${fact.code} 同日常口語中間，通常差一次補料。`,
    `${to} 我將「${fact.title}」釘咗喺茶水間。有人當係裝飾。`,
    `${to} 計唔計錢都好，答案仍然係 ${fact.code}，唔係我心情。`,
  ]);
}

function buildComments(fact: Fact, index: number, author: Persona, rand: () => number, trap: string): Comment[] {
  const pattern = index % 4;
  const pool = PERSONAS.filter((p) => p.id !== author.id);
  const take = () => {
    const i = Math.floor(rand() * pool.length);
    return pool.splice(i, 1)[0]!;
  };
  const plan: Array<"wrong" | "panic" | "anchor" | "site" | "aside"> =
    pattern === 0
      ? ["wrong", "panic", "anchor", "site"]
      : pattern === 1
        ? ["panic", "anchor", "aside"]
        : pattern === 2
          ? ["site", "wrong", "anchor"]
          : ["aside", "anchor", "panic", "site"];

  const count = 2 + (index % Math.max(2, fact.importance - 1));
  const kinds = plan.slice(0, Math.min(count, plan.length));
  if (!kinds.includes("anchor")) kinds.push("anchor");

  let replyTo = author;
  return kinds.map((kind, n) => {
    const persona = take();
    const anchors = kind === "anchor";
    const comment: Comment = {
      id: `${index}-${n}`,
      persona,
      text: say(persona, kind, fact, rand, replyTo.handle, trap),
      likes: anchors ? 40 + Math.floor(rand() * 900) : Math.floor(rand() * 180),
      anchors,
    };
    replyTo = persona;
    return comment;
  });
}

export function generatePost(index: number): Post {
  const fact = FACTS[mix(index) % FACTS.length]!;
  const rand = rng(mix(index) ^ 0x9e3779b9);
  const author = PERSONAS[Math.floor(rand() * PERSONAS.length)]!;
  const line = fact.lines[Math.floor(rand() * fact.lines.length)]!;
  const trap = fact.traps[Math.floor(rand() * fact.traps.length)] ?? fact.traps[0]!;
  const misread = index % 3 === 0;
  const opener = rand() > 0.28 ? `${pick(rand, OPENERS)}\n\n` : "";
  const body = misread
    ? `${opener}我而家係咁理解，你哋唔好即刻鬧：${trap}。\n\n出處我貼咗 ${fact.code} ${fact.ref}，但係我覺得實務唔係咁。`
    : `${opener}${line}${rand() > 0.62 ? "" : "\n\n下面張卡先算數。留言可以錯。"}`;
  const comments = buildComments(fact, index, author, rand, trap);
  const level = levelOf(fact);
  const searchText = [
    body,
    fact.title,
    fact.point,
    fact.detail,
    fact.code,
    fact.ref,
    fact.keywords,
    fact.traps.join(" "),
    level,
    misread ? "誤解" : "",
    author.name,
    author.handle,
    author.role,
    ...comments.map((c) => `${c.persona.name} ${c.text}`),
  ]
    .join("\n")
    .toLowerCase();

  return {
    id: String(index),
    index,
    fact,
    author,
    body,
    timeLabel: timeLabel(index),
    likes: likesFor(fact.importance, rand),
    comments,
    searchText,
    misread,
    level,
  };
}

export function collectPosts(
  count: number,
  pred: (post: Post) => boolean,
): { posts: Post[]; exhausted: boolean } {
  const posts: Post[] = [];
  let i = 0;
  const limit = Math.max(4000, count * 40);
  while (posts.length < count && i < limit) {
    const post = generatePost(i);
    if (pred(post)) posts.push(post);
    i += 1;
  }
  return { posts, exhausted: posts.length < count };
}
