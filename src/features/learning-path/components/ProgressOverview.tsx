import { BookOpen, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui';
import { learningRecommendations } from '@/features/learning-path/data';

export function ProgressOverview() {
  const inProgress = learningRecommendations.filter((r) => r.progress > 0 && !r.completed);
  const notStarted = learningRecommendations.filter((r) => r.progress === 0 && !r.completed);
  const completed = learningRecommendations.filter((r) => r.completed);
  const totalProgress = Math.round(learningRecommendations.reduce((sum, r) => sum + r.progress, 0) / learningRecommendations.length);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Overall Progress" value={totalProgress + '%'} icon={TrendingUp} accent="plum" />
      <StatCard label="In Progress" value={inProgress.length} icon={Clock} accent="amber" />
      <StatCard label="Not Started" value={notStarted.length} icon={BookOpen} accent="magenta" />
      <StatCard label="Completed" value={completed.length} icon={CheckCircle2} accent="emerald" />
    </div>
  );
}
