import type { CompetencySkill } from '@/types';

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
