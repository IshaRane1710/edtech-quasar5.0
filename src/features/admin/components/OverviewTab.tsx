import {
  Users,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { SectionHeader, Badge, StatCard } from '@/components/ui';
import {
  departmentAnalytics,
  placementReadinessDistribution,
  skillHeatmapData,
  interventionStudents,
} from '@/features/admin/data';
import type { AdminTab } from '@/features/admin/types';
import { getCohortStats } from '@/features/admin/utils';
import { heatColor } from '@/lib/heatmap';

export function OverviewTab({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  const { totalStudents, avgScore, atRisk, highReadiness } = getCohortStats();
  const heatmapSkills = Object.keys(skillHeatmapData[0]?.scores ?? {});

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={totalStudents} icon={Users} accent="plum" />
        <StatCard label="Avg Employability" value={avgScore} icon={TrendingUp} accent="magenta" />
        <StatCard label="High Readiness" value={highReadiness} icon={CheckCircle2} accent="emerald" />
        <StatCard label="Need Intervention" value={atRisk} icon={AlertTriangle} accent="amber" />
      </div>

      {/* Placement readiness distribution + Department analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <SectionHeader title="Placement Readiness Distribution" icon={BarChart3} />
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={placementReadinessDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {placementReadinessDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <SectionHeader title="Department-wise Analytics" icon={Building2} />
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentAnalytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="students" fill="#9333ea" radius={[8, 8, 0, 0]} name="Total Students" />
              <Bar dataKey="placed" fill="#10b981" radius={[8, 8, 0, 0]} name="Placed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cohort skill heatmap */}
      <div className="card">
        <SectionHeader title="Cohort Skill Heatmap" subtitle="Skill distribution across students — spot cohort-wide gaps" icon={Layers} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200">
                <th className="pb-2 pr-3 text-left text-xs font-semibold text-ink-500">Student</th>
                {heatmapSkills.map((skill) => (
                  <th key={skill} className="pb-2 px-1 text-center text-xs font-semibold text-ink-500">{skill}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillHeatmapData.map((row) => (
                <tr key={row.student} className="border-b border-ink-100 last:border-0">
                  <td className="py-2 pr-3 text-xs font-medium text-ink-700">{row.student}</td>
                  {heatmapSkills.map((skill) => {
                    const score = row.scores[skill] ?? 0;
                    return (
                      <td key={skill} className="px-1 py-2 text-center">
                        <span className={`inline-flex h-8 w-10 items-center justify-center rounded-md text-xs font-bold ${heatColor(score)}`}>
                          {score}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs text-ink-500">
          <span>Legend:</span>
          <span className="inline-flex h-4 w-8 rounded bg-emerald-500" /> 75+
          <span className="inline-flex h-4 w-8 rounded bg-emerald-300" /> 60-74
          <span className="inline-flex h-4 w-8 rounded bg-amber-300" /> 45-59
          <span className="inline-flex h-4 w-8 rounded bg-rose-300" /> 30-44
          <span className="inline-flex h-4 w-8 rounded bg-rose-500" /> &lt;30
        </div>
      </div>

      {/* Quick intervention preview */}
      <div className="card">
        <SectionHeader title="Students Requiring Intervention" subtitle="Auto-flagged by AI based on low scores or stagnant progress" icon={AlertTriangle} action={<button onClick={() => onNavigate('interventions')} className="btn-ghost text-xs">View All</button>} />
        <div className="space-y-2">
          {interventionStudents.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50/30 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-900">{s.name}</p>
                  <p className="text-xs text-ink-500">{s.department} · Score: {s.score}</p>
                </div>
              </div>
              <Badge variant="error">At Risk</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
