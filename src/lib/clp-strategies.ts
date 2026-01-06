/**
 * Evidence-Based Study Strategies
 * 
 * Scientific References:
 * - Dunlosky et al., 2013: "Improving Students' Learning With Effective Learning Techniques"
 * - Roediger & Karpicke, 2006: "Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention"
 * - Cepeda et al., 2006: "Distributed Practice in Verbal Recall Tasks"
 * - Kornell & Bjork, 2008: "Learning Concepts and Categories: Is Spacing the Enemy of Induction?"
 * - Bjork & Bjork, 2011: "Making Things Hard on Yourself, But in a Good Way: Creating Desirable Difficulties"
 */

import type { CLPDomain, CLPProfile, CLPScore } from './clp-engine';

export interface StudyStrategy {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  scientificBasis: string;
  applicationAr: string[];
  applicationEn: string[];
  expectedBenefitAr: string;
  expectedBenefitEn: string;
  matchedDomains: CLPDomain[];
  matchedLevels: Record<CLPDomain, CLPScore[]>;
}

/**
 * Research-backed study strategies
 */
export const STUDY_STRATEGIES: StudyStrategy[] = [
  {
    id: 'active_recall',
    nameAr: 'الاسترجاع النشط',
    nameEn: 'Active Recall',
    descriptionAr: 'محاولة تذكر المعلومات من الذاكرة بدون النظر للمادة',
    descriptionEn: 'Attempting to retrieve information from memory without looking at material',
    scientificBasis: 'Roediger & Karpicke, 2006 - Test-Enhanced Learning',
    applicationAr: [
      'بعد قراءة صفحة، أغلق الكتاب واكتب ما تتذكره',
      'استخدم بطاقات تعليمية (Flashcards) واختبر نفسك',
      'اشرح المفهوم لشخص آخر بدون النظر للملاحظات',
      'حل أسئلة الاختبارات السابقة بدون مراجعة',
    ],
    applicationEn: [
      'After reading a page, close the book and write what you remember',
      'Use flashcards and test yourself',
      'Explain the concept to someone without looking at notes',
      'Solve past exam questions without reviewing',
    ],
    expectedBenefitAr: 'يحسن الاحتفاظ بالمعلومات على المدى الطويل بنسبة 50% مقارنة بالقراءة المتكررة',
    expectedBenefitEn: 'Improves long-term retention by 50% compared to rereading',
    matchedDomains: ['active_recall', 'cognitive_load'],
    matchedLevels: {
      active_recall: ['low', 'medium'],
      cognitive_load: ['medium', 'high'],
      focus_sustainability: [],
      time_management: [],
      procrastination: [],
      exam_stress: [],
    },
  },
  {
    id: 'spaced_repetition',
    nameAr: 'التكرار المتباعد',
    nameEn: 'Spaced Repetition',
    descriptionAr: 'مراجعة المعلومات على فترات زمنية متباعدة ومتزايدة',
    descriptionEn: 'Reviewing information at increasing time intervals',
    scientificBasis: 'Cepeda et al., 2006 - Distributed Practice',
    applicationAr: [
      'راجع المادة بعد يوم واحد من دراستها',
      'راجع مرة أخرى بعد 3 أيام',
      'راجع مرة ثالثة بعد أسبوع',
      'راجع مرة أخيرة بعد أسبوعين',
    ],
    applicationEn: [
      'Review material 1 day after studying',
      'Review again after 3 days',
      'Review third time after 1 week',
      'Final review after 2 weeks',
    ],
    expectedBenefitAr: 'يقلل النسيان بنسبة 80% ويحسن الاحتفاظ طويل المدى',
    expectedBenefitEn: 'Reduces forgetting by 80% and improves long-term retention',
    matchedDomains: ['time_management', 'procrastination'],
    matchedLevels: {
      time_management: ['low', 'medium'],
      procrastination: ['low', 'medium'],
      active_recall: [],
      cognitive_load: [],
      focus_sustainability: [],
      exam_stress: [],
    },
  },
  {
    id: 'practice_testing',
    nameAr: 'الاختبار التدريبي',
    nameEn: 'Practice Testing',
    descriptionAr: 'حل اختبارات وأسئلة تدريبية بشكل منتظم',
    descriptionEn: 'Solving practice tests and questions regularly',
    scientificBasis: 'Dunlosky et al., 2013 - High Utility Learning Technique',
    applicationAr: [
      'حل أسئلة الاختبارات السابقة',
      'اصنع اختبارات تدريبية خاصة بك',
      'استخدم تطبيقات الأسئلة التفاعلية',
      'اطلب من زميل أن يختبرك',
    ],
    applicationEn: [
      'Solve past exam questions',
      'Create your own practice tests',
      'Use interactive question apps',
      'Ask a peer to quiz you',
    ],
    expectedBenefitAr: 'يحسن الأداء في الاختبارات الفعلية بنسبة 30-40%',
    expectedBenefitEn: 'Improves actual exam performance by 30-40%',
    matchedDomains: ['active_recall', 'exam_stress'],
    matchedLevels: {
      active_recall: ['low', 'medium'],
      exam_stress: ['low', 'medium'],
      cognitive_load: [],
      focus_sustainability: [],
      time_management: [],
      procrastination: [],
    },
  },
  {
    id: 'interleaving',
    nameAr: 'التداخل',
    nameEn: 'Interleaving',
    descriptionAr: 'التنقل بين مواضيع أو مواد مختلفة أثناء المذاكرة',
    descriptionEn: 'Switching between different topics or subjects while studying',
    scientificBasis: 'Kornell & Bjork, 2008 - Interleaving Practice',
    applicationAr: [
      'ادرس موضوعين مختلفين في نفس الجلسة',
      'بدل بين أنواع المسائل المختلفة',
      'لا تدرس موضوع واحد لفترة طويلة',
      'اخلط المراجعة بين عدة فصول',
    ],
    applicationEn: [
      'Study two different topics in same session',
      'Alternate between different problem types',
      'Don\'t study one topic for too long',
      'Mix review between multiple chapters',
    ],
    expectedBenefitAr: 'يحسن القدرة على التمييز بين المفاهيم وحل المشكلات المتنوعة',
    expectedBenefitEn: 'Improves ability to distinguish concepts and solve varied problems',
    matchedDomains: ['cognitive_load', 'focus_sustainability'],
    matchedLevels: {
      cognitive_load: ['medium', 'high'],
      focus_sustainability: ['medium', 'high'],
      active_recall: [],
      time_management: [],
      procrastination: [],
      exam_stress: [],
    },
  },
  {
    id: 'time_boxing',
    nameAr: 'الصناديق الزمنية',
    nameEn: 'Time-Boxing',
    descriptionAr: 'تحديد فترات زمنية محددة لكل مهمة دراسية',
    descriptionEn: 'Setting specific time periods for each study task',
    scientificBasis: 'Bjork & Bjork, 2011 - Desirable Difficulties',
    applicationAr: [
      'حدد 25 دقيقة لكل موضوع (Pomodoro)',
      'خذ استراحة 5 دقائق بعد كل جلسة',
      'لا تتجاوز الوقت المحدد',
      'سجل إنجازاتك بعد كل صندوق زمني',
    ],
    applicationEn: [
      'Set 25 minutes per topic (Pomodoro)',
      'Take 5-minute break after each session',
      'Don\'t exceed the set time',
      'Record achievements after each time-box',
    ],
    expectedBenefitAr: 'يحسن التركيز ويقلل الإرهاق الذهني',
    expectedBenefitEn: 'Improves focus and reduces mental fatigue',
    matchedDomains: ['focus_sustainability', 'procrastination', 'time_management'],
    matchedLevels: {
      focus_sustainability: ['low', 'medium'],
      procrastination: ['low', 'medium'],
      time_management: ['low', 'medium'],
      active_recall: [],
      cognitive_load: [],
      exam_stress: [],
    },
  },
  {
    id: 'elaborative_interrogation',
    nameAr: 'الاستجواب التفصيلي',
    nameEn: 'Elaborative Interrogation',
    descriptionAr: 'طرح أسئلة "لماذا" و "كيف" لفهم المعلومات بعمق',
    descriptionEn: 'Asking "why" and "how" questions to deeply understand information',
    scientificBasis: 'Dunlosky et al., 2013 - Moderate Utility Technique',
    applicationAr: [
      'اسأل نفسك: لماذا هذا صحيح؟',
      'كيف يرتبط هذا بما أعرفه؟',
      'ما هي الأمثلة الواقعية؟',
      'ماذا سيحدث لو تغير هذا العامل؟',
    ],
    applicationEn: [
      'Ask yourself: Why is this true?',
      'How does this relate to what I know?',
      'What are real-world examples?',
      'What would happen if this factor changed?',
    ],
    expectedBenefitAr: 'يعمق الفهم ويربط المعلومات الجديدة بالمعرفة السابقة',
    expectedBenefitEn: 'Deepens understanding and connects new information to prior knowledge',
    matchedDomains: ['cognitive_load', 'active_recall'],
    matchedLevels: {
      cognitive_load: ['low', 'medium'],
      active_recall: ['medium', 'high'],
      focus_sustainability: [],
      time_management: [],
      procrastination: [],
      exam_stress: [],
    },
  },
  {
    id: 'self_explanation',
    nameAr: 'الشرح الذاتي',
    nameEn: 'Self-Explanation',
    descriptionAr: 'شرح المفاهيم لنفسك بكلماتك الخاصة',
    descriptionEn: 'Explaining concepts to yourself in your own words',
    scientificBasis: 'Dunlosky et al., 2013 - Moderate Utility Technique',
    applicationAr: [
      'اقرأ فقرة ثم اشرحها بكلماتك',
      'تخيل أنك تشرح لطالب جديد',
      'سجل شرحك صوتياً',
      'اكتب ملخصاً بأسلوبك الخاص',
    ],
    applicationEn: [
      'Read a paragraph then explain it in your words',
      'Imagine explaining to a new student',
      'Record your explanation',
      'Write a summary in your own style',
    ],
    expectedBenefitAr: 'يكشف الفجوات في الفهم ويعزز التعلم العميق',
    expectedBenefitEn: 'Reveals gaps in understanding and reinforces deep learning',
    matchedDomains: ['active_recall', 'cognitive_load'],
    matchedLevels: {
      active_recall: ['low', 'medium'],
      cognitive_load: ['medium', 'high'],
      focus_sustainability: [],
      time_management: [],
      procrastination: [],
      exam_stress: [],
    },
  },
];

/**
 * Match study strategies to CLP profile
 */
export class StrategyMatcher {
  /**
   * Get recommended strategies based on CLP profile
   */
  static getRecommendedStrategies(profile: CLPProfile): StudyStrategy[] {
    const recommendations: Array<{ strategy: StudyStrategy; score: number }> = [];

    for (const strategy of STUDY_STRATEGIES) {
      let matchScore = 0;

      // Check each domain in the profile
      for (const domainResult of profile.domains) {
        const domain = domainResult.domain;
        const level = domainResult.level;

        // If this strategy targets this domain
        if (strategy.matchedDomains.includes(domain)) {
          // Check if the level matches
          const targetLevels = strategy.matchedLevels[domain];
          if (targetLevels && targetLevels.includes(level)) {
            // Higher score for low-level domains (more need for improvement)
            matchScore += level === 'low' ? 3 : level === 'medium' ? 2 : 1;
          }
        }
      }

      if (matchScore > 0) {
        recommendations.push({ strategy, score: matchScore });
      }
    }

    // Sort by match score (highest first)
    recommendations.sort((a, b) => b.score - a.score);

    // Return top 5 strategies
    return recommendations.slice(0, 5).map(r => r.strategy);
  }

  /**
   * Get strategy for specific domain weakness
   */
  static getStrategyForDomain(domain: CLPDomain, level: CLPScore): StudyStrategy | null {
    const matchingStrategies = STUDY_STRATEGIES.filter(strategy => {
      const targetLevels = strategy.matchedLevels[domain];
      return targetLevels && targetLevels.includes(level);
    });

    return matchingStrategies[0] || null;
  }

  /**
   * Explain why a strategy matches the profile
   */
  static explainMatch(strategy: StudyStrategy, profile: CLPProfile, language: 'ar' | 'en'): string {
    const weakDomains = profile.domains.filter(d => d.level === 'low' || d.level === 'medium');
    const matchedWeakDomains = weakDomains.filter(d => strategy.matchedDomains.includes(d.domain));

    if (matchedWeakDomains.length === 0) {
      return language === 'ar'
        ? 'هذه الاستراتيجية مناسبة لتحسين أدائك الأكاديمي'
        : 'This strategy is suitable for improving your academic performance';
    }

    const domainNames = matchedWeakDomains.map(d => language === 'ar' ? d.nameAr : d.nameEn);

    if (language === 'ar') {
      return `هذه الاستراتيجية مناسبة لك لأن ملفك يظهر حاجة للتحسين في: ${domainNames.join('، ')}`;
    } else {
      return `This strategy suits you because your profile shows need for improvement in: ${domainNames.join(', ')}`;
    }
  }
}
