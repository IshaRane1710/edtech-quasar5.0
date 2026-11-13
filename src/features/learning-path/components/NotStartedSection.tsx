import { ArrowRight, Target } from 'lucide-react';
import { SectionHeader, Badge } from '@/components/ui';
import { typeIcons, typeColors } from '@/features/learning-path/constants';
import { learningRecommendations } from '@/features/learning-path/data';

export function NotStartedSection() {
  const notStarted = learningRecommendations.filter((r) => r.progress === 0 && !r.completed);

  return (
    <>
      {notStarted.length > 0 && (
        <div className="mt-6">
          <SectionHeader title="Recommended Next" subtitle="Start these to close your skill gaps" icon={Target} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notStarted.map((rec) => {
              const Icon = typeIcons[rec.type];
              return (
                <div key={rec.id} className="card card-hover">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${typeColors[rec.type]} text-white shadow-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant={rec.difficulty === 'advanced' ? 'error' : rec.difficulty === 'intermediate' ? 'warning' : 'success'}>
                      {rec.difficulty}
                    </Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-ink-900">{rec.title}</h3>
                  <p className="text-xs text-ink-500">{rec.skill} · {rec.estimatedHours}h estimated</p>
                  <p className="mt-2 text-xs text-ink-600">{rec.description}</p>
                  <button className="mt-4 btn-secondary w-full text-xs">
                    Start Now <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
