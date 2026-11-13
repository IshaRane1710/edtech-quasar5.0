import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function ForStudentsSection() {
  return (
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
  );
}
