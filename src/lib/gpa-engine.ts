import type {
  Course,
  CourseImpact,
  GPACalculation,
  GPAPrediction,
  ScenarioCourse,
  SemesterSummary,
  ValidationError
} from '@/types/types';
import { getClassification, getGradePoints, isPassingGrade } from './university-rules';

/**
 * Core GPA Calculation Engine
 * Implements exact university GPA calculation rules
 */

export class GPAEngine {
  /**
   * Calculate comprehensive GPA from courses
   */
  static calculateGPA(courses: Course[]): GPACalculation {
    // Group courses by semester
    const semesterMap = new Map<string, Course[]>();

    for (const course of courses) {
      const key = `${course.year}-${course.semester}`;
      if (!semesterMap.has(key)) {
        semesterMap.set(key, []);
      }
      semesterMap.get(key)!.push(course);
    }

    // Calculate semester summaries
    const semesters: SemesterSummary[] = [];

    // For cumulative GPA, we need to count each course only once (latest attempt)
    // Build a map of course code to latest attempt
    const latestAttempts = this.getLatestAttempts(courses);

    let totalQualityPoints = 0;
    let totalRegisteredHours = 0;
    let totalPassedHours = 0;

    for (const [key, semesterCourses] of semesterMap) {
      const [year, semester] = key.split('-');
      const summary = this.calculateSemesterGPA(semesterCourses);
      summary.semester = semester;
      summary.year = Number.parseInt(year);
      semesters.push(summary);
    }

    // Calculate cumulative totals using only latest attempts
    for (const course of latestAttempts.values()) {
      // Skip zero-credit courses (they have grades but don't count toward GPA)
      if (course.isZeroCredit) continue;

      totalQualityPoints += course.gradePoints * course.creditHours;
      totalRegisteredHours += course.creditHours;
      if (isPassingGrade(course.grade)) {
        totalPassedHours += course.creditHours;
      }
    }

    // Calculate cumulative GPA
    const cumulativeGPA = totalRegisteredHours > 0
      ? totalQualityPoints / totalRegisteredHours
      : 0;

    // Get classification
    const classificationRule = getClassification(cumulativeGPA);

    // Sort semesters chronologically
    const semesterOrder: Record<string, number> = { 'Spring': 1, 'Summer': 2, 'Fall': 3 };
    semesters.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return (semesterOrder[a.semester] || 4) - (semesterOrder[b.semester] || 4);
    });

    // Calculate running cumulative GPA for each semester
    // We need to re-evaluate the cumulative GPA at the end of each semester
    // taking into account course retakes up to that point
    for (let i = 0; i < semesters.length; i++) {
      const semester = semesters[i];

      // Get all courses up to and including this semester
      const coursesUpToNow: Course[] = [];
      for (let j = 0; j <= i; j++) {
        coursesUpToNow.push(...semesters[j].courses);
      }

      // Calculate cumulative GPA for this subset
      // We use a simplified logic here: just use getLatestAttempts on the subset
      const latestAttemptsUpToNow = this.getLatestAttempts(coursesUpToNow);

      let runningQualityPoints = 0;
      let runningRegisteredHours = 0;

      for (const course of latestAttemptsUpToNow.values()) {
        // Skip zero-credit courses
        if (course.isZeroCredit) continue;

        runningQualityPoints += course.gradePoints * course.creditHours;
        runningRegisteredHours += course.creditHours;
      }

      semester.cumulativeGPA = runningRegisteredHours > 0
        ? Number((runningQualityPoints / runningRegisteredHours).toFixed(2))
        : 0;
    }

    return {
      currentGPA: semesters.length > 0 ? semesters[semesters.length - 1].semesterGPA : 0,
      cumulativeGPA: Number(cumulativeGPA.toFixed(2)),
      totalRegisteredHours,
      totalPassedHours,
      totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
      classification: classificationRule.classification,
      classificationNameEn: classificationRule.nameEn,
      classificationNameAr: classificationRule.nameAr,
      semesters
    };
  }

  /**
   * Get the latest attempt for each unique course
   * Returns a map of courseCode -> latest Course
   */
  private static getLatestAttempts(courses: Course[]): Map<string, Course> {
    const courseMap = new Map<string, Course[]>();

    // Group all attempts of each course
    for (const course of courses) {
      const key = course.courseCode;
      if (!courseMap.has(key)) {
        courseMap.set(key, []);
      }
      courseMap.get(key)!.push(course);
    }

    // For each course, find the latest attempt
    const latestAttempts = new Map<string, Course>();

    for (const [courseCode, attempts] of courseMap) {
      // Sort attempts chronologically (latest last)
      attempts.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        const semesterOrder: Record<string, number> = { 'Spring': 1, 'Summer': 2, 'Fall': 3 };
        return (semesterOrder[a.semester] || 4) - (semesterOrder[b.semester] || 4);
      });

      // Take the latest attempt
      const latestAttempt = attempts[attempts.length - 1];
      latestAttempts.set(courseCode, latestAttempt);
    }

    return latestAttempts;
  }

  /**
   * Calculate GPA for a single semester
   */
  static calculateSemesterGPA(courses: Course[]): SemesterSummary {
    let totalQualityPoints = 0;
    let totalCredits = 0;
    let earnedCredits = 0;

    for (const course of courses) {
      // Skip zero-credit courses
      if (course.isZeroCredit) continue;

      totalQualityPoints += course.gradePoints * course.creditHours;
      totalCredits += course.creditHours;
      if (isPassingGrade(course.grade)) {
        earnedCredits += course.creditHours;
      }
    }

    const semesterGPA = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    return {
      semester: '',
      year: 0,
      courses,
      semesterGPA: Number(semesterGPA.toFixed(2)),
      totalCredits,
      earnedCredits,
      cumulativeGPA: 0
    };
  }

  /**
   * Calculate course impact on GPA
   */
  static calculateCourseImpact(courses: Course[]): CourseImpact[] {
    const impacts: CourseImpact[] = [];

    for (const course of courses) {
      // Calculate GPA without this course
      const coursesWithout = courses.filter(c => c.id !== course.id);
      const gpaWithout = this.calculateGPA(coursesWithout).cumulativeGPA;
      const gpaWith = this.calculateGPA(courses).cumulativeGPA;

      const impact = gpaWith - gpaWithout;

      impacts.push({
        course,
        impact: Number(impact.toFixed(3)),
        impactType: impact > 0.01 ? 'positive' : impact < -0.01 ? 'negative' : 'neutral'
      });
    }

    // Sort by absolute impact
    impacts.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

    return impacts;
  }

  /**
   * Predict future GPA based on scenarios
   */
  static predictGPA(
    currentCourses: Course[],
    futureCourses: ScenarioCourse[],
    targetGPA?: number
  ): GPAPrediction {
    const currentCalc = this.calculateGPA(currentCourses);
    const remainingCredits = futureCourses.reduce((sum, c) => sum + c.creditHours, 0);

    // Best case: all A grades
    const bestCasePoints = futureCourses.reduce((sum, c) => sum + (4.0 * c.creditHours), 0);
    const bestCase = (currentCalc.totalQualityPoints + bestCasePoints) /
      (currentCalc.totalRegisteredHours + remainingCredits);

    // Worst case: all passing grades (D)
    const worstCasePoints = futureCourses.reduce((sum, c) => sum + (1.7 * c.creditHours), 0);
    const worstCase = (currentCalc.totalQualityPoints + worstCasePoints) /
      (currentCalc.totalRegisteredHours + remainingCredits);

    // Realistic case: based on expected grades
    const realisticPoints = futureCourses.reduce(
      (sum, c) => sum + (getGradePoints(c.expectedGrade) * c.creditHours),
      0
    );
    const realisticCase = (currentCalc.totalQualityPoints + realisticPoints) /
      (currentCalc.totalRegisteredHours + remainingCredits);

    // Calculate required GPA for target
    let requiredGPAForTarget: number | undefined;
    if (targetGPA && remainingCredits > 0) {
      const requiredPoints = (targetGPA * (currentCalc.totalRegisteredHours + remainingCredits)) -
        currentCalc.totalQualityPoints;
      requiredGPAForTarget = requiredPoints / remainingCredits;
    }

    return {
      bestCase: Number(bestCase.toFixed(2)),
      worstCase: Number(worstCase.toFixed(2)),
      realisticCase: Number(realisticCase.toFixed(2)),
      remainingCredits,
      requiredGPAForTarget: requiredGPAForTarget ? Number(requiredGPAForTarget.toFixed(2)) : undefined
    };
  }

  /**
   * Validate courses for errors
   */
  static validateCourses(courses: Course[]): ValidationError[] {
    const errors: ValidationError[] = [];
    const courseCodeMap = new Map<string, Course[]>();

    // Group by course code
    for (const course of courses) {
      if (!courseCodeMap.has(course.courseCode)) {
        courseCodeMap.set(course.courseCode, []);
      }
      courseCodeMap.get(course.courseCode)!.push(course);
    }

    // Check for duplicates (same course, same semester, not a retake)
    for (const [code, coursesWithCode] of courseCodeMap) {
      const semesterMap = new Map<string, Course[]>();

      for (const course of coursesWithCode) {
        const key = `${course.year}-${course.semester}`;
        if (!semesterMap.has(key)) {
          semesterMap.set(key, []);
        }
        semesterMap.get(key)!.push(course);
      }

      for (const [semester, semesterCourses] of semesterMap) {
        if (semesterCourses.length > 1 && !semesterCourses.some(c => c.isRetake)) {
          errors.push({
            type: 'duplicate',
            severity: 'error',
            messageEn: `Duplicate course ${code} in ${semester}`,
            messageAr: `مقرر مكرر ${code} في ${semester}`,
            courseId: semesterCourses[0].id
          });
        }
      }
    }

    // Check for invalid credit hours
    for (const course of courses) {
      if (course.creditHours <= 0 || course.creditHours > 6) {
        errors.push({
          type: 'invalid_credits',
          severity: 'warning',
          messageEn: `Unusual credit hours (${course.creditHours}) for ${course.courseCode}`,
          messageAr: `ساعات معتمدة غير عادية (${course.creditHours}) للمقرر ${course.courseCode}`,
          courseId: course.id
        });
      }
    }

    return errors;
  }

  /**
   * Calculate what grade is needed in remaining courses to reach target GPA
   */
  static calculateRequiredGrades(
    currentCourses: Course[],
    remainingCredits: number,
    targetGPA: number
  ): { achievable: boolean; requiredAverage: number; message: string } {
    const currentCalc = this.calculateGPA(currentCourses);

    const requiredTotalPoints = targetGPA * (currentCalc.totalRegisteredHours + remainingCredits);
    const requiredFuturePoints = requiredTotalPoints - currentCalc.totalQualityPoints;
    const requiredAverage = requiredFuturePoints / remainingCredits;

    const achievable = requiredAverage <= 4.0 && requiredAverage >= 0;

    let message = '';
    if (!achievable) {
      if (requiredAverage > 4.0) {
        message = 'Target GPA is not achievable even with perfect grades';
      } else {
        message = 'Target GPA is already exceeded';
      }
    } else {
      message = `You need an average of ${requiredAverage.toFixed(2)} in remaining courses`;
    }

    return {
      achievable,
      requiredAverage: Number(requiredAverage.toFixed(2)),
      message
    };
  }
}
