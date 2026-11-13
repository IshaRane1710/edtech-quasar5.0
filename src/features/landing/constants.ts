import {
  ShieldCheck,
  Gauge,
  Brain,
  Route,
  BarChart3,
  Scale,
  Upload,
  Rocket,
  Users,
  BadgeCheck,
  TrendingUp,
  Building,
} from 'lucide-react';

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': ShieldCheck, gauge: Gauge, brain: Brain, route: Route,
  'bar-chart-3': BarChart3, scale: Scale, upload: Upload, rocket: Rocket,
  users: Users, 'badge-check': BadgeCheck, 'trending-up': TrendingUp, building: Building,
};
