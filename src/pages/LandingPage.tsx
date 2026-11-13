import { Link } from 'react-router-dom';
import {
  ShieldCheck, Gauge, Brain, Route, BarChart3, Scale,
  Upload, Rocket, Users, BadgeCheck, TrendingUp, Building,
  ArrowRight, Sparkles, CheckCircle2, Star, Quote,
} from 'lucide-react';
import { LandingNavbar, LandingFooter } from '@/components/LandingLayout';
import { stats, landingFeatures, howItWorks, testimonials } from '@/data/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': ShieldCheck, gauge: Gauge, brain: Brain, route: Route,
  'bar-chart-3': BarChart3, scale: Scale, upload: Upload, rocket: Rocket,
  users: Users, 'badge-check': BadgeCheck, 'trending-up': TrendingUp, building: Building,
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero */}
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

      {/* Stats */}
      <section className="border-y border-ink-200 bg-ink-50/50 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={s.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-plum-500 to-magenta-500 text-white shadow-lg shadow-plum-500/20">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink-900">{s.value}</p>
                  <p className="text-sm text-ink-500">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold text-plum-600">FEATURES</span>
            <h2 className="mt-2 text-3xl font-bold text-ink-900 lg:text-4xl">Everything you need for placement success</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-500">From evidence-based skill verification to AI-powered placement predictions — SkillForge covers the entire employability journey.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {landingFeatures.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                <div key={f.title} className="card card-hover group">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-gradient-to-b from-plum-50/30 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold text-plum-600">PROCESS</span>
            <h2 className="mt-2 text-3xl font-bold text-ink-900 lg:text-4xl">How It Works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-ink-500">Four connected stages that take students from raw data to placement readiness.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <div key={step.stage} className="relative">
                  {i < howItWorks.length - 1 && (
                    <div className="absolute left-full top-12 hidden h-px w-full bg-gradient-to-r from-plum-300 to-transparent lg:block" />
                  )}
                  <div className="card card-hover h-full">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-extrabold text-plum-200">{step.stage}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-plum-500 to-magenta-500 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-ink-500">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Students */}
      <section id="students" className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-plum-600">FOR STUDENTS</span>
              <h2 className="mt-2 text-3xl font-bold text-ink-900 lg:text-4xl">Know exactly where you stand</h2>
              <p className="mt-4 text-ink-600">No more guessing what companies want. Get a clear, evidence-backed picture of your skills and a roadmap to close every gap.</p>
              <ul className="mt-6 space-y-3">
                {[
                  'Verified skill profile from GitHub, LeetCode, and certificates',
                  'Multi-round mock assessments that simulate real placements',
                  'AI-generated personal report with transparent scoring',
                  'Personalized learning path that adapts as you progress',
                  'Track your employability score trend over time',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-sm text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="mt-8 btn-primary">Start as Student <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <span className="text-2xl font-bold text-emerald-600">82</span>
                </div>
                <p className="mt-2 text-sm font-medium text-ink-700">DSA Score</p>
                <p className="text-xs text-emerald-600">Verified</p>
              </div>
              <div className="card text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                  <span className="text-2xl font-bold text-amber-600">58</span>
                </div>
                <p className="mt-2 text-sm font-medium text-ink-700">Aptitude</p>
                <p className="text-xs text-amber-600">Needs Work</p>
              </div>
              <div className="card text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-plum-50">
                  <span className="text-2xl font-bold text-plum-600">74</span>
                </div>
                <p className="mt-2 text-sm font-medium text-ink-700">Employability</p>
                <p className="text-xs text-plum-600">+8% trend</p>
              </div>
              <div className="card text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
                  <span className="text-2xl font-bold text-rose-600">45</span>
                </div>
                <p className="mt-2 text-sm font-medium text-ink-700">System Design</p>
                <p className="text-xs text-rose-600">Gap Identified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Colleges */}
      <section id="colleges" className="bg-gradient-to-b from-white to-plum-50/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
              <div className="card">
                <p className="text-3xl font-bold gradient-text">127</p>
                <p className="mt-1 text-sm text-ink-500">Registered Students</p>
              </div>
              <div className="card">
                <p className="text-3xl font-bold gradient-text">68%</p>
                <p className="mt-1 text-sm text-ink-500">Avg Employability</p>
              </div>
              <div className="card">
                <p className="text-3xl font-bold text-emerald-600">87%</p>
                <p className="mt-1 text-sm text-ink-500">Placement Rate</p>
              </div>
              <div className="card">
                <p className="text-3xl font-bold text-amber-600">23</p>
                <p className="mt-1 text-sm text-ink-500">Need Intervention</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold text-plum-600">FOR COLLEGES & TPOS</span>
              <h2 className="mt-2 text-3xl font-bold text-ink-900 lg:text-4xl">Cohort intelligence at your fingertips</h2>
              <p className="mt-4 text-ink-600">Track department-wise performance, identify at-risk students before it's too late, and understand exactly what companies are looking for.</p>
              <ul className="mt-6 space-y-3">
                {[
                  'Department-wise and cohort skill heatmaps',
                  'Company skill gap analysis — know what top recruiters demand',
                  'Automatic intervention alerts for at-risk students',
                  'Fairness and bias monitoring across all demographics',
                  'Human override for any AI-generated recommendation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-plum-600" />
                    <span className="text-sm text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="mt-8 btn-primary">Set Up for Your College <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold text-plum-600">SUCCESS STORIES</span>
            <h2 className="mt-2 text-3xl font-bold text-ink-900 lg:text-4xl">Students who landed their dream offers</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div key={t.name} className="card card-hover">
                <Quote className="h-8 w-8 text-plum-200" />
                <p className="mt-3 text-sm text-ink-700">{t.quote}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-plum-500 to-magenta-500 text-sm font-semibold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-emerald-600">{t.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-plum-700 via-plum-800 to-magenta-700 p-12 text-center shadow-2xl shadow-plum-500/20 lg:p-16">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">Ready to prove your skills?</h2>
          <p className="mx-auto mt-3 max-w-xl text-plum-100">Join SkillForge today and transform your learning into a placement-ready profile.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-plum-700 shadow-lg transition-all hover:-translate-y-0.5">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
