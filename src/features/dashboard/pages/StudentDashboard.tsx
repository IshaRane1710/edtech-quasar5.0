import { AppShell } from '@/components/layout/AppShell';
import { AssessmentsAndPath } from '@/features/dashboard/components/AssessmentsAndPath';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { HeatmapAndReport } from '@/features/dashboard/components/HeatmapAndReport';
import { ScoreOverview } from '@/features/dashboard/components/ScoreOverview';
import { SkillsOverview } from '@/features/dashboard/components/SkillsOverview';
import { StatCardsRow } from '@/features/dashboard/components/StatCardsRow';
import { UpcomingSection } from '@/features/dashboard/components/UpcomingSection';

export function StudentDashboard() {
  return (
    <AppShell>
      <DashboardHeader />

      <StatCardsRow />

      <ScoreOverview />

      <SkillsOverview />

      <HeatmapAndReport />

      <AssessmentsAndPath />

      <UpcomingSection />
    </AppShell>
  );
}
