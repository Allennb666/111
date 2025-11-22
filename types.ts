
export interface CriteriaScores {
  A: number[];
  B: number[];
  C: number[];
  D: number[];
}

export interface SubjectData {
  id: string;
  name: string;
  scores: CriteriaScores;
  icon?: string;
}

export interface GradeBoundary {
  grade: number;
  min: number;
  max: number;
}

export type CriteriaKey = 'A' | 'B' | 'C' | 'D';
