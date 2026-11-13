import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

export function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await signUp(email, password, fullName, role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch {
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
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
          <h2 className="text-4xl font-bold leading-tight text-white">Start your placement journey today.</h2>
          <p className="mt-4 text-lg text-plum-100">Join thousands of students who verified their skills, closed their gaps, and landed their dream offers.</p>
          <ul className="mt-8 space-y-3">
            {['Evidence-based skill verification', 'AI-powered placement readiness score', 'Personalized learning paths', 'Mock placement assessments'].map((f) => (
              <li key={f} className="flex items-center gap-3 text-plum-100">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20"><ArrowRight className="h-3 w-3 text-white" /></div>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-plum-200">© 2026 SkillForge</p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-plum-600 to-magenta-500 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-ink-900">SkillForge</span>
          </Link>

          <h1 className="text-2xl font-bold text-ink-900">Create your account</h1>
          <p className="mt-1 text-sm text-ink-500">Get started with SkillForge in minutes</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={() => setRole('student')} className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${role === 'student' ? 'border-plum-400 bg-plum-50 text-plum-700' : 'border-ink-200 text-ink-500 hover:border-ink-300'}`}>
              <Users className="h-4 w-4" /> Student
            </button>
            <button onClick={() => setRole('admin')} className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${role === 'admin' ? 'border-plum-400 bg-plum-50 text-plum-700' : 'border-ink-200 text-ink-500 hover:border-ink-300'}`}>
              <ShieldCheck className="h-4 w-4" /> Admin / TPO
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Arjun Sharma" className="input pl-11" />
              </div>
            </div>
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
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="input pl-11" />
              </div>
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Create Account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            Already have an account? <Link to="/login" className="font-semibold text-plum-600 hover:text-plum-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
