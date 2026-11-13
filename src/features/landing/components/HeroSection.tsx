import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero-pattern pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-plum-50/50 via-white to-white" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-plum-200 bg-plum-50 px-4 py-1.5 text-sm font-medium text-plum-700">
              <Sparkles className="h-4 w-4" />
              AI-Powered Employability Platform
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 lg:text-5xl xl:text-6xl">
              From Learning Skills<br />to <span className="gradient-text">Landing Careers.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-600">
              An AI-powered platform that evaluates real-world skills, identifies learning gaps, and predicts placement readiness — with evidence behind every score.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary text-base">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="btn-secondary text-base">Explore Features</a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-ink-500">
              <div className="flex -space-x-2">
                {['A', 'D', 'S', 'V'].map((c, i) => (
                  <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white ${['bg-plum-500', 'bg-magenta-500', 'bg-pink-500', 'bg-plum-600'][i]}`}>{c}</div>
                ))}
              </div>
              <span>Trusted by <strong className="text-ink-700">12,000+</strong> students</span>
            </div>
          </div>

          {/* Hero visual - dashboard preview card */}
          <div className="relative animate-fade-in-up animate-delay-200">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-plum-200/40 to-magenta-200/40 blur-2xl" />
            <div className="relative rounded-2xl border border-ink-200/60 bg-white p-6 shadow-2xl shadow-plum-500/10">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-ink-400">Employability Dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col items-center rounded-xl bg-gradient-to-br from-plum-50 to-magenta-50 p-4">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <svg className="h-20 w-20 -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#9333ea" strokeWidth="8" strokeDasharray="213.6" strokeDashoffset="55.5" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-xl font-bold text-plum-700">74</span>
                  </div>
                  <span className="mt-1 text-xs text-ink-500">Employability</span>
                </div>
                <div className="col-span-2 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs"><span className="text-ink-600">DSA</span><span className="font-semibold text-emerald-600">82%</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink-200"><div className="h-1.5 rounded-full bg-emerald-500" style={{ width: '82%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs"><span className="text-ink-600">React</span><span className="font-semibold text-emerald-600">78%</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink-200"><div className="h-1.5 rounded-full bg-emerald-500" style={{ width: '78%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs"><span className="text-ink-600">System Design</span><span className="font-semibold text-rose-600">45%</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink-200"><div className="h-1.5 rounded-full bg-rose-500" style={{ width: '45%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs"><span className="text-ink-600">Cloud</span><span className="font-semibold text-rose-600">38%</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink-200"><div className="h-1.5 rounded-full bg-rose-500" style={{ width: '38%' }} /></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs text-amber-800"><strong>AI Insight:</strong> System Design and Cloud are your key gaps. Focus on these to reach 85+ readiness.</p>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -right-4 top-20 animate-float rounded-xl border border-ink-200 bg-white px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-ink-700">6 Skills Verified</span>
              </div>
            </div>
            <div className="absolute -left-4 bottom-20 animate-float animate-delay-300 rounded-xl border border-ink-200 bg-white px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-plum-600" />
                <span className="text-xs font-medium text-ink-700">+26 pts in 6 months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
