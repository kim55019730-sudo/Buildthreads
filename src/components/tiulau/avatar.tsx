import type { Persona } from "@/lib/regs/types";

export function Avatar({ persona, size = "md" }: { persona: Persona; size?: "md" | "sm" }) {
  const accent = persona.id.charCodeAt(0) % 2 === 0;
  const box = size === "sm" ? "size-8 text-xs" : "size-11 text-base";
  return (
    <span
      className={`${box} grid shrink-0 place-items-center rounded-full font-semibold ${
        accent ? "bg-accent text-ink" : "bg-ink text-surface"
      }`}
      aria-hidden
    >
      {persona.name.slice(0, 1)}
    </span>
  );
}
