import type { ExplainabilityFactor } from '@/types';

export const employabilityTrend = [
  { month: 'Jun', score: 48, predicted: 55 },
  { month: 'Jul', score: 52, predicted: 58 },
  { month: 'Aug', score: 58, predicted: 62 },
  { month: 'Sep', score: 63, predicted: 66 },
  { month: 'Oct', score: 69, predicted: 71 },
  { month: 'Nov', score: 74, predicted: 76 },
  { month: 'Dec', score: null, predicted: 79 },
  { month: 'Jan', score: null, predicted: 83 },
];

export const explainabilityFactors: ExplainabilityFactor[] = [
  { factor: 'Verified Skills (Weight: 35%)', contribution: 26, description: '6 out of 10 skills verified with evidence. Strong DSA and Frontend.', evidence: 'LeetCode 340 problems, 8 React repos, mentor sign-off on 6 skills' },
  { factor: 'Mock Assessment Scores (Weight: 25%)', contribution: 17, description: 'Average mock score: 73%. Aptitude is the weakest round.', evidence: 'Round 1: 60%, Round 2: 73%, Round 3: 72%' },
  { factor: 'Learning Progress (Weight: 20%)', contribution: 16, description: 'Consistent upward trend (+26 points over 6 months).', evidence: 'Score improved from 48 → 74. Active learning path engagement.' },
  { factor: 'Project Quality (Weight: 12%)', contribution: 9, description: '5 projects, 3 full-stack with good code quality.', evidence: 'GitHub: 42 repos, 340 commits, code reviewed by mentor' },
  { factor: 'Communication (Weight: 8%)', contribution: 6, description: 'Above-average interview communication.', evidence: 'Mock interview: 7.2/10, clear articulation of concepts' },
];
