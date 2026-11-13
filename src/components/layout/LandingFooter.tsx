import { GraduationCap } from 'lucide-react';

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
