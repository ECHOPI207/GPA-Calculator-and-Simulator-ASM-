import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language } from '@/types/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // App Name
    'app.name': 'echo-π Academic Intelligence',
    'app.tagline': 'Your Academic Success Partner',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.calculator': 'GPA Calculator',
    'nav.simulator': 'Scenario Simulator',
    'nav.timeline': 'Academic Timeline',
    'nav.reports': 'Reports & Analysis',
    'nav.settings': 'Settings',
    'nav.admin': 'Admin Panel',
    
    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.signup': 'Sign Up',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.welcomeBack': 'Welcome Back',
    'auth.createAccount': 'Create Account',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    
    // Dashboard
    'dashboard.title': 'Academic Dashboard',
    'dashboard.currentGPA': 'Current GPA',
    'dashboard.cumulativeGPA': 'Cumulative GPA',
    'dashboard.totalHours': 'Total Hours',
    'dashboard.passedHours': 'Passed Hours',
    'dashboard.classification': 'Classification',
    'dashboard.recentCourses': 'Recent Courses',
    'dashboard.quickStats': 'Quick Statistics',
    
    // GPA
    'gpa.excellent': 'Excellent',
    'gpa.veryGood': 'Very Good',
    'gpa.good': 'Good',
    'gpa.pass': 'Pass',
    'gpa.fail': 'Fail',
    
    // Courses
    'course.add': 'Add Course',
    'course.edit': 'Edit Course',
    'course.delete': 'Delete Course',
    'course.code': 'Course Code',
    'course.name': 'Course Name',
    'course.credits': 'Credit Hours',
    'course.grade': 'Grade',
    'course.semester': 'Semester',
    'course.year': 'Year',
    'course.isRetake': 'Is Retake',
    'course.noCourses': 'No courses added yet',
    
    // Simulator
    'simulator.title': 'GPA Scenario Simulator',
    'simulator.createScenario': 'Create Scenario',
    'simulator.scenarioName': 'Scenario Name',
    'simulator.addCourse': 'Add Course to Scenario',
    'simulator.predictedGPA': 'Predicted GPA',
    'simulator.bestCase': 'Best Case',
    'simulator.worstCase': 'Worst Case',
    'simulator.realistic': 'Realistic',
    
    // Timeline
    'timeline.title': 'Academic Timeline',
    'timeline.semesterGPA': 'Semester GPA',
    'timeline.performance': 'Performance Trend',
    
    // Reports
    'reports.title': 'Academic Reports',
    'reports.export': 'Export PDF',
    'reports.analysis': 'Detailed Analysis',
    'reports.recommendations': 'Recommendations',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.university': 'University',
    'settings.selectUniversity': 'Select University',
    'settings.theme': 'Theme',
    'settings.lightMode': 'Light Mode',
    'settings.darkMode': 'Dark Mode',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.confirm': 'Confirm',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    
    // Validation
    'validation.required': 'This field is required',
    'validation.invalidGrade': 'Invalid grade',
    'validation.invalidCredits': 'Invalid credit hours',
    'validation.duplicateCourse': 'Duplicate course detected',
    
    // Messages
    'message.courseAdded': 'Course added successfully',
    'message.courseUpdated': 'Course updated successfully',
    'message.courseDeleted': 'Course deleted successfully',
    'message.scenarioSaved': 'Scenario saved successfully',
  },
  ar: {
    // App Name
    'app.name': 'منصة echo-π الذكية للمعدل الأكاديمي',
    'app.tagline': 'شريكك في النجاح الأكاديمي',
    
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.calculator': 'حاسبة المعدل',
    'nav.simulator': 'محاكي السيناريوهات',
    'nav.timeline': 'الجدول الزمني الأكاديمي',
    'nav.reports': 'التقارير والتحليلات',
    'nav.settings': 'الإعدادات',
    'nav.admin': 'لوحة الإدارة',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.signup': 'إنشاء حساب',
    'auth.username': 'اسم المستخدم',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.welcomeBack': 'مرحباً بعودتك',
    'auth.createAccount': 'إنشاء حساب جديد',
    'auth.alreadyHaveAccount': 'لديك حساب بالفعل؟',
    'auth.dontHaveAccount': 'ليس لديك حساب؟',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم الأكاديمية',
    'dashboard.currentGPA': 'المعدل الفصلي',
    'dashboard.cumulativeGPA': 'المعدل التراكمي',
    'dashboard.totalHours': 'إجمالي الساعات',
    'dashboard.passedHours': 'الساعات المجتازة',
    'dashboard.classification': 'التقدير',
    'dashboard.recentCourses': 'المقررات الأخيرة',
    'dashboard.quickStats': 'إحصائيات سريعة',
    
    // GPA
    'gpa.excellent': 'ممتاز',
    'gpa.veryGood': 'جيد جداً',
    'gpa.good': 'جيد',
    'gpa.pass': 'مقبول',
    'gpa.fail': 'راسب',
    
    // Courses
    'course.add': 'إضافة مقرر',
    'course.edit': 'تعديل المقرر',
    'course.delete': 'حذف المقرر',
    'course.code': 'رمز المقرر',
    'course.name': 'اسم المقرر',
    'course.credits': 'الساعات المعتمدة',
    'course.grade': 'الدرجة',
    'course.semester': 'الفصل الدراسي',
    'course.year': 'السنة',
    'course.isRetake': 'إعادة',
    'course.noCourses': 'لم تتم إضافة أي مقررات بعد',
    
    // Simulator
    'simulator.title': 'محاكي سيناريوهات المعدل',
    'simulator.createScenario': 'إنشاء سيناريو',
    'simulator.scenarioName': 'اسم السيناريو',
    'simulator.addCourse': 'إضافة مقرر للسيناريو',
    'simulator.predictedGPA': 'المعدل المتوقع',
    'simulator.bestCase': 'أفضل حالة',
    'simulator.worstCase': 'أسوأ حالة',
    'simulator.realistic': 'واقعي',
    
    // Timeline
    'timeline.title': 'الجدول الزمني الأكاديمي',
    'timeline.semesterGPA': 'معدل الفصل',
    'timeline.performance': 'اتجاه الأداء',
    
    // Reports
    'reports.title': 'التقارير الأكاديمية',
    'reports.export': 'تصدير PDF',
    'reports.analysis': 'تحليل مفصل',
    'reports.recommendations': 'التوصيات',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.university': 'الجامعة',
    'settings.selectUniversity': 'اختر الجامعة',
    'settings.theme': 'المظهر',
    'settings.lightMode': 'الوضع الفاتح',
    'settings.darkMode': 'الوضع الداكن',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.close': 'إغلاق',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.confirm': 'تأكيد',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.export': 'تصدير',
    
    // Validation
    'validation.required': 'هذا الحقل مطلوب',
    'validation.invalidGrade': 'درجة غير صالحة',
    'validation.invalidCredits': 'ساعات معتمدة غير صالحة',
    'validation.duplicateCourse': 'تم اكتشاف مقرر مكرر',
    
    // Messages
    'message.courseAdded': 'تمت إضافة المقرر بنجاح',
    'message.courseUpdated': 'تم تحديث المقرر بنجاح',
    'message.courseDeleted': 'تم حذف المقرر بنجاح',
    'message.scenarioSaved': 'تم حفظ السيناريو بنجاح',
  }
};
