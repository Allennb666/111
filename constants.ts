
import { SubjectData, GradeBoundary } from './types';

export const DEFAULT_SUBJECTS: SubjectData[] = [
  { id: 'chn', name: 'Chinese', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'eng', name: 'English', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'math', name: 'Mathematics', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'bio', name: 'Biology', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'phys', name: 'Physics', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'dd', name: 'Digital Design', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'pd', name: 'Product Design', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'mus', name: 'Music', scores: { A: [], B: [], C: [], D: [] } },
  { id: 'phe', name: 'PHE', scores: { A: [], B: [], C: [], D: [] } },
];

// Standard MYP Grade Boundaries (Total out of 32)
export const GRADE_BOUNDARIES: GradeBoundary[] = [
  { grade: 1, min: 0, max: 5 },
  { grade: 2, min: 6, max: 9 },
  { grade: 3, min: 10, max: 14 },
  { grade: 4, min: 15, max: 18 },
  { grade: 5, min: 19, max: 23 },
  { grade: 6, min: 24, max: 27 },
  { grade: 7, min: 28, max: 32 },
];

export const CRITERIA_LABELS = ['A', 'B', 'C', 'D'] as const;
