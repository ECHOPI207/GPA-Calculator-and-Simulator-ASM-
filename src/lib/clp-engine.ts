/**
 * Cognitive Learning Profile (CLP) Assessment Engine
 * 
 * Scientific Basis:
 * - Dunlosky et al., 2013: Effective Learning Techniques
 * - Roediger & Karpicke, 2006: Test-Enhanced Learning
 * - Bjork & Bjork, 2011: Desirable Difficulties
 * 
 * IMPORTANT: This is NOT a personality test or psychological diagnosis.
 * It measures academic behaviors that are adjustable and improvable.
 */

export type CLPDomain = 
  | 'focus_sustainability'
  | 'time_management'
  | 'active_recall'
  | 'procrastination'
  | 'cognitive_load'
  | 'exam_stress';

export type CLPScore = 'low' | 'medium' | 'high';

export interface CLPQuestion {
  id: string;
  domain: CLPDomain;
  textAr: string;
  textEn: string;
  options: {
    value: number; // 1-5 scale
    textAr: string;
    textEn: string;
  }[];
}

export interface CLPDomainResult {
  domain: CLPDomain;
  score: number; // 0-100
  level: CLPScore;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  improvementTipsAr: string[];
  improvementTipsEn: string[];
}

export interface CLPProfile {
  id: string;
  userId: string;
  completedAt: string;
  domains: CLPDomainResult[];
  overallScore: number;
  disclaimerShown: boolean;
}

export interface CLPAnswer {
  questionId: string;
  value: number;
}

/**
 * CLP Assessment Questions
 * Based on behavioral scenarios in academic contexts
 */
export const CLP_QUESTIONS: CLPQuestion[] = [
  // Focus Sustainability (3 questions)
  {
    id: 'focus_1',
    domain: 'focus_sustainability',
    textAr: 'عند المذاكرة لمدة ساعتين متواصلتين، كم مرة تجد نفسك تتحقق من هاتفك أو تفكر في أمور أخرى؟',
    textEn: 'When studying for 2 hours straight, how often do you find yourself checking your phone or thinking about other things?',
    options: [
      { value: 5, textAr: 'نادراً (1-2 مرة)', textEn: 'Rarely (1-2 times)' },
      { value: 4, textAr: 'أحياناً (3-4 مرات)', textEn: 'Sometimes (3-4 times)' },
      { value: 3, textAr: 'بشكل متوسط (5-7 مرات)', textEn: 'Moderately (5-7 times)' },
      { value: 2, textAr: 'كثيراً (8-10 مرات)', textEn: 'Often (8-10 times)' },
      { value: 1, textAr: 'باستمرار (أكثر من 10 مرات)', textEn: 'Constantly (more than 10 times)' },
    ],
  },
  {
    id: 'focus_2',
    domain: 'focus_sustainability',
    textAr: 'بعد 45 دقيقة من المذاكرة المركزة، كيف تصف قدرتك على الاستمرار؟',
    textEn: 'After 45 minutes of focused study, how would you describe your ability to continue?',
    options: [
      { value: 5, textAr: 'أستطيع الاستمرار بنفس التركيز', textEn: 'I can continue with the same focus' },
      { value: 4, textAr: 'أستطيع الاستمرار مع انخفاض طفيف', textEn: 'I can continue with slight decrease' },
      { value: 3, textAr: 'أحتاج استراحة قصيرة', textEn: 'I need a short break' },
      { value: 2, textAr: 'أشعر بتعب ذهني واضح', textEn: 'I feel clear mental fatigue' },
      { value: 1, textAr: 'لا أستطيع الاستمرار', textEn: 'I cannot continue' },
    ],
  },
  {
    id: 'focus_3',
    domain: 'focus_sustainability',
    textAr: 'عند دراسة مادة صعبة، كم من الوقت تستطيع التركيز قبل أن تشعر بالحاجة لتغيير النشاط؟',
    textEn: 'When studying difficult material, how long can you focus before feeling the need to switch activities?',
    options: [
      { value: 5, textAr: 'أكثر من ساعة', textEn: 'More than 1 hour' },
      { value: 4, textAr: '45-60 دقيقة', textEn: '45-60 minutes' },
      { value: 3, textAr: '30-45 دقيقة', textEn: '30-45 minutes' },
      { value: 2, textAr: '15-30 دقيقة', textEn: '15-30 minutes' },
      { value: 1, textAr: 'أقل من 15 دقيقة', textEn: 'Less than 15 minutes' },
    ],
  },

  // Time Management & Planning (2 questions)
  {
    id: 'time_1',
    domain: 'time_management',
    textAr: 'قبل أسبوع من الاختبار، هل لديك خطة واضحة لما ستدرسه كل يوم؟',
    textEn: 'One week before an exam, do you have a clear plan for what to study each day?',
    options: [
      { value: 5, textAr: 'دائماً، لدي جدول مفصل', textEn: 'Always, I have a detailed schedule' },
      { value: 4, textAr: 'غالباً، لدي خطة عامة', textEn: 'Usually, I have a general plan' },
      { value: 3, textAr: 'أحياناً، أخطط يوماً بيوم', textEn: 'Sometimes, I plan day by day' },
      { value: 2, textAr: 'نادراً، أذاكر حسب الظروف', textEn: 'Rarely, I study as circumstances allow' },
      { value: 1, textAr: 'أبداً، أذاكر بشكل عشوائي', textEn: 'Never, I study randomly' },
    ],
  },
  {
    id: 'time_2',
    domain: 'time_management',
    textAr: 'كم مرة تجد نفسك تذاكر في اللحظات الأخيرة قبل الاختبار؟',
    textEn: 'How often do you find yourself studying at the last minute before an exam?',
    options: [
      { value: 5, textAr: 'نادراً جداً', textEn: 'Very rarely' },
      { value: 4, textAr: 'أحياناً', textEn: 'Sometimes' },
      { value: 3, textAr: 'نصف الوقت تقريباً', textEn: 'About half the time' },
      { value: 2, textAr: 'غالباً', textEn: 'Often' },
      { value: 1, textAr: 'دائماً', textEn: 'Always' },
    ],
  },

  // Active Recall Usage (3 questions)
  {
    id: 'recall_1',
    domain: 'active_recall',
    textAr: 'عند مذاكرة معلومات جديدة، ما هي طريقتك الأساسية؟',
    textEn: 'When studying new information, what is your primary method?',
    options: [
      { value: 5, textAr: 'أختبر نفسي بدون النظر للمادة', textEn: 'I test myself without looking at the material' },
      { value: 4, textAr: 'أحاول شرح المادة بكلماتي الخاصة', textEn: 'I try to explain the material in my own words' },
      { value: 3, textAr: 'أكتب ملخصات', textEn: 'I write summaries' },
      { value: 2, textAr: 'أقرأ المادة عدة مرات', textEn: 'I read the material multiple times' },
      { value: 1, textAr: 'أظلل النصوص المهمة', textEn: 'I highlight important texts' },
    ],
  },
  {
    id: 'recall_2',
    domain: 'active_recall',
    textAr: 'كم مرة تحاول استرجاع المعلومات من الذاكرة بدون النظر للكتاب؟',
    textEn: 'How often do you try to retrieve information from memory without looking at the book?',
    options: [
      { value: 5, textAr: 'في كل جلسة مذاكرة', textEn: 'In every study session' },
      { value: 4, textAr: 'عدة مرات في الأسبوع', textEn: 'Several times a week' },
      { value: 3, textAr: 'مرة في الأسبوع', textEn: 'Once a week' },
      { value: 2, textAr: 'فقط قبل الاختبار', textEn: 'Only before exams' },
      { value: 1, textAr: 'نادراً أو أبداً', textEn: 'Rarely or never' },
    ],
  },
  {
    id: 'recall_3',
    domain: 'active_recall',
    textAr: 'عند مراجعة مادة سبق دراستها، ماذا تفعل؟',
    textEn: 'When reviewing previously studied material, what do you do?',
    options: [
      { value: 5, textAr: 'أحل أسئلة وتمارين جديدة', textEn: 'I solve new questions and exercises' },
      { value: 4, textAr: 'أحاول تذكر النقاط الرئيسية', textEn: 'I try to recall main points' },
      { value: 3, textAr: 'أراجع ملخصاتي', textEn: 'I review my summaries' },
      { value: 2, textAr: 'أعيد قراءة الكتاب', textEn: 'I reread the textbook' },
      { value: 1, textAr: 'أنظر للنصوص المظللة فقط', textEn: 'I only look at highlighted texts' },
    ],
  },

  // Procrastination Tendency (2 questions)
  {
    id: 'procrastination_1',
    domain: 'procrastination',
    textAr: 'عندما يكون لديك واجب يستحق التسليم بعد أسبوع، متى تبدأ العمل عليه؟',
    textEn: 'When you have an assignment due in one week, when do you start working on it?',
    options: [
      { value: 5, textAr: 'في نفس اليوم أو اليوم التالي', textEn: 'Same day or next day' },
      { value: 4, textAr: 'بعد 2-3 أيام', textEn: 'After 2-3 days' },
      { value: 3, textAr: 'في منتصف الأسبوع', textEn: 'Mid-week' },
      { value: 2, textAr: 'قبل يوم أو يومين من التسليم', textEn: '1-2 days before deadline' },
      { value: 1, textAr: 'في اليوم الأخير', textEn: 'On the last day' },
    ],
  },
  {
    id: 'procrastination_2',
    domain: 'procrastination',
    textAr: 'كم مرة تؤجل جلسة المذاكرة المخطط لها لأنشطة أخرى؟',
    textEn: 'How often do you postpone a planned study session for other activities?',
    options: [
      { value: 5, textAr: 'نادراً جداً', textEn: 'Very rarely' },
      { value: 4, textAr: 'أحياناً', textEn: 'Sometimes' },
      { value: 3, textAr: 'نصف الوقت تقريباً', textEn: 'About half the time' },
      { value: 2, textAr: 'غالباً', textEn: 'Often' },
      { value: 1, textAr: 'دائماً تقريباً', textEn: 'Almost always' },
    ],
  },

  // Cognitive Load Tolerance (2 questions)
  {
    id: 'cognitive_1',
    domain: 'cognitive_load',
    textAr: 'عند دراسة عدة مواد في نفس اليوم، كيف تشعر؟',
    textEn: 'When studying multiple subjects in the same day, how do you feel?',
    options: [
      { value: 5, textAr: 'مرتاح، أستطيع التنقل بينها بسهولة', textEn: 'Comfortable, I can switch between them easily' },
      { value: 4, textAr: 'جيد، مع بعض الجهد', textEn: 'Good, with some effort' },
      { value: 3, textAr: 'متوسط، أحتاج فواصل', textEn: 'Moderate, I need breaks' },
      { value: 2, textAr: 'صعب، أشعر بالإرهاق', textEn: 'Difficult, I feel exhausted' },
      { value: 1, textAr: 'مرهق جداً، أفضل مادة واحدة', textEn: 'Very exhausting, I prefer one subject' },
    ],
  },
  {
    id: 'cognitive_2',
    domain: 'cognitive_load',
    textAr: 'كيف تتعامل مع المواد التي تحتوي على معلومات كثيرة ومعقدة؟',
    textEn: 'How do you handle subjects with lots of complex information?',
    options: [
      { value: 5, textAr: 'أقسمها لأجزاء صغيرة وأدرسها تدريجياً', textEn: 'I break them into small parts and study gradually' },
      { value: 4, textAr: 'أركز على الأساسيات أولاً', textEn: 'I focus on basics first' },
      { value: 3, textAr: 'أحاول فهم كل شيء مرة واحدة', textEn: 'I try to understand everything at once' },
      { value: 2, textAr: 'أشعر بالإرباك وأؤجل', textEn: 'I feel overwhelmed and postpone' },
      { value: 1, textAr: 'أتجنب المواد الصعبة', textEn: 'I avoid difficult subjects' },
    ],
  },

  // Exam Stress Response (3 questions)
  {
    id: 'stress_1',
    domain: 'exam_stress',
    textAr: 'في ليلة الاختبار، كيف تنام؟',
    textEn: 'On the night before an exam, how do you sleep?',
    options: [
      { value: 5, textAr: 'نوم طبيعي وهادئ', textEn: 'Normal and peaceful sleep' },
      { value: 4, textAr: 'نوم جيد مع قلق بسيط', textEn: 'Good sleep with slight worry' },
      { value: 3, textAr: 'نوم متقطع', textEn: 'Interrupted sleep' },
      { value: 2, textAr: 'صعوبة في النوم', textEn: 'Difficulty sleeping' },
      { value: 1, textAr: 'أرق شديد', textEn: 'Severe insomnia' },
    ],
  },
  {
    id: 'stress_2',
    domain: 'exam_stress',
    textAr: 'أثناء الاختبار، كيف تتعامل مع الأسئلة الصعبة؟',
    textEn: 'During an exam, how do you handle difficult questions?',
    options: [
      { value: 5, textAr: 'أتخطاها وأعود لها لاحقاً بهدوء', textEn: 'I skip them and return later calmly' },
      { value: 4, textAr: 'أفكر قليلاً ثم أنتقل', textEn: 'I think briefly then move on' },
      { value: 3, textAr: 'أشعر بتوتر لكن أستمر', textEn: 'I feel tense but continue' },
      { value: 2, textAr: 'أشعر بقلق يؤثر على تركيزي', textEn: 'I feel anxiety that affects my focus' },
      { value: 1, textAr: 'أشعر بذعر وأفقد التركيز', textEn: 'I panic and lose focus' },
    ],
  },
  {
    id: 'stress_3',
    domain: 'exam_stress',
    textAr: 'بعد الاختبار، كيف تشعر؟',
    textEn: 'After an exam, how do you feel?',
    options: [
      { value: 5, textAr: 'راضٍ عن أدائي', textEn: 'Satisfied with my performance' },
      { value: 4, textAr: 'متفائل بشكل عام', textEn: 'Generally optimistic' },
      { value: 3, textAr: 'قلق بشأن النتيجة', textEn: 'Worried about the result' },
      { value: 2, textAr: 'متأكد أنني أخطأت كثيراً', textEn: 'Sure I made many mistakes' },
      { value: 1, textAr: 'مرهق نفسياً جداً', textEn: 'Very mentally exhausted' },
    ],
  },
];

/**
 * Calculate CLP domain scores from answers
 */
export class CLPEngine {
  static calculateDomainScore(domain: CLPDomain, answers: CLPAnswer[]): number {
    const domainQuestions = CLP_QUESTIONS.filter(q => q.domain === domain);
    const domainAnswers = answers.filter(a => 
      domainQuestions.some(q => q.id === a.questionId)
    );

    if (domainAnswers.length === 0) return 0;

    const totalScore = domainAnswers.reduce((sum, a) => sum + a.value, 0);
    const maxScore = domainAnswers.length * 5;
    
    // Convert to 0-100 scale
    return (totalScore / maxScore) * 100;
  }

  static getScoreLevel(score: number): CLPScore {
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }

  static getDomainInfo(domain: CLPDomain, score: number): CLPDomainResult {
    const level = this.getScoreLevel(score);

    const domainData: Record<CLPDomain, Omit<CLPDomainResult, 'domain' | 'score' | 'level'>> = {
      focus_sustainability: {
        nameAr: 'استدامة التركيز',
        nameEn: 'Focus Sustainability',
        descriptionAr: level === 'high' 
          ? 'لديك قدرة جيدة على الحفاظ على التركيز لفترات طويلة'
          : level === 'medium'
          ? 'تستطيع التركيز لفترات معتدلة مع بعض التشتت'
          : 'تواجه صعوبة في الحفاظ على التركيز لفترات طويلة',
        descriptionEn: level === 'high'
          ? 'You have good ability to maintain focus for extended periods'
          : level === 'medium'
          ? 'You can focus for moderate periods with some distraction'
          : 'You face difficulty maintaining focus for long periods',
        improvementTipsAr: [
          'استخدم تقنية Pomodoro (25 دقيقة تركيز + 5 دقائق راحة)',
          'أغلق جميع المشتتات قبل البدء',
          'ابدأ بجلسات قصيرة وزد المدة تدريجياً',
        ],
        improvementTipsEn: [
          'Use Pomodoro Technique (25 min focus + 5 min break)',
          'Turn off all distractions before starting',
          'Start with short sessions and gradually increase duration',
        ],
      },
      time_management: {
        nameAr: 'إدارة الوقت والتخطيط',
        nameEn: 'Time Management & Planning',
        descriptionAr: level === 'high'
          ? 'لديك مهارات تخطيط وإدارة وقت جيدة'
          : level === 'medium'
          ? 'تخطط أحياناً لكن ليس بشكل منتظم'
          : 'تحتاج لتحسين مهارات التخطيط وإدارة الوقت',
        descriptionEn: level === 'high'
          ? 'You have good planning and time management skills'
          : level === 'medium'
          ? 'You plan sometimes but not consistently'
          : 'You need to improve planning and time management skills',
        improvementTipsAr: [
          'ضع جدول أسبوعي للمذاكرة',
          'قسم المهام الكبيرة لمهام صغيرة',
          'حدد أولويات واضحة',
        ],
        improvementTipsEn: [
          'Create a weekly study schedule',
          'Break large tasks into smaller ones',
          'Set clear priorities',
        ],
      },
      active_recall: {
        nameAr: 'استخدام الاسترجاع النشط',
        nameEn: 'Active Recall Usage',
        descriptionAr: level === 'high'
          ? 'تستخدم تقنيات الاسترجاع النشط بشكل فعال'
          : level === 'medium'
          ? 'تستخدم الاسترجاع النشط أحياناً'
          : 'تعتمد على القراءة المتكررة أكثر من الاسترجاع',
        descriptionEn: level === 'high'
          ? 'You effectively use active recall techniques'
          : level === 'medium'
          ? 'You use active recall sometimes'
          : 'You rely on rereading more than retrieval',
        improvementTipsAr: [
          'اختبر نفسك بدون النظر للمادة',
          'استخدم البطاقات التعليمية (Flashcards)',
          'اشرح المادة لشخص آخر',
        ],
        improvementTipsEn: [
          'Test yourself without looking at material',
          'Use flashcards',
          'Explain material to someone else',
        ],
      },
      procrastination: {
        nameAr: 'ميل التسويف',
        nameEn: 'Procrastination Tendency',
        descriptionAr: level === 'high'
          ? 'نادراً ما تؤجل المهام الدراسية'
          : level === 'medium'
          ? 'تؤجل المهام أحياناً'
          : 'تميل للتسويف بشكل متكرر',
        descriptionEn: level === 'high'
          ? 'You rarely postpone academic tasks'
          : level === 'medium'
          ? 'You postpone tasks sometimes'
          : 'You tend to procrastinate frequently',
        improvementTipsAr: [
          'ابدأ بأصغر خطوة ممكنة (قاعدة الدقيقتين)',
          'حدد مواعيد نهائية شخصية قبل الموعد الفعلي',
          'كافئ نفسك بعد إنجاز المهام',
        ],
        improvementTipsEn: [
          'Start with smallest possible step (2-minute rule)',
          'Set personal deadlines before actual deadline',
          'Reward yourself after completing tasks',
        ],
      },
      cognitive_load: {
        nameAr: 'تحمل الحمل المعرفي',
        nameEn: 'Cognitive Load Tolerance',
        descriptionAr: level === 'high'
          ? 'تستطيع التعامل مع معلومات معقدة ومتعددة'
          : level === 'medium'
          ? 'تتعامل مع الحمل المعرفي بشكل معتدل'
          : 'تشعر بالإرهاق من المعلومات الكثيرة',
        descriptionEn: level === 'high'
          ? 'You can handle complex and multiple information'
          : level === 'medium'
          ? 'You handle cognitive load moderately'
          : 'You feel overwhelmed by large amounts of information',
        improvementTipsAr: [
          'قسم المواد المعقدة لأجزاء صغيرة',
          'استخدم الخرائط الذهنية',
          'ادرس مادة واحدة في كل جلسة',
        ],
        improvementTipsEn: [
          'Break complex material into small chunks',
          'Use mind maps',
          'Study one subject per session',
        ],
      },
      exam_stress: {
        nameAr: 'استجابة ضغط الاختبارات',
        nameEn: 'Exam Stress Response',
        descriptionAr: level === 'high'
          ? 'تتعامل مع ضغط الاختبارات بشكل جيد'
          : level === 'medium'
          ? 'تشعر ببعض التوتر لكنه لا يؤثر كثيراً'
          : 'تشعر بتوتر كبير يؤثر على أدائك',
        descriptionEn: level === 'high'
          ? 'You handle exam stress well'
          : level === 'medium'
          ? 'You feel some tension but it doesn\'t affect much'
          : 'You feel significant stress that affects performance',
        improvementTipsAr: [
          'مارس تمارين التنفس العميق',
          'نم جيداً قبل الاختبار',
          'راجع بشكل منتظم لتقليل القلق',
        ],
        improvementTipsEn: [
          'Practice deep breathing exercises',
          'Sleep well before exams',
          'Review regularly to reduce anxiety',
        ],
      },
    };

    return {
      domain,
      score,
      level,
      ...domainData[domain],
    };
  }

  static generateProfile(userId: string, answers: CLPAnswer[]): CLPProfile {
    const domains: CLPDomain[] = [
      'focus_sustainability',
      'time_management',
      'active_recall',
      'procrastination',
      'cognitive_load',
      'exam_stress',
    ];

    const domainResults = domains.map(domain => {
      const score = this.calculateDomainScore(domain, answers);
      return this.getDomainInfo(domain, score);
    });

    const overallScore = domainResults.reduce((sum, d) => sum + d.score, 0) / domains.length;

    return {
      id: `clp_${Date.now()}`,
      userId,
      completedAt: new Date().toISOString(),
      domains: domainResults,
      overallScore,
      disclaimerShown: true,
    };
  }
}
