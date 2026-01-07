import { AcademicAnalysis } from './academic-analyzer';
import { Course } from '@/types/types';

export class AcademicAssistant {
  
  // SECTION: "ملحق توضيحي مستند إلى مراجع مباشرة"
  static getStrictWhitelistSection(analysis: AcademicAnalysis, calc: any, courses: Course[], isAr: boolean): string[] {
    if (!isAr) return [];
    const lines: string[] = [];

    // 1. Cumulative GPA (Explicit in Section 1)
    const gpa = calc.cumulativeGPA.toFixed(2);
    lines.push(`[المعدل التراكمي = ${gpa}] → يمثل هذا الرقم متوسط النقاط لجميع المقررات المسجلة في السجل الأكاديمي.`);

    // 2. Total Passed Hours (Explicit in Section 1)
    const hours = calc.totalPassedHours;
    lines.push(`[الساعات المكتسبة = ${hours}] → يمثل هذا الرقم مجموع الساعات المعتمدة للمقررات التي تم اجتيازها بنجاح.`);

    // 3. Completion Rate (Explicit in Section 1)
    const totalRegistered = calc.totalRegisteredHours || 1;
    const efficiency = Math.round((calc.totalPassedHours / totalRegistered) * 100);
    lines.push(`[كفاءة الإنجاز = ${efficiency}%] → تمثل هذه النسبة العلاقة بين الساعات التي تم اجتيازها والساعات التي تم تسجيلها.`);

    // 4. Risk Level (Explicit in Section 2)
    const riskLevel = analysis.risk.level;
    const riskMap: Record<string, string> = { 'critical': 'حرج', 'high': 'مرتفع', 'medium': 'متوسط', 'low': 'منخفض' };
    const riskLabel = riskMap[riskLevel] || riskLevel;
    lines.push(`[مستوى المخاطرة المحتمل = ${riskLabel}] → يشير هذا التصنيف إلى تقييم إحصائي للوضع الأكاديمي الحالي بناءً على البيانات.`);

    // 5. Semester References (Explicit in Section 7)
    // Take the last 2 semesters as examples if available
    const semesters = analysis.semesters;
    if (semesters.length > 0) {
        const lastSem = semesters[semesters.length - 1];
        lines.push(`[الفصل ${lastSem.semester} ${lastSem.year}] → يظهر هذا الفصل كآخر فترة أكاديمية مسجلة في التقرير.`);
    }

    // 6. Course Count (Explicit in Section 1)
    lines.push(`[عدد المقررات = ${courses.length}] → يمثل هذا الرقم إجمالي المواد التي تم إدخالها في النظام.`);

    return lines;
  }

  static buildGuideSections(analysis: AcademicAnalysis, calc: any, courses: Course[], isAr: boolean) {
    if (!isAr) return null;
    const s1 = [
      { ref: `المعدل التراكمي = ${calc.cumulativeGPA.toFixed(2)}`, text: `هذا الرقم يعبّر عن متوسط الأداء التراكمي المحسوب من جميع المقررات المسجلة حتى تاريخ التقرير، دون أن يعكس تفاصيل الأداء الفصلي أو نوعية المقررات.` },
      { ref: `عدد الساعات المكتسبة = ${calc.totalPassedHours}`, text: `هذا الرقم يوضح حجم التقدم الأكاديمي من حيث الساعات المعتمدة التي تم اجتيازها بنجاح حتى الآن.` },
    ];
    const riskMap: Record<string, string> = { 'critical': 'حرج', 'high': 'مرتفع', 'medium': 'متوسط', 'low': 'منخفض' };
    const riskLabel = riskMap[analysis.risk.level] || analysis.risk.level;
    const primaryFactorDisplay = analysis.risk.factors && analysis.risk.factors[0]
      ? (analysis.risk.factors[0].includes('Declining') ? 'تراجع في الأداء'
        : analysis.risk.factors[0].includes('Failed') ? 'مواد متعثرة'
        : analysis.risk.factors[0])
      : '';
    const s2 = [
      { ref: `مستوى المخاطرة = ${riskLabel}`, text: `هذا التصنيف هو وسم إحصائي ناتج عن ربط المعدل التراكمي باتجاه الأداء العام، ويُستخدم للفهم والمتابعة وليس لاتخاذ قرار مباشر.` },
      ...(primaryFactorDisplay ? [{ ref: `عامل التأثير الرئيسي = ${primaryFactorDisplay}`, text: `هذا العامل يوضح السبب الإحصائي الأكثر ارتباطًا بتغير الأداء كما هو مذكور في التقرير دون إضافة تفسير جديد.` }] : [])
    ];
    const s3 = [
      { ref: `توزيع الدرجات (A / B / C / D / F)`, text: `هذا التوزيع يوضح شكل الأداء العام عبر جميع المقررات، ويبيّن أن المعدل التراكمي ناتج عن مزيج من مستويات أداء مختلفة.` }
    ];
    const s4 = analysis.semesters.map((sem, idx) => {
      const position = idx === 0 ? 'أول' : (idx === analysis.semesters.length - 1 ? 'أحدث' : 'لاحق');
      const items = [
        { ref: `الفصل الدراسي: ${sem.semester} ${sem.year}`, text: `يمثل هذا الفصل جزءًا من التسلسل الزمني للأداء كما هو معروض في السجل.` },
        { ref: `المعدل الفصلي: ${sem.semesterGPA.toFixed(2)}`, text: `يعكس الأداء في هذا الفصل الدراسي فقط.` },
        { ref: `المعدل التراكمي بعد هذا الفصل: ${sem.cumulativeGPA.toFixed(2)}`, text: `يقيس متوسط الأداء حتى نهاية هذا الفصل.` },
        { ref: `عدد الساعات المسجلة في هذا الفصل: ${sem.totalCredits}`, text: `يوضح العبء الدراسي المسجل في هذا الفصل.` },
        { ref: `ملاحظة وصفية محايدة`, text: `هذا الفصل يُمثل ${position} فصل دراسي مُسجَّل في السجل الأكاديمي المعروض، ويُستخدم ضمن التسلسل الزمني دون إصدار أي حكم.` }
      ];
      return items;
    });
    const names = (k: string[]) => courses.filter(c => k.some(x => c.courseName.includes(x))).map(c => c.courseName).slice(0, 6);
    const theoretical = names(['نظرية', 'الالكترونية', 'التحكم', 'مصطلحات', 'أساسيات', 'إحصاء', 'حقوق']);
    const practical = names(['مختبر', 'عملي', 'تطبيقية', 'اتصالات', 'تصميم', 'روائز']);
    const skills = names(['لغة', 'إنجليزية', 'مصطلحات', 'مهارات']);
    const s5 = [
      { ref: `مواد ذات طابع نظري`, text: theoretical.length ? `[${theoretical.join(' ، ')}] تعتمد على الفهم التراكمي والمتابعة المستمرة أثناء الفصل.` : `لا توجد قائمة محددة ضمن هذا التصنيف وفق الأسماء الظاهرة.` },
      { ref: `مواد عملية / تطبيقية`, text: practical.length ? `[${practical.join(' ، ')}] تعتمد على التطبيق والممارسة بجانب المذاكرة النظرية.` : `لا توجد قائمة محددة ضمن هذا التصنيف وفق الأسماء الظاهرة.` },
      { ref: `مواد مهارية / لغات`, text: skills.length ? `[${skills.join(' ، ')}] ترتبط بالتدريب المستمر والتكرار أكثر من الحفظ.` : `لا توجد قائمة محددة ضمن هذا التصنيف وفق الأسماء الظاهرة.` },
    ];
    const s6 = [
      { ref: `1. نظرة عامة شاملة`, text: `يُستخدم لفهم نمط الأداء السابق فقط عند بداية الفصل.` },
      { ref: `2. المؤشرات الإحصائية`, text: `يُستخدم كمرجع مقارنة ذاتية أثناء الفصل، وليس كأداة حكم.` },
      { ref: `7. السجل الأكاديمي الفصلي`, text: `يُراجع قبل التقييمات لمعرفة المواد التي تحتاج تنظيم وقت أكبر.` },
    ];
    const s7 = [
      { text: `يقدّم شرحًا للبيانات الأكاديمية كما وردت` },
      { text: `لا يصدر قرارات` },
      { text: `لا يوصي بإجراءات إدارية` },
      { text: `لا يستبدل الإرشاد الأكاديمي` },
    ];
    return { s1, s2, s3, s4, s5, s6, s7 };
  }

  static buildImprovementNotes(analysis: AcademicAnalysis, calc: any, courses: Course[], isAr: boolean) {
    if (!isAr) return null;
    const riskMap: Record<string, string> = { 'critical': 'حرج', 'high': 'مرتفع', 'medium': 'متوسط', 'low': 'منخفض' };
    const riskLabel = riskMap[analysis.risk.level] || analysis.risk.level;
    const efficiency = Math.round((calc.totalPassedHours / (calc.totalRegisteredHours || 1)) * 100);
    const gradeCounts = ['A','B','C','D','F'].reduce((acc, k) => {
      acc[k] = courses.filter(c => c.grade.startsWith(k)).length;
      return acc;
    }, {} as Record<string, number>);
    const heavy = courses.filter(c => c.creditHours >= 4).map(c => c.courseCode);
    const repeats = courses.filter(c => c.isRetake).map(c => c.courseCode);
    const factorDisplay = analysis.risk.factors && analysis.risk.factors[0]
      ? (analysis.risk.factors[0].includes('Declining') ? 'تراجع في الأداء'
        : analysis.risk.factors[0].includes('Failed') ? 'مواد متعثرة'
        : analysis.risk.factors[0])
      : '';

    const overview = [
      `كيف تقرأ هذا القسم: المعدل التراكمي = ${calc.cumulativeGPA.toFixed(2)} يعكس متوسط النقاط لجميع المقررات الظاهرة.`,
      `كفاءة الإنجاز = ${efficiency}% تربط الساعات المكتسبة بالساعات المسجلة كما هو معروض.`,
    ];

    const statistical = [
      `ما الذي يشير إليه ذلك: مستوى المخاطرة = ${riskLabel} مرتبط ببيانات الفصول المدرجة في التقرير.`,
      ...(factorDisplay ? [`عامل التأثير الرئيسي = ${factorDisplay} يصف سبباً إحصائياً كما ورد في التقرير.`] : []),
    ];

    const distribution = [
      `قراءة التوزيع: A=${gradeCounts['A']}، B=${gradeCounts['B']}، C=${gradeCounts['C']}، D=${gradeCounts['D']}، F=${gradeCounts['F']} عبر المقررات المعروضة.`,
    ];

    const grouping = [
      ...(heavy.length ? [`عبء مرتفع (≥4 س): ${heavy.slice(0,6).join('، ')}`] : []),
      ...(repeats.length ? [`تكرار تسجيل: ${repeats.slice(0,6).join('، ')}`] : []),
      `لا تتضمن البيانات معلومات عن المتطلبات السابقة للمقررات، لذا لا يمكن الربط بها هنا.`,
    ];

    const semesterComparisons: string[] = [];
    for (let i = 1; i < analysis.semesters.length && semesterComparisons.length < 3; i++) {
      const prev = analysis.semesters[i-1];
      const cur = analysis.semesters[i];
      const diff = (cur.semesterGPA - prev.semesterGPA).toFixed(2);
      semesterComparisons.push(`مقارنة ${prev.semester} ${prev.year} ↔ ${cur.semester} ${cur.year}: الفرق في المعدل الفصلي = ${diff}`);
    }

    return { overview, statistical, distribution, grouping, semesterComparisons };
  }

  static buildStudyStrategy(analysis: AcademicAnalysis, _calc: any, courses: Course[], isAr: boolean) {
    if (!isAr) return [];
    const bullets: string[] = [];
    const repeats = courses.filter(c => c.isRetake).map(c => c.courseCode);
    const labs = courses.filter(c => c.courseName.includes('مختبر') || c.courseName.includes('عملي')).map(c => c.courseCode);
    const heavySem = analysis.semesters.filter(s => s.totalCredits >= 18);
    const manyCourses = courses.length >= 20;
    const gradeCounts = ['A','B','C','D','F'].reduce((acc, k) => {
      acc[k] = courses.filter(c => c.grade.startsWith(k)).length;
      return acc;
    }, {} as Record<string, number>);

    if (repeats.length) {
      bullets.push(`وجود إعادة تسجيل في (${repeats.slice(0,6).join('، ')}) يدل على الحاجة لمراجعة الأساسيات مبكراً ووضع حصص قصيرة ثابتة للمادة المعاد تسجيلها.`);
    }
    if (labs.length) {
      bullets.push(`المقررات العملية (${labs.slice(0,6).join('، ')}) تستفيد من تطبيق فوري بعد المحاضرة عبر تمارين قصيرة واعتماد ملخصات عملية أسبوعية.`);
    }
    if (heavySem.length) {
      const s = heavySem[0];
      bullets.push(`الفصل ذو العبء المرتفع (${s.totalCredits} ساعة) ارتبط بمعدل فصلي = ${s.semesterGPA.toFixed(2)}؛ تنظيم الوقت عبر توزيع الجهد على أسابيع الفصل يقلل التكدّس قبل الاختبارات.`);
    }
    if (gradeCounts['C'] + gradeCounts['D'] > gradeCounts['A'] + gradeCounts['B']) {
      bullets.push(`غلبة تقديرات C/D على A/B تعني أن المتابعة اليومية وملخصات مختصرة لكل درس ستكون أكثر فاعلية من المذاكرة التجميعية في نهاية الفصل.`);
    }
    if (analysis.semesters.length) {
      const minSem = analysis.semesters.reduce((a, b) => (b.semesterGPA < a.semesterGPA ? b : a), analysis.semesters[0]);
      bullets.push(`أدنى معدل فصلي = ${minSem.semesterGPA.toFixed(2)} في فصل ${minSem.semester} ${minSem.year}؛ توزيع الجهد على مدار الفصل يقلل من تكرار الانخفاض.`);
    }
    if (gradeCounts['A'] + gradeCounts['B'] > 0 && (gradeCounts['A'] + gradeCounts['B']) >= (gradeCounts['C'] + gradeCounts['D'])) {
      bullets.push(`وجود تقديرات A/B يعني أن الاتساق الحالي فعّال؛ الحفاظ على نفس وتيرة المتابعة مع مراجعات قصيرة بعد كل محاضرة يدعم الاستمرار على هذا المستوى.`);
    }
    if (manyCourses) {
      bullets.push(`عدد المقررات الكبير يعزز أهمية خطة أسبوعية ثابتة (أوقات محددة لكل مادة) للحفاظ على الاتساق عبر الفصل.`);
    }
    bullets.push(`لا توجد بيانات عن المتطلبات السابقة للمقررات في التقرير؛ لذلك تُربط الاستراتيجية فقط بما هو ظاهر من السجل والدرجات.`);
    return bullets;
  }

  static buildAIAssistedPlan(analysis: AcademicAnalysis, _calc: any, courses: Course[], isAr: boolean) {
    if (!isAr) return [];
    const plan: string[] = [];
    const labs = courses.filter(c => c.courseName.includes('مختبر') || c.courseName.includes('عملي')).map(c => c.courseCode);
    const theoretical = courses.filter(c => c.courseName.includes('نظرية') || c.courseName.includes('مصطلحات') || c.courseName.includes('إحصاء')).map(c => c.courseCode);
    const repeats = courses.filter(c => c.isRetake).map(c => c.courseCode);
    const minSem = analysis.semesters.length ? analysis.semesters.reduce((a, b) => (b.semesterGPA < a.semesterGPA ? b : a), analysis.semesters[0]) : null;
    const gradeCounts = ['A','B','C','D','F'].reduce((acc, k) => {
      acc[k] = courses.filter(c => c.grade.startsWith(k)).length;
      return acc;
    }, {} as Record<string, number>);
    const hasLowerMix = gradeCounts['C'] + gradeCounts['D'] + gradeCounts['F'] > 0;

    if (repeats.length) {
      plan.push(`مواد معاد تسجيلها (${repeats.slice(0,6).join('، ')}) تعتمد خطة مراجعة أساسيات قصيرة ومتكررة خلال الأسبوع قبل حضور المحاضرة التالية.`);
    }
    if (labs.length) {
      plan.push(`مواد عملية (${labs.slice(0,6).join('، ')}) تُفضّل جلسات تطبيق مباشر بعد المحاضرة مع تسجيل ملاحظات عملية مختصرة تراجع أسبوعياً.`);
    }
    if (theoretical.length) {
      plan.push(`مواد ذات طابع نظري (${theoretical.slice(0,6).join('، ')}) تستفيد من استرجاع نشط (أسئلة قصيرة من الدرس) وتكرار متباعد على مدار الأسبوع.`);
    }
    if (minSem) {
      plan.push(`فصل منخفض الأداء (${minSem.semester} ${minSem.year}, معدل = ${minSem.semesterGPA.toFixed(2)}) يُعالج بخطة توزيع جهود ثابتة أسبوعياً لتجنب تراكم المذاكرة قبل التقييمات.`);
    }
    if (hasLowerMix) {
      plan.push(`وجود تقديرات C/D/F يستدعي تقسيم محتوى كل مادة إلى وحدات صغيرة مع مراجعة يومية قصيرة لتثبيت الفهم وتجنب فقدان التراكم.`);
    }
    if (!plan.length) {
      plan.push(`الخطة العامة: تنظيم أسبوع ثابت، مراجعات قصيرة بعد كل محاضرة، واسترجاع نشط للأسئلة الأساسية لكل درس.`);
    }
    return plan;
  }
}
