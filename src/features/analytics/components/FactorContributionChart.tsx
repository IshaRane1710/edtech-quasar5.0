import { Layers } from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { SectionHeader } from '@/components/ui';
import { explainabilityFactors } from '@/features/analytics/data';

export function FactorContributionChart() {
  return (
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
  );
}
