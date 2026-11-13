import { useState } from 'react';
import {
  Gauge, CheckCircle2, XCircle, Award, FileText, Code2, MessageSquare,
  TrendingUp, Lightbulb, ChevronRight, Clock, Target, RotateCcw,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import { AppShell } from '@/components/AppShell';
import { SectionHeader, Badge, ProgressBar } from '@/components/ui';
import { competencySkills, aptitudeQuestions, technicalQuestions, interviewQuestions } from '@/data/mockData';
import type { MockQuestion } from '@/types';

type Tab = 'competency' | 'mock';

export function EvaluationPage() {
  const [tab, setTab] = useState<Tab>('competency');

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Stage 2: Dual Evaluation Engine</h1>
        <p className="text-sm text-ink-500">Competency profiling from evidence + multi-round mock placement assessments</p>
      </div>

      {/* Tab switcher */}
      <div className="mb-6 flex gap-2 rounded-xl bg-ink-100 p-1">
        <button
          onClick={() => setTab('competency')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${tab === 'competency' ? 'bg-white text-plum-700 shadow-sm' : 'text-ink-500 hover:text-ink-700'}`}
        >
          <Award className="h-4 w-4" /> Competency Profiling
        </button>
        <button
          onClick={() => setTab('mock')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${tab === 'mock' ? 'bg-white text-plum-700 shadow-sm' : 'text-ink-500 hover:text-ink-700'}`}
        >
          <Gauge className="h-4 w-4" /> Mock Drive Assessment
        </button>
      </div>

      {tab === 'competency' ? <CompetencyProfiling /> : <MockAssessment />}
    </AppShell>
  );
}

function CompetencyProfiling() {
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

function MockAssessment() {
  const [activeRound, setActiveRound] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const rounds = [
    { round: 1, title: 'Aptitude Test', icon: Target, questions: aptitudeQuestions, duration: '45 min', desc: '30 questions covering quantitative, logical reasoning, and verbal aptitude', color: 'from-plum-500 to-plum-700', score: '18/30', status: 'completed' },
    { round: 2, title: 'Technical / Coding', icon: Code2, questions: technicalQuestions, duration: '90 min', desc: 'Machine coding and technical MCQs on DSA, web dev, and databases', color: 'from-magenta-500 to-magenta-700', score: '22/30', status: 'completed' },
    { round: 3, title: 'Role-Based Interview', icon: MessageSquare, questions: interviewQuestions as unknown as MockQuestion[], duration: '45 min', desc: 'Behavioral, system design, and technical interview questions', color: 'from-pink-500 to-pink-700', score: '7.2/10', status: 'completed' },
  ];

  const handleStart = (round: number) => {
    setActiveRound(round);
    setAnswers({});
    setSubmitted(false);
    setCurrentQuestion(0);
  };

  const activeRoundData = rounds.find((r) => r.round === activeRound);
  const questions = activeRoundData?.questions ?? [];
  const currentQ = questions[currentQuestion];
  const score = Object.entries(answers).filter(([id, ans]) => {
    const q = questions.find((qq) => qq.id === parseInt(id));
    return q && q.correctIndex === ans;
  }).length;
  const totalAnswered = Object.keys(answers).length;

  if (activeRound && activeRoundData && !submitted) {
    return (
      <div className="space-y-6">
        {/* Assessment header */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${activeRoundData.color} text-white`}>
                <activeRoundData.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink-900">Round {activeRound}: {activeRoundData.title}</h3>
                <p className="text-xs text-ink-500">{activeRoundData.duration} · {questions.length} questions</p>
              </div>
            </div>
            <button onClick={() => setActiveRound(null)} className="btn-ghost">Exit</button>
          </div>
          {/* Progress */}
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-ink-500">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{totalAnswered} answered</span>
            </div>
            <ProgressBar value={(currentQuestion + 1) / questions.length * 100} />
          </div>
        </div>

        {/* Question */}
        <div className="card">
          <p className="text-lg font-medium text-ink-900">{currentQ.id}. {currentQ.question}</p>
          <div className="mt-6 space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setAnswers({ ...answers, [currentQ.id]: idx })}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${
                  answers[currentQ.id] === idx
                    ? 'border-plum-400 bg-plum-50 text-plum-900'
                    : 'border-ink-200 text-ink-700 hover:border-plum-200 hover:bg-plum-50/30'
                }`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  answers[currentQ.id] === idx ? 'bg-plum-600 text-white' : 'bg-ink-100 text-ink-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-40"
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="btn-primary">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setSubmitted(true)} className="btn-primary">
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (submitted && activeRoundData) {
    return (
      <div className="space-y-6">
        {/* Results */}
        <div className="card text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-plum-500 to-magenta-500 text-white">
            <Gauge className="h-10 w-10" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-ink-900">Assessment Complete</h3>
          <p className="text-sm text-ink-500">Round {activeRound}: {activeRoundData.title}</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-bold text-plum-600">{score}</p>
              <p className="text-xs text-ink-500">Correct</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-ink-900">{questions.length - score}</p>
              <p className="text-xs text-ink-500">Incorrect</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">{Math.round(score / questions.length * 100)}%</p>
              <p className="text-xs text-ink-500">Score</p>
            </div>
          </div>
        </div>

        {/* Question review */}
        <div className="card">
          <SectionHeader title="Performance Analytics" subtitle="Review each question with correct answers and explanations" icon={Lightbulb} />
          <div className="space-y-3">
            {questions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} className={`rounded-xl border p-3 ${isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> : <XCircle className="mt-0.5 h-4 w-4 text-rose-500" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink-900">{q.question}</p>
                      <p className="mt-1 text-xs text-emerald-600">Correct: {q.options[q.correctIndex]}</p>
                      {!isCorrect && userAnswer !== undefined && (
                        <p className="text-xs text-rose-500">Your answer: {q.options[userAnswer]}</p>
                      )}
                      <p className="mt-1 text-xs text-ink-500">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        <div className="card">
          <SectionHeader title="AI Improvement Suggestions" icon={TrendingUp} />
          <div className="rounded-xl border border-plum-100 bg-gradient-to-br from-plum-50/50 to-magenta-50/30 p-4">
            <p className="text-sm text-ink-700">
              {score / questions.length >= 0.7
                ? 'Strong performance! You scored above 70%. Focus on the questions you missed to push even higher. Continue practicing at this difficulty level and try advanced problems next.'
                : 'You have room for improvement. Focus on the fundamental concepts behind the questions you missed. We recommend completing the related learning path modules before retaking this assessment.'}
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={() => activeRound !== null && handleStart(activeRound)} className="btn-secondary"><RotateCcw className="h-4 w-4" /> Retake</button>
            <button onClick={() => { setActiveRound(null); setSubmitted(false); }} className="btn-primary">Back to Rounds</button>
          </div>
        </div>
      </div>
    );
  }

  // Round selection
  return (
    <div className="space-y-6">
      <div className="card">
        <SectionHeader title="Multi-Round Placement Simulation" subtitle="Complete all three rounds to get your full placement readiness score" icon={Gauge} />
        <div className="grid gap-4 md:grid-cols-3">
          {rounds.map((round) => (
            <div key={round.round} className="rounded-2xl border-2 border-ink-200 p-5 transition-all hover:border-plum-200 hover:shadow-card-hover">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${round.color} text-white shadow-lg`}>
                <round.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink-900">Round {round.round}</h3>
              <p className="text-sm font-medium text-plum-600">{round.title}</p>
              <p className="mt-2 text-xs text-ink-500">{round.desc}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-ink-400">
                <Clock className="h-3.5 w-3.5" /> {round.duration} · {round.questions.length} questions
              </div>
              {round.status === 'completed' && (
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Score: {round.score}</Badge>
                </div>
              )}
              <button onClick={() => handleStart(round.round)} className="mt-4 btn-primary w-full text-xs">
                {round.status === 'completed' ? 'Retake Round' : 'Start Round'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Performance comparison */}
      <div className="card">
        <SectionHeader title="Round Performance Comparison" subtitle="Your scores across all three mock rounds" icon={FileText} />
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[
            { round: 'Round 1: Aptitude', score: 60, target: 75 },
            { round: 'Round 2: Technical', score: 73, target: 75 },
            { round: 'Round 3: Interview', score: 72, target: 75 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="round" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Bar dataKey="score" fill="#9333ea" radius={[8, 8, 0, 0]} name="Your Score (%)" />
            <Bar dataKey="target" fill="#e2e8f0" radius={[8, 8, 0, 0]} name="Target (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
