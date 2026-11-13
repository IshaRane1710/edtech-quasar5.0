import { useState } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui';
import { adminStudentRows } from '@/features/admin/data';

export function StudentsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [readinessFilter, setReadinessFilter] = useState('all');

  const filteredStudents = adminStudentRows.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || s.department === deptFilter;
    const matchesReadiness = readinessFilter === 'all' || s.placementReadiness === readinessFilter;
    return matchesSearch && matchesDept && matchesReadiness;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students..."
              className="input pl-10 py-2.5"
            />
          </div>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="input w-auto py-2.5">
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Tech">Information Tech</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
          </select>
          <select value={readinessFilter} onChange={(e) => setReadinessFilter(e.target.value)} className="input w-auto py-2.5">
            <option value="all">All Readiness</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="at-risk">At Risk</option>
          </select>
          <span className="text-sm text-ink-500">{filteredStudents.length} students</span>
        </div>
      </div>

      {/* Student table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left">
              <th className="pb-3 text-xs font-semibold text-ink-500">Student</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Department</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Year</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Employability</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Skills Verified</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Readiness</th>
              <th className="pb-3 text-xs font-semibold text-ink-500">Last Assessment</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-plum-500 to-magenta-500 text-xs font-semibold text-white">
                      {s.name.charAt(0)}
                    </div>
                    <span className="font-medium text-ink-900">{s.name}</span>
                  </div>
                </td>
                <td className="py-3 text-ink-600">{s.department}</td>
                <td className="py-3 text-ink-600">{s.year}</td>
                <td className="py-3">
                  <span className={`font-bold ${s.employabilityScore >= 75 ? 'text-emerald-600' : s.employabilityScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {s.employabilityScore}
                  </span>
                </td>
                <td className="py-3 text-ink-600">{s.skillsVerified}/{s.skillsTotal}</td>
                <td className="py-3">
                  <Badge variant={s.placementReadiness === 'high' ? 'success' : s.placementReadiness === 'medium' ? 'warning' : 'error'}>
                    {s.placementReadiness === 'at-risk' ? 'At Risk' : s.placementReadiness}
                  </Badge>
                </td>
                <td className="py-3 text-xs text-ink-500">{s.lastAssessment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
