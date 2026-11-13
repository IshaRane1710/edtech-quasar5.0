import { LucideIcon } from 'lucide-react';

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
