import {
  Brain, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Info,
  CheckCircle2, ArrowUpRight, Eye, Layers,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';
import { AppShell } from '@/components/AppShell';
import { SectionHeader, Badge, ScoreRing, StatCard } from '@/components/ui';
import {
  employabilityScore, placementReadiness, employabilityTrend,
  explainabilityFactors,
} from '@/data/mockData';

export function AnalyticsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Stage 3: AI Scoring & Analytics</h1>
        <p className="text-sm text-ink-500">Predictive placement analytics with full explainability</p>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current Score" value={employabilityScore} icon={TrendingUp} accent="plum" />
        <StatCard label="Predicted (Jan)" value="83" icon={ArrowUpRight} accent="emerald" />
        <StatCard label="Readiness Level" value={placementReadiness.level} icon={Brain} accent="magenta" />
        <StatCard label="Risk Flag" value="Low" icon={ShieldCheck} accent="emerald" />
      </div>

      {/* Predictive trend */}
      <div className="mt-6 card">
        <SectionHeader
          title="Placement Readiness Trend"
          subtitle="Actual scores with AI predictions for upcoming months"
          icon={TrendingUp}
          action={<Badge variant="plum"><Sparkles className="h-3 w-3" /> Predictive Model</Badge>}
        />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={employabilityTrend}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#9333ea" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff2d83" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ff2d83" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="score" stroke="#9333ea" strokeWidth={3} fill="url(#scoreGrad)" name="Actual Score" dot={{ r: 4, fill: '#9333ea' }} />
            <Area type="monotone" dataKey="predicted" stroke="#ff2d83" strokeWidth={2} strokeDasharray="6 4" fill="url(#predGrad)" name="Predicted" dot={{ r: 3, fill: '#ff2d83' }} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
          <p className="text-sm text-emerald-800">
            <strong>Prediction:</strong> At your current learning velocity, you're projected to reach 83 (employability) by January 2026. Maintain consistent practice to stay on track.
          </p>
        </div>
      </div>

      {/* Explainability & Trust Layer */}
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

      {/* Risk Assessment */}
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

      {/* Factor contribution chart */}
      <div className="mt-6 card">
        <SectionHeader title="Factor Contribution Analysis" subtitle="How each factor weighs into your final placement readiness score" icon={Layers} />
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={explainabilityFactors.map((f) => ({ name: f.factor.split('(')[0].trim().substring(0, 18), contribution: f.contribution }))} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" width={140} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Bar dataKey="contribution" fill="#9333ea" radius={[0, 8, 8, 0]} name="Points Contributed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AppShell>
  );
}
