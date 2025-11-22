import { GRADE_BOUNDARIES } from '../constants';
import { CriteriaScores, CriteriaKey } from '../types';

// Calculate average of an array of scores, rounded to nearest integer
export const calculateCriterionAverage = (scores: number[]): number => {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  // Standard rounding: 5.5 -> 6, 5.4 -> 5
  return Math.round(sum / scores.length);
};

// Calculate exact average for display purposes (e.g., 5.3)
export const calculateCriterionRawAverage = (scores: number[]): number => {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return parseFloat((sum / scores.length).toFixed(1));
};

export const calculateTotalScore = (scores: CriteriaScores): number => {
  const scoreA = calculateCriterionAverage(scores.A);
  const scoreB = calculateCriterionAverage(scores.B);
  const scoreC = calculateCriterionAverage(scores.C);
  const scoreD = calculateCriterionAverage(scores.D);
  
  return scoreA + scoreB + scoreC + scoreD;
};

export const calculateFinalGrade = (totalScore: number): number => {
  const boundary = GRADE_BOUNDARIES.find(
    (b) => totalScore >= b.min && totalScore <= b.max
  );
  return boundary ? boundary.grade : 1;
};

export const getGradeColor = (grade: number): string => {
  // Dark mode "Glowing" colors
  // Light text + Low opacity background + Subtle border
  if (grade === 7) return 'text-emerald-300 bg-emerald-500/10 border-emerald-400/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
  if (grade === 6) return 'text-teal-300 bg-teal-500/10 border-teal-400/20 shadow-[0_0_15px_rgba(20,184,166,0.15)]';
  if (grade === 5) return 'text-blue-300 bg-blue-500/10 border-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]';
  if (grade === 4) return 'text-amber-300 bg-amber-500/10 border-amber-400/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
  if (grade === 3) return 'text-orange-300 bg-orange-500/10 border-orange-400/20';
  return 'text-rose-300 bg-rose-500/10 border-rose-400/20';
};

export const getGradeColorRaw = (grade: number): string => {
  if (grade === 7) return '#6ee7b7'; // emerald-300
  if (grade === 6) return '#5eead4'; // teal-300
  if (grade === 5) return '#93c5fd'; // blue-300
  if (grade === 4) return '#fcd34d'; // amber-300
  if (grade === 3) return '#fdba74'; // orange-300
  return '#fda4af'; // rose-300
};