import { ShieldCheck, Info, Eye, Layers } from 'lucide-react';
import { SectionHeader, Badge, ScoreRing } from '@/components/ui';
import { explainabilityFactors } from '@/features/analytics/data';
import { employabilityScore } from '@/features/dashboard/data';

export function ExplainabilityPanel() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      {/* Score breakdown */}
      <div className="card flex flex-col items-center">
        <SectionHeader title="Score Breakdown" subtitle="How your 74 was calculated" icon={Eye} />
        <ScoreRing score={employabilityScore} size={120} label="/ 100" />
        <div className="mt-4 w-full space-y-2">
          {explainabilityFactors.map((factor) => (
            <div key={factor.factor}>
              <div className="flex justify-between text-xs">
                <span className="text-ink-600">{factor.factor.split('(')[0].trim()}</span>
                <span className="font-bold text-plum-600">+{factor.contribution}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink-200">
                <div className="h-2 rounded-full bg-gradient-to-r from-plum-500 to-magenta-500 transition-all duration-700" style={{ width: `${(factor.contribution / 74) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Factor details */}
      <div className="card lg:col-span-2">
        <SectionHeader
          title="Explainability & Trust Layer"
          subtitle="Every factor that contributed to your score — with evidence"
          icon={ShieldCheck}
        />
        <div className="space-y-3">
          {explainabilityFactors.map((factor) => (
            <div key={factor.factor} className="rounded-xl border border-ink-200 p-4 transition-colors hover:border-plum-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-plum-50 text-plum-600">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{factor.factor}</p>
                    <p className="mt-0.5 text-xs text-ink-500">{factor.description}</p>
                  </div>
                </div>
                <Badge variant="plum">+{factor.contribution} pts</Badge>
              </div>
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-ink-50 p-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
                <p className="text-xs text-ink-600"><strong>Evidence:</strong> {factor.evidence}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
