import { AcademicAnalysis } from './academic-analyzer';
import { Course, GPACalculation } from '@/types/types';

export class ReportInsights {
  /**
   * Generates a detailed analytical overlay for the Academic Overview section.
   * Focuses on what the data *actually* means, identifying contradictions or strong indicators.
   */
  static generateOverviewAnalysis(analysis: AcademicAnalysis, calc: GPACalculation, isAr: boolean): string {
    if (!isAr) {
      return "Analysis not available in English.";
    }

    const parts: string[] = [];

    // 1. GPA vs. Efficiency Analysis
    if (analysis.overview.efficiency < 80) {
        parts.push(`على الرغم من المعدل التراكمي البالغ ${calc.cumulativeGPA.toFixed(2)}، إلا أن كفاءة الإنجاز المنخفضة (${analysis.overview.efficiency.toFixed(0)}%) تشير إلى وجود هدر في الساعات المعتمدة (رسوب أو انسحاب)، مما يؤثر سلباً على موعد التخرج المتوقع.`);
    } else if (analysis.overview.efficiency > 95 && calc.cumulativeGPA < 2.5) {
        parts.push(`يُظهر الطالب التزاماً عالياً بالحضور والإكمال (كفاءة ${analysis.overview.efficiency.toFixed(0)}%)، لكن انخفاض المعدل التراكمي (${calc.cumulativeGPA.toFixed(2)}) يعكس صعوبة في استيعاب المحتوى العلمي أو خللاً في طرق المذاكرة المتبعة، وليس إهمالاً إدارياً.`);
    } else {
        parts.push(`يعكس المعدل التراكمي (${calc.cumulativeGPA.toFixed(2)}) مع كفاءة إنجاز (${analysis.overview.efficiency.toFixed(0)}%) توازناً ${calc.cumulativeGPA > 3 ? 'إيجابياً' : 'مقبولاً'} بين جودة الأداء والتقدم في الخطة الدراسية.`);
    }

    // 2. Trend & Consistency Analysis
    const volatility = analysis.overview.volatility;
    const trend = analysis.overview.trend;
    
    if (trend === 'stable' && volatility > 30) {
        parts.push(`وُصف اتجاه الأداء بأنه "مستقر"، إلا أن التذبذب العالي في الدرجات (مؤشر الاستقرار أقل من 70%) يكشف عن عدم انتظام في المستوى الفصلي، مما يجعل التنبؤ بالأداء المستقبلي غير مؤكد.`);
    } else if (trend === 'declining') {
        parts.push(`يُشكل الاتجاه التنازلي للأداء ↘ علامة خطر واضحة، حيث أن استمرار هذا النمط سيؤدي حتماً إلى فقدان مكاسب المعدل التراكمي السابقة، مما يستدعي تدخلاً فورياً لإيقاف النزيف.`);
    } else if (trend === 'improving' && volatility < 20) {
        parts.push(`يُظهر الطالب تحسناً منهجياً ومستداماً (وليس عشوائياً)، مما يدل على نجاح الاستراتيجيات الدراسية المعتمدة حديثاً.`);
    }

    // 3. Credit Load Implication
    if (calc.totalRegisteredHours / (analysis.semesters.length || 1) < 12) {
        parts.push(`متوسط العبء الدراسي الفصلي منخفض، مما قد يفسر ارتفاع المعدل (في حال وجوده) ولكنه يطيل مدة الدراسة بشكل غير مبرر.`);
    }

    return parts.join(' ');
  }

  /**
   * Generates a critical review of the Risk Assessment.
   * Challenges the assigned risk level if data suggests otherwise.
   */
  static generateRiskAnalysis(analysis: AcademicAnalysis, calc: GPACalculation, isAr: boolean): string {
    if (!isAr) return "Analysis not available in English.";

    const level = analysis.risk.level;
    const gpa = calc.cumulativeGPA;
    const failedCredits = calc.totalRegisteredHours - calc.totalPassedHours;

    const parts: string[] = [];

    // Validate Risk Label
    if (level === 'low' && gpa < 2.5) {
        parts.push(`تصنيف الخطر بـ "منخفض" قد يكون مضللاً رقمياً؛ فمعدل ${gpa.toFixed(2)} يقع في المنطقة الحرجة التي لا تحتمل أي انتكاسات مستقبلية، لذا يجب التعامل معه بحذر "متوسط" على الأقل.`);
    } else if (level === 'medium' && failedCredits > 6) {
        parts.push(`رغم تصنيف الخطر كـ "متوسط"، إلا أن وجود ${failedCredits} ساعات غير مجتازة يرفع مستوى الخطورة الحقيقي، حيث أن تكرار التعثر سيؤدي إلى تضخم العبء الدراسي المستقبلي.`);
    } else if (level === 'critical') {
        parts.push(`الوضع "حرج" ويتطلب إجراءات استثنائية. الاستمرار بنفس النمط الدراسي الحالي سيؤدي حتماً إلى التعثر الأكاديمي أو الفصل.`);
    } else {
        parts.push(`تقييم مستوى الخطر بـ "${this.translateRisk(level)}" دقيق ويعكس الواقع الأكاديمي الحالي، ${level === 'low' ? 'مما يمنح الطالب مساحة للتركيز على التميز بدلاً من النجاة.' : 'مما يستوجب الحذر.'}`);
    }

    return parts.join(' ');
  }

  /**
   * Generates detailed, actionable strategy expansions.
   * Does NOT replace the original strategy, but adds specific steps.
   */
  static generateStrategyExpansion(analysis: AcademicAnalysis, courses: Course[], isAr: boolean): string[] {
    if (!isAr) return ["Strategy expansion not available in English."];

    const steps: string[] = [];
    
    // 1. Course Retake Strategy
    const failOrD = courses.filter(c => ['F', 'D', 'D+'].includes(c.grade));
    if (failOrD.length > 0) {
        const courseNames = failOrD.slice(0, 3).map(c => c.courseCode).join('، ');
        steps.push(`أولوية الإعادة: يجب إعادة دراسة المقررات ذات التقدير المنخفض (${courseNames}) فوراً لرفع المعدل التراكمي بأسرع وقت، حيث أن تحسين هذه المواد له أثر مضاعف (إزالة التقدير المنخفض واحتساب الجديد).`);
    }

    // 2. Load Management
    if (analysis.overview.volatility > 40) {
        steps.push(`ضبط الجدول الدراسي: نظراً للتذبذب العالي، يُنصح بتقليل العبء الدراسي الفصلي بمقدار 3 ساعات عن المعتاد للتركيز على جودة التحصيل بدلاً من الكم.`);
    }

    // 3. Specific Skill Targeting based on Learning Style
    if (analysis.strategy.learningStyle.includes('Theoretical')) {
        steps.push(`بناءً على النمط النظري: يُنصح بتلخيص المواد العلمية في خرائط مفاهيمية وربط النظريات بالتطبيقات العملية لتجنب الحفظ الصم.`);
    } else if (analysis.strategy.learningStyle.includes('Practical')) {
        steps.push(`بناءً على النمط العملي: يُنصح بالتركيز على حل المسائل والتمارين السابقة بدلاً من قراءة الكتب النصية بشكل مجرد.`);
    }

    return steps;
  }

  private static translateRisk(level: string): string {
      const map: Record<string, string> = { 'critical': 'حرج', 'high': 'مرتفع', 'medium': 'متوسط', 'low': 'منخفض' };
      return map[level] || level;
  }
}
