import { Calendar } from 'lucide-react';
import { SectionHeader } from '@/components/ui';
import { mockAssessments } from '@/features/dashboard/data';

export function UpcomingSection() {
  const upcomingMocks = mockAssessments.filter((m) => m.status === 'upcoming');

  return (
    <div className="mt-6 card">
      <SectionHeader title="Upcoming Mock Assessments" subtitle="Your scheduled placement simulations" icon={Calendar} />
      {upcomingMocks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {upcomingMocks.map((mock) => (
            <div key={mock.id} className="flex items-center justify-between rounded-xl border border-plum-200 bg-gradient-to-r from-plum-50/50 to-magenta-50/30 p-4">
              <div>
                <p className="text-sm font-semibold text-ink-900">{mock.title}</p>
                <p className="text-xs text-ink-500">{mock.date} · {mock.duration}</p>
              </div>
              <button className="btn-primary text-xs">Start</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-400">No upcoming assessments scheduled.</p>
      )}
    </div>
  );
}
