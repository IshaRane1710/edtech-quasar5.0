import { AlertTriangle, ShieldCheck, Brain, Eye } from 'lucide-react';
import { SectionHeader, Badge } from '@/components/ui';
import { interventionStudents } from '@/features/admin/data';

export function InterventionsTab() {
  return (
    <div className="space-y-6">
      {/* AI override panel */}
      <div className="card">
        <SectionHeader title="Human Override for AI Decisions" subtitle="Review and override AI-generated placement readiness scores" icon={ShieldCheck} />
        <div className="rounded-xl border border-plum-100 bg-gradient-to-br from-plum-50/50 to-magenta-50/30 p-4">
          <div className="flex items-start gap-3">
            <Brain className="mt-0.5 h-5 w-5 text-plum-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">AI Override Policy</p>
              <p className="mt-1 text-xs text-ink-600">Administrators can override any AI-generated score. Overrides are logged with the admin's name, timestamp, and reason. All overrides are reviewed monthly for fairness audit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Intervention students */}
      <div className="card">
        <SectionHeader title="Students Requiring Intervention" subtitle="AI-flagged based on low employability, skill gaps, or stagnant progress" icon={AlertTriangle} />
        <div className="space-y-4">
          {interventionStudents.map((s) => (
            <div key={s.id} className="rounded-xl border border-rose-200 bg-rose-50/20 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-lg font-bold text-rose-600">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-900">{s.name}</h3>
                    <p className="text-xs text-ink-500">{s.department} · Employability Score: {s.score}</p>
                  </div>
                </div>
                <Badge variant="error"><AlertTriangle className="h-3 w-3" /> At Risk</Badge>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-rose-50/50 p-3">
                  <p className="text-xs font-semibold text-rose-700">Skill Gaps</p>
                  <p className="mt-1 text-xs text-ink-600">{s.gap}</p>
                </div>
                <div className="rounded-lg bg-plum-50/50 p-3">
                  <p className="text-xs font-semibold text-plum-700">AI Recommendation</p>
                  <p className="mt-1 text-xs text-ink-600">{s.recommendation}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary text-xs">Assign Learning Path</button>
                <button className="btn-secondary text-xs">Override Score</button>
                <button className="btn-ghost text-xs">Schedule Meeting</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Override log */}
      <div className="card">
        <SectionHeader title="Override Audit Log" subtitle="Recent AI score overrides by administrators" icon={Eye} />
        <div className="space-y-2">
          {[
            { admin: 'Dr. Priya Nair', student: 'Rohan Verma', action: 'Score adjusted 42 → 48', reason: 'Improved project evidence not yet reflected in GitHub sync', date: '2026-11-10' },
            { admin: 'Prof. Rajesh Kumar', student: 'Karthik Iyer', action: 'Intervention assigned', reason: 'Student showing engagement in remedial sessions', date: '2026-11-08' },
            { admin: 'Dr. Priya Nair', student: 'Arnav Joshi', action: 'Readiness updated to Medium', reason: 'Completed 2 certificates since last AI evaluation', date: '2026-11-05' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-ink-200 p-3">
              <div>
                <p className="text-sm font-medium text-ink-900">{log.action}</p>
                <p className="text-xs text-ink-500">{log.student} · by {log.admin}</p>
                <p className="mt-1 text-xs text-ink-400">{log.reason}</p>
              </div>
              <span className="text-xs text-ink-400">{log.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
