import { Route } from 'lucide-react';
import { SectionHeader, Badge } from '@/components/ui';

export function SkillGapMapping() {
  return (
    <div className="mt-6 card">
      <SectionHeader title="Skill Gap → Learning Mapping" subtitle="How each recommendation addresses a specific weakness" icon={Route} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left">
              <th className="pb-3 text-xs font-semibold text-ink-500">Weak Skill</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Current Score</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Recommendation</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Target Score</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { skill: 'System Design', current: 45, rec: 'System Design Fundamentals', target: 75, status: 'In Progress (15%)' },
              { skill: 'Cloud & DevOps', current: 38, rec: 'AWS Cloud Practitioner', target: 65, status: 'Not Started' },
              { skill: 'Aptitude', current: 58, rec: 'Quantitative Aptitude Sprint', target: 75, status: 'In Progress (40%)' },
              { skill: 'DSA', current: 82, rec: 'Advanced DSA Challenge Set', target: 90, status: 'In Progress (60%)' },
              { skill: 'Communication', current: 72, rec: 'Mock Interview Sessions', target: 85, status: 'Not Started' },
              { skill: 'System Design', current: 45, rec: 'Chat System Case Study', target: 65, status: 'Not Started' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-ink-100 last:border-0">
                <td className="py-3 font-medium text-ink-900">{row.skill}</td>
                <td className="py-3"><span className="text-rose-600 font-semibold">{row.current}%</span></td>
                <td className="py-3 text-ink-600">{row.rec}</td>
                <td className="py-3"><span className="text-emerald-600 font-semibold">{row.target}%</span></td>
                <td className="py-3">
                  <Badge variant={row.status.includes('Progress') ? 'warning' : 'neutral'}>{row.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
