import { AppShell } from '@/components/layout/AppShell';
import { AiSummary } from '@/features/learning-path/components/AiSummary';
import { CompletedSection } from '@/features/learning-path/components/CompletedSection';
import { InProgressSection } from '@/features/learning-path/components/InProgressSection';
import { NotStartedSection } from '@/features/learning-path/components/NotStartedSection';
import { ProgressOverview } from '@/features/learning-path/components/ProgressOverview';
import { SkillGapMapping } from '@/features/learning-path/components/SkillGapMapping';

export function LearningPathPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">AI-Powered Learning Path</h1>
        <p className="text-sm text-ink-500">Personalized recommendations based on your verified skill gaps</p>
      </div>

      <ProgressOverview />

      <AiSummary />

      <InProgressSection />

      <NotStartedSection />

      <CompletedSection />

      <SkillGapMapping />
    </AppShell>
  );
}
