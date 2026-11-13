import { type LucideIcon } from 'lucide-react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}

export function ScoreRing({ score, size = 120, strokeWidth = 10, label, sublabel, color }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const ringColor = color ?? (score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444');

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: ringColor }}>{score}</span>
          {label && <span className="text-[10px] font-medium text-ink-500">{label}</span>}
        </div>
      </div>
      {sublabel && <span className="text-xs text-ink-500">{sublabel}</span>}
    </div>
  );
}

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

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'plum';
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    neutral: 'bg-ink-100 text-ink-600 border border-ink-200',
    plum: 'bg-plum-50 text-plum-700 border border-plum-200',
  };
  return <span className={`badge ${variants[variant]}`}>{children}</span>;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, icon: Icon, action }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-plum-500 to-magenta-500 text-white">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-ink-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-ink-500">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, accent = 'plum' }: { label: string; value: string | number; icon: LucideIcon; accent?: string }) {
  const accents: Record<string, string> = {
    plum: 'from-plum-500 to-plum-700',
    magenta: 'from-magenta-500 to-magenta-700',
    pink: 'from-pink-500 to-pink-700',
    emerald: 'from-emerald-500 to-emerald-700',
    amber: 'from-amber-500 to-amber-700',
    sky: 'from-sky-500 to-sky-700',
  };
  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-ink-900">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accents[accent]} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
