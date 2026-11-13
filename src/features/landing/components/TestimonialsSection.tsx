import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/features/landing/data';

export function TestimonialsSection() {
  return (
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
  );
}
