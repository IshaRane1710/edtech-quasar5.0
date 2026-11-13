import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';
import type { UserRole } from '@/types';

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await signIn(email, password, role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch {
      setError('Sign in failed. Please try again.');
    }
  };

  const fillDemo = (demoRole: UserRole) => {
    const demoEmail = demoRole === 'admin' ? 'admin@skillforge.edu' : 'arjun.sharma@university.edu';
    setEmail(demoEmail);
    setPassword('demo1234');
    setRole(demoRole);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-plum-700 via-plum-800 to-magenta-700 p-12 lg:flex">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SkillForge</span>
          </Link>
        </div>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight text-white">From Learning Skills to Landing Careers.</h2>
          <p className="mt-4 text-lg text-plum-100">Evidence-based skill verification, AI-powered placement readiness, and personalized learning paths — all in one platform.</p>
          <div className="mt-8 flex gap-6">
            <div><p className="text-3xl font-bold text-white">12K+</p><p className="text-sm text-plum-200">Students</p></div>
            <div><p className="text-3xl font-bold text-white">87%</p><p className="text-sm text-plum-200">Placement Rate</p></div>
            <div><p className="text-3xl font-bold text-white">45+</p><p className="text-sm text-plum-200">Colleges</p></div>
          </div>
        </div>
        <p className="relative text-sm text-plum-200">© 2026 SkillForge</p>
      </div>

      {/* Right panel - form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-plum-600 to-magenta-500 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-ink-900">SkillForge</span>
          </Link>

          <h1 className="text-2xl font-bold text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Sign in to your SkillForge account</p>

          {/* Role toggle */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => setRole('student')}
              className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${role === 'student' ? 'border-plum-400 bg-plum-50 text-plum-700' : 'border-ink-200 text-ink-500 hover:border-ink-300'}`}
            >
              <Users className="h-4 w-4" />
              Student
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${role === 'admin' ? 'border-plum-400 bg-plum-50 text-plum-700' : 'border-ink-200 text-ink-500 hover:border-ink-300'}`}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin / TPO
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" className="input pl-11" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input pl-11" />
              </div>
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Demo access */}
          <div className="mt-6 rounded-xl border border-plum-100 bg-plum-50/50 p-4">
            <p className="text-xs font-medium text-plum-700">Quick demo access:</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => fillDemo('student')} className="flex-1 rounded-lg border border-plum-200 bg-white px-3 py-2 text-xs font-medium text-plum-600 hover:bg-plum-50">
                Student Demo
              </button>
              <button onClick={() => fillDemo('admin')} className="flex-1 rounded-lg border border-plum-200 bg-white px-3 py-2 text-xs font-medium text-plum-600 hover:bg-plum-50">
                Admin Demo
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-ink-500">
            Don't have an account? <Link to="/signup" className="font-semibold text-plum-600 hover:text-plum-700">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
