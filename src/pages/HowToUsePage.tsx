import { BookOpen, CheckCircle2, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageMeta from '@/components/common/PageMeta';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HowToUsePage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageMeta 
        title={language === 'ar' ? 'كيفية الاستخدام | المساعد الأكاديمي' : 'How to Use | Academic Assistant'}
        description={language === 'ar' ? 'دليل شامل لاستخدام ميزات المساعد الأكاديمي.' : 'Comprehensive guide to using Academic Assistant features.'}
      />
      <div>
        <h1 className="text-4xl font-bold mb-3">
          {language === 'ar' ? 'كيفية استخدام المنصة' : 'How to Use the Platform'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {language === 'ar'
            ? 'دليل شامل لاستخدام جميع ميزات منصة echo-π'
            : 'Complete guide to using all features of echo-π platform'}
        </p>
      </div>

      {/* البدء */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {language === 'ar' ? '1. البدء' : '1. Getting Started'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'ar' ? 'إضافة المقررات' : 'Adding Courses'}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'انتقل إلى صفحة "حاسبة المعدل" من القائمة الجانبية'
                    : 'Navigate to "GPA Calculator" from the sidebar'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'اضغط على "إضافة مقرر" وأدخل: اسم المقرر، الرمز، الساعات المعتمدة، التقدير'
                    : 'Click "Add Course" and enter: course name, code, credit hours, grade'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'يمكنك إضافة مقررات من فصول دراسية مختلفة'
                    : 'You can add courses from different semesters'}
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* تحليل المعدل */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            {language === 'ar' ? '2. تحليل المعدل' : '2. GPA Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'ar' ? 'عرض التحليل الذكي' : 'View Smart Analysis'}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'انتقل إلى صفحة "تحسين المعدل" لرؤية فرص التحسين'
                    : 'Go to "GPA Improvement" page to see improvement opportunities'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'ستجد توصيات مصنفة حسب الأولوية والتأثير'
                    : 'You will find recommendations sorted by priority and impact'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'كل توصية تعرض التحسين الرقمي المتوقع للمعدل'
                    : 'Each recommendation shows expected numeric GPA improvement'}
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ملف التعلم المعرفي */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {language === 'ar' ? '3. ملف التعلم المعرفي' : '3. Cognitive Learning Profile'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'ar' ? 'إكمال التقييم' : 'Complete Assessment'}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'من لوحة التحكم، اضغط على "ابدأ التقييم"'
                    : 'From dashboard, click "Start Assessment"'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'أجب على 15 سؤال حول سلوكياتك الدراسية بصدق'
                    : 'Answer 15 questions about your study behaviors honestly'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'احصل على ملفك المعرفي مع استراتيجيات مذاكرة مخصصة'
                    : 'Get your cognitive profile with personalized study strategies'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'اعرض "خطتك المتكاملة" التي تجمع بين تحسين المعدل واستراتيجيات المذاكرة'
                    : 'View "Integrated Plan" combining GPA improvement with study strategies'}
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* نصائح */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">
            {language === 'ar' ? '💡 نصائح للاستخدام الأمثل' : '💡 Tips for Optimal Use'}
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• {language === 'ar' ? 'حدّث بياناتك بانتظام' : 'Update your data regularly'}</li>
            <li>• {language === 'ar' ? 'استخدم المحاكي لتجربة سيناريوهات مختلفة' : 'Use simulator to try different scenarios'}</li>
            <li>• {language === 'ar' ? 'راجع الجدول الزمني لتتبع تقدمك' : 'Review timeline to track your progress'}</li>
            <li>• {language === 'ar' ? 'صدّر التقارير للاحتفاظ بسجل أكاديمي' : 'Export reports to keep academic records'}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
