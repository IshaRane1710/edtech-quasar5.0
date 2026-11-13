import { CheckCircle2, XCircle, Award, Clock, Target } from 'lucide-react';
import {
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { SectionHeader, Badge, ProgressBar } from '@/components/ui';
import { competencySkills } from '@/features/evaluation/data';

export function CompetencyProfilingTab() {
  const verified = competencySkills.filter((s) => s.verified).length;
  const claimed = competencySkills.length;

  const radarData = competencySkills.filter((s) => s.verified).slice(0, 6).map((s) => ({
    skill: s.skill.length > 12 ? s.skill.substring(0, 10) + '...' : s.skill,
    claimed: s.claimedLevel * 25,
    verified: s.verifiedLevel * 25,
  }));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-3xl font-bold text-plum-600">{verified}/{claimed}</p>
          <p className="mt-1 text-sm text-ink-500">Skills Verified</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-emerald-600">3</p>
          <p className="mt-1 text-sm text-ink-500">Certificates Valid</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-amber-600">1</p>
          <p className="mt-1 text-sm text-ink-500">Certificate Expiring Soon</p>
        </div>
      </div>

      {/* Radar chart */}
      <div className="card">
        <SectionHeader title="Claimed vs Verified Skills" subtitle="Comparing self-assessed levels with evidence-backed verification" icon={Target} />
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Radar name="Claimed" dataKey="claimed" stroke="#c084fc" fill="#c084fc" fillOpacity={0.3} />
            <Radar name="Verified" dataKey="verified" stroke="#9333ea" fill="#9333ea" fillOpacity={0.4} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-2 flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-plum-400" /> Claimed Level</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-plum-600" /> Verified Level</span>
        </div>
      </div>

      {/* Detailed table */}
      <div className="card">
        <SectionHeader title="Competency Breakdown" subtitle="Every verified skill includes evidence and competency level" icon={Award} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 text-left">
                <th className="pb-3 text-xs font-semibold text-ink-500">Skill</th>
                <th className="pb-3 text-xs font-semibold text-ink-500">Category</th>
                <th className="pb-3 text-xs font-semibold text-ink-500">Claimed</th>
                <th className="pb-3 text-xs font-semibold text-ink-500">Verified</th>
                <th className="pb-3 text-xs font-semibold text-ink-500">Evidence</th>
                <th className="pb-3 text-xs font-semibold text-ink-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {competencySkills.map((skill) => (
                <tr key={skill.skill} className="border-b border-ink-100 last:border-0">
                  <td className="py-3 font-medium text-ink-900">{skill.skill}</td>
                  <td className="py-3"><Badge variant="neutral">{skill.category}</Badge></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={skill.claimedLevel * 25} height="h-1.5" />
                      <span className="text-xs text-ink-500">L{skill.claimedLevel}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={skill.verifiedLevel * 25} height="h-1.5" color={skill.verified ? 'bg-emerald-500' : 'bg-ink-300'} />
                      <span className="text-xs text-ink-500">L{skill.verifiedLevel}</span>
                    </div>
                  </td>
                  <td className="py-3 max-w-xs text-xs text-ink-500">{skill.evidence}</td>
                  <td className="py-3">
                    {skill.verified ? (
                      <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Verified</Badge>
                    ) : (
                      <Badge variant="error"><XCircle className="h-3 w-3" /> Unverified</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate expiry */}
      <div className="card">
        <SectionHeader title="Certificate Tracking" subtitle="Monitor certificate validity and expiry dates" icon={Clock} />
        <div className="space-y-2">
          {[
            { name: 'PostgreSQL Essentials', issuer: 'Udemy', expiry: '2026-03-15', status: 'expiring' },
            { name: 'React Advanced Patterns', issuer: 'Frontend Masters', expiry: '2027-01-20', status: 'valid' },
            { name: 'Node.js Backend Development', issuer: 'Coursera', expiry: '2027-06-10', status: 'valid' },
          ].map((cert) => (
            <div key={cert.name} className="flex items-center justify-between rounded-xl border border-ink-200 p-3">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-plum-400" />
                <div>
                  <p className="text-sm font-medium text-ink-900">{cert.name}</p>
                  <p className="text-xs text-ink-500">{cert.issuer} · Expires {cert.expiry}</p>
                </div>
              </div>
              <Badge variant={cert.status === 'expiring' ? 'warning' : 'success'}>
                {cert.status === 'expiring' ? <Clock className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                {cert.status === 'expiring' ? 'Expiring Soon' : 'Valid'}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
