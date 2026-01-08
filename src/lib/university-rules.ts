import type { GPAClassificationRule, GradeRule, University } from '@/types/types';

// Default university grading rules based on provided images
export const DEFAULT_GRADE_RULES: GradeRule[] = [
  {
    symbol: 'A',
    points: 4.0,
    minPercentage: 90,
    maxPercentage: 100,
    nameEn: 'Excellent',
    nameAr: 'ممتاز'
  },
  {
    symbol: 'A-',
    points: 3.7,
    minPercentage: 85,
    maxPercentage: 89,
    nameEn: 'Excellent',
    nameAr: 'ممتاز'
  },
  {
    symbol: 'B+',
    points: 3.3,
    minPercentage: 80,
    maxPercentage: 84,
    nameEn: 'Very Good',
    nameAr: 'جيد جداً'
  },
  {
    symbol: 'B',
    points: 3.0,
    minPercentage: 75,
    maxPercentage: 79,
    nameEn: 'Very Good',
    nameAr: 'جيد جداً'
  },
  {
    symbol: 'B-',
    points: 2.7,
    minPercentage: 70,
    maxPercentage: 74,
    nameEn: 'Good',
    nameAr: 'جيد'
  },
  {
    symbol: 'C+',
    points: 2.3,
    minPercentage: 65,
    maxPercentage: 69,
    nameEn: 'Good',
    nameAr: 'جيد'
  },
  {
    symbol: 'C',
    points: 2.0,
    minPercentage: 62,
    maxPercentage: 64,
    nameEn: 'Pass',
    nameAr: 'مقبول'
  },
  {
    symbol: 'D',
    points: 1.7,
    minPercentage: 60,
    maxPercentage: 61,
    nameEn: 'Pass',
    nameAr: 'مقبول'
  },
  {
    symbol: 'F',
    points: 0.0,
    minPercentage: 0,
    maxPercentage: 59,
    nameEn: 'Fail',
    nameAr: 'راسب'
  }
];

export const DEFAULT_CLASSIFICATION_RULES: GPAClassificationRule[] = [
  {
    classification: 'excellent',
    minGPA: 3.5,
    maxGPA: null,
    nameEn: 'Excellent',
    nameAr: 'ممتاز'
  },
  {
    classification: 'very_good',
    minGPA: 2.75,
    maxGPA: 3.49,
    nameEn: 'Very Good',
    nameAr: 'جيد جداً'
  },
  {
    classification: 'good',
    minGPA: 2.3,
    maxGPA: 2.74,
    nameEn: 'Good',
    nameAr: 'جيد'
  },
  {
    classification: 'pass',
    minGPA: 2.0,
    maxGPA: 2.29,
    nameEn: 'Pass',
    nameAr: 'مقبول'
  },
  {
    classification: 'fail',
    minGPA: 0,
    maxGPA: 1.99,
    nameEn: 'Fail',
    nameAr: 'راسب'
  }
];

export const DEFAULT_UNIVERSITY: University = {
  id: 'october-6-university',
  nameEn: 'October 6 University',
  nameAr: 'جامعة 6 أكتوبر',
  gradeRules: DEFAULT_GRADE_RULES,
  classificationRules: DEFAULT_CLASSIFICATION_RULES,
  minPassGPA: 2.0,
  warningThreshold: 2.3,
  probationThreshold: 2.0
};

// Al-Ryada University Grading Rules
export const AL_RYADA_GRADE_RULES: GradeRule[] = [
  {
    symbol: 'A',
    points: 4.0,
    minPercentage: 93,
    maxPercentage: 100,
    nameEn: 'Excellent',
    nameAr: 'ممتاز'
  },
  {
    symbol: 'A-',
    points: 3.7,
    minPercentage: 90,
    maxPercentage: 92,
    nameEn: 'Excellent',
    nameAr: 'ممتاز'
  },
  {
    symbol: 'B+',
    points: 3.3,
    minPercentage: 87,
    maxPercentage: 89,
    nameEn: 'Very Good',
    nameAr: 'جيد جداً'
  },
  {
    symbol: 'B',
    points: 3.0,
    minPercentage: 83,
    maxPercentage: 86,
    nameEn: 'Very Good',
    nameAr: 'جيد جداً'
  },
  {
    symbol: 'B-',
    points: 2.7,
    minPercentage: 80,
    maxPercentage: 82,
    nameEn: 'Good',
    nameAr: 'جيد'
  },
  {
    symbol: 'C+',
    points: 2.3,
    minPercentage: 77,
    maxPercentage: 79,
    nameEn: 'Good',
    nameAr: 'جيد'
  },
  {
    symbol: 'C',
    points: 2.0,
    minPercentage: 73,
    maxPercentage: 76,
    nameEn: 'Pass',
    nameAr: 'مقبول'
  },
  {
    symbol: 'C-',
    points: 1.7,
    minPercentage: 70,
    maxPercentage: 72,
    nameEn: 'Pass',
    nameAr: 'مقبول'
  },
  {
    symbol: 'D+',
    points: 1.3,
    minPercentage: 67,
    maxPercentage: 69,
    nameEn: 'Pass',
    nameAr: 'مقبول'
  },
  {
    symbol: 'D',
    points: 1.0,
    minPercentage: 60,
    maxPercentage: 66,
    nameEn: 'Pass',
    nameAr: 'مقبول'
  },
  {
    symbol: 'F',
    points: 0.0,
    minPercentage: 0,
    maxPercentage: 59,
    nameEn: 'Fail',
    nameAr: 'راسب'
  }
];

export const AL_RYADA_UNIVERSITY: University = {
  id: 'al-ryada-university',
  nameEn: 'Al-Ryada University for Science and Technology',
  nameAr: 'جامعة الريادة للعلوم والتكنولوجيا',
  gradeRules: AL_RYADA_GRADE_RULES,
  classificationRules: DEFAULT_CLASSIFICATION_RULES,
  minPassGPA: 2.0,
  warningThreshold: 2.3,
  probationThreshold: 2.0
};

// List of all available universities
export const UNIVERSITIES: University[] = [
  DEFAULT_UNIVERSITY,
  AL_RYADA_UNIVERSITY
];

// Normalize grade symbol - Al-Ryada University uses R prefix for retakes (RD = D, RC = C, etc.)
export function normalizeGrade(gradeSymbol: string): string {
  const grade = gradeSymbol.toUpperCase().trim();
  // If grade starts with R and has more characters, strip the R
  if (grade.startsWith('R') && grade.length > 1) {
    return grade.substring(1);
  }
  return grade;
}

// Get the currently selected university from localStorage
export function getSelectedUniversity(): University {
  const selectedId = typeof window !== 'undefined'
    ? localStorage.getItem('universityId')
    : null;

  return UNIVERSITIES.find(u => u.id === selectedId) || DEFAULT_UNIVERSITY;
}

// Helper functions
export function getGradePoints(gradeSymbol: string): number {
  const university = getSelectedUniversity();
  const normalizedGrade = normalizeGrade(gradeSymbol);
  const rule = university.gradeRules.find(r => r.symbol === normalizedGrade);
  return rule?.points ?? 0;
}

export function getGradeByPercentage(percentage: number): GradeRule | null {
  const university = getSelectedUniversity();
  return university.gradeRules.find(
    rule => percentage >= rule.minPercentage && percentage <= rule.maxPercentage
  ) ?? null;
}

export function getClassification(gpa: number): GPAClassificationRule {
  const university = getSelectedUniversity();
  const classification = university.classificationRules.find(
    rule => gpa >= rule.minGPA && (rule.maxGPA === null || gpa <= rule.maxGPA)
  );
  return classification ?? university.classificationRules[university.classificationRules.length - 1];
}

export function isPassingGrade(gradeSymbol: string): boolean {
  return gradeSymbol !== 'F' && gradeSymbol !== 'FA' && gradeSymbol !== 'FW';
}

export const gradePoints: Record<string, number> = DEFAULT_GRADE_RULES.reduce((acc, rule) => {
  acc[rule.symbol] = rule.points;
  return acc;
}, {} as Record<string, number>);
