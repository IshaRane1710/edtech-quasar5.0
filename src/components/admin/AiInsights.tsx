
import {
  AlertTriangle,
  Brain,
  Building2,
  CheckCircle2,
  Eye,
  Layers,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge, SectionHeader, ProgressBar } from '@/components/ui';
import {
  companySkillGaps,
  departmentAnalytics,
  fairnessMetrics,
  interventionStudents,
  skillHeatmapData,
} from '@/data/mockData';

function heatColor(score: number): string {
  if (score >= 75) return 'bg-emerald-500 text-white';
  if (score >= 60) return 'bg-emerald-300 text-emerald-900';
  if (score >= 45) return 'bg-amber-300 text-amber-900';
  if (score >= 30) return 'bg-rose-300 text-rose-900';
  return 'bg-rose-500 text-white';
}

export function CohortSkillHeatmap() {
  const skills = Object.keys(skillHeatmapData[0]?.scores ?? {});

  return (
    <div className="card">
      <SectionHeader
        title="Cohort Skill Heatmap"
        subtitle="Skill distribution across students — identify cohort-wide gaps"
        icon={Layers}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200">
              <th className="pb-2 pr-3 text-left text-xs font-semibold text-ink-500">
                Student
              </th>
              {skills.map((skill) => (
                <th
                  key={skill}
                  className="px-1 pb-2 text-center text-xs font-semibold text-ink-500"
                >
                  {skill}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {skillHeatmapData.map((student) => (
              <tr
                key={student.student}
                className="border-b border-ink-100 last:border-0"
              >
                <td className="py-2 pr-3 text-xs font-medium text-ink-700">
                  {student.student}
                </td>

                {skills.map((skill) => {
                  const score = student.scores[skill] ?? 0;

                  return (
                    <td key={skill} className="px-1 py-2 text-center">
                      <span
                        className={`inline-flex h-8 w-10 items-center justify-center rounded-md text-xs font-bold ${heatColor(score)}`}
                      >
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

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-500">
        <span>Legend:</span>
        <span className="inline-flex h-4 w-8 rounded bg-emerald-500" /> 75+
        <span className="inline-flex h-4 w-8 rounded bg-emerald-300" /> 60–74
        <span className="inline-flex h-4 w-8 rounded bg-amber-300" /> 45–59
        <span className="inline-flex h-4 w-8 rounded bg-rose-300" /> 30–44
        <span className="inline-flex h-4 w-8 rounded bg-rose-500" /> Below 30
      </div>
    </div>
  );
}

export function AiAnalytics() {
  const departmentSkillData = [
    { skill: 'DSA', CS: 78, IT: 75, ECE: 52, MECH: 35 },
    { skill: 'Web Dev', CS: 72, IT: 70, ECE: 40, MECH: 28 },
    { skill: 'Database', CS: 68, IT: 72, ECE: 45, MECH: 38 },
    { skill: 'System Design', CS: 52, IT: 48, ECE: 25, MECH: 20 },
    { skill: 'Aptitude', CS: 65, IT: 68, ECE: 55, MECH: 58 },
    { skill: 'Communication', CS: 70, IT: 72, ECE: 60, MECH: 55 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">AI Analytics</h1>
        <p className="text-sm text-ink-500">
          Skill gaps, department performance and fairness monitoring.
        </p>
      </div>

      <div className="card">
        <SectionHeader
          title="Company Skill Gap Analysis"
          subtitle="Industry demand compared with available student skills"
          icon={Building2}
        />

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companySkillGaps} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 11 }}
              stroke="#94a3b8"
            />
            <YAxis
              type="category"
              dataKey="company"
              tick={{ fontSize: 11 }}
              stroke="#94a3b8"
              width={90}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="demand"
              fill="#9333ea"
              radius={[0, 8, 8, 0]}
              name="Industry Demand"
            />
            <Bar
              dataKey="supply"
              fill="#e2e8f0"
              radius={[0, 8, 8, 0]}
              name="Student Supply"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <SectionHeader
            title="Department Skill Comparison"
            subtitle="Average skill scores across departments"
            icon={Layers}
          />

          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={departmentSkillData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
              <Radar
                name="CS"
                dataKey="CS"
                stroke="#9333ea"
                fill="#9333ea"
                fillOpacity={0.2}
              />
              <Radar
                name="IT"
                dataKey="IT"
                stroke="#ff2d83"
                fill="#ff2d83"
                fillOpacity={0.15}
              />
              <Radar
                name="ECE"
                dataKey="ECE"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.1}
              />
              <Radar
                name="MECH"
                dataKey="MECH"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.1}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <SectionHeader
            title="Fairness & Bias Monitoring"
            subtitle="Review the available fairness indicators"
            icon={Scale}
          />

          <div className="space-y-3">
            {fairnessMetrics.map((metric) => (
              <div
                key={metric.metric}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink-900">
                    {metric.metric}
                  </p>
                  <p className="text-xs text-ink-500">{metric.value}</p>
                </div>

                <Badge
                  variant={
                    metric.status === 'balanced' || metric.status === 'good'
                      ? 'success'
                      : 'warning'
                  }
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {metric.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <SectionHeader
          title="Department-wise Performance"
          subtitle="Average employability score and placement rate"
          icon={Building2}
        />

        <div className="space-y-4">
          {departmentAnalytics.map((department) => (
            <div key={department.department}>
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="font-medium text-ink-700">
                  {department.department}
                </span>
                <span className="text-right text-ink-500">
                  {department.students} students · {department.placed} placed (
                  {department.students
                    ? Math.round(
                        (department.placed / department.students) * 100,
                      )
                    : 0}
                  %)
                </span>
              </div>

              <ProgressBar
                value={department.avgScore}
                color={
                  department.avgScore >= 70
                    ? 'bg-emerald-500'
                    : department.avgScore >= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                }
              />

              <p className="mt-1 text-xs text-ink-400">
                Average Score: {department.avgScore}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AiInterventions() {
  const auditLog = [
    {
      admin: 'Dr. Priya Nair',
      student: 'Rohan Verma',
      action: 'Score adjusted 42 → 48',
      reason: 'Improved project evidence not yet reflected in GitHub sync',
      date: '2026-11-10',
    },
    {
      admin: 'Prof. Rajesh Kumar',
      student: 'Karthik Iyer',
      action: 'Intervention assigned',
      reason: 'Student showing engagement in remedial sessions',
      date: '2026-11-08',
    },
    {
      admin: 'Dr. Priya Nair',
      student: 'Arnav Joshi',
      action: 'Readiness updated to Medium',
      reason: 'Completed 2 certificates since last AI evaluation',
      date: '2026-11-05',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">AI Interventions</h1>
        <p className="text-sm text-ink-500">
          Review students flagged for additional placement support.
        </p>
      </div>

      <div className="card">
        <SectionHeader
          title="Human Review of AI Decisions"
          subtitle="AI recommendations should be reviewed by administrators before action"
          icon={ShieldCheck}
        />

        <div className="rounded-xl border border-plum-100 bg-gradient-to-br from-plum-50/50 to-magenta-50/30 p-4">
          <div className="flex items-start gap-3">
            <Brain className="mt-0.5 h-5 w-5 text-plum-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">
                AI Review Policy
              </p>
              <p className="mt-1 text-xs text-ink-600">
                Administrators should review AI-generated readiness scores
                before making placement decisions. Any manual score changes
                should be documented with the administrator, timestamp and
                reason.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <SectionHeader
          title="Students Requiring Intervention"
          subtitle="Students flagged in the current intervention dataset"
          icon={AlertTriangle}
        />

        <div className="space-y-4">
          {interventionStudents.map((student) => (
            <div
              key={student.id}
              className="rounded-xl border border-rose-200 bg-rose-50/20 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-lg font-bold text-rose-600">
                    {student.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-ink-900">
                      {student.name}
                    </h3>
                    <p className="text-xs text-ink-500">
                      {student.department} · Employability Score:{' '}
                      {student.score}
                    </p>
                  </div>
                </div>

                <Badge variant="error">
                  <AlertTriangle className="h-3 w-3" />
                  At Risk
                </Badge>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-rose-50/50 p-3">
                  <p className="text-xs font-semibold text-rose-700">
                    Skill Gaps
                  </p>
                  <p className="mt-1 text-xs text-ink-600">{student.gap}</p>
                </div>

                <div className="rounded-lg bg-plum-50/50 p-3">
                  <p className="text-xs font-semibold text-plum-700">
                    AI Recommendation
                  </p>
                  <p className="mt-1 text-xs text-ink-600">
                    {student.recommendation}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="warning">Review required</Badge>
                <span className="text-xs text-ink-400">
                  Actions should be assigned through the institution's
                  intervention workflow.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <SectionHeader
          title="Override Audit Log"
          subtitle="Example entries from the original dashboard's audit-log dataset"
          icon={Eye}
        />

        <div className="space-y-2">
          {auditLog.map((entry, index) => (
            <div
              key={`${entry.student}-${index}`}
              className="flex flex-col justify-between gap-2 rounded-lg border border-ink-200 p-3 sm:flex-row sm:items-center"
            >
              <div>
                <p className="text-sm font-medium text-ink-900">
                  {entry.action}
                </p>
                <p className="text-xs text-ink-500">
                  {entry.student} · by {entry.admin}
                </p>
                <p className="mt-1 text-xs text-ink-400">{entry.reason}</p>
              </div>

              <span className="text-xs text-ink-400">{entry.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

