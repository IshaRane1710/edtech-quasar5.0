import {
  Route, BookOpen, Code2, MessageSquare, Trophy, CheckCircle2,
  Clock, TrendingUp, Sparkles, ArrowRight, Target,
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';
import { SectionHeader, Badge, ProgressBar, StatCard } from '@/components/ui';
import { learningRecommendations } from '@/data/mockData';

const typeIcons = {
  course: BookOpen,
  practice: Code2,
  'mock-interview': MessageSquare,
  challenge: Trophy,
};

const typeColors = {
  course: 'from-plum-500 to-plum-700',
  practice: 'from-magenta-500 to-magenta-700',
  'mock-interview': 'from-pink-500 to-pink-700',
  challenge: 'from-amber-500 to-amber-700',
};

export function LearningPathPage() {
  const inProgress = learningRecommendations.filter((r) => r.progress > 0 && !r.completed);
  const notStarted = learningRecommendations.filter((r) => r.progress === 0 && !r.completed);
  const completed = learningRecommendations.filter((r) => r.completed);
  const totalProgress = Math.round(learningRecommendations.reduce((sum, r) => sum + r.progress, 0) / learningRecommendations.length);

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">AI-Powered Learning Path</h1>
        <p className="text-sm text-ink-500">Personalized recommendations based on your verified skill gaps</p>
      </div>

      {/* Progress overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Progress" value={totalProgress + '%'} icon={TrendingUp} accent="plum" />
        <StatCard label="In Progress" value={inProgress.length} icon={Clock} accent="amber" />
        <StatCard label="Not Started" value={notStarted.length} icon={BookOpen} accent="magenta" />
        <StatCard label="Completed" value={completed.length} icon={CheckCircle2} accent="emerald" />
      </div>

      {/* AI summary */}
      <div className="mt-6 rounded-2xl border border-plum-100 bg-gradient-to-r from-plum-50/50 to-magenta-50/30 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-plum-500 to-magenta-500 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-ink-900">AI Path Summary</h3>
            <p className="mt-1 text-sm text-ink-600">
              Based on your verified skills, your top gaps are <strong>System Design</strong> (45%), <strong>Cloud & DevOps</strong> (38%), and <strong>Aptitude</strong> (58%).
              We've curated 6 learning activities targeting these gaps. Completing all recommended activities is projected to raise your employability score from 74 to 85+ within 6 weeks.
            </p>
          </div>
        </div>
      </div>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <div className="mt-6">
          <SectionHeader title="In Progress" subtitle="Continue where you left off" icon={Clock} />
          <div className="grid gap-4 md:grid-cols-2">
            {inProgress.map((rec) => {
              const Icon = typeIcons[rec.type];
              return (
                <div key={rec.id} className="card card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${typeColors[rec.type]} text-white shadow-lg`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-ink-900">{rec.title}</h3>
                        <p className="text-xs text-ink-500">{rec.skill} · {rec.estimatedHours}h</p>
                      </div>
                    </div>
                    <Badge variant={rec.difficulty === 'advanced' ? 'error' : rec.difficulty === 'intermediate' ? 'warning' : 'success'}>
                      {rec.difficulty}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-ink-600">{rec.description}</p>
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-ink-500">Progress</span>
                      <span className="font-semibold text-plum-600">{rec.progress}%</span>
                    </div>
                    <ProgressBar value={rec.progress} />
                  </div>
                  <button className="mt-4 btn-primary w-full text-xs">
                    Continue Learning <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Not Started */}
      {notStarted.length > 0 && (
        <div className="mt-6">
          <SectionHeader title="Recommended Next" subtitle="Start these to close your skill gaps" icon={Target} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notStarted.map((rec) => {
              const Icon = typeIcons[rec.type];
              return (
                <div key={rec.id} className="card card-hover">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${typeColors[rec.type]} text-white shadow-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant={rec.difficulty === 'advanced' ? 'error' : rec.difficulty === 'intermediate' ? 'warning' : 'success'}>
                      {rec.difficulty}
                    </Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-ink-900">{rec.title}</h3>
                  <p className="text-xs text-ink-500">{rec.skill} · {rec.estimatedHours}h estimated</p>
                  <p className="mt-2 text-xs text-ink-600">{rec.description}</p>
                  <button className="mt-4 btn-secondary w-full text-xs">
                    Start Now <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div className="mt-6">
          <SectionHeader title="Completed" subtitle="Activities you've finished" icon={CheckCircle2} />
          <div className="grid gap-4 md:grid-cols-2">
            {completed.map((rec) => (
              <div key={rec.id} className="card flex items-center gap-3 border-emerald-200">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <div>
                  <p className="text-sm font-bold text-ink-900">{rec.title}</p>
                  <p className="text-xs text-emerald-600">Completed · {rec.skill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill gap to learning mapping */}
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
    </AppShell>
  );
}
