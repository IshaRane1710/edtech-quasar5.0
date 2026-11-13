import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';
import { ScoreRing, Badge } from '@/components/ui';
import { employabilityScore, placementReadiness, skillProgress } from '@/features/dashboard/data';

export function ScoreOverview() {
  return (
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
  );
}
