// Core GPA System Types

export type Language = 'en' | 'ar';

export type UserRole = 'user' | 'admin';

export type GradeSymbol = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';

export type GPAClassification = 'excellent' | 'very_good' | 'good' | 'pass' | 'fail';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface GradeRule {
  symbol: GradeSymbol;
  points: number;
  minPercentage: number;
  maxPercentage: number;
  nameEn: string;
  nameAr: string;
}

export interface GPAClassificationRule {
  classification: GPAClassification;
  minGPA: number;
  maxGPA: number | null;
  nameEn: string;
  nameAr: string;
}

export interface University {
  id: string;
  nameEn: string;
  nameAr: string;
  gradeRules: GradeRule[];
  classificationRules: GPAClassificationRule[];
  minPassGPA: number;
  warningThreshold: number;
  probationThreshold: number;
  createdAt?: string;
}

export interface Profile {
  id: string;
  email?: string;
  username?: string;
  role: UserRole;
  language: Language;
  universityId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  id: string;
  userId: string;
  universityId: string;
  courseCode: string;
  courseName: string;
  creditHours: number;
  grade: GradeSymbol;
  gradePoints: number;
  semester: string;
  year: number;
  isRetake: boolean;
  originalCourseId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Scenario {
  id: string;
  userId: string;
  name: string;
  description?: string;
  courses: ScenarioCourse[];
  predictedGPA: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScenarioCourse {
  courseCode: string;
  courseName: string;
  creditHours: number;
  expectedGrade: GradeSymbol;
}

export interface SemesterSummary {
  semester: string;
  year: number;
  courses: Course[];
  semesterGPA: number;
  totalCredits: number;
  earnedCredits: number;
}

export interface GPACalculation {
  currentGPA: number;
  cumulativeGPA: number;
  totalRegisteredHours: number;
  totalPassedHours: number;
  totalQualityPoints: number;
  classification: GPAClassification;
  classificationNameEn: string;
  classificationNameAr: string;
  semesters: SemesterSummary[];
}

export interface CourseImpact {
  course: Course;
  impact: number;
  impactType: 'positive' | 'negative' | 'neutral';
}

export interface AcademicRecommendation {
  type: 'improve_grade' | 'retake_course' | 'drop_course' | 'reduce_load' | 'increase_effort';
  priority: 'high' | 'medium' | 'low';
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  expectedImpact?: number;
  targetCourses?: string[];
}

export interface RiskAssessment {
  level: RiskLevel;
  score: number;
  reasons: string[];
  recommendations: AcademicRecommendation[];
}

export interface GPAPrediction {
  bestCase: number;
  worstCase: number;
  realisticCase: number;
  remainingCredits: number;
  requiredGPAForTarget?: number;
}

export interface ValidationError {
  type: 'duplicate' | 'invalid_grade' | 'invalid_credits' | 'missing_data';
  severity: 'error' | 'warning';
  messageEn: string;
  messageAr: string;
  courseId?: string;
}
