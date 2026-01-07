import { Course, GPACalculation, SemesterSummary } from '@/types/types';

export interface AcademicAnalysis {
  overview: {
    standing: string;
    trend: 'improving' | 'declining' | 'stable';
    trendValue: number;
    efficiency: number; // Passed / Registered
    volatility: number; // Std dev of semester GPAs
  };
  statistics: {
    gradeDistribution: Record<string, number>;
    highImpactCourses: Course[]; // High credits (>3), Low grade (< C)
    consistencyScore: number; // 0-100
  };
  patterns: {
    loadConcentration: 'balanced' | 'heavy' | 'light';
    repeatDifficulty: boolean;
  };
  risk: {
    level: 'low' | 'medium' | 'high' | 'critical';
    factors: string[];
    warnings: string[];
  };
  strategy: {
    learningStyle: string;
    focusAreas: string[];
  };
  semesters: SemesterSummary[];
}

export class AcademicAnalyzer {
  static analyze(courses: Course[], calculation: GPACalculation): AcademicAnalysis {
    const semesters = calculation.semesters;
    
    // 1. Overview
    const standing = this.getStanding(calculation.cumulativeGPA);
    const trend = this.calculateTrend(semesters);
    const efficiency = calculation.totalRegisteredHours > 0 
      ? (calculation.totalPassedHours / calculation.totalRegisteredHours) * 100 
      : 0;
    const volatility = this.calculateVolatility(semesters);

    // 2. Statistics
    const gradeDistribution = this.getGradeDistribution(courses);
    const highImpactCourses = courses.filter(c => c.creditHours >= 3 && c.gradePoints < 2.0); // Below C
    const consistencyScore = Math.max(0, 100 - (volatility * 20)); // Arbitrary formula

    // 3. Patterns
    const avgCredits = semesters.length > 0 
      ? semesters.reduce((sum, s) => sum + s.totalCredits, 0) / semesters.length 
      : 0;
    const loadConcentration = avgCredits > 18 ? 'heavy' : avgCredits < 12 ? 'light' : 'balanced';
    const repeatDifficulty = courses.some(c => c.isRetake && c.gradePoints < 2.0);

    // 4. Risk
    const risk = this.assessRisk(calculation.cumulativeGPA, trend.direction, highImpactCourses.length);

    // 5. Strategy
    const learningStyle = this.determineLearningStyle(courses);

    return {
      overview: {
        standing,
        trend: trend.direction,
        trendValue: trend.value,
        efficiency,
        volatility
      },
      statistics: {
        gradeDistribution,
        highImpactCourses,
        consistencyScore
      },
      patterns: {
        loadConcentration,
        repeatDifficulty
      },
      risk,
      strategy: {
        learningStyle,
        focusAreas: highImpactCourses.length > 0 ? ['GPA Recovery', 'Core Subject Review'] : ['Maintenance', 'Advanced Electives']
      },
      semesters
    };
  }

  private static getStanding(gpa: number): string {
    if (gpa >= 3.5) return 'Distinction (Honors)';
    if (gpa >= 3.0) return 'Very Good Standing';
    if (gpa >= 2.0) return 'Good Standing';
    return 'Academic Probation Warning';
  }

  private static calculateTrend(semesters: SemesterSummary[]) {
    if (semesters.length < 2) return { direction: 'stable' as const, value: 0 };
    
    const last = semesters[semesters.length - 1].semesterGPA;
    const prev = semesters[semesters.length - 2].semesterGPA;
    const diff = last - prev;

    return {
      direction: diff > 0.1 ? 'improving' as const : diff < -0.1 ? 'declining' as const : 'stable' as const,
      value: diff
    };
  }

  private static calculateVolatility(semesters: SemesterSummary[]): number {
    if (semesters.length < 2) return 0;
    const mean = semesters.reduce((sum, s) => sum + s.semesterGPA, 0) / semesters.length;
    const variance = semesters.reduce((sum, s) => sum + Math.pow(s.semesterGPA - mean, 2), 0) / semesters.length;
    return Math.sqrt(variance);
  }

  private static getGradeDistribution(courses: Course[]) {
    const dist: Record<string, number> = {};
    courses.forEach(c => {
      const g = c.grade;
      dist[g] = (dist[g] || 0) + 1;
    });
    return dist;
  }

  private static assessRisk(gpa: number, trend: string, highImpactCount: number): { level: 'low' | 'medium' | 'high' | 'critical', factors: string[], warnings: string[] } {
    let score = 0;
    const factors: string[] = [];
    const warnings: string[] = [];

    if (gpa < 2.0) { score += 3; factors.push('Low Cumulative GPA'); }
    else if (gpa < 2.5) { score += 1; factors.push('Below Average GPA'); }

    if (trend === 'declining') { score += 1; factors.push('Declining Performance Trend'); }
    if (highImpactCount > 0) { score += 2; factors.push(`${highImpactCount} Critical Courses Failed/Low Grade`); }

    const level: 'low' | 'medium' | 'high' | 'critical' = score >= 3 ? 'critical' : score >= 2 ? 'high' : score >= 1 ? 'medium' : 'low';
    
    if (level === 'critical') warnings.push('Risk of Academic Suspension', 'Immediate Intervention Required');
    if (level === 'high') warnings.push('Probation Risk', 'Retake Strategy Needed');
    
    return { level, factors, warnings };
  }

  private static determineLearningStyle(courses: Course[]): string {
    const highCreditPerf = this.getAvgGradeForCredits(courses, true); // >= 3 credits
    const lowCreditPerf = this.getAvgGradeForCredits(courses, false); // < 3 credits

    if (highCreditPerf > 3.0 && lowCreditPerf > 3.0) return 'Comprehensive High-Achiever';
    if (highCreditPerf > lowCreditPerf) return 'Deep Learner (Excels in Core Subjects)';
    if (lowCreditPerf > highCreditPerf) return 'Practical/Applied Learner';
    return 'Developing Learner';
  }

  private static getAvgGradeForCredits(courses: Course[], high: boolean): number {
    const filtered = courses.filter(c => high ? c.creditHours >= 3 : c.creditHours < 3);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, c) => sum + c.gradePoints, 0) / filtered.length;
  }
}
