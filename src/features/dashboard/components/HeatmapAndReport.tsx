import { Target, Sparkles, Brain } from 'lucide-react';
import { SectionHeader } from '@/components/ui';
import { skillHeatmapSkills, studentHeatmap, aiReport } from '@/features/dashboard/constants';
import { heatColor } from '@/lib/heatmap';

export function HeatmapAndReport() {
  return (
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
  );
}
