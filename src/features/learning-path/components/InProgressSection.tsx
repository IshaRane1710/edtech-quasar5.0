import { Clock, ArrowRight } from 'lucide-react';
import { SectionHeader, Badge, ProgressBar } from '@/components/ui';
import { typeIcons, typeColors } from '@/features/learning-path/constants';
import { learningRecommendations } from '@/features/learning-path/data';

export function InProgressSection() {
  const inProgress = learningRecommendations.filter((r) => r.progress > 0 && !r.completed);

  return (
    <>
      {inProgress.length > 0 && (
        <div className="mt-6">
          <SectionHeader title="In Progress" subtitle="Continue where you left off" icon={Clock} />
          <div className="grid gap-4 md:grid-cols-2">
            {inProgress.map((rec) => {
              const Icon = typeIcons[rec.type];
              return (
                <div key={rec.id} className="card card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${typeColors[rec.type]} text-white shadow-lg`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-ink-900">{rec.title}</h3>
                        <p className="text-xs text-ink-500">{rec.skill} · {rec.estimatedHours}h</p>
                      </div>
                    </div>
                    <Badge variant={rec.difficulty === 'advanced' ? 'error' : rec.difficulty === 'intermediate' ? 'warning' : 'success'}>
                      {rec.difficulty}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-ink-600">{rec.description}</p>
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-ink-500">Progress</span>
                      <span className="font-semibold text-plum-600">{rec.progress}%</span>
                    </div>
                    <ProgressBar value={rec.progress} />
                  </div>
                  <button className="mt-4 btn-primary w-full text-xs">
                    Continue Learning <ArrowRight className="h-3.5 w-3.5" />
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
