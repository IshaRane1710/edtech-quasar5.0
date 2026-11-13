import { Award, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { ProgressBar, Badge, SectionHeader } from '@/components/ui';
import { verifiedSkills } from '@/features/dashboard/data';

export function SkillsOverview() {
  const weakSkills = verifiedSkills.filter((s) => s.score < 60).sort((a, b) => a.score - b.score);

  return (
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
  );
}
