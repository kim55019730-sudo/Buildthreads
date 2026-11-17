import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Feed } from "@/components/tiulau/feed";
import { Shell } from "@/components/tiulau/shell";

const searchSchema = z.object({
  topic: z.string().optional(),
  q: z.string().optional(),
  who: z.string().optional(),
  level: z.string().optional(),
  mis: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: (search) => {
    const parsed = searchSchema.safeParse(search);
    return parsed.success ? parsed.data : {};
  },
  head: () => ({
    meta: [{ title: "BuildThreads · 建築條例" }],
  }),
  component: Home,
});

function Home() {
  const { topic, q, who, level, mis } = Route.useSearch();
  return (
    <Shell>
      <Feed topic={topic} q={q} who={who} level={level} mis={mis} />
    </Shell>
  );
}
