// خدمة التخزين المحلي للمقررات والسيناريوهات
import type { Course, Scenario } from '@/types/types';
import type { CLPProfile } from './clp-engine';
import { getGradePoints, normalizeGrade } from './university-rules';

const COURSES_KEY = 'echo-pi-courses';
const SCENARIOS_KEY = 'echo-pi-scenarios';
const SETTINGS_KEY = 'echo-pi-settings';
const CLP_PROFILE_KEY = 'echo-pi-clp-profile';

export interface AppSettings {
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  universityId: string;
}

// المقررات
export const courseStorage = {
  getAll: (): Course[] => {
    try {
      const data = localStorage.getItem(COURSES_KEY);
      const courses = data ? JSON.parse(data) : [];

      // Get current university
      const selectedUniversityId = typeof window !== 'undefined'
        ? localStorage.getItem('universityId')
        : null;
      const isAlRyada = selectedUniversityId === 'al-ryada-university';

      // Recalculate gradePoints based on current university
      // Also auto-detect zero-credit courses based on code patterns (Al-Ryada only)
      // Also normalize R-prefixed retake grades (Al-Ryada only)
      return courses.map((course: Course) => {
        const code = course.courseCode.toUpperCase();
        const isZeroCreditPattern = isAlRyada && (
          code.startsWith('UNC') ||
          code.startsWith('UNE') ||
          code.startsWith('UC') ||
          code.startsWith('UE')
        );

        // Check if grade has R prefix (retake indicator in Al-Ryada)
        const originalGrade = course.grade;
        const hasRPrefix = originalGrade.toUpperCase().startsWith('R') && originalGrade.length > 1;
        const normalizedGrade = isAlRyada ? normalizeGrade(originalGrade) : originalGrade;

        return {
          ...course,
          grade: normalizedGrade as any, // Normalize the grade
          gradePoints: getGradePoints(normalizedGrade),
          isRetake: course.isRetake || (isAlRyada && hasRPrefix), // Auto-mark as retake if R prefix
          // Only mark as zero-credit if explicitly set OR if pattern matches in Al-Ryada
          isZeroCredit: isAlRyada ? (course.isZeroCredit || isZeroCreditPattern) : false
        };
      });
    } catch {
      return [];
    }
  },

  save: (courses: Course[]): void => {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  },

  add: (course: Omit<Course, 'id' | 'createdAt'>): Course => {
    const courses = courseStorage.getAll();
    const newCourse: Course = {
      ...course,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    courses.push(newCourse);
    courseStorage.save(courses);
    return newCourse;
  },

  update: (id: string, updates: Partial<Course>): void => {
    const courses = courseStorage.getAll();
    const index = courses.findIndex(c => c.id === id);
    if (index !== -1) {
      courses[index] = { ...courses[index], ...updates };
      courseStorage.save(courses);
    }
  },

  delete: (id: string): void => {
    const courses = courseStorage.getAll();
    const filtered = courses.filter(c => c.id !== id);
    courseStorage.save(filtered);
  },

  deleteMany: (ids: string[]): void => {
    const courses = courseStorage.getAll();
    const idsSet = new Set(ids);
    const filtered = courses.filter(c => !idsSet.has(c.id));
    courseStorage.save(filtered);
  },

  updateMany: (ids: string[], updates: Partial<Course>): void => {
    const courses = courseStorage.getAll();
    const idsSet = new Set(ids);
    const updatedCourses = courses.map(c =>
      idsSet.has(c.id) ? { ...c, ...updates } : c
    );
    courseStorage.save(updatedCourses);
  },

  clear: (): void => {
    localStorage.removeItem(COURSES_KEY);
  },
};

// السيناريوهات
export const scenarioStorage = {
  getAll: (): Scenario[] => {
    try {
      const data = localStorage.getItem(SCENARIOS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save: (scenarios: Scenario[]): void => {
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
  },

  add: (scenario: Omit<Scenario, 'id' | 'createdAt'>): Scenario => {
    const scenarios = scenarioStorage.getAll();
    const newScenario: Scenario = {
      ...scenario,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    scenarios.push(newScenario);
    scenarioStorage.save(scenarios);
    return newScenario;
  },

  update: (id: string, updates: Partial<Scenario>): void => {
    const scenarios = scenarioStorage.getAll();
    const index = scenarios.findIndex(s => s.id === id);
    if (index !== -1) {
      scenarios[index] = { ...scenarios[index], ...updates };
      scenarioStorage.save(scenarios);
    }
  },

  delete: (id: string): void => {
    const scenarios = scenarioStorage.getAll();
    const filtered = scenarios.filter(s => s.id !== id);
    scenarioStorage.save(filtered);
  },

  clear: (): void => {
    localStorage.removeItem(SCENARIOS_KEY);
  },
};

// الإعدادات
export const settingsStorage = {
  get: (): AppSettings => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : {
        language: 'ar',
        theme: 'light',
        universityId: 'default',
      };
    } catch {
      return {
        language: 'ar',
        theme: 'light',
        universityId: 'default',
      };
    }
  },

  save: (settings: AppSettings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  update: (updates: Partial<AppSettings>): void => {
    const current = settingsStorage.get();
    settingsStorage.save({ ...current, ...updates });
  },
};

// ملف التعلم المعرفي (CLP)
export const clpStorage = {
  get: (): CLPProfile | null => {
    try {
      const data = localStorage.getItem(CLP_PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  save: (profile: CLPProfile): void => {
    localStorage.setItem(CLP_PROFILE_KEY, JSON.stringify(profile));
  },

  delete: (): void => {
    localStorage.removeItem(CLP_PROFILE_KEY);
  },

  exists: (): boolean => {
    return localStorage.getItem(CLP_PROFILE_KEY) !== null;
  },
};
