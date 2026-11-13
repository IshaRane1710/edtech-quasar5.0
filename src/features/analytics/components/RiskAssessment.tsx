import { Brain, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui';

export function RiskAssessment() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="card">
        <SectionHeader title="Risk Assessment" subtitle="AI-identified placement risk factors" icon={AlertTriangle} />
        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-800">Low Overall Risk</span>
            </div>
            <p className="mt-2 text-xs text-emerald-700">Your consistent learning trajectory and verified skills indicate a low risk of not meeting placement requirements. Continue current pace.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-semibold text-amber-800">Medium Risk: System Design Gap</span>
            </div>
            <p className="mt-2 text-xs text-amber-700">System Design score (45%) is below the 60% threshold for top product companies. This is a targeted gap that can be closed with focused study.</p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              <span className="text-sm font-semibold text-rose-800">High Risk: Cloud Skills Absent</span>
            </div>
            <p className="mt-2 text-xs text-rose-700">No verified cloud skills (38%, unverified). Cloud & DevOps is a hard requirement for 60% of open roles. Immediate action recommended.</p>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="card">
        <SectionHeader title="Strengths & Weaknesses" subtitle="AI-identified based on all evidence" icon={Brain} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-emerald-600">Strengths</h4>
            <div className="space-y-2">
              {[
                { skill: 'DSA', score: 82, note: 'Top 15% of cohort' },
                { skill: 'React & Frontend', score: 78, note: '8 verified projects' },
                { skill: 'Communication', score: 72, note: 'Above average in interviews' },
                { skill: 'Learning Velocity', score: 85, note: '+26 pts in 6 months' },
              ].map((s) => (
                <div key={s.skill} className="rounded-lg border border-emerald-200 bg-emerald-50/30 p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-ink-700">{s.skill}</span>
                    <span className="text-xs font-bold text-emerald-600">{s.score}%</span>
                  </div>
                  <p className="text-xs text-ink-400">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-rose-600">Weaknesses</h4>
            <div className="space-y-2">
              {[
                { skill: 'Cloud & DevOps', score: 38, note: 'No evidence submitted' },
                { skill: 'System Design', score: 45, note: 'Below product company bar' },
                { skill: 'Aptitude', score: 58, note: 'Below finance firm threshold' },
                { skill: 'Certificate Coverage', score: 40, note: 'Only 3 valid certs' },
              ].map((s) => (
                <div key={s.skill} className="rounded-lg border border-rose-200 bg-rose-50/30 p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-ink-700">{s.skill}</span>
                    <span className="text-xs font-bold text-rose-600">{s.score}%</span>
                  </div>
                  <p className="text-xs text-ink-400">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
