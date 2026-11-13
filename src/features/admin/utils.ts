import { adminStudentRows } from '@/features/admin/data';

export function getCohortStats() {
  const totalStudents = adminStudentRows.length;
  const avgScore = Math.round(adminStudentRows.reduce((sum, s) => sum + s.employabilityScore, 0) / totalStudents);
  const atRisk = adminStudentRows.filter((s) => s.placementReadiness === 'at-risk').length;
  const highReadiness = adminStudentRows.filter((s) => s.placementReadiness === 'high').length;
  return { totalStudents, avgScore, atRisk, highReadiness };
}
