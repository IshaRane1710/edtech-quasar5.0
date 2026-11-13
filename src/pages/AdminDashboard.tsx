import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, AlertTriangle, BarChart3, Building2,
  Search, ShieldCheck, Eye,
  Plus, Edit, Calendar, Download, Check, X, Mail, Send,
  Briefcase, Award, FileText, UserCheck, UserX, Trash2, Clock, MapPin,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { AppShell } from '@/components/AppShell';
import { SectionHeader, Badge, StatCard } from '@/components/ui';
import { useAdmin, type AdminStudent, type CalendarEvent, type CalendarEventType, type CalendarEventStatus } from '@/context/AdminContext';
import {
  departmentAnalytics, placementReadinessDistribution,
  companySkillGaps,
} from '@/data/mockData';

type AdminModule =
  | 'overview'
  | 'students'
  | 'companies'
  | 'drives'
  | 'calendar'
  | 'offers'
  | 'reports'
  | 'settings';

export function AdminDashboard() {
  const { tab: paramTab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const {
    students, companies, invitationTemplate, offers, calendarEvents,
    updateStudent, toggleStudentStatus,
    addStudent, updateInvitationTemplate, sendBulkInvitations, addCompany,
    addOfferRecord, addCalendarEvent, updateCalendarEvent, deleteCalendarEvent,
    approveEmailProposal,
  } = useAdmin();

  const getModuleFromParam = (p?: string): AdminModule => {
    switch (p) {
      case 'students': return 'students';
      case 'companies': return 'companies';
      case 'drives': return 'drives';
      case 'calendar': return 'calendar';
      case 'offers': return 'offers';
      case 'reports': return 'reports';
      case 'settings': return 'settings';
      default: return 'overview';
    }
  };

  const [module, setModule] = useState<AdminModule>(getModuleFromParam(paramTab));
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [readinessFilter, setReadinessFilter] = useState('all');

  // Calendar sub-view state
  const [calendarView, setCalendarView] = useState<'upcoming' | 'monthly' | 'weekly' | 'daily'>('upcoming');

  // Modals
  const [selectedStudent, setSelectedStudent] = useState<AdminStudent | null>(null);
  const [editStudentModal, setEditStudentModal] = useState<AdminStudent | null>(null);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [addOfferModal, setAddOfferModal] = useState(false);
  const [addDriveModal, setAddDriveModal] = useState(false);

  // Calendar Event Modal & Details
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState<CalendarEvent | null>(null);
  const [viewEventModal, setViewEventModal] = useState<CalendarEvent | null>(null);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // New Event Form State (11 fields)
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    type: 'Company Visit' as CalendarEventType,
    companyId: companies[0]?.id || '',
    company: companies[0]?.name || 'Google',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '12:00',
    venue: 'Auditorium Hall A',
    description: '',
    selectedGroup: 'Computer Science Final Year',
    assignedOfficer: 'Dr. Priya Nair',
    status: 'Scheduled' as CalendarEventStatus,
  });

  // Template editing state
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [templateSubject, setTemplateSubject] = useState(invitationTemplate.subject);
  const [templateBody, setTemplateBody] = useState(invitationTemplate.body);

  // New forms state
  const [newStudentForm, setNewStudentForm] = useState({
    name: '', email: '', rollNumber: '', department: 'Computer Science', year: 'Final Year', employabilityScore: 70,
  });
  const [newCompanyForm, setNewCompanyForm] = useState({
    name: '', industry: 'Technology', contactEmail: '',
  });
  const [newOfferForm, setNewOfferForm] = useState({
    studentName: students[0]?.name || '', company: 'Google', packageLpa: 35.0, role: 'Software Engineer', status: 'Offered' as const,
  });

  useEffect(() => {
    setModule(getModuleFromParam(paramTab));
  }, [paramTab]);

  const totalStudents = students.length;
  const avgScore = totalStudents > 0 ? Math.round(students.reduce((sum, s) => sum + s.employabilityScore, 0) / totalStudents) : 0;
  const atRisk = students.filter((s) => s.placementReadiness === 'at-risk').length;
  const highReadiness = students.filter((s) => s.placementReadiness === 'high').length;
  const placedCount = offers.filter((o) => o.status === 'Accepted' || o.status === 'Offered').length;

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || s.department === deptFilter;
    const matchesReadiness = readinessFilter === 'all' || s.placementReadiness === readinessFilter;
    return matchesSearch && matchesDept && matchesReadiness;
  });

  function eventTypeBadgeVariant(type: CalendarEventType) {
    switch (type) {
      case 'Company Visit': return 'plum';
      case 'Placement Drive': return 'success';
      case 'Online Test':
      case 'Offline Test': return 'warning';
      case 'Interview': return 'error';
      case 'Offer Announcement': return 'success';
      default: return 'plum';
    }
  }

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictWarning(null);
    const res = addCalendarEvent(newEventForm);
    if (!res.success) {
      setConflictWarning(res.conflict || 'Scheduling conflict detected.');
      return;
    }
    setAddEventModal(false);
    setNewEventForm({
      title: '',
      type: 'Company Visit',
      companyId: companies[0]?.id || '',
      company: companies[0]?.name || 'Google',
      date: new Date().toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '12:00',
      venue: 'Auditorium Hall A',
      description: '',
      selectedGroup: 'Computer Science Final Year',
      assignedOfficer: 'Dr. Priya Nair',
      status: 'Scheduled',
    });
  };

  const handleEditEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEventModal) return;
    setConflictWarning(null);
    const res = updateCalendarEvent(editEventModal.id, editEventModal);
    if (!res.success) {
      setConflictWarning(res.conflict || 'Scheduling conflict detected.');
      return;
    }
    setEditEventModal(null);
  };

  return (
    <AppShell>
      {/* 1. OVERVIEW MODULE */}
      {module === 'overview' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Dashboard Overview</h1>
              <p className="text-sm text-ink-500">Key placement statistics, cohort readiness, and pending institutional actions.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate('/admin/calendar')} className="btn-primary text-xs flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> View Calendar
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Registered Students" value={totalStudents} icon={Users} accent="plum" />
            <StatCard label="Average Employability Score" value={avgScore} icon={TrendingUp} accent="magenta" />
            <StatCard label="Students Placed / Offered" value={placedCount} icon={Award} accent="emerald" />
            <StatCard label="Students At Risk" value={atRisk} icon={AlertTriangle} accent="amber" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <SectionHeader title="Placement Readiness Distribution" icon={BarChart3} />
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={placementReadinessDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3}>
                    {placementReadinessDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <SectionHeader title="Department-wise Performance" icon={Building2} />
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={departmentAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="department" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="students" fill="#9333ea" radius={[8, 8, 0, 0]} name="Total Students" />
                  <Bar dataKey="placed" fill="#10b981" radius={[8, 8, 0, 0]} name="Placed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 2. STUDENT MANAGEMENT MODULE */}
      {module === 'students' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Student Management</h1>
              <p className="text-sm text-ink-500">View student records, eligibility status, profile evidence, and placement readiness.</p>
            </div>
            <button onClick={() => setAddStudentModal(true)} className="btn-primary text-xs flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add Student Record
            </button>
          </div>

          <div className="card">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, roll number..."
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

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="pb-3 text-xs font-semibold text-ink-500">Student</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Roll No</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Department</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Employability</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Readiness</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500 text-right">Actions</th>
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
                        <div>
                          <button onClick={() => setSelectedStudent(s)} className="font-medium text-ink-900 hover:text-plum-600 text-left">
                            {s.name}
                          </button>
                          <p className="text-xs text-ink-400">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-ink-600 font-mono">{s.rollNumber}</td>
                    <td className="py-3 text-ink-600">{s.department} · {s.year}</td>
                    <td className="py-3">
                      <span className={`font-bold ${s.employabilityScore >= 75 ? 'text-emerald-600' : s.employabilityScore >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {s.employabilityScore}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge variant={s.placementReadiness === 'high' ? 'success' : s.placementReadiness === 'medium' ? 'warning' : 'error'}>
                        {s.placementReadiness === 'at-risk' ? 'At Risk' : s.placementReadiness}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setSelectedStudent(s)} title="View Profile" className="rounded-lg p-1.5 text-ink-500 hover:bg-plum-50 hover:text-plum-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => setEditStudentModal(s)} title="Edit Record" className="rounded-lg p-1.5 text-ink-500 hover:bg-plum-50 hover:text-plum-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => toggleStudentStatus(s.id)} title={s.status === 'active' ? 'Deactivate' : 'Activate'} className="rounded-lg p-1.5 text-ink-500 hover:bg-rose-50 hover:text-rose-600">
                          {s.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. COMPANY MANAGEMENT MODULE */}
      {module === 'companies' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Company Management & Invitations</h1>
              <p className="text-sm text-ink-500">Manage company database, edit invitation templates, and send bulk invitations in 1 click.</p>
            </div>
            <button onClick={() => setAddCompanyModal(true)} className="btn-primary text-xs flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add Company
            </button>
          </div>

          <div className="card border border-plum-100 bg-gradient-to-br from-plum-50/30 to-magenta-50/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-plum-600" />
                <h3 className="text-base font-bold text-ink-900">Bulk Invitation Email Template</h3>
              </div>
              <button
                onClick={() => {
                  if (isEditingTemplate) {
                    updateInvitationTemplate(templateSubject, templateBody);
                  }
                  setIsEditingTemplate(!isEditingTemplate);
                }}
                className="btn-secondary text-xs"
              >
                {isEditingTemplate ? 'Save Template' : 'Edit Template'}
              </button>
            </div>
            {isEditingTemplate ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">Subject Line</label>
                  <input value={templateSubject} onChange={(e) => setTemplateSubject(e.target.value)} className="input bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">Email Body</label>
                  <textarea rows={5} value={templateBody} onChange={(e) => setTemplateBody(e.target.value)} className="input bg-white py-2 font-mono text-xs" />
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-white p-4 border border-plum-100 shadow-sm">
                <p className="text-sm font-semibold text-ink-900 mb-1">Subject: {invitationTemplate.subject}</p>
                <p className="text-xs text-ink-600 whitespace-pre-line font-mono mt-2">{invitationTemplate.body}</p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  const pendingIds = companies.filter((c) => c.status === 'Pending').map((c) => c.id);
                  if (pendingIds.length === 0) {
                    alert('All eligible companies have already been invited.');
                    return;
                  }
                  sendBulkInvitations(pendingIds);
                  alert(`Successfully dispatched invitations to ${pendingIds.length} eligible companies!`);
                }}
                className="btn-primary text-xs flex items-center gap-1.5"
              >
                <Send className="h-4 w-4" /> Send to All Pending Companies ({companies.filter(c => c.status === 'Pending').length})
              </button>
            </div>
          </div>

          <div className="card overflow-x-auto">
            <SectionHeader title="Company Database & Response Tracking" subtitle="Track delivery, replies, pending responses, and confirmation status" icon={Building2} />
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="pb-3 text-xs font-semibold text-ink-500">Company Name</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Industry</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Contact Email</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Invitation Status</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Delivery</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Response</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((comp) => (
                  <tr key={comp.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                    <td className="py-3 font-semibold text-ink-900">{comp.name}</td>
                    <td className="py-3 text-ink-600">{comp.industry}</td>
                    <td className="py-3 text-ink-500 text-xs font-mono">{comp.contactEmail}</td>
                    <td className="py-3">
                      <Badge variant={comp.status === 'Confirmed' ? 'success' : comp.status === 'Invited' ? 'plum' : 'warning'}>
                        {comp.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-medium ${comp.deliveryStatus === 'Delivered' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {comp.deliveryStatus}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-bold ${comp.responseStatus === 'Accepted' ? 'text-emerald-600' : 'text-ink-500'}`}>
                        {comp.responseStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. PLACEMENT DRIVES MODULE */}
      {module === 'drives' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Placement Drives</h1>
              <p className="text-sm text-ink-500">Create drives, manage student registrations, shortlists, tests, and interviews.</p>
            </div>
            <button onClick={() => navigate('/admin/calendar')} className="btn-primary text-xs flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Open Calendar & Add Event
            </button>
          </div>

          <div className="card">
            <SectionHeader title="Active Placement Drives Overview" icon={Briefcase} />
            <div className="space-y-3 mt-4">
              {calendarEvents.map((ev) => (
                <div key={ev.id} className="rounded-xl border border-ink-200 p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-900">{ev.title}</span>
                      <Badge variant={eventTypeBadgeVariant(ev.type)}>{ev.type}</Badge>
                      <Badge variant={ev.status === 'Scheduled' ? 'success' : 'warning'}>{ev.status}</Badge>
                    </div>
                    <p className="text-xs text-ink-500 mt-1">{ev.company} · {ev.date} ({ev.startTime} - {ev.endTime}) · Venue: {ev.venue}</p>
                  </div>
                  <button onClick={() => setViewEventModal(ev)} className="btn-secondary text-xs">View Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. CALENDAR & SCHEDULING MODULE (FULLY FUNCTIONAL WITH ADD, EDIT, DELETE, CONFLICT DETECTION, EMAIL PROPOSALS) */}
      {module === 'calendar' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Centralized Placement Calendar</h1>
              <p className="text-sm text-ink-500">Manage company visits, tests, interviews, and offers with automatic date/time conflict detection.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl bg-ink-200 p-1 text-xs">
                {(['upcoming', 'monthly', 'weekly', 'daily'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setCalendarView(v)}
                    className={`rounded-lg px-3 py-1.5 font-medium capitalize transition-all ${calendarView === v ? 'bg-white text-plum-700 shadow-sm' : 'text-ink-600 hover:text-ink-900'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button onClick={() => { setConflictWarning(null); setAddEventModal(true); }} className="btn-primary text-xs flex items-center gap-1.5">
                <Plus className="h-4 w-4" /> + Add Event
              </button>
            </div>
          </div>

          {/* Email-Based Automated Scheduling Proposals (if any pending confirmation) */}
          {calendarEvents.some((e) => e.status === 'Pending Confirmation') && (
            <div className="card border border-amber-200 bg-amber-50/40">
              <SectionHeader title="Incoming Company Email Proposals (Pending Confirmation)" subtitle="Automatically extracted from connected email (tpo@university.edu). Officer confirmation required before adding to calendar." icon={Mail} />
              <div className="space-y-3 mt-4">
                {calendarEvents.filter((e) => e.status === 'Pending Confirmation').map((prop) => (
                  <div key={prop.id} className="rounded-xl bg-white p-4 border border-amber-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink-900">{prop.title}</span>
                        <Badge variant="warning">Email Extracted</Badge>
                      </div>
                      <p className="text-xs text-ink-600 mt-1">{prop.company} proposed: <strong>{prop.date}</strong> at <strong>{prop.startTime} - {prop.endTime}</strong> ({prop.venue})</p>
                      <p className="text-xs text-ink-500 mt-0.5">Assigned Officer: {prop.assignedOfficer} · Group: {prop.selectedGroup}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => approveEmailProposal(prop.id)} className="btn-primary text-xs flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Approve & Schedule
                      </button>
                      <button onClick={() => setEditEventModal(prop)} className="btn-secondary text-xs">Edit / Reschedule</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar Events List / Grid */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-ink-900 capitalize">{calendarView} Events Schedule ({calendarEvents.length})</h3>
              <span className="text-xs text-ink-400">All bookings validated against officer, venue & student availability</span>
            </div>
            <div className="space-y-3">
              {calendarEvents.map((ev) => (
                <div key={ev.id} className="rounded-xl border border-ink-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-plum-200 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-plum-50 text-plum-700">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-ink-900">{ev.title}</span>
                        <Badge variant={eventTypeBadgeVariant(ev.type)}>{ev.type}</Badge>
                        <Badge variant={ev.status === 'Scheduled' ? 'success' : ev.status === 'Completed' ? 'plum' : 'warning'}>{ev.status}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-500">
                        <span className="flex items-center gap-1 font-medium text-ink-700"><Building2 className="h-3.5 w-3.5 text-plum-500" /> {ev.company}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-ink-400" /> {ev.date} ({ev.startTime} - {ev.endTime})</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-ink-400" /> {ev.venue}</span>
                      </div>
                      <p className="mt-1 text-xs text-ink-400">Assigned Officer: {ev.assignedOfficer} · Target: {ev.selectedGroup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button onClick={() => setViewEventModal(ev)} className="btn-secondary text-xs">View</button>
                    <button onClick={() => setEditEventModal(ev)} className="btn-secondary text-xs">Edit</button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${ev.title}"?`)) {
                          deleteCalendarEvent(ev.id);
                        }
                      }}
                      className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50"
                      title="Delete Event"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. OFFERS & RESULTS MODULE */}
      {module === 'offers' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Offers & Placement Results</h1>
              <p className="text-sm text-ink-500">Track selected students, official offer packages, acceptance statuses, and placement records.</p>
            </div>
            <button onClick={() => setAddOfferModal(true)} className="btn-primary text-xs flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Record New Offer
            </button>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="pb-3 text-xs font-semibold text-ink-500">Student Name</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Company</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Role</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Package (LPA)</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Status</th>
                  <th className="pb-3 text-xs font-semibold text-ink-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                    <td className="py-3 font-semibold text-ink-900">{offer.studentName}</td>
                    <td className="py-3 text-ink-700">{offer.company}</td>
                    <td className="py-3 text-ink-600">{offer.role}</td>
                    <td className="py-3 font-bold text-plum-600">₹{offer.packageLpa.toFixed(1)} LPA</td>
                    <td className="py-3">
                      <Badge variant={offer.status === 'Accepted' ? 'success' : 'plum'}>{offer.status}</Badge>
                    </td>
                    <td className="py-3 text-xs text-ink-500">{offer.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. REPORTS & ANALYTICS MODULE */}
      {module === 'reports' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Reports & Analytics</h1>
              <p className="text-sm text-ink-500">NAAC / NIRF accreditation reports, placement statistics, company-wise reports, and downloadable documentation.</p>
            </div>
            <button onClick={() => alert('NAAC / NIRF accreditation report PDF generated successfully.')} className="btn-primary text-xs flex items-center gap-1.5">
              <Download className="h-4 w-4" /> Download Accreditation PDF
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card">
              <p className="text-xs text-ink-500">Highest Salary Offered</p>
              <p className="text-3xl font-bold text-plum-600 mt-1">₹45.0 LPA</p>
            </div>
            <div className="card">
              <p className="text-xs text-ink-500">Average Salary</p>
              <p className="text-3xl font-bold text-magenta-600 mt-1">₹14.5 LPA</p>
            </div>
            <div className="card">
              <p className="text-xs text-ink-500">Placement Percentage</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">87.4%</p>
            </div>
          </div>

          <div className="card">
            <SectionHeader title="Company-wise Placement Summary" icon={Building2} />
            <div className="space-y-3 mt-4">
              {[
                { company: 'Google', offers: 12, avgPackage: '₹42 LPA' },
                { company: 'Microsoft', offers: 18, avgPackage: '₹36 LPA' },
                { company: 'Amazon', offers: 24, avgPackage: '₹28 LPA' },
                { company: 'Flipkart', offers: 15, avgPackage: '₹24 LPA' },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border border-ink-200 p-3 flex items-center justify-between">
                  <span className="font-semibold text-ink-900">{c.company}</span>
                  <div className="flex gap-4 text-xs text-ink-600">
                    <span>Offers: <strong>{c.offers}</strong></span>
                    <span>Avg Pkg: <strong className="text-plum-600">{c.avgPackage}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. SETTINGS & ACCESS CONTROL MODULE */}
      {module === 'settings' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-ink-900">Settings & Access Control</h1>
            <p className="text-sm text-ink-500">Admin accounts, T&P officer permissions, connected email integration, and system settings.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <SectionHeader title="T&P Officer Permissions" icon={ShieldCheck} />
              <div className="space-y-3 mt-4">
                {[
                  { name: 'Dr. Priya Nair', role: 'Head T&P Officer', access: 'Full Administrative Access' },
                  { name: 'Prof. Rajesh Kumar', role: 'Placement Coordinator', access: 'Student Management & Calendar' },
                  { name: 'Admin TPO', role: 'System Administrator', access: 'Full System & Rule Config' },
                ].map((admin, i) => (
                  <div key={i} className="rounded-xl border border-ink-200 p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{admin.name}</p>
                      <p className="text-xs text-ink-500">{admin.role}</p>
                    </div>
                    <Badge variant="plum">{admin.access}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <SectionHeader title="Connected Email Integration" icon={Mail} />
              <div className="space-y-4 mt-4 text-sm">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                  <p className="font-semibold text-emerald-800">Connected Institutional Account</p>
                  <p className="text-xs text-emerald-700 mt-0.5">tpo@university.edu (IMAP / Exchange Active)</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-700 text-xs">Automated Email Slot Extraction</span>
                  <span className="text-xs font-bold text-emerald-600">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* 1. ADD EVENT MODAL (11 FIELDS + CONFLICT DETECTION) */}
      {addEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="card w-full max-w-xl bg-white p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ink-900">Schedule Placement Calendar Event</h2>
              <button onClick={() => setAddEventModal(false)} className="text-ink-400 hover:text-ink-600">✕</button>
            </div>

            {conflictWarning && (
              <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{conflictWarning}</span>
              </div>
            )}

            <form onSubmit={handleAddEventSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">1. Event Title</label>
                <input required value={newEventForm.title} onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })} placeholder="Google SDE Technical Drive" className="input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">2. Event Type</label>
                  <select
                    value={newEventForm.type}
                    onChange={(e) => setNewEventForm({ ...newEventForm, type: e.target.value as CalendarEventType })}
                    className="input"
                  >
                    <option value="Company Visit">Company Visit</option>
                    <option value="Placement Drive">Placement Drive</option>
                    <option value="Shortlist">Shortlist</option>
                    <option value="Online Test">Online Test</option>
                    <option value="Offline Test">Offline Test</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer Announcement">Offer Announcement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">3. Select Company</label>
                  <select
                    value={newEventForm.companyId}
                    onChange={(e) => {
                      const comp = companies.find((c) => c.id === e.target.value);
                      setNewEventForm({
                        ...newEventForm,
                        companyId: e.target.value,
                        company: comp ? comp.name : 'Google',
                      });
                    }}
                    className="input"
                  >
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">4. Event Date</label>
                  <input type="date" required value={newEventForm.date} onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">5. Start Time</label>
                  <input type="time" required value={newEventForm.startTime} onChange={(e) => setNewEventForm({ ...newEventForm, startTime: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">6. End Time</label>
                  <input type="time" required value={newEventForm.endTime} onChange={(e) => setNewEventForm({ ...newEventForm, endTime: e.target.value })} className="input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">7. Venue / Location</label>
                  <input required value={newEventForm.venue} onChange={(e) => setNewEventForm({ ...newEventForm, venue: e.target.value })} placeholder="Auditorium Hall A" className="input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">10. Responsible Officer</label>
                  <select value={newEventForm.assignedOfficer} onChange={(e) => setNewEventForm({ ...newEventForm, assignedOfficer: e.target.value })} className="input">
                    <option value="Dr. Priya Nair">Dr. Priya Nair</option>
                    <option value="Prof. Rajesh Kumar">Prof. Rajesh Kumar</option>
                    <option value="Admin TPO">Admin TPO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">9. Select Students / Eligible Group</label>
                <input value={newEventForm.selectedGroup} onChange={(e) => setNewEventForm({ ...newEventForm, selectedGroup: e.target.value })} placeholder="Computer Science Final Year" className="input" />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">8. Description / Instructions</label>
                <textarea rows={2} value={newEventForm.description} onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })} placeholder="Bring college ID and updated resume..." className="input py-2" />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">11. Event Status</label>
                <select value={newEventForm.status} onChange={(e) => setNewEventForm({ ...newEventForm, status: e.target.value as CalendarEventStatus })} className="input">
                  <option value="Scheduled">Scheduled</option>
                  <option value="Pending Confirmation">Pending Confirmation</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setAddEventModal(false)} className="btn-ghost text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Save & Validate Conflicts</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT EVENT MODAL */}
      {editEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="card w-full max-w-xl bg-white p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ink-900">Edit / Reschedule Calendar Event</h2>
              <button onClick={() => setEditEventModal(null)} className="text-ink-400 hover:text-ink-600">✕</button>
            </div>

            {conflictWarning && (
              <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{conflictWarning}</span>
              </div>
            )}

            <form onSubmit={handleEditEventSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Event Title</label>
                <input required value={editEventModal.title} onChange={(e) => setEditEventModal({ ...editEventModal, title: e.target.value })} className="input" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">Date</label>
                  <input type="date" required value={editEventModal.date} onChange={(e) => setEditEventModal({ ...editEventModal, date: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">Start Time</label>
                  <input type="time" required value={editEventModal.startTime} onChange={(e) => setEditEventModal({ ...editEventModal, startTime: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-700 mb-1">End Time</label>
                  <input type="time" required value={editEventModal.endTime} onChange={(e) => setEditEventModal({ ...editEventModal, endTime: e.target.value })} className="input" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Venue</label>
                <input required value={editEventModal.venue} onChange={(e) => setEditEventModal({ ...editEventModal, venue: e.target.value })} className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Status</label>
                <select value={editEventModal.status} onChange={(e) => setEditEventModal({ ...editEventModal, status: e.target.value as CalendarEventStatus })} className="input">
                  <option value="Scheduled">Scheduled</option>
                  <option value="Pending Confirmation">Pending Confirmation</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditEventModal(null)} className="btn-ghost text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Update Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. VIEW EVENT DETAILS MODAL */}
      {viewEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-lg bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant={eventTypeBadgeVariant(viewEventModal.type)}>{viewEventModal.type}</Badge>
                <h2 className="text-xl font-bold text-ink-900 mt-1">{viewEventModal.title}</h2>
                <p className="text-xs text-plum-600 font-medium">{viewEventModal.company}</p>
              </div>
              <button onClick={() => setViewEventModal(null)} className="text-ink-400 hover:text-ink-600">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-ink-50 p-3 space-y-1.5">
                <p className="text-xs text-ink-600"><strong>Date & Time:</strong> {viewEventModal.date} ({viewEventModal.startTime} - {viewEventModal.endTime})</p>
                <p className="text-xs text-ink-600"><strong>Venue:</strong> {viewEventModal.venue}</p>
                <p className="text-xs text-ink-600"><strong>Assigned Officer:</strong> {viewEventModal.assignedOfficer}</p>
                <p className="text-xs text-ink-600"><strong>Target Group:</strong> {viewEventModal.selectedGroup}</p>
                <p className="text-xs text-ink-600"><strong>Status:</strong> {viewEventModal.status}</p>
              </div>
              {viewEventModal.description && (
                <div>
                  <p className="text-xs font-semibold text-ink-700">Instructions / Description</p>
                  <p className="text-xs text-ink-600 mt-0.5">{viewEventModal.description}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => { setEditEventModal(viewEventModal); setViewEventModal(null); }} className="btn-secondary text-xs">Edit Event</button>
              <button onClick={() => setViewEventModal(null)} className="btn-primary text-xs">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* OTHER MODALS (Add Student, Company, Offer) */}
      {addStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-md bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-ink-900 mb-4">Add Student Record</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newStudentForm.name || !newStudentForm.email) return;
              addStudent({
                ...newStudentForm,
                placementReadiness: newStudentForm.employabilityScore >= 75 ? 'high' : newStudentForm.employabilityScore >= 55 ? 'medium' : 'at-risk',
                skillsVerified: 5,
                skillsTotal: 10,
                lastAssessment: new Date().toISOString().split('T')[0],
                status: 'active',
                flagged: newStudentForm.employabilityScore < 50,
                skills: [{ skill: 'DSA', score: newStudentForm.employabilityScore, verified: true, category: 'DSA' }],
                certificates: ['PostgreSQL Essentials'],
                mockResults: [],
              });
              setAddStudentModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Full Name</label>
                <input required value={newStudentForm.name} onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })} placeholder="Rahul Sharma" className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Email</label>
                <input required type="email" value={newStudentForm.email} onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })} placeholder="rahul@university.edu" className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Roll Number</label>
                <input required value={newStudentForm.rollNumber} onChange={(e) => setNewStudentForm({ ...newStudentForm, rollNumber: e.target.value })} placeholder="CS2026199" className="input" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setAddStudentModal(false)} className="btn-ghost text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-md bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-ink-900 mb-4">Add Company to Database</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newCompanyForm.name || !newCompanyForm.contactEmail) return;
              addCompany({ ...newCompanyForm, status: 'Pending', deliveryStatus: 'Pending', responseStatus: 'Awaiting' });
              setAddCompanyModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Company Name</label>
                <input required value={newCompanyForm.name} onChange={(e) => setNewCompanyForm({ ...newCompanyForm, name: e.target.value })} placeholder="Adobe" className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Contact Email</label>
                <input required type="email" value={newCompanyForm.contactEmail} onChange={(e) => setNewCompanyForm({ ...newCompanyForm, contactEmail: e.target.value })} placeholder="campus@adobe.com" className="input" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setAddCompanyModal(false)} className="btn-ghost text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Save Company</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-md bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-ink-900 mb-4">Record Placement Offer</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              addOfferRecord({ ...newOfferForm, date: new Date().toISOString().split('T')[0] });
              setAddOfferModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Student Name</label>
                <select value={newOfferForm.studentName} onChange={(e) => setNewOfferForm({ ...newOfferForm, studentName: e.target.value })} className="input">
                  {students.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.department})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Company</label>
                <input required value={newOfferForm.company} onChange={(e) => setNewOfferForm({ ...newOfferForm, company: e.target.value })} className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-700 mb-1">Package (LPA)</label>
                <input type="number" step="0.5" value={newOfferForm.packageLpa} onChange={(e) => setNewOfferForm({ ...newOfferForm, packageLpa: Number(e.target.value) })} className="input" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setAddOfferModal(false)} className="btn-ghost text-xs">Cancel</button>
                <button type="submit" className="btn-primary text-xs">Record Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm p-4">
          <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-plum-500 to-magenta-500 text-xl font-bold text-white">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">{selectedStudent.name}</h2>
                  <p className="text-xs text-ink-500">{selectedStudent.email} · Roll: {selectedStudent.rollNumber}</p>
                  <p className="text-xs text-plum-600 font-medium">{selectedStudent.department} · {selectedStudent.year}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100">✕</button>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedStudent(null)} className="btn-primary text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
