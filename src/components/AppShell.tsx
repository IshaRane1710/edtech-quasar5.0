import { Link, useNavigate, useLocation } from 'react-router-dom';
import { type ReactNode, useState } from 'react';
import {
  GraduationCap, LayoutDashboard, Upload, Gauge, Brain, Route,
  Users, LogOut, Menu, X, Bell, ChevronDown, Building2, Calendar,
  Briefcase, Award, BarChart3, Settings,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const studentNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/data-ingestion', label: 'Data Ingestion', icon: Upload },
  { to: '/evaluation', label: 'Evaluation Engine', icon: Gauge },
  { to: '/analytics', label: 'AI Analytics', icon: Brain },
  { to: '/learning-path', label: 'Learning Path', icon: Route },
];

const adminNav = [
  { to: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
  { to: '/admin/students', label: 'Student Management', icon: Users },
  { to: '/admin/companies', label: 'Company Management', icon: Building2 },
  { to: '/admin/drives', label: 'Placement Drives', icon: Briefcase },
  { to: '/admin/calendar', label: 'Calendar & Scheduling', icon: Calendar },
  { to: '/admin/offers', label: 'Offers & Results', icon: Award },
  { to: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings & Access', icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const nav = user?.role === 'admin' ? adminNav : studentNav;

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const isActive = (to: string) => location.pathname === to;

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-ink-200 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-ink-200 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-plum-600 to-magenta-500 text-white shadow-lg shadow-plum-500/25">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-ink-900">SkillForge</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto scrollbar-hide">
          {nav.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-plum-50 to-magenta-50 text-plum-700 shadow-sm'
                    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                }`}
              >
                <item.icon className={`h-5 w-5 ${active ? 'text-plum-600' : 'text-ink-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-ink-200 p-3">
          <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-rose-50 hover:text-rose-600">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-ink-200 px-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-plum-600 to-magenta-500 text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold text-ink-900">SkillForge</span>
              </div>
              <button onClick={() => setMobileOpen(false)}><X className="h-5 w-5 text-ink-500" /></button>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${isActive(item.to) ? 'bg-plum-50 text-plum-700' : 'text-ink-600 hover:bg-ink-100'}`}>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-ink-200 p-3">
              <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-rose-50 hover:text-rose-600">
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-200 bg-white/80 px-6 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-ink-600 lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden lg:block">
              <p className="text-sm text-ink-500">
                {user?.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
              </p>
              <p className="text-xs text-ink-400">{user?.role === 'admin' ? 'Training & Placement Office' : user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-ink-500 hover:bg-ink-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-magenta-500" />
            </button>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-1.5 transition-colors hover:bg-ink-50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-plum-500 to-magenta-500 text-sm font-semibold text-white">
                  {user?.full_name?.charAt(0) ?? 'U'}
                </div>
                <span className="hidden text-sm font-medium text-ink-700 sm:block">{user?.full_name?.split(' ')[0]}</span>
                <ChevronDown className="h-4 w-4 text-ink-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-ink-200 bg-white p-2 shadow-lg">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-ink-900">{user?.full_name}</p>
                    <p className="text-xs text-ink-500">{user?.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-plum-50 px-2 py-0.5 text-xs font-medium text-plum-600 capitalize">{user?.role}</span>
                  </div>
                  <hr className="my-1 border-ink-100" />
                  <button onClick={handleSignOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
