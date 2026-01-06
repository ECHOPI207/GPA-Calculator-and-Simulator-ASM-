import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Shield, Lightbulb, TrendingUp, Heart } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          {language === 'ar' ? 'من نحن' : 'About Us'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {language === 'ar'
            ? 'منصة أكاديمية ذكية لتحليل وتحسين المعدل الأكاديمي بدقة علمية'
            : 'An intelligent academic platform for analyzing and improving GPA with scientific precision'}
        </p>
      </div>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar'
              ? 'نسعى لتمكين الطلاب من فهم أدائهم الأكاديمي بدقة واتخاذ قرارات مبنية على بيانات حقيقية. نوفر أدوات تحليلية متقدمة تساعد الطلاب على تحديد فرص التحسين وتخطيط مسارهم الأكاديمي بثقة.'
              : 'We empower students to understand their academic performance with precision and make data-driven decisions. We provide advanced analytical tools that help students identify improvement opportunities and plan their academic path with confidence.'}
          </p>
        </CardContent>
      </Card>

      {/* Problem We Solve */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'المشكلة التي نحلها' : 'The Problem We Solve'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar'
              ? 'يواجه الطلاب صعوبة في فهم تأثير كل مقرر على معدلهم التراكمي، وغالباً ما يفتقرون إلى أدوات دقيقة لمحاكاة السيناريوهات المستقبلية أو تحديد أولويات التحسين. منصتنا تحل هذه المشكلة من خلال توفير حسابات دقيقة، تحليلات ذكية، وتوصيات مخصصة مبنية على أسس علمية.'
              : 'Students struggle to understand how each course impacts their cumulative GPA and often lack precise tools to simulate future scenarios or prioritize improvements. Our platform solves this by providing accurate calculations, intelligent analysis, and personalized recommendations based on scientific foundations.'}
          </p>
        </CardContent>
      </Card>

      {/* Who We Serve */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'لمن نقدم خدماتنا' : 'Who We Serve'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar'
              ? 'منصتنا مصممة للطلاب الجامعيين الذين يسعون لتحسين أدائهم الأكاديمي، سواء كانوا في بداية مسيرتهم الجامعية أو يخططون للتخرج. نوفر أدوات مفيدة للطلاب المتفوقين الذين يريدون الحفاظ على تميزهم، وللطلاب الذين يواجهون تحديات أكاديمية ويبحثون عن طرق فعالة للتحسين.'
              : 'Our platform is designed for university students seeking to improve their academic performance, whether they are at the beginning of their university journey or planning for graduation. We provide useful tools for high-achieving students who want to maintain their excellence, and for students facing academic challenges looking for effective ways to improve.'}
          </p>
        </CardContent>
      </Card>

      {/* Scientific Foundation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'الأساس العلمي' : 'Scientific Foundation'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar'
              ? 'تعتمد منصتنا على قواعد حساب المعدل الأكاديمي الرسمية للجامعات، مع تطبيق دقيق لجداول التقديرات والساعات المعتمدة. كما نستخدم استراتيجيات تعلم مبنية على أبحاث علمية محكّمة في مجال علم النفس المعرفي والتعليم، مثل الاسترجاع النشط والتكرار المتباعد.'
              : 'Our platform is based on official university GPA calculation rules, with precise application of grading tables and credit hours. We also use learning strategies based on peer-reviewed research in cognitive psychology and education, such as active recall and spaced repetition.'}
          </p>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              {language === 'ar'
                ? 'المراجع العلمية: Dunlosky et al. (2013), Roediger & Karpicke (2006), Bjork & Bjork (2011)'
                : 'Scientific References: Dunlosky et al. (2013), Roediger & Karpicke (2006), Bjork & Bjork (2011)'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ethical Commitment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'التزامنا الأخلاقي' : 'Our Ethical Commitment'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar'
              ? 'منصتنا توفر أدوات إرشادية وتوصيات استشارية فقط، وليست بديلاً عن السجلات الأكاديمية الرسمية أو الاستشارة الأكاديمية المهنية. جميع التحليلات والتوصيات قابلة للتعديل وغير حتمية. نحن لا نقدم تشخيصات نفسية أو تصنيفات شخصية، بل نحلل السلوكيات الدراسية القابلة للتحسين.'
              : 'Our platform provides advisory tools and consultative recommendations only, and is not a substitute for official academic records or professional academic consultation. All analyses and recommendations are adjustable and non-deterministic. We do not provide psychological diagnoses or personality classifications, but rather analyze improvable study behaviors.'}
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm font-medium text-primary">
              {language === 'ar'
                ? '⚠️ إخلاء مسؤولية: جميع النتائج والتوصيات إرشادية ويجب التحقق منها مع السجلات الأكاديمية الرسمية.'
                : '⚠️ Disclaimer: All results and recommendations are advisory and should be verified with official academic records.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Future Vision */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            {language === 'ar' ? 'رؤيتنا المستقبلية' : 'Our Future Vision'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {language === 'ar'
              ? 'نطمح لتوسيع منصتنا لتشمل المزيد من الجامعات والأنظمة الأكاديمية، مع إضافة ميزات متقدمة مثل التعرف الضوئي على النتائج الأكاديمية، وأدوات تخطيط مسار التخرج، وتحليلات مقارنة على مستوى الجامعة. هدفنا هو أن نصبح الشريك الأكاديمي الموثوق لكل طالب جامعي.'
              : 'We aspire to expand our platform to include more universities and academic systems, with advanced features such as optical recognition of academic results, graduation path planning tools, and university-wide comparative analytics. Our goal is to become the trusted academic partner for every university student.'}
          </p>
        </CardContent>
      </Card>

      {/* Footer Credit */}
      <div className="text-center py-8 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <span>{language === 'ar' ? 'صُنع بـ' : 'Made with'}</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span>
            {language === 'ar' ? 'بواسطة' : 'by'}{' '}
            <strong className="text-primary">echo-π Development Team</strong>
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {language === 'ar'
            ? 'منصة أكاديمية مفتوحة المصدر للطلاب'
            : 'An open-source academic platform for students'}
        </p>
      </div>
    </div>
  );
}
