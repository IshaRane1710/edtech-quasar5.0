import { CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui';
import { learningRecommendations } from '@/features/learning-path/data';

export function CompletedSection() {
  const completed = learningRecommendations.filter((r) => r.completed);

  return (
    <>
      {completed.length > 0 && (
        <div className="mt-6">
          <SectionHeader title="Completed" subtitle="Activities you've finished" icon={CheckCircle2} />
          <div className="grid gap-4 md:grid-cols-2">
            {completed.map((rec) => (
              <div key={rec.id} className="card flex items-center gap-3 border-emerald-200">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <div>
                  <p className="text-sm font-bold text-ink-900">{rec.title}</p>
                  <p className="text-xs text-emerald-600">Completed · {rec.skill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
