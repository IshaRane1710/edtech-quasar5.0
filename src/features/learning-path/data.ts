import type { LearningRecommendation } from '@/types';

export const learningRecommendations: LearningRecommendation[] = [
  { id: 'lr-1', skill: 'System Design', title: 'System Design Fundamentals', description: 'Learn scalable architecture patterns, load balancing, caching, and database sharding through real-world case studies.', type: 'course', difficulty: 'intermediate', estimatedHours: 20, progress: 15, completed: false },
  { id: 'lr-2', skill: 'Cloud & DevOps', title: 'AWS Cloud Practitioner Essentials', description: 'Understand core AWS services, deployment, CI/CD pipelines, and infrastructure as code.', type: 'course', difficulty: 'beginner', estimatedHours: 15, progress: 0, completed: false },
  { id: 'lr-3', skill: 'Aptitude', title: 'Quantitative Aptitude Sprint', description: 'Practice 200+ quantitative problems covering time-speed-distance, probability, and number series.', type: 'practice', difficulty: 'intermediate', estimatedHours: 10, progress: 40, completed: false },
  { id: 'lr-4', skill: 'DSA', title: 'Advanced DSA Challenge Set', description: 'Solve 50 hard-level problems on graphs, DP, and trees to push your contest rating above 1800.', type: 'challenge', difficulty: 'advanced', estimatedHours: 25, progress: 60, completed: false },
  { id: 'lr-5', skill: 'Communication', title: 'Mock Interview Practice Sessions', description: 'Participate in 5 peer-to-peer mock interviews focusing on system design and behavioral questions.', type: 'mock-interview', difficulty: 'intermediate', estimatedHours: 8, progress: 0, completed: false },
  { id: 'lr-6', skill: 'System Design', title: 'Design a Chat System — Case Study', description: 'Walk through designing WhatsApp/Telegram: message queue, real-time delivery, presence, scaling.', type: 'course', difficulty: 'advanced', estimatedHours: 5, progress: 0, completed: false },
];
