import { useState } from 'react';
import {
  Users, TrendingUp, AlertTriangle, BarChart3, Building2, Scale,
  Search, Filter, ShieldCheck, Brain, Eye, CheckCircle2, XCircle,
  Layers, GraduationCap, Sparkles, ChevronDown,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import { AppShell } from '@/components/AppShell';
import { SectionHeader, Badge, StatCard, ProgressBar } from '@/components/ui';
import {
  adminStudentRows, departmentAnalytics, placementReadinessDistribution,
  companySkillGaps, skillHeatmapData, interventionStudents, fairnessMetrics,
} from '@/data/mockData';

type AdminTab = 'overview' | 'students' | 'analytics' | 'interventions';

export function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [readinessFilter, setReadinessFilter] = useState('all');

  const nav = [
    { key: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { key: 'students' as const, label: 'Students', icon: Users },
    { key: 'analytics' as const, label: 'Analytics', icon: TrendingUp },
    { key: 'interventions' as const, label: 'Interventions', icon: AlertTriangle },
  ];

  const totalStudents = adminStudentRows.length;
  const avgScore = Math.round(adminStudentRows.reduce((sum, s) => sum + s.employabilityScore, 0) / totalStudents);
  const atRisk = adminStudentRows.filter((s) => s.placementReadiness === 'at-risk').length;
  const highReadiness = adminStudentRows.filter((s) => s.placementReadiness === 'high').length;

  const filteredStudents = adminStudentRows.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || s.department === deptFilter;
    const matchesReadiness = readinessFilter === 'all' || s.placementReadiness === readinessFilter;
    return matchesSearch && matchesDept && matchesReadiness;
  });

  const heatmapSkills = Object.keys(skillHeatmapData[0]?.scores ?? {});

  function heatColor(score: number): string {
    if (score >= 75) return 'bg-emerald-500 text-white';
    if (score >= 60) return 'bg-emerald-300 text-emerald-900';
    if (score >= 45) return 'bg-amber-300 text-amber-900';
    if (score >= 30) return 'bg-rose-300 text-rose-900';
    return 'bg-rose-500 text-white';
  }

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Training & Placement Dashboard</h1>
          <p className="text-sm text-ink-500">Cohort overview · Department of Computer Science & Engineering</p>
        </div>
        <Badge variant="plum"><Sparkles className="h-3.5 w-3.5" /> AI Analytics Active</Badge>
      </div>

      {/* Tab nav */}
      <div className="mb-6 flex gap-1 overflow-x-auto scrollbar-hide">
        {nav.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
              tab === item.key ? 'bg-gradient-to-r from-plum-50 to-magenta-50 text-plum-700 shadow-sm' : 'text-ink-500 hover:bg-ink-100'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'overview' && (
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
            <SectionHeader title="Students Requiring Intervention" subtitle="Auto-flagged by AI based on low scores or stagnant progress" icon={AlertTriangle} action={<button onClick={() => setTab('interventions')} className="btn-ghost text-xs">View All</button>} />
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
      )}

      {/* Students Tab */}
      {tab === 'students' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="card">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students..."
                  className="input pl-10 py-2.5"
                />
              </div>
              <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="input w-auto py-2.5">
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Tech">Information Tech</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
              </select>
              <select value={readinessFilter} onChange={(e) => setReadinessFilter(e.target.value)} className="input w-auto py-2.5">
                <option value="all">All Readiness</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="at-risk">At Risk</option>
              </select>
              <span className="text-sm text-ink-500">{filteredStudents.length} students</span>
            </div>
          </div>

          {/* Student table */}
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="pb-3 text-xs font-semibold text-ink-500">Student</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Department</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Year</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Employability</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Skills Verified</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Readiness</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Last Assessment</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-plum-500 to-magenta-500 text-xs font-semibold text-white">
                          {s.name.charAt(0)}
                        </div>
                        <span className="font-medium text-ink-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-ink-600">{s.department}</td>
                    <td className="py-3 text-ink-600">{s.year}</td>
                    <td className="py-3">
                      <span className={`font-bold ${s.employabilityScore >= 75 ? 'text-emerald-600' : s.employabilityScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {s.employabilityScore}
                      </span>
                    </td>
                    <td className="py-3 text-ink-600">{s.skillsVerified}/{s.skillsTotal}</td>
                    <td className="py-3">
                      <Badge variant={s.placementReadiness === 'high' ? 'success' : s.placementReadiness === 'medium' ? 'warning' : 'error'}>
                        {s.placementReadiness === 'at-risk' ? 'At Risk' : s.placementReadiness}
                      </Badge>
                    </td>
                    <td className="py-3 text-xs text-ink-500">{s.lastAssessment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {tab === 'analytics' && (
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
      )}

      {/* Interventions Tab */}
      {tab === 'interventions' && (
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
      )}
    </AppShell>
  );
}
