import { iconMap } from '@/features/landing/constants';
import { howItWorks } from '@/features/landing/data';

export function HowItWorksSection() {
  return (
    <section id="how" className="bg-gradient-to-b from-plum-50/30 to-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold text-plum-600">PROCESS</span>
          <h2 className="mt-2 text-3xl font-bold text-ink-900 lg:text-4xl">How It Works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-500">Four connected stages that take students from raw data to placement readiness.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.stage} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="absolute left-full top-12 hidden h-px w-full bg-gradient-to-r from-plum-300 to-transparent lg:block" />
                )}
                <div className="card card-hover h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-plum-200">{step.stage}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-plum-500 to-magenta-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
