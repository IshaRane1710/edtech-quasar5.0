import { iconMap } from '@/features/landing/constants';
import { landingFeatures } from '@/features/landing/data';

export function FeaturesSection() {
  return (
    <section id="features" className="section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold text-plum-600">FEATURES</span>
          <h2 className="mt-2 text-3xl font-bold text-ink-900 lg:text-4xl">Everything you need for placement success</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-500">From evidence-based skill verification to AI-powered placement predictions — SkillForge covers the entire employability journey.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {landingFeatures.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <div key={f.title} className="card card-hover group">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
