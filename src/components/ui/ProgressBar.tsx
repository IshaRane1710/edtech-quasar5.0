interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, color, height = 'h-2', showLabel }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color ?? (pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500');
  return (
    <div className="w-full">
      <div className={`w-full overflow-hidden rounded-full bg-ink-200 ${height}`}>
        <div className={`${barColor} ${height} rounded-full transition-all duration-700 ease-out`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="mt-1 block text-xs text-ink-500">{Math.round(pct)}%</span>}
    </div>
  );
}
