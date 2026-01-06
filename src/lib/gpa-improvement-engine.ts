import type { Course, GradeSymbol } from '@/types/types';
import { getGradePoints } from './university-rules';
import { GPAEngine } from './gpa-engine';

export interface ImprovementAction {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  creditHours: number;
  currentGrade: GradeSymbol;
  suggestedGrade: GradeSymbol;
  currentGPA: number;
  projectedGPA: number;
  gpaImprovement: number;
  impactScore: number; // 0-100
  category: 'quick-win' | 'medium-term' | 'long-term';
  feasibility: 'easy' | 'moderate' | 'challenging';
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface ImprovementAnalysis {
  currentGPA: number;
  quickWins: ImprovementAction[];
  mediumTerm: ImprovementAction[];
  longTerm: ImprovementAction[];
  retakeRecommendations: ImprovementAction[];
  summary: {
    totalActions: number;
    maxPossibleGPA: number;
    realisticTargetGPA: number;
  };
}

const GRADE_PROGRESSION: Record<GradeSymbol, GradeSymbol | null> = {
  'F': 'D',
  'D': 'C',
  'C': 'C+',
  'C+': 'B-',
  'B-': 'B',
  'B': 'B+',
  'B+': 'A-',
  'A-': 'A',
  'A': null, // Already at maximum
};

export class GPAImprovementEngine {
  /**
   * تحليل شامل لتحسين المعدل
   */
  static analyzeImprovements(courses: Course[]): ImprovementAnalysis {
    const currentGPA = GPAEngine.calculateGPA(courses).cumulativeGPA;
    const allActions: ImprovementAction[] = [];

    // تحليل كل مقرر
    courses.forEach(course => {
      // تخطي المقررات ذات الدرجة A (لا يمكن تحسينها)
      if (course.grade === 'A') return;

      const nextGrade = GRADE_PROGRESSION[course.grade];
      if (!nextGrade) return;

      const action = this.createImprovementAction(course, nextGrade, courses, currentGPA);
      if (action) {
        allActions.push(action);
      }

      // للمقررات الراسبة، اقترح إعادة الدراسة
      if (course.grade === 'F' || course.grade === 'D') {
        const retakeAction = this.createRetakeAction(course, courses, currentGPA);
        if (retakeAction) {
          allActions.push(retakeAction);
        }
      }
    });

    // ترتيب حسب التأثير
    allActions.sort((a, b) => b.impactScore - a.impactScore);

    // تصنيف الإجراءات
    const quickWins = allActions.filter(a => a.category === 'quick-win').slice(0, 5);
    const mediumTerm = allActions.filter(a => a.category === 'medium-term').slice(0, 5);
    const longTerm = allActions.filter(a => a.category === 'long-term').slice(0, 5);
    const retakeRecommendations = allActions.filter(a => 
      a.currentGrade === 'F' || a.currentGrade === 'D'
    ).slice(0, 3);

    // حساب الملخص
    const maxPossibleGPA = this.calculateMaxPossibleGPA(courses);
    const realisticTargetGPA = Math.min(
      currentGPA + (quickWins.reduce((sum, a) => sum + a.gpaImprovement, 0)),
      4.0
    );

    return {
      currentGPA,
      quickWins,
      mediumTerm,
      longTerm,
      retakeRecommendations,
      summary: {
        totalActions: allActions.length,
        maxPossibleGPA,
        realisticTargetGPA,
      },
    };
  }

  /**
   * إنشاء إجراء تحسين لمقرر
   */
  private static createImprovementAction(
    course: Course,
    suggestedGrade: GradeSymbol,
    allCourses: Course[],
    currentGPA: number
  ): ImprovementAction | null {
    // محاكاة تحسين الدرجة
    const simulatedCourses = allCourses.map(c =>
      c.id === course.id ? { ...c, grade: suggestedGrade, gradePoints: getGradePoints(suggestedGrade) } : c
    );

    const projectedGPA = GPAEngine.calculateGPA(simulatedCourses).cumulativeGPA;
    const gpaImprovement = projectedGPA - currentGPA;

    // حساب نقاط التأثير (0-100)
    const impactScore = this.calculateImpactScore(course, gpaImprovement);

    // تحديد الفئة
    const category = this.determineCategory(course, gpaImprovement);

    // تحديد مستوى الصعوبة
    const feasibility = this.determineFeasibility(course.grade, suggestedGrade);

    return {
      id: `improve-${course.id}`,
      courseId: course.id,
      courseName: course.courseName,
      courseCode: course.courseCode,
      creditHours: course.creditHours,
      currentGrade: course.grade,
      suggestedGrade,
      currentGPA,
      projectedGPA,
      gpaImprovement,
      impactScore,
      category,
      feasibility,
      titleAr: `تحسين ${course.courseName}`,
      titleEn: `Improve ${course.courseName}`,
      descriptionAr: `رفع الدرجة من ${course.grade} إلى ${suggestedGrade} سيحسن معدلك بمقدار ${gpaImprovement.toFixed(3)} نقطة`,
      descriptionEn: `Improving grade from ${course.grade} to ${suggestedGrade} will increase your GPA by ${gpaImprovement.toFixed(3)} points`,
    };
  }

  /**
   * إنشاء توصية بإعادة دراسة مقرر
   */
  private static createRetakeAction(
    course: Course,
    allCourses: Course[],
    currentGPA: number
  ): ImprovementAction | null {
    const suggestedGrade: GradeSymbol = 'B'; // هدف واقعي لإعادة الدراسة

    const simulatedCourses = allCourses.map(c =>
      c.id === course.id ? { ...c, grade: suggestedGrade, gradePoints: getGradePoints(suggestedGrade), isRetake: true } : c
    );

    const projectedGPA = GPAEngine.calculateGPA(simulatedCourses).cumulativeGPA;
    const gpaImprovement = projectedGPA - currentGPA;

    return {
      id: `retake-${course.id}`,
      courseId: course.id,
      courseName: course.courseName,
      courseCode: course.courseCode,
      creditHours: course.creditHours,
      currentGrade: course.grade,
      suggestedGrade,
      currentGPA,
      projectedGPA,
      gpaImprovement,
      impactScore: this.calculateImpactScore(course, gpaImprovement) + 20, // أولوية أعلى للإعادة
      category: 'medium-term',
      feasibility: 'moderate',
      titleAr: `إعادة دراسة ${course.courseName}`,
      titleEn: `Retake ${course.courseName}`,
      descriptionAr: `إعادة دراسة هذا المقرر والحصول على ${suggestedGrade} سيحسن معدلك بمقدار ${gpaImprovement.toFixed(3)} نقطة`,
      descriptionEn: `Retaking this course and achieving ${suggestedGrade} will increase your GPA by ${gpaImprovement.toFixed(3)} points`,
    };
  }

  /**
   * حساب نقاط التأثير (0-100)
   */
  private static calculateImpactScore(course: Course, gpaImprovement: number): number {
    // الوزن: الساعات المعتمدة × تحسين المعدل × 100
    const score = course.creditHours * gpaImprovement * 100;
    return Math.min(Math.max(score, 0), 100);
  }

  /**
   * تحديد فئة الإجراء
   */
  private static determineCategory(
    course: Course,
    gpaImprovement: number
  ): 'quick-win' | 'medium-term' | 'long-term' {
    // Quick Win: تحسين كبير بجهد قليل
    if (gpaImprovement >= 0.05 && course.creditHours >= 3) {
      return 'quick-win';
    }

    // Medium-Term: تحسين متوسط
    if (gpaImprovement >= 0.02) {
      return 'medium-term';
    }

    // Long-Term: تحسين طويل الأمد
    return 'long-term';
  }

  /**
   * تحديد مستوى الصعوبة
   */
  private static determineFeasibility(
    currentGrade: GradeSymbol,
    targetGrade: GradeSymbol
  ): 'easy' | 'moderate' | 'challenging' {
    const currentPoints = getGradePoints(currentGrade);
    const targetPoints = getGradePoints(targetGrade);
    const gap = targetPoints - currentPoints;

    if (gap <= 0.3) return 'easy';
    if (gap <= 0.7) return 'moderate';
    return 'challenging';
  }

  /**
   * حساب أقصى معدل ممكن
   */
  private static calculateMaxPossibleGPA(courses: Course[]): number {
    const maxCourses = courses.map(c => ({
      ...c,
      grade: 'A' as GradeSymbol,
      gradePoints: 4.0,
    }));

    return GPAEngine.calculateGPA(maxCourses).cumulativeGPA;
  }

  /**
   * محاكاة سيناريو تحسين متعدد
   */
  static simulateMultipleImprovements(
    courses: Course[],
    actions: ImprovementAction[]
  ): number {
    let simulatedCourses = [...courses];

    actions.forEach(action => {
      simulatedCourses = simulatedCourses.map(c =>
        c.id === action.courseId
          ? { ...c, grade: action.suggestedGrade, gradePoints: getGradePoints(action.suggestedGrade) }
          : c
      );
    });

    return GPAEngine.calculateGPA(simulatedCourses).cumulativeGPA;
  }
}
