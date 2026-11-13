/** Tailwind classes for a 0–100 skill score cell in heatmaps. */
export function heatColor(score: number): string {
  if (score >= 75) return 'bg-emerald-500 text-white';
  if (score >= 60) return 'bg-emerald-300 text-emerald-900';
  if (score >= 45) return 'bg-amber-300 text-amber-900';
  if (score >= 30) return 'bg-rose-300 text-rose-900';
  return 'bg-rose-500 text-white';
}
