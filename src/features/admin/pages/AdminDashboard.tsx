import { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, BarChart3, Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui';
import { AnalyticsTab } from '@/features/admin/components/AnalyticsTab';
import { InterventionsTab } from '@/features/admin/components/InterventionsTab';
import { OverviewTab } from '@/features/admin/components/OverviewTab';
import { StudentsTab } from '@/features/admin/components/StudentsTab';
import { AdminTab } from '@/features/admin/types';

export function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>('overview');

  const nav = [
    { key: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { key: 'students' as const, label: 'Students', icon: Users },
    { key: 'analytics' as const, label: 'Analytics', icon: TrendingUp },
    { key: 'interventions' as const, label: 'Interventions', icon: AlertTriangle },
  ];

  return (
    <AppShell>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Training & Placement Dashboard</h1>
          <p className="text-sm text-ink-500">Cohort overview · Department of Computer Science & Engineering</p>
        </div>
        <Badge variant="plum"><Sparkles className="h-3.5 w-3.5" /> AI Analytics Active</Badge>
      </div>

      {/* Tab nav */}
      <div className="mb-6 flex gap-1 overflow-x-auto scrollbar-hide">
        {nav.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
              tab === item.key ? 'bg-gradient-to-r from-plum-50 to-magenta-50 text-plum-700 shadow-sm' : 'text-ink-500 hover:bg-ink-100'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && <OverviewTab onNavigate={setTab} />}
      {tab === 'students' && <StudentsTab />}
      {tab === 'analytics' && <AnalyticsTab />}
      {tab === 'interventions' && <InterventionsTab />}
    </AppShell>
  );
}
