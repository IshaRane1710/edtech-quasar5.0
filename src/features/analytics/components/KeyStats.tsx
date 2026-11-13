import { Brain, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { StatCard } from '@/components/ui';
import { employabilityScore, placementReadiness } from '@/features/dashboard/data';

export function KeyStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Current Score" value={employabilityScore} icon={TrendingUp} accent="plum" />
      <StatCard label="Predicted (Jan)" value="83" icon={ArrowUpRight} accent="emerald" />
      <StatCard label="Readiness Level" value={placementReadiness.level} icon={Brain} accent="magenta" />
      <StatCard label="Risk Flag" value="Low" icon={ShieldCheck} accent="emerald" />
    </div>
  );
}
