import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function ForCollegesSection() {
  return (
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
  );
}
