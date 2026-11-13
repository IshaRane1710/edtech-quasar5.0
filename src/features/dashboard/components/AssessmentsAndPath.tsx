import { FileText, Calendar, ArrowUpRight, Route } from 'lucide-react';
import { ProgressBar, Badge, SectionHeader } from '@/components/ui';
import { mockAssessments } from '@/features/dashboard/data';
import { learningRecommendations } from '@/features/learning-path/data';

export function AssessmentsAndPath() {
  const activeRecommendations = learningRecommendations.filter((r) => !r.completed);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {/* Mock Assessments */}
      <div className="card">
        <SectionHeader title="Mock Assessments" subtitle="Placement simulation scores" icon={FileText} />
        <div className="space-y-3">
          {mockAssessments.map((mock) => (
            <div key={mock.id} className={`rounded-xl border p-3 ${mock.status === 'upcoming' ? 'border-plum-200 bg-plum-50/30' : 'border-ink-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${mock.status === 'upcoming' ? 'bg-plum-100 text-plum-600' : mock.score / mock.maxScore >= 0.7 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    R{mock.round}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-900">{mock.title}</p>
                    <p className="text-xs text-ink-500">{mock.date} · {mock.duration}</p>
                  </div>
                </div>
                {mock.status === 'completed' ? (
                  <span className={`text-sm font-bold ${mock.score / mock.maxScore >= 0.7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {mock.score}/{mock.maxScore}
                  </span>
                ) : (
                  <Badge variant="plum"><Calendar className="h-3 w-3" /> Upcoming</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path Preview */}
      <div className="card">
        <SectionHeader title="Recommended Learning Path" subtitle="AI-generated from your skill gaps" icon={Route} />
        <div className="space-y-3">
          {activeRecommendations.slice(0, 4).map((rec) => (
            <div key={rec.id} className="flex items-center gap-3 rounded-xl border border-ink-200 p-3 transition-colors hover:border-plum-200">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink-900">{rec.title}</span>
                  <Badge variant={rec.difficulty === 'advanced' ? 'error' : rec.difficulty === 'intermediate' ? 'warning' : 'success'}>
                    {rec.difficulty}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-ink-500">{rec.skill} · {rec.estimatedHours}h</p>
                <ProgressBar value={rec.progress} height="h-1" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-plum-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
