import type { Fact, Level, TopicId } from "@/lib/regs/types";

export const LEVELS: { id: Level | "all"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "intro", label: "入門" },
  { id: "advanced", label: "進階" },
  { id: "site", label: "現場" },
];

const SITE_IDS = new Set([
  "tiles",
  "hoarding",
  "demo",
  "drain",
  "minor-works",
  "tcp",
  "rebar",
  "mbis",
  "gas-heater",
  "fs-management",
  "spalling",
  "tanking",
  "site-audit",
  "ironmongery",
  "mw-class",
]);

export function levelOf(fact: Fact): Level {
  if (SITE_IDS.has(fact.id)) return "site";
  if (fact.importance >= 4) return "advanced";
  return "intro";
}

export function levelLabel(level: Level): string {
  return LEVELS.find((item) => item.id === level)?.label ?? level;
}

export const TOPICS: { id: TopicId | "all"; label: string; hint: string }[] = [
  { id: "all", label: "全部", hint: "睇唔完" },
  { id: "planning", label: "規劃", hint: "地積 · 上蓋 · 採光" },
  { id: "fire", label: "消防", hint: "走火 · 隔火 · EVA" },
  { id: "access", label: "無障礙", hint: "BFA · DMUA" },
  { id: "pnap", label: "PNAP", hint: "APP · ADM · ADV" },
  { id: "construct", label: "建造", hint: "Cap. 123B" },
  { id: "sanitary", label: "衛生", hint: "Cap. 123I" },
  { id: "works", label: "小型工程", hint: "三級管制" },
  { id: "process", label: "交圖", hint: "批准 · OP" },
  { id: "structure", label: "結構", hint: "風 · 基礎 · 活載" },
];

export function topicLabel(id: TopicId): string {
  return TOPICS.find((t) => t.id === id)?.label ?? id;
}
