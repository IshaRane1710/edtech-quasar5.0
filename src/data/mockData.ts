import type {
  SkillScore,
  SkillProgressPoint,
  MockAssessment,
  DataSource,
  CompetencySkill,
  LearningRecommendation,
  AdminStudentRow,
  ExplainabilityFactor,
} from '@/types';

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

export const dataSources: DataSource[] = [
  {
    id: 'ds-1',
    type: 'github',
    label: 'GitHub Profile',
    connected: true,
    lastSynced: '2026-11-13T08:00:00Z',
    detail: 'arjun-sharma-dev — 42 repos, 340 commits this year',
    url: 'https://github.com/arjun-sharma-dev',
  },
  {
    id: 'ds-2',
    type: 'leetcode',
    label: 'LeetCode Profile',
    connected: true,
    lastSynced: '2026-11-13T08:00:00Z',
    detail: '340 problems solved — 120 Easy, 160 Medium, 60 Hard',
    url: 'https://leetcode.com/arjun_sharma',
  },
  {
    id: 'ds-3',
    type: 'project',
    label: 'Projects Portfolio',
    connected: true,
    lastSynced: '2026-11-12T10:00:00Z',
    detail: '5 projects uploaded — 3 full-stack, 2 ML',
  },
  {
    id: 'ds-4',
    type: 'certificate',
    label: 'Certificates',
    connected: true,
    lastSynced: '2026-11-10T14:00:00Z',
    detail: '4 certificates — 3 verified, 1 pending mentor sign-off',
  },
  {
    id: 'ds-5',
    type: 'mentor',
    label: 'Mentor Verification',
    connected: true,
    lastSynced: '2026-11-11T16:00:00Z',
    detail: 'Mentor: Dr. Priya Nair — 6 skills verified',
  },
];

export const competencySkills: CompetencySkill[] = [
  { skill: 'React & Frontend', category: 'Web Development', claimedLevel: 4, verifiedLevel: 4, verified: true, evidence: '8 GitHub repos, mentor verified', certExpiry: undefined },
  { skill: 'Node.js & Backend', category: 'Web Development', claimedLevel: 3, verifiedLevel: 3, verified: true, evidence: '5 Node projects, code reviewed by mentor' },
  { skill: 'DSA', category: 'DSA', claimedLevel: 4, verifiedLevel: 4, verified: true, evidence: 'LeetCode 340 problems, contest rating 1650' },
  { skill: 'SQL & Databases', category: 'Database', claimedLevel: 3, verifiedLevel: 3, verified: true, evidence: 'PostgreSQL Essentials Certificate', certExpiry: '2026-03-15' },
  { skill: 'Communication', category: 'Communication', claimedLevel: 3, verifiedLevel: 3, verified: true, evidence: 'Mock interview scored 7.2/10' },
  { skill: 'Aptitude', category: 'Aptitude', claimedLevel: 3, verifiedLevel: 2, verified: true, evidence: 'Mock Round 1: 18/30' },
  { skill: 'System Design', category: 'System Design', claimedLevel: 2, verifiedLevel: 1, verified: false, evidence: 'No evidence submitted' },
  { skill: 'Cloud & DevOps', category: 'Cloud', claimedLevel: 2, verifiedLevel: 0, verified: false, evidence: 'No evidence submitted' },
  { skill: 'Python', category: 'Projects', claimedLevel: 4, verifiedLevel: 3, verified: true, evidence: '2 ML projects on GitHub' },
  { skill: 'TypeScript', category: 'Web Development', claimedLevel: 4, verifiedLevel: 4, verified: true, evidence: 'Used across 8 repos' },
];

export const aptitudeQuestions = [
  { id: 1, question: 'A train 150m long passes a pole in 15 seconds. What is the speed of the train?', options: ['36 km/h', '40 km/h', '45 km/h', '50 km/h'], correctIndex: 0, explanation: 'Speed = 150/15 = 10 m/s = 36 km/h' },
  { id: 2, question: 'If 20% of a number is 60, what is 150% of that number?', options: ['300', '450', '400', '350'], correctIndex: 1, explanation: 'Number = 60/0.2 = 300; 150% of 300 = 450' },
  { id: 3, question: 'Find the next number: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctIndex: 1, explanation: 'Differences: 4, 6, 8, 10, 12 → 30+12=42' },
  { id: 4, question: 'A and B can do a job in 12 and 18 days respectively. How long together?', options: ['7.2 days', '6 days', '7.5 days', '8 days'], correctIndex: 0, explanation: '1/12 + 1/18 = 5/36 → 36/5 = 7.2 days' },
  { id: 5, question: 'What is the probability of getting a sum of 7 with two dice?', options: ['1/6', '1/8', '1/12', '1/4'], correctIndex: 0, explanation: '6 favorable outcomes out of 36 → 1/6' },
  { id: 6, question: 'If x + 1/x = 3, find x² + 1/x²', options: ['7', '9', '8', '11'], correctIndex: 0, explanation: '(x+1/x)² = 9 = x² + 2 + 1/x² → x²+1/x² = 7' },
  { id: 7, question: 'A shopkeeper marks goods 40% above cost and gives 10% discount. Profit %?', options: ['26%', '30%', '24%', '20%'], correctIndex: 0, explanation: 'CP=100, MP=140, SP=126 → 26% profit' },
  { id: 8, question: 'Complete: ACF, BDG, CEH, ?', options: ['DFI', 'DEI', 'DGI', 'DFJ'], correctIndex: 0, explanation: 'Each letter shifts +1: DFI' },
  { id: 9, question: 'A clock shows 3:15. What is the angle between the hour and minute hands?', options: ['7.5°', '0°', '15°', '10°'], correctIndex: 0, explanation: 'Hour hand at 97.5°, minute at 90° → 7.5°' },
  { id: 10, question: '5 workers complete a task in 10 days. How many days for 2 workers?', options: ['25 days', '20 days', '15 days', '30 days'], correctIndex: 0, explanation: '5×10 = 2×x → x = 25' },
  { id: 11, question: 'If a:b = 3:4 and b:c = 8:9, find a:c', options: ['2:3', '3:5', '6:9', '1:1'], correctIndex: 0, explanation: 'a:b:c = 6:8:9 → a:c = 6:9 = 2:3' },
  { id: 12, question: 'Average of 5 consecutive even numbers is 16. Find the largest.', options: ['20', '18', '22', '24'], correctIndex: 0, explanation: 'Numbers: 12,14,16,18,20 → largest is 20' },
  { id: 13, question: 'If today is Monday, what day will it be 100 days from now?', options: ['Wednesday', 'Thursday', 'Tuesday', 'Friday'], correctIndex: 0, explanation: '100 mod 7 = 2 → Monday + 2 = Wednesday' },
  { id: 14, question: 'Simple interest on Rs. 5000 at 8% for 3 years?', options: ['1200', '1000', '1400', '1500'], correctIndex: 0, explanation: 'SI = 5000 × 0.08 × 3 = 1200' },
  { id: 15, question: 'A bag has 3 red and 5 blue balls. Probability of drawing red?', options: ['3/8', '5/8', '3/5', '1/3'], correctIndex: 0, explanation: '3 red out of 8 total = 3/8' },
  { id: 16, question: 'If log₂(x) = 5, find x', options: ['32', '25', '10', '64'], correctIndex: 0, explanation: 'x = 2⁵ = 32' },
  { id: 17, question: 'In a code, COMPUTER is PMOCRETU. How is KEYBOARD written?', options: ['DRABYEK', 'KEYDRAB', 'BOARDKEY', 'DRABYEK '], correctIndex: 0, explanation: 'Reverse the word → DRABYEK' },
  { id: 18, question: 'A circle has radius 7cm. Area? (π = 22/7)', options: ['154 cm²', '144 cm²', '164 cm²', '134 cm²'], correctIndex: 0, explanation: 'πr² = 22/7 × 49 = 154' },
  { id: 19, question: 'A man walks 3km north, 4km east. Distance from start?', options: ['5 km', '7 km', '6 km', '4.5 km'], correctIndex: 0, explanation: '√(9+16) = 5 km' },
  { id: 20, question: 'What comes next: Z, X, V, T, R, ?', options: ['P', 'Q', 'O', 'N'], correctIndex: 0, explanation: 'Each letter skips one backwards: Z(-2)X(-2)V(-2)T(-2)R(-2)P' },
];

export const technicalQuestions = [
  { id: 1, question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctIndex: 1, explanation: 'Binary search halves the search space each step → O(log n)' },
  { id: 2, question: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctIndex: 1, explanation: 'Queue follows First-In-First-Out order' },
  { id: 3, question: 'In React, what does useState return?', options: ['A state value only', 'A setter function only', 'An array of [value, setter]', 'A promise'], correctIndex: 2, explanation: 'useState returns [currentState, stateSetter] as an array' },
  { id: 4, question: 'What is the SQL clause to filter grouped results?', options: ['WHERE', 'HAVING', 'GROUP BY', 'FILTER'], correctIndex: 1, explanation: 'HAVING filters after GROUP BY aggregation' },
  { id: 5, question: 'What does REST stand for?', options: ['Remote Event State Transfer', 'Representational State Transfer', 'Reliable Enterprise Service Transport', 'Request Event State Transfer'], correctIndex: 1, explanation: 'REST = Representational State Transfer' },
  { id: 6, question: 'Which is NOT a valid HTTP method?', options: ['GET', 'POST', 'FETCH', 'DELETE'], correctIndex: 2, explanation: 'FETCH is not an HTTP method; it is a browser API' },
  { id: 7, question: 'What is the worst-case time complexity of QuickSort?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], correctIndex: 1, explanation: 'QuickSort worst case (poor pivot) is O(n²)' },
  { id: 8, question: 'In JavaScript, what does "===" check?', options: ['Value only', 'Type only', 'Value and type', 'Reference only'], correctIndex: 2, explanation: 'Strict equality checks both value and type' },
  { id: 9, question: 'What is a closure in JavaScript?', options: ['A function with no return', 'A function plus its lexical scope', 'A way to close arrays', 'A type of loop'], correctIndex: 1, explanation: 'A closure is a function bundled with references to its surrounding scope' },
  { id: 10, question: 'Which CSS property creates a flex container?', options: ['display: block', 'display: flex', 'flex-direction', 'flexbox'], correctIndex: 1, explanation: 'display: flex makes an element a flex container' },
];

export const interviewQuestions = [
  { id: 1, question: 'Tell me about a challenging project you worked on. What was your role?', type: 'behavioral' as const, idealPoints: ['Clear project description', 'Specific role and contributions', 'Challenge and how it was overcome', 'Measurable outcome'] },
  { id: 2, question: 'Explain how you would design a URL shortener like bit.ly.', type: 'system-design' as const, idealPoints: ['Requirements gathering', 'High-level architecture', 'Database design (key-value)', 'Scaling considerations', 'Collision handling'] },
  { id: 3, question: 'What happens when you type a URL in the browser and press enter?', type: 'technical' as const, idealPoints: ['DNS resolution', 'TCP handshake', 'HTTP request', 'Server processing', 'Rendering pipeline'] },
  { id: 4, question: 'How do you handle conflicts in a team?', type: 'behavioral' as const, idealPoints: ['Active listening', 'Empathy', 'Constructive communication', 'Finding common ground', 'Concrete example'] },
  { id: 5, question: 'Difference between SQL and NoSQL. When would you choose each?', type: 'technical' as const, idealPoints: ['Structured vs unstructured', 'ACID vs BASE', 'Schema flexibility', 'Scalability differences', 'Use case examples'] },
];

export const learningRecommendations: LearningRecommendation[] = [
  { id: 'lr-1', skill: 'System Design', title: 'System Design Fundamentals', description: 'Learn scalable architecture patterns, load balancing, caching, and database sharding through real-world case studies.', type: 'course', difficulty: 'intermediate', estimatedHours: 20, progress: 15, completed: false },
  { id: 'lr-2', skill: 'Cloud & DevOps', title: 'AWS Cloud Practitioner Essentials', description: 'Understand core AWS services, deployment, CI/CD pipelines, and infrastructure as code.', type: 'course', difficulty: 'beginner', estimatedHours: 15, progress: 0, completed: false },
  { id: 'lr-3', skill: 'Aptitude', title: 'Quantitative Aptitude Sprint', description: 'Practice 200+ quantitative problems covering time-speed-distance, probability, and number series.', type: 'practice', difficulty: 'intermediate', estimatedHours: 10, progress: 40, completed: false },
  { id: 'lr-4', skill: 'DSA', title: 'Advanced DSA Challenge Set', description: 'Solve 50 hard-level problems on graphs, DP, and trees to push your contest rating above 1800.', type: 'challenge', difficulty: 'advanced', estimatedHours: 25, progress: 60, completed: false },
  { id: 'lr-5', skill: 'Communication', title: 'Mock Interview Practice Sessions', description: 'Participate in 5 peer-to-peer mock interviews focusing on system design and behavioral questions.', type: 'mock-interview', difficulty: 'intermediate', estimatedHours: 8, progress: 0, completed: false },
  { id: 'lr-6', skill: 'System Design', title: 'Design a Chat System — Case Study', description: 'Walk through designing WhatsApp/Telegram: message queue, real-time delivery, presence, scaling.', type: 'course', difficulty: 'advanced', estimatedHours: 5, progress: 0, completed: false },
];

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

export const testimonials = [
  { name: 'Sneha Reddy', role: 'Final Year, CS', quote: 'SkillForge identified my weakness in System Design before placements. The personalized learning path helped me close the gap in 6 weeks.', score: 'Placed at Amazon' },
  { name: 'Vikram Singh', role: 'Pre-Final Year, CS', quote: 'The mock assessments felt exactly like real placement rounds. I walked into my actual interview with zero anxiety.', score: 'Placed at Microsoft' },
  { name: 'Deepika Nair', role: 'Final Year, IT', quote: 'Having my GitHub and LeetCode evidence verified meant I didn\'t have to explain my skills from scratch in every interview.', score: 'Placed at Google' },
  { name: 'Ananya Gupta', role: 'Final Year, IT', quote: 'The AI report showed me exactly which skills to focus on. No more guessing what companies are looking for.', score: 'Placed at Flipkart' },
];

export const stats = [
  { label: 'Students Assessed', value: '12,000+', icon: 'users' },
  { label: 'Skills Verified', value: '48,000+', icon: 'badge-check' },
  { label: 'Placement Rate', value: '87%', icon: 'trending-up' },
  { label: 'Partner Colleges', value: '45+', icon: 'building' },
];

export const landingFeatures = [
  { title: 'Evidence-Based Skill Verification', description: 'No self-reported claims. Every skill is backed by GitHub repos, LeetCode activity, certificates, and mentor sign-offs.', icon: 'shield-check', color: 'from-plum-500 to-plum-700' },
  { title: 'Dual Evaluation Engine', description: 'Combine competency profiling from real evidence with rigorous multi-round mock placement assessments.', icon: 'gauge', color: 'from-magenta-500 to-magenta-700' },
  { title: 'Explainable AI Scoring', description: 'Every placement readiness score comes with a transparent breakdown of contributing factors and evidence.', icon: 'brain', color: 'from-pink-500 to-pink-700' },
  { title: 'Personalized Learning Paths', description: 'AI generates targeted recommendations for each skill gap, tracked as students complete activities.', icon: 'route', color: 'from-plum-500 to-magenta-500' },
  { title: 'Cohort Analytics for Colleges', description: 'Department-wise heatmaps, company skill gap analysis, and intervention alerts for TPOs.', icon: 'bar-chart-3', color: 'from-magenta-500 to-pink-500' },
  { title: 'Fairness & Bias Monitoring', description: 'Built-in bias detection across departments, genders, and cohorts with human override capability.', icon: 'scale', color: 'from-plum-600 to-pink-500' },
];

export const howItWorks = [
  { stage: '01', title: 'Data Ingestion', description: 'Connect GitHub, LeetCode, upload certificates, and get mentor verification. Student consent required at every step.', icon: 'upload' },
  { stage: '02', title: 'Dual Evaluation', description: 'Competency profiling maps evidence to skill categories. Mock assessments simulate real placement rounds.', icon: 'gauge' },
  { stage: '03', title: 'AI Scoring & Analytics', description: 'Predictive analytics calculate placement readiness with full explainability. Every score is backed by evidence.', icon: 'brain' },
  { stage: '04', title: 'Learning & Placement', description: 'Personalized learning paths close skill gaps. Admins track cohort readiness and intervene proactively.', icon: 'rocket' },
];
