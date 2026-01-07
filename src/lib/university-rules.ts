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
  id: 'default-university',
  nameEn: 'Default University',
  nameAr: 'الجامعة الافتراضية',
  gradeRules: DEFAULT_GRADE_RULES,
  classificationRules: DEFAULT_CLASSIFICATION_RULES,
  minPassGPA: 2.0,
  warningThreshold: 2.3,
  probationThreshold: 2.0
};

// Helper functions
export function getGradePoints(gradeSymbol: string): number {
  const rule = DEFAULT_GRADE_RULES.find(r => r.symbol === gradeSymbol);
  return rule?.points ?? 0;
}

export function getGradeByPercentage(percentage: number): GradeRule | null {
  return DEFAULT_GRADE_RULES.find(
    rule => percentage >= rule.minPercentage && percentage <= rule.maxPercentage
  ) ?? null;
}

export function getClassification(gpa: number): GPAClassificationRule {
  const classification = DEFAULT_CLASSIFICATION_RULES.find(
    rule => gpa >= rule.minGPA && (rule.maxGPA === null || gpa <= rule.maxGPA)
  );
  return classification ?? DEFAULT_CLASSIFICATION_RULES[DEFAULT_CLASSIFICATION_RULES.length - 1];
}

export function isPassingGrade(gradeSymbol: string): boolean {
  return gradeSymbol !== 'F';
}
