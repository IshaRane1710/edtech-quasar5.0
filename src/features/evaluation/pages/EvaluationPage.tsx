import { useState } from 'react';
import { Gauge, Award } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { CompetencyProfilingTab } from '@/features/evaluation/components/CompetencyProfilingTab';
import { MockAssessmentTab } from '@/features/evaluation/components/MockAssessmentTab';

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

      {tab === 'competency' ? <CompetencyProfilingTab /> : <MockAssessmentTab />}
    </AppShell>
  );
}
