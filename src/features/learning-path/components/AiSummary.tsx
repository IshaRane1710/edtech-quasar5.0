import { Sparkles } from 'lucide-react';

export function AiSummary() {
  return (
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
  );
}
