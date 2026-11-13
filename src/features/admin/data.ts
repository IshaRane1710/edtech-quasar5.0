import type { AdminStudentRow } from '@/types';

export const adminStudentRows: AdminStudentRow[] = [
  { id: 's1', name: 'Arjun Sharma', department: 'Computer Science', year: 'Final Year', employabilityScore: 74, placementReadiness: 'medium', skillsVerified: 6, skillsTotal: 10, lastAssessment: '2026-11-12' },
  { id: 's2', name: 'Priya Patel', department: 'Computer Science', year: 'Final Year', employabilityScore: 88, placementReadiness: 'high', skillsVerified: 9, skillsTotal: 10, lastAssessment: '2026-11-11' },
  { id: 's3', name: 'Rohan Verma', department: 'Electronics', year: 'Pre-Final Year', employabilityScore: 42, placementReadiness: 'at-risk', skillsVerified: 3, skillsTotal: 10, lastAssessment: '2026-11-05' },
  { id: 's4', name: 'Sneha Reddy', department: 'Computer Science', year: 'Final Year', employabilityScore: 81, placementReadiness: 'high', skillsVerified: 7, skillsTotal: 10, lastAssessment: '2026-11-10' },
  { id: 's5', name: 'Karthik Iyer', department: 'Mechanical', year: 'Final Year', employabilityScore: 38, placementReadiness: 'at-risk', skillsVerified: 2, skillsTotal: 10, lastAssessment: '2026-10-28' },
  { id: 's6', name: 'Ananya Gupta', department: 'Information Tech', year: 'Final Year', employabilityScore: 79, placementReadiness: 'medium', skillsVerified: 6, skillsTotal: 10, lastAssessment: '2026-11-09' },
  { id: 's7', name: 'Vikram Singh', department: 'Computer Science', year: 'Pre-Final Year', employabilityScore: 55, placementReadiness: 'medium', skillsVerified: 4, skillsTotal: 10, lastAssessment: '2026-11-07' },
  { id: 's8', name: 'Deepika Nair', department: 'Information Tech', year: 'Final Year', employabilityScore: 91, placementReadiness: 'high', skillsVerified: 9, skillsTotal: 10, lastAssessment: '2026-11-12' },
  { id: 's9', name: 'Arnav Joshi', department: 'Electronics', year: 'Final Year', employabilityScore: 48, placementReadiness: 'at-risk', skillsVerified: 3, skillsTotal: 10, lastAssessment: '2026-10-30' },
  { id: 's10', name: 'Ishita Mehta', department: 'Computer Science', year: 'Pre-Final Year', employabilityScore: 67, placementReadiness: 'medium', skillsVerified: 5, skillsTotal: 10, lastAssessment: '2026-11-08' },
  { id: 's11', name: 'Rahul Krishnan', department: 'Mechanical', year: 'Final Year', employabilityScore: 61, placementReadiness: 'medium', skillsVerified: 4, skillsTotal: 10, lastAssessment: '2026-11-06' },
  { id: 's12', name: 'Kavya Rao', department: 'Information Tech', year: 'Pre-Final Year', employabilityScore: 85, placementReadiness: 'high', skillsVerified: 8, skillsTotal: 10, lastAssessment: '2026-11-11' },
];

export const departmentAnalytics = [
  { department: 'Computer Science', avgScore: 72, students: 45, placed: 28 },
  { department: 'Information Tech', avgScore: 78, students: 32, placed: 22 },
  { department: 'Electronics', avgScore: 48, students: 28, placed: 8 },
  { department: 'Mechanical', avgScore: 52, students: 22, placed: 6 },
];

export const placementReadinessDistribution = [
  { name: 'High', value: 35, color: '#10b981' },
  { name: 'Medium', value: 45, color: '#f59e0b' },
  { name: 'At Risk', value: 20, color: '#ef4444' },
];

export const companySkillGaps = [
  { company: 'Google', skill: 'System Design', gap: 62, demand: 95, supply: 33 },
  { company: 'Amazon', skill: 'DSA', gap: 25, demand: 90, supply: 65 },
  { company: 'Microsoft', skill: 'Cloud & DevOps', gap: 55, demand: 85, supply: 30 },
  { company: 'Flipkart', skill: 'System Design', gap: 48, demand: 80, supply: 32 },
  { company: 'Goldman Sachs', skill: 'Aptitude', gap: 35, demand: 88, supply: 53 },
];

export const skillHeatmapData: { student: string; scores: Record<string, number> }[] = [
  { student: 'Arjun S.', scores: { DSA: 82, 'Web Dev': 78, Database: 65, 'System Design': 45, Aptitude: 58, Cloud: 38, Communication: 72 } },
  { student: 'Priya P.', scores: { DSA: 90, 'Web Dev': 85, Database: 88, 'System Design': 75, Aptitude: 82, Cloud: 70, Communication: 88 } },
  { student: 'Rohan V.', scores: { DSA: 45, 'Web Dev': 38, Database: 42, 'System Design': 25, Aptitude: 35, Cloud: 20, Communication: 48 } },
  { student: 'Sneha R.', scores: { DSA: 85, 'Web Dev': 82, Database: 75, 'System Design': 60, Aptitude: 72, Cloud: 55, Communication: 80 } },
  { student: 'Karthik I.', scores: { DSA: 35, 'Web Dev': 30, Database: 40, 'System Design': 20, Aptitude: 42, Cloud: 15, Communication: 50 } },
  { student: 'Ananya G.', scores: { DSA: 78, 'Web Dev': 80, Database: 72, 'System Design': 55, Aptitude: 65, Cloud: 48, Communication: 76 } },
  { student: 'Vikram S.', scores: { DSA: 62, 'Web Dev': 58, Database: 55, 'System Design': 38, Aptitude: 50, Cloud: 30, Communication: 60 } },
  { student: 'Deepika N.', scores: { DSA: 92, 'Web Dev': 88, Database: 90, 'System Design': 82, Aptitude: 85, Cloud: 78, Communication: 90 } },
];

export const interventionStudents = [
  { id: 's3', name: 'Rohan Verma', department: 'Electronics', score: 42, gap: 'System Design, Cloud, DSA', recommendation: 'Enroll in DSA fundamentals + Cloud crash course' },
  { id: 's5', name: 'Karthik Iyer', department: 'Mechanical', score: 38, gap: 'All technical skills below 50%', recommendation: 'Full foundation bootcamp + aptitude sprint' },
  { id: 's9', name: 'Arnav Joshi', department: 'Electronics', score: 48, gap: 'Web Dev, Database, System Design', recommendation: 'Web development track + SQL practice' },
];

export const fairnessMetrics = [
  { metric: 'Gender Distribution', value: '52% F / 48% M', status: 'balanced' as const },
  { metric: 'Department Coverage', value: '4 departments', status: 'balanced' as const },
  { metric: 'Assessment Completion', value: '87%', status: 'good' as const },
  { metric: 'Score Variance by Dept', value: 'Low (σ=12)', status: 'good' as const },
  { metric: 'AI Override Rate', value: '3.2%', status: 'good' as const },
  { metric: 'Appeal Resolution Time', value: '2.1 days avg', status: 'good' as const },
];
