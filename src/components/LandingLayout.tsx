import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how' },
    { label: 'For Students', href: '#students' },
    { label: 'For Colleges', href: '#colleges' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-200/40 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-plum-600 to-magenta-500 text-white shadow-lg shadow-plum-500/25">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-ink-900">SkillForge</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <button onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')} className="btn-primary">
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        <button className="rounded-lg p-2 text-ink-600 lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-200 bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-100">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Link to="/login" className="btn-secondary flex-1">Login</Link>
              <Link to="/signup" className="btn-primary flex-1">Sign Up</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-plum-600 to-magenta-500 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-ink-900">SkillForge</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-ink-500">
              From learning skills to landing careers. An AI-powered platform that evaluates real-world skills, identifies learning gaps, and predicts placement readiness.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-500">
              <li><a href="#features" className="hover:text-plum-600">Features</a></li>
              <li><a href="#how" className="hover:text-plum-600">How It Works</a></li>
              <li><a href="#students" className="hover:text-plum-600">For Students</a></li>
              <li><a href="#colleges" className="hover:text-plum-600">For Colleges</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-ink-500">
              <li><a href="#" className="hover:text-plum-600">About</a></li>
              <li><a href="#" className="hover:text-plum-600">Privacy</a></li>
              <li><a href="#" className="hover:text-plum-600">Terms</a></li>
              <li><a href="#" className="hover:text-plum-600">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-ink-200 pt-6 text-center text-sm text-ink-400">
          © 2026 SkillForge. Built for student employability.
        </div>
      </div>
    </footer>
  );
}
