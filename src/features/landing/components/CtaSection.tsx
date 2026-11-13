import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
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
  );
}
