import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend,
} from 'recharts';
import {
  TrendingUp, Award, Target, FileText, Calendar, AlertTriangle,
  Sparkles, ArrowUpRight, Brain, CheckCircle2, Clock, Route,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { ScoreRing, ProgressBar, Badge, SectionHeader, StatCard } from '@/components/ui';
import {
  employabilityScore, placementReadiness, verifiedSkills, skillProgress,
  mockAssessments, learningRecommendations,
} from '@/data/mockData';

const skillHeatmapSkills = ['DSA', 'Web Dev', 'Database', 'System Design', 'Aptitude', 'Cloud', 'Communication'];
const studentHeatmap: Record<string, number> = { DSA: 82, 'Web Dev': 78, Database: 65, 'System Design': 45, Aptitude: 58, Cloud: 38, Communication: 72 };

function heatColor(score: number): string {
  if (score >= 75) return 'bg-emerald-500 text-white';
  if (score >= 60) return 'bg-emerald-300 text-emerald-900';
  if (score >= 45) return 'bg-amber-300 text-amber-900';
  if (score >= 30) return 'bg-rose-300 text-rose-900';
  return 'bg-rose-500 text-white';
}

const aiReport = `Arjun demonstrates strong technical fundamentals with verified proficiency in DSA (82%) and Full-Stack Development (78%). His consistent upward trajectory — improving from 48 to 74 over six months — shows excellent learning velocity and dedication.

Key Strengths:
• Problem-solving ability backed by 340 LeetCode problems
• Full-stack project experience with mentor-verified code quality
• Clear communication in interview settings (7.2/10)

Priority Gaps:
1. System Design (45%): No evidence of scalable architecture knowledge. This is the #1 blocker for top-tier product companies.
2. Cloud & DevOps (38%): No hands-on cloud experience. Critical for DevOps and SRE roles.
3. Aptitude (58%): Below competitive threshold for finance and consulting firms.

Predicted Timeline: At current learning velocity, Arjun is projected to reach 85+ employability within 6 weeks if he completes the recommended System Design and Cloud learning paths.`;

export function StudentDashboard() {
  const verifiedCount = verifiedSkills.filter((s) => s.verified).length;
  const weakSkills = verifiedSkills.filter((s) => s.score < 60).sort((a, b) => a.score - b.score);
  const upcomingMocks = mockAssessments.filter((m) => m.status === 'upcoming');
  const completedMocks = mockAssessments.filter((m) => m.status === 'completed');
  const activeRecommendations = learningRecommendations.filter((r) => !r.completed);

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Welcome back, Arjun</h1>
          <p className="text-sm text-ink-500">Computer Science · Final Year · Last updated today</p>
        </div>
        <Badge variant="plum"><Sparkles className="h-3.5 w-3.5" /> AI Report Ready</Badge>
      </div>

      {/* Top stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Employability Score" value={employabilityScore} icon={TrendingUp} accent="plum" />
        <StatCard label="Verified Skills" value={`${verifiedCount}/${verifiedSkills.length}`} icon={Award} accent="magenta" />
        <StatCard label="Placement Readiness" value={placementReadiness.percentage + '%'} icon={Target} accent="pink" />
        <StatCard label="Mock Assessments" value={completedMocks.length} icon={FileText} accent="emerald" />
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Employability Score Ring */}
        <div className="card flex flex-col items-center justify-center">
          <h3 className="mb-4 text-sm font-semibold text-ink-700">Overall Employability</h3>
          <ScoreRing score={employabilityScore} size={140} label="out of 100" />
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="font-medium text-emerald-600">{placementReadiness.trend}</span>
          </div>
          <p className="mt-2 text-xs text-ink-400">Predicted 85+ in {placementReadiness.predictedInWeeks} weeks</p>
        </div>

        {/* Placement Readiness */}
        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-ink-700">Placement Readiness Indicator</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RadialBarChart innerRadius="40%" outerRadius="100%" data={[{ name: 'Readiness', value: placementReadiness.percentage, fill: '#9333ea' }]} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={10} />
              <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant={placementReadiness.level === 'High' ? 'success' : placementReadiness.level === 'Medium' ? 'warning' : 'error'}>
              {placementReadiness.level} Readiness
            </Badge>
            <span className="text-xs text-ink-400">{placementReadiness.percentage}% ready</span>
          </div>
        </div>

        {/* Skill Progress Graph */}
        <div className="card">
          <h3 className="mb-4 text-sm font-semibold text-ink-700">Skill Progress Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={skillProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Line type="monotone" dataKey="score" stroke="#9333ea" strokeWidth={3} dot={{ r: 4, fill: '#9333ea' }} />
              <Line type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Verified Skills + Weak Skills */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <SectionHeader title="Verified Skills Overview" subtitle="Skills backed by evidence from GitHub, LeetCode, and mentor verification" icon={Award} />
          <div className="space-y-4">
            {verifiedSkills.map((skill) => (
              <div key={skill.skill} className="flex items-center gap-4">
                <div className="w-48 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-ink-700">{skill.skill}</span>
                    {skill.verified ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-ink-300" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <ProgressBar value={skill.score} />
                </div>
                <span className={`w-12 text-right text-sm font-semibold ${skill.score >= 75 ? 'text-emerald-600' : skill.score >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {skill.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Skills */}
        <div className="card">
          <SectionHeader title="Weak Skills" subtitle="Priority areas to improve" icon={AlertTriangle} />
          <div className="space-y-3">
            {weakSkills.map((skill) => (
              <div key={skill.skill} className="rounded-xl border border-rose-200 bg-rose-50/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-700">{skill.skill}</span>
                  <Badge variant="error">{skill.score}%</Badge>
                </div>
                <p className="mt-1 text-xs text-ink-500">
                  {skill.verified ? 'Verified but below target' : 'No evidence submitted'}
                </p>
                <ProgressBar value={skill.score} color="bg-rose-400" height="h-1.5" />
              </div>
            ))}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-800">
                <strong>AI Tip:</strong> Focusing on System Design and Cloud will yield the biggest employability score gains.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Heatmap + AI Report */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Heatmap */}
        <div className="card">
          <SectionHeader title="Skill Heatmap" subtitle="Your skill distribution at a glance" icon={Target} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-200">
                  <th className="pb-2 text-left text-xs font-medium text-ink-500">Skill</th>
                  <th className="pb-2 text-center text-xs font-medium text-ink-500">Score</th>
                  <th className="pb-2 text-center text-xs font-medium text-ink-500">Level</th>
                </tr>
              </thead>
              <tbody>
                {skillHeatmapSkills.map((skill) => {
                  const score = studentHeatmap[skill] ?? 0;
                  return (
                    <tr key={skill} className="border-b border-ink-100 last:border-0">
                      <td className="py-2.5 text-sm font-medium text-ink-700">{skill}</td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-flex h-8 w-14 items-center justify-center rounded-lg text-xs font-bold ${heatColor(score)}`}>
                          {score}
                        </span>
                      </td>
                      <td className="py-2.5 text-center text-xs text-ink-500">
                        {score >= 75 ? 'Strong' : score >= 50 ? 'Moderate' : 'Weak'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs text-ink-500">
            <span>Legend:</span>
            <span className="inline-flex h-4 w-8 rounded bg-emerald-500" /> Strong
            <span className="inline-flex h-4 w-8 rounded bg-amber-300" /> Moderate
            <span className="inline-flex h-4 w-8 rounded bg-rose-500" /> Weak
          </div>
        </div>

        {/* AI Report */}
        <div className="card">
          <SectionHeader title="Personal AI Report" subtitle="Generated from your verified data" icon={Brain} />
          <div className="rounded-xl border border-plum-100 bg-gradient-to-br from-plum-50/50 to-magenta-50/30 p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-plum-500 to-magenta-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-ink-900">AI-Generated Analysis</span>
            </div>
            <div className="max-h-72 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-ink-700 scrollbar-hide">
              {aiReport}
            </div>
          </div>
        </div>
      </div>

      {/* Mock Assessments + Learning Path Preview */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Mock Assessments */}
        <div className="card">
          <SectionHeader title="Mock Assessments" subtitle="Placement simulation scores" icon={FileText} />
          <div className="space-y-3">
            {mockAssessments.map((mock) => (
              <div key={mock.id} className={`rounded-xl border p-3 ${mock.status === 'upcoming' ? 'border-plum-200 bg-plum-50/30' : 'border-ink-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${mock.status === 'upcoming' ? 'bg-plum-100 text-plum-600' : mock.score / mock.maxScore >= 0.7 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      R{mock.round}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink-900">{mock.title}</p>
                      <p className="text-xs text-ink-500">{mock.date} · {mock.duration}</p>
                    </div>
                  </div>
                  {mock.status === 'completed' ? (
                    <span className={`text-sm font-bold ${mock.score / mock.maxScore >= 0.7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {mock.score}/{mock.maxScore}
                    </span>
                  ) : (
                    <Badge variant="plum"><Calendar className="h-3 w-3" /> Upcoming</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path Preview */}
        <div className="card">
          <SectionHeader title="Recommended Learning Path" subtitle="AI-generated from your skill gaps" icon={Route} />
          <div className="space-y-3">
            {activeRecommendations.slice(0, 4).map((rec) => (
              <div key={rec.id} className="flex items-center gap-3 rounded-xl border border-ink-200 p-3 transition-colors hover:border-plum-200">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-ink-900">{rec.title}</span>
                    <Badge variant={rec.difficulty === 'advanced' ? 'error' : rec.difficulty === 'intermediate' ? 'warning' : 'success'}>
                      {rec.difficulty}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-500">{rec.skill} · {rec.estimatedHours}h</p>
                  <ProgressBar value={rec.progress} height="h-1" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-plum-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div className="mt-6 card">
        <SectionHeader title="Upcoming Mock Assessments" subtitle="Your scheduled placement simulations" icon={Calendar} />
        {upcomingMocks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingMocks.map((mock) => (
              <div key={mock.id} className="flex items-center justify-between rounded-xl border border-plum-200 bg-gradient-to-r from-plum-50/50 to-magenta-50/30 p-4">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{mock.title}</p>
                  <p className="text-xs text-ink-500">{mock.date} · {mock.duration}</p>
                </div>
                <button className="btn-primary text-xs">Start</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-400">No upcoming assessments scheduled.</p>
        )}
      </div>
    </AppShell>
  );
}


