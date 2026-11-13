import type { DataSource } from '@/types';

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
