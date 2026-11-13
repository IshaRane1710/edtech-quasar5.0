export type UserRole = 'student' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  department?: string;
  year?: string;
  created_at?: string;
}

export interface SkillScore {
  skill: string;
  score: number;
  verified: boolean;
  category: SkillCategory;
  evidence?: string;
}

export type SkillCategory =
  | 'DSA'
  | 'Aptitude'
  | 'Communication'
  | 'System Design'
  | 'Web Development'
  | 'Database'
  | 'Cloud'
  | 'Projects';

export interface SkillProgressPoint {
  month: string;
  score: number;
  target: number;
}

export interface MockAssessment {
  id: string;
  round: number;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  status: 'completed' | 'upcoming' | 'in-progress';
  duration: string;
  feedback?: string;
}

export interface DataSource {
  id: string;
  type: 'github' | 'leetcode' | 'project' | 'certificate' | 'mentor';
  label: string;
  connected: boolean;
  lastSynced?: string;
  detail?: string;
  url?: string;
}

export interface CompetencySkill {
  skill: string;
  category: SkillCategory;
  claimedLevel: number;
  verifiedLevel: number;
  verified: boolean;
  evidence: string;
  certExpiry?: string;
}

export interface MockQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningRecommendation {
  id: string;
  skill: string;
  title: string;
  description: string;
  type: 'course' | 'practice' | 'mock-interview' | 'challenge';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  progress: number;
  completed: boolean;
}

export interface AdminStudentRow {
  id: string;
  name: string;
  department: string;
  year: string;
  employabilityScore: number;
  placementReadiness: 'high' | 'medium' | 'at-risk';
  skillsVerified: number;
  skillsTotal: number;
  lastAssessment: string;
}

export interface HeatmapCell {
  skill: string;
  students: { name: string; score: number }[];
}

export interface ExplainabilityFactor {
  factor: string;
  contribution: number;
  description: string;
  evidence: string;
}
