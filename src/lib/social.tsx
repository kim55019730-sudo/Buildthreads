import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const SAVE_TAGS = ["考試", "地盤", "要背", "誤解"] as const;

type Social = {
  ready: boolean;
  liked: (id: string) => boolean;
  saved: (id: string) => boolean;
  tag: (id: string) => string;
  toggleLike: (id: string) => void;
  save: (id: string, tag: string) => void;
  unsave: (id: string) => void;
  savedIds: string[];
};

const SocialContext = createContext<Social | null>(null);

function readMap(key: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, boolean>;
  } catch {
    return {};
  }
}

function readSaves(key: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const out: Record<string, string> = {};
    for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (value === true) out[id] = "";
      else if (typeof value === "string") out[id] = value;
    }
    return out;
  } catch {
    return {};
  }
}

export function SocialProvider({ children }: { children: ReactNode }) {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [saves, setSaves] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLikes(readMap("tiulau-likes"));
    setSaves(readSaves("tiulau-saves"));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("tiulau-likes", JSON.stringify(likes));
  }, [likes, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("tiulau-saves", JSON.stringify(saves));
  }, [saves, ready]);

  const value: Social = {
    ready,
    liked: (id) => Boolean(likes[id]),
    saved: (id) => saves[id] !== undefined,
    tag: (id) => saves[id] ?? "",
    toggleLike: (id) => setLikes((m) => ({ ...m, [id]: !m[id] })),
    save: (id, tag) => setSaves((m) => ({ ...m, [id]: tag })),
    unsave: (id) =>
      setSaves((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      }),
    savedIds: Object.keys(saves),
  };

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial(): Social {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error("SocialProvider missing");
  return ctx;
}
