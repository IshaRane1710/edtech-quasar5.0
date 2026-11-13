import { Sparkles, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SectionHeader, Badge } from '@/components/ui';
import { employabilityTrend } from '@/features/analytics/data';

export function PredictiveTrend() {
  return (
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
  );
}
