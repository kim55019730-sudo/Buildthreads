export function formatCount(n: number): string {
  const value = Math.max(0, Math.round(n));
  if (value < 10000) return value.toLocaleString("zh-HK");
  const wan = value / 10000;
  const text = wan >= 10 ? String(Math.round(wan)) : wan.toFixed(1).replace(/\.0$/, "");
  return `${text}萬`;
}
