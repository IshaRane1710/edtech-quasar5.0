import { AppShell } from '@/components/layout/AppShell';
import { ExplainabilityPanel } from '@/features/analytics/components/ExplainabilityPanel';
import { FactorContributionChart } from '@/features/analytics/components/FactorContributionChart';
import { KeyStats } from '@/features/analytics/components/KeyStats';
import { PredictiveTrend } from '@/features/analytics/components/PredictiveTrend';
import { RiskAssessment } from '@/features/analytics/components/RiskAssessment';

export function AnalyticsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Stage 3: AI Scoring & Analytics</h1>
        <p className="text-sm text-ink-500">Predictive placement analytics with full explainability</p>
      </div>

      <KeyStats />

      <PredictiveTrend />

      <ExplainabilityPanel />

      <RiskAssessment />

      <FactorContributionChart />
    </AppShell>
  );
}
