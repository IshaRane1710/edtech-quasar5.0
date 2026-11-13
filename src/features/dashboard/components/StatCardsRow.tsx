import { TrendingUp, Award, Target, FileText } from 'lucide-react';
import { StatCard } from '@/components/ui';
import {
  employabilityScore,
  placementReadiness,
  verifiedSkills,
  mockAssessments,
} from '@/features/dashboard/data';

export function StatCardsRow() {
  const verifiedCount = verifiedSkills.filter((s) => s.verified).length;
  const completedMocks = mockAssessments.filter((m) => m.status === 'completed');

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Employability Score" value={employabilityScore} icon={TrendingUp} accent="plum" />
      <StatCard label="Verified Skills" value={`${verifiedCount}/${verifiedSkills.length}`} icon={Award} accent="magenta" />
      <StatCard label="Placement Readiness" value={placementReadiness.percentage + '%'} icon={Target} accent="pink" />
      <StatCard label="Mock Assessments" value={completedMocks.length} icon={FileText} accent="emerald" />
    </div>
  );
}
