import type { SkillScore, SkillProgressPoint, MockAssessment } from '@/types';

export const studentProfile = {
  id: 'stu-001',
  email: 'arjun.sharma@university.edu',
  full_name: 'Arjun Sharma',
  role: 'student' as const,
  department: 'Computer Science',
  year: 'Final Year',
  avatar_url: '',
};

export const employabilityScore = 74;

export const placementReadiness = {
  level: 'Medium' as 'High' | 'Medium' | 'Low',
  percentage: 68,
  trend: '+8% from last month',
  predictedInWeeks: 6,
};

export const verifiedSkills: SkillScore[] = [
  { skill: 'Data Structures & Algorithms', score: 82, verified: true, category: 'DSA', evidence: 'LeetCode: 340 problems solved, GitHub: 12 repos' },
  { skill: 'SQL & Databases', score: 65, verified: true, category: 'Database', evidence: 'Certificate: PostgreSQL Essentials (expires 2026-03)' },
  { skill: 'React & Frontend', score: 78, verified: true, category: 'Web Development', evidence: 'GitHub: 8 React projects, mentor verified' },
  { skill: 'System Design', score: 45, verified: false, category: 'System Design' },
  { skill: 'Aptitude', score: 58, verified: true, category: 'Aptitude', evidence: 'Mock Round 1: 18/30 correct' },
  { skill: 'Communication', score: 72, verified: true, category: 'Communication', evidence: 'Mock Round 3: 7.2/10 from interviewer' },
  { skill: 'Cloud & DevOps', score: 38, verified: false, category: 'Cloud' },
  { skill: 'Node.js & Backend', score: 70, verified: true, category: 'Web Development', evidence: 'GitHub: 5 Node projects, mentor verified' },
];

export const skillProgress: SkillProgressPoint[] = [
  { month: 'Jun', score: 48, target: 80 },
  { month: 'Jul', score: 52, target: 80 },
  { month: 'Aug', score: 58, target: 80 },
  { month: 'Sep', score: 63, target: 80 },
  { month: 'Oct', score: 69, target: 80 },
  { month: 'Nov', score: 74, target: 80 },
];

export const mockAssessments: MockAssessment[] = [
  {
    id: 'mock-1',
    round: 1,
    title: 'Aptitude Test',
    date: '2026-11-08',
    score: 18,
    maxScore: 30,
    status: 'completed',
    duration: '45 min',
    feedback: 'Strong in logical reasoning. Needs improvement in quantitative aptitude — focus on time-speed-distance and probability.',
  },
  {
    id: 'mock-2',
    round: 2,
    title: 'Technical / Machine Coding',
    date: '2026-11-10',
    score: 22,
    maxScore: 30,
    status: 'completed',
    duration: '90 min',
    feedback: 'Good problem decomposition. Code quality above average. Needs work on edge case handling and test coverage.',
  },
  {
    id: 'mock-3',
    round: 3,
    title: 'Role-Based Interview',
    date: '2026-11-12',
    score: 7.2,
    maxScore: 10,
    status: 'completed',
    duration: '45 min',
    feedback: 'Clear communication on React concepts. Struggled with system design questions — recommended focused study.',
  },
  {
    id: 'mock-4',
    round: 1,
    title: 'Aptitude Test (Retake)',
    date: '2026-11-20',
    score: 0,
    maxScore: 30,
    status: 'upcoming',
    duration: '45 min',
  },
  {
    id: 'mock-5',
    round: 2,
    title: 'Technical Coding (Retake)',
    date: '2026-11-25',
    score: 0,
    maxScore: 30,
    status: 'upcoming',
    duration: '90 min',
  },
];
