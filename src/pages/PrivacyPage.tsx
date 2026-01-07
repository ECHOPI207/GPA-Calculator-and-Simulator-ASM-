import { Shield } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageMeta 
        title={language === 'ar' ? 'سياسة الخصوصية | المساعد الأكاديمي' : 'Privacy Policy | Academic Assistant'}
        description={language === 'ar' ? 'نحن نحترم خصوصيتك. بياناتك تخزن محلياً فقط.' : 'We respect your privacy. Your data is stored locally only.'}
      />
      <div className="flex items-center gap-4 mb-6">
        <div className="rounded-full bg-primary/10 p-3">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              {language === 'ar' ? '1. المعلومات التي نجمعها' : '1. Information We Collect'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'منصة echo-π تعمل بشكل محلي على جهازك. جميع بياناتك الأكاديمية (المقررات، التقديرات، الملف المعرفي) يتم تخزينها محلياً في متصفحك ولا يتم إرسالها إلى أي خادم خارجي.'
                : 'echo-π platform works locally on your device. All your academic data (courses, grades, cognitive profile) is stored locally in your browser and is not sent to any external server.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              {language === 'ar' ? '2. كيف نستخدم معلوماتك' : '2. How We Use Your Information'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'نستخدم بياناتك المحلية فقط لـ: حساب معدلك الأكاديمي، تقديم توصيات تحسين مخصصة، تحليل سلوكياتك الدراسية، توليد تقارير أكاديمية. جميع العمليات تتم محلياً على جهازك.'
                : 'We use your local data only to: calculate your academic GPA, provide personalized improvement recommendations, analyze your study behaviors, generate academic reports. All operations are performed locally on your device.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              {language === 'ar' ? '3. مشاركة البيانات' : '3. Data Sharing'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'نحن لا نشارك، نبيع، أو ننقل بياناتك الشخصية أو الأكاديمية لأي طرف ثالث. بياناتك تبقى على جهازك فقط.'
                : 'We do not share, sell, or transfer your personal or academic data to any third party. Your data remains on your device only.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              {language === 'ar' ? '4. أمان البيانات' : '4. Data Security'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'بياناتك محمية بواسطة آليات أمان المتصفح. نوصي بعدم استخدام أجهزة عامة أو مشتركة لإدخال بياناتك الأكاديمية.'
                : 'Your data is protected by browser security mechanisms. We recommend not using public or shared devices to enter your academic data.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              {language === 'ar' ? '5. حقوقك' : '5. Your Rights'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'لديك الحق الكامل في: الوصول لبياناتك في أي وقت، تعديل أو حذف بياناتك، تصدير بياناتك، إيقاف استخدام المنصة. يمكنك حذف جميع بياناتك من إعدادات المتصفح.'
                : 'You have full right to: access your data anytime, modify or delete your data, export your data, stop using the platform. You can delete all your data from browser settings.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              {language === 'ar' ? '6. ملفات تعريف الارتباط' : '6. Cookies'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'نستخدم التخزين المحلي (localStorage) لحفظ تفضيلاتك وبياناتك. لا نستخدم ملفات تعريف ارتباط تتبعية أو إعلانية.'
                : 'We use localStorage to save your preferences and data. We do not use tracking or advertising cookies.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              {language === 'ar' ? '7. التواصل معنا' : '7. Contact Us'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا عبر صفحة "من نحن".'
                : 'If you have any questions about this privacy policy, you can contact us through the "About Us" page.'}
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
