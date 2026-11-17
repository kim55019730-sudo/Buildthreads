import { SRC } from "@/lib/regs/sources";

export const SOURCES = [
  { label: "建築物條例 Cap. 123", href: SRC.bo },
  { label: "規劃規例 Cap. 123F", href: SRC.bpr },
  { label: "建造規例 Cap. 123B", href: SRC.bcr },
  { label: "衛生及排水 Cap. 123I", href: SRC.sani },
  { label: "消防安全守則 2011", href: SRC.fs },
  { label: "暢通無阻通道 2008", href: SRC.bfa },
  { label: "通用無障礙 DMUA 2026", href: SRC.dmua },
  { label: "PNAP 索引", href: SRC.pnap },
  { label: "APP-152 可持續設計", href: SRC.app152 },
  { label: "APP-176 DMUA", href: SRC.app176 },
] as const;
