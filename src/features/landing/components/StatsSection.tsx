import { iconMap } from '@/features/landing/constants';
import { stats } from '@/features/landing/data';

export function StatsSection() {
  return (
    <section className="border-y border-ink-200 bg-ink-50/50 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => {
          const Icon = iconMap[s.icon];
          return (
            <div key={s.label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-plum-500 to-magenta-500 text-white shadow-lg shadow-plum-500/20">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-ink-900">{s.value}</p>
                <p className="text-sm text-ink-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
