import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { MockAssessment, SkillScore } from '@/types';
import { adminStudentRows, mockAssessments as initialMockAssessments } from '@/data/mockData';

export interface AdminStudent {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: string;
  employabilityScore: number;
  placementReadiness: 'high' | 'medium' | 'at-risk';
  skillsVerified: number;
  skillsTotal: number;
  lastAssessment: string;
  status: 'active' | 'inactive';
  flagged: boolean;
  skills: SkillScore[];
  certificates: string[];
  mockResults: MockAssessment[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  contactEmail: string;
  status: 'Pending' | 'Invited' | 'Replied' | 'Confirmed';
  deliveryStatus: 'Delivered' | 'Pending' | 'Failed';
  responseStatus: 'Awaiting' | 'Accepted' | 'Declined';
  lastSentDate?: string;
}

export interface OfferRecord {
  id: string;
  studentName: string;
  company: string;
  packageLpa: number;
  role: string;
  status: 'Offered' | 'Accepted' | 'Declined';
  date: string;
}

export type CalendarEventType =
  | 'Company Visit'
  | 'Placement Drive'
  | 'Shortlist'
  | 'Online Test'
  | 'Offline Test'
  | 'Interview'
  | 'Offer Announcement'
  | 'Other';

export type CalendarEventStatus = 'Scheduled' | 'Pending Confirmation' | 'Completed' | 'Cancelled';

export interface CalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  companyId: string;
  company: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  venue: string;
  description: string;
  selectedGroup: string;
  assignedOfficer: string;
  status: CalendarEventStatus;
  createdAt: string;
  updatedAt: string;
  extractedFromEmail?: boolean;
}

export interface EligibilityRule {
  id: string;
  name: string;
  company: string;
  minCgpa: number;
  maxBacklogs: number;
  requiredSkills: string[];
  active: boolean;
  version: string;
  updatedDate: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  studentName: string;
  action: string;
  reason: string;
  date: string;
}

interface AdminContextType {
  students: AdminStudent[];
  companies: Company[];
  invitationTemplate: { subject: string; body: string };
  offers: OfferRecord[];
  calendarEvents: CalendarEvent[];
  eligibilityRules: EligibilityRule[];
  auditLogs: AuditLog[];
  updateStudent: (id: string, updates: Partial<AdminStudent>) => void;
  toggleStudentStatus: (id: string) => void;
  toggleStudentFlag: (id: string) => void;
  addStudent: (student: Omit<AdminStudent, 'id'>) => void;
  updateInvitationTemplate: (subject: string, body: string) => void;
  sendBulkInvitations: (companyIds: string[]) => void;
  addCompany: (company: Omit<Company, 'id'>) => void;
  addOfferRecord: (offer: Omit<OfferRecord, 'id'>) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => { success: boolean; conflict?: string };
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => { success: boolean; conflict?: string };
  deleteCalendarEvent: (id: string) => void;
  approveEmailProposal: (id: string) => void;
  checkConflicts: (date: string, startTime: string, endTime: string, venue: string, officer: string, excludeId?: string) => string | null;
  overrideAIScore: (studentId: string, newScore: number, reason: string, adminName: string) => void;
  assignTraining: (studentId: string, program: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEY_STUDENTS = 'skillforge_admin_students_v5';
const STORAGE_KEY_COMPANIES = 'skillforge_admin_companies_v5';
const STORAGE_KEY_TEMPLATE = 'skillforge_admin_template_v5';
const STORAGE_KEY_OFFERS = 'skillforge_admin_offers_v5';
const STORAGE_KEY_EVENTS = 'skillforge_admin_events_v5';
const STORAGE_KEY_RULES = 'skillforge_admin_rules_v5';
const STORAGE_KEY_LOGS = 'skillforge_admin_logs_v5';

const defaultStudents: AdminStudent[] = adminStudentRows.map((s, idx) => ({
  id: s.id,
  name: s.name,
  email: `${s.name.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
  rollNumber: `CS2026${101 + idx}`,
  department: s.department,
  year: s.year,
  employabilityScore: s.employabilityScore,
  placementReadiness: s.placementReadiness,
  skillsVerified: s.skillsVerified,
  skillsTotal: s.skillsTotal,
  lastAssessment: s.lastAssessment,
  status: 'active',
  flagged: s.placementReadiness === 'at-risk',
  skills: [
    { skill: 'Data Structures & Algorithms', score: s.employabilityScore + 8 > 100 ? 95 : s.employabilityScore + 8, verified: true, category: 'DSA' },
    { skill: 'SQL & Databases', score: s.employabilityScore - 5 < 20 ? 35 : s.employabilityScore - 5, verified: true, category: 'Database' },
    { skill: 'React & Frontend', score: s.employabilityScore + 4 > 100 ? 90 : s.employabilityScore + 4, verified: true, category: 'Web Development' },
    { skill: 'System Design', score: s.employabilityScore - 15 < 15 ? 25 : s.employabilityScore - 15, verified: false, category: 'System Design' },
  ],
  certificates: ['PostgreSQL Essentials', 'React Advanced'],
  mockResults: initialMockAssessments,
}));

const defaultCompanies: Company[] = [
  { id: 'c1', name: 'Google', industry: 'Technology / Cloud', contactEmail: 'campus-recruiting@google.com', status: 'Confirmed', deliveryStatus: 'Delivered', responseStatus: 'Accepted' },
  { id: 'c2', name: 'Amazon', industry: 'E-Commerce / Cloud', contactEmail: 'university-hiring@amazon.com', status: 'Invited', deliveryStatus: 'Delivered', responseStatus: 'Awaiting' },
  { id: 'c3', name: 'Microsoft', industry: 'Software / AI', contactEmail: 'gradhires@microsoft.com', status: 'Confirmed', deliveryStatus: 'Delivered', responseStatus: 'Accepted' },
  { id: 'c4', name: 'Flipkart', industry: 'E-Commerce', contactEmail: 'campus@flipkart.com', status: 'Pending', deliveryStatus: 'Pending', responseStatus: 'Awaiting' },
  { id: 'c5', name: 'Goldman Sachs', industry: 'Fintech / Banking', contactEmail: 'campus-recruitment@gs.com', status: 'Invited', deliveryStatus: 'Delivered', responseStatus: 'Awaiting' },
];

const defaultTemplate = {
  subject: 'Invitation for Campus Placement Drive 2026 — SkillForge University',
  body: `Dear Campus Recruiting Team,\n\nWe cordially invite [Company Name] to participate in the SkillForge University Campus Placement Drive for the graduating class of 2026.\n\nOur students have undergone rigorous evidence-based skill verification and multi-round mock assessments in DSA, Full-Stack Engineering, and Cloud Architecture.\n\nPlease review our attached institutional accreditation report and let us know your preferred dates for Pre-Placement Talks and Online Assessments.\n\nWarm regards,\nTraining & Placement Office\nSkillForge University`,
};

const defaultOffers: OfferRecord[] = [
  { id: 'o1', studentName: 'Priya Patel', company: 'Google', packageLpa: 45.0, role: 'Software Engineer', status: 'Accepted', date: '2026-11-10' },
  { id: 'o2', studentName: 'Deepika Nair', company: 'Microsoft', packageLpa: 38.0, role: 'Cloud Engineer', status: 'Accepted', date: '2026-11-11' },
  { id: 'o3', studentName: 'Ananya Gupta', company: 'Amazon', packageLpa: 32.0, role: 'SDE-1', status: 'Offered', date: '2026-11-12' },
];

const defaultEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Google Campus Visit & Pre-Placement Talk',
    type: 'Company Visit',
    companyId: 'c1',
    company: 'Google',
    date: '2026-11-20',
    startTime: '10:00',
    endTime: '12:30',
    venue: 'Auditorium Hall A',
    description: 'Introduction to Google SDE roles and Q&A session with alumni.',
    selectedGroup: 'Computer Science Final Year',
    assignedOfficer: 'Dr. Priya Nair',
    status: 'Scheduled',
    createdAt: '2026-11-01',
    updatedAt: '2026-11-01',
  },
  {
    id: 'ev-2',
    title: 'Microsoft Online Technical Assessment',
    type: 'Online Test',
    companyId: 'c3',
    company: 'Microsoft',
    date: '2026-11-22',
    startTime: '14:00',
    endTime: '16:30',
    venue: 'Computer Lab 3 & Online Proctoring',
    description: 'Coding test covering DSA and system design fundamentals.',
    selectedGroup: 'All Eligible CS & IT Students',
    assignedOfficer: 'Prof. Rajesh Kumar',
    status: 'Scheduled',
    createdAt: '2026-11-02',
    updatedAt: '2026-11-02',
    extractedFromEmail: true,
  },
  {
    id: 'ev-3',
    title: 'Amazon Final Round Interviews',
    type: 'Interview',
    companyId: 'c2',
    company: 'Amazon',
    date: '2026-11-25',
    startTime: '09:00',
    endTime: '17:00',
    venue: 'Placement Cell Chambers 1-4',
    description: 'Bar-raiser and technical interviews for shortlisted candidates.',
    selectedGroup: 'Shortlisted Candidates (24 students)',
    assignedOfficer: 'Dr. Priya Nair',
    status: 'Pending Confirmation',
    createdAt: '2026-11-05',
    updatedAt: '2026-11-05',
    extractedFromEmail: true,
  },
];

const defaultRules: EligibilityRule[] = [
  { id: 'r1', name: 'Google Core SDE Rule', company: 'Google', minCgpa: 8.0, maxBacklogs: 0, requiredSkills: ['DSA', 'System Design'], active: true, version: 'v1.2', updatedDate: '2026-11-01' },
];

const defaultLogs: AuditLog[] = [
  { id: 'l1', adminName: 'Dr. Priya Nair', studentName: 'Priya Patel', action: 'Offer recorded: Google ₹45 LPA', reason: 'Accepted campus placement offer', date: '2026-11-10' },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<AdminStudent[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STUDENTS);
      return stored ? JSON.parse(stored) : defaultStudents;
    } catch {
      return defaultStudents;
    }
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COMPANIES);
      return stored ? JSON.parse(stored) : defaultCompanies;
    } catch {
      return defaultCompanies;
    }
  });

  const [invitationTemplate, setInvitationTemplate] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TEMPLATE);
      return stored ? JSON.parse(stored) : defaultTemplate;
    } catch {
      return defaultTemplate;
    }
  });

  const [offers, setOffers] = useState<OfferRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_OFFERS);
      return stored ? JSON.parse(stored) : defaultOffers;
    } catch {
      return defaultOffers;
    }
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_EVENTS);
      return stored ? JSON.parse(stored) : defaultEvents;
    } catch {
      return defaultEvents;
    }
  });

  const [eligibilityRules, setEligibilityRules] = useState<EligibilityRule[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RULES);
      return stored ? JSON.parse(stored) : defaultRules;
    } catch {
      return defaultRules;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LOGS);
      return stored ? JSON.parse(stored) : defaultLogs;
    } catch {
      return defaultLogs;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEMPLATE, JSON.stringify(invitationTemplate));
  }, [invitationTemplate]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RULES, JSON.stringify(eligibilityRules));
  }, [eligibilityRules]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const updateStudent = (id: string, updates: Partial<AdminStudent>) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const updated = { ...s, ...updates };
        if (updates.employabilityScore !== undefined) {
          const score = updates.employabilityScore;
          updated.placementReadiness = score >= 75 ? 'high' : score >= 55 ? 'medium' : 'at-risk';
        }
        return updated;
      })
    );
  };

  const toggleStudentStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    );
  };

  const toggleStudentFlag = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, flagged: !s.flagged } : s))
    );
  };

  const addStudent = (studentData: Omit<AdminStudent, 'id'>) => {
    const newStudent: AdminStudent = {
      ...studentData,
      id: `stu-${Date.now()}`,
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const updateInvitationTemplate = (subject: string, body: string) => {
    setInvitationTemplate({ subject, body });
  };

  const sendBulkInvitations = (companyIds: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    setCompanies((prev) =>
      prev.map((c) => {
        if (companyIds.includes(c.id) && c.status === 'Pending') {
          return { ...c, status: 'Invited', deliveryStatus: 'Delivered', responseStatus: 'Awaiting', lastSentDate: today };
        }
        return c;
      })
    );
  };

  const addCompany = (companyData: Omit<Company, 'id'>) => {
    const newCompany: Company = {
      ...companyData,
      id: `comp-${Date.now()}`,
    };
    setCompanies((prev) => [newCompany, ...prev]);
  };

  const addOfferRecord = (offerData: Omit<OfferRecord, 'id'>) => {
    const newOffer: OfferRecord = {
      ...offerData,
      id: `offer-${Date.now()}`,
    };
    setOffers((prev) => [newOffer, ...prev]);
  };

  // Conflict detection helper
  const checkConflicts = (date: string, startTime: string, endTime: string, venue: string, officer: string, excludeId?: string): string | null => {
    for (const ev of calendarEvents) {
      if (excludeId && ev.id === excludeId) continue;
      if (ev.status === 'Cancelled') continue;
      if (ev.date === date) {
        // Time overlap check
        const overlap = startTime < ev.endTime && endTime > ev.startTime;
        if (overlap) {
          if (ev.venue.toLowerCase() === venue.toLowerCase()) {
            return `Venue Conflict: "${venue}" is already booked by ${ev.company} (${ev.title}) at this time.`;
          }
          if (ev.assignedOfficer.toLowerCase() === officer.toLowerCase()) {
            return `Officer Conflict: Officer "${officer}" is already assigned to ${ev.company} (${ev.title}) at this time.`;
          }
        }
      }
    }
    return null;
  };

  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const conflict = checkConflicts(eventData.date, eventData.startTime, eventData.endTime, eventData.venue, eventData.assignedOfficer);
    if (conflict) {
      return { success: false, conflict };
    }
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setCalendarEvents((prev) => [newEvent, ...prev]);
    return { success: true };
  };

  const updateCalendarEvent = (id: string, updates: Partial<CalendarEvent>) => {
    const existing = calendarEvents.find((e) => e.id === id);
    if (!existing) return { success: false };

    const checkDate = updates.date ?? existing.date;
    const checkStart = updates.startTime ?? existing.startTime;
    const checkEnd = updates.endTime ?? existing.endTime;
    const checkVenue = updates.venue ?? existing.venue;
    const checkOfficer = updates.assignedOfficer ?? existing.assignedOfficer;

    const conflict = checkConflicts(checkDate, checkStart, checkEnd, checkVenue, checkOfficer, id);
    if (conflict) {
      return { success: false, conflict };
    }

    setCalendarEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : e))
    );
    return { success: true };
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const approveEmailProposal = (id: string) => {
    setCalendarEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'Scheduled', updatedAt: new Date().toISOString().split('T')[0] } : e))
    );
  };

  const overrideAIScore = (studentId: string, newScore: number, reason: string, adminName: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const oldScore = student.employabilityScore;
    updateStudent(studentId, { employabilityScore: newScore });
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        adminName,
        studentName: student.name,
        action: `AI Score Overridden: ${oldScore} → ${newScore}`,
        reason,
        date: new Date().toISOString().split('T')[0],
      },
      ...prev,
    ]);
  };

  const assignTraining = (studentId: string, program: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        adminName: 'Admin TPO',
        studentName: student.name,
        action: `Assigned Training: ${program}`,
        reason: 'Skill gap remediation',
        date: new Date().toISOString().split('T')[0],
      },
      ...prev,
    ]);
  };

  return (
    <AdminContext.Provider
      value={{
        students,
        companies,
        invitationTemplate,
        offers,
        calendarEvents,
        eligibilityRules,
        auditLogs,
        updateStudent,
        toggleStudentStatus,
        toggleStudentFlag,
        addStudent,
        updateInvitationTemplate,
        sendBulkInvitations,
        addCompany,
        addOfferRecord,
        addCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent,
        approveEmailProposal,
        checkConflicts,
        overrideAIScore,
        assignTraining,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
