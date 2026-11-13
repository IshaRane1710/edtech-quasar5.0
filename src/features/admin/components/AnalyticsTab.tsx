import { Building2, Scale, CheckCircle2, Layers } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import { SectionHeader, Badge, ProgressBar } from '@/components/ui';
import { departmentAnalytics, companySkillGaps, fairnessMetrics } from '@/features/admin/data';

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Company skill gap */}
      <div className="card">
        <SectionHeader title="Company Skill Gap Analysis" subtitle="Demand vs supply for skills that top recruiters need" icon={Building2} />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companySkillGaps} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis type="category" dataKey="company" tick={{ fontSize: 11 }} stroke="#94a3b8" width={90} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="demand" fill="#9333ea" radius={[0, 8, 8, 0]} name="Industry Demand" />
            <Bar dataKey="supply" fill="#e2e8f0" radius={[0, 8, 8, 0]} name="Student Supply" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department comparison radar */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <SectionHeader title="Department Skill Comparison" subtitle="Average skill scores across departments" icon={Layers} />
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={[
              { skill: 'DSA', CS: 78, IT: 75, ECE: 52, MECH: 35 },
              { skill: 'Web Dev', CS: 72, IT: 70, ECE: 40, MECH: 28 },
              { skill: 'Database', CS: 68, IT: 72, ECE: 45, MECH: 38 },
              { skill: 'System Design', CS: 52, IT: 48, ECE: 25, MECH: 20 },
              { skill: 'Aptitude', CS: 65, IT: 68, ECE: 55, MECH: 58 },
              { skill: 'Communication', CS: 70, IT: 72, ECE: 60, MECH: 55 },
            ]}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
              <Radar name="CS" dataKey="CS" stroke="#9333ea" fill="#9333ea" fillOpacity={0.2} />
              <Radar name="IT" dataKey="IT" stroke="#ff2d83" fill="#ff2d83" fillOpacity={0.15} />
              <Radar name="ECE" dataKey="ECE" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
              <Radar name="MECH" dataKey="MECH" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <SectionHeader title="Fairness & Bias Monitoring" subtitle="Automated bias detection across demographics" icon={Scale} />
          <div className="space-y-3">
            {fairnessMetrics.map((m) => (
              <div key={m.metric} className="flex items-center justify-between rounded-xl border border-ink-200 p-3">
                <div>
                  <p className="text-sm font-medium text-ink-900">{m.metric}</p>
                  <p className="text-xs text-ink-500">{m.value}</p>
                </div>
                <Badge variant={m.status === 'balanced' ? 'success' : m.status === 'good' ? 'success' : 'warning'}>
                  <CheckCircle2 className="h-3 w-3" /> {m.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department score averages */}
      <div className="card">
        <SectionHeader title="Department-wise Performance" icon={Building2} />
        <div className="space-y-4">
          {departmentAnalytics.map((dept) => (
            <div key={dept.department}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-ink-700">{dept.department}</span>
                <span className="text-ink-500">{dept.students} students · {dept.placed} placed ({Math.round(dept.placed / dept.students * 100)}%)</span>
              </div>
              <ProgressBar value={dept.avgScore} color={dept.avgScore >= 70 ? 'bg-emerald-500' : dept.avgScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'} />
              <p className="mt-1 text-xs text-ink-400">Avg Score: {dept.avgScore}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
