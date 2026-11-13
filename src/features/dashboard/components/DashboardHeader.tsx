import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';

export function DashboardHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Welcome back, Arjun</h1>
        <p className="text-sm text-ink-500">Computer Science · Final Year · Last updated today</p>
      </div>
      <Badge variant="plum"><Sparkles className="h-3.5 w-3.5" /> AI Report Ready</Badge>
    </div>
  );
}
