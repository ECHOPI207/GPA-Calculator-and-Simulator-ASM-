import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { language } = useLanguage();

  const footerLinks = {
    ar: {
      product: {
        title: 'المنتج',
        links: [
          { label: 'كيفية الاستخدام', path: '/how-to-use' },
          { label: 'الميزات', path: '/' },
        ],
      },
      legal: {
        title: 'قانوني',
        links: [
          { label: 'سياسة الخصوصية', path: '/privacy' },
          { label: 'شروط الاستخدام', path: '/terms' },
          { label: 'من نحن', path: '/about' },
        ],
      },
      support: {
        title: 'الدعم',
        links: [
          { label: 'مركز المساعدة', path: '/how-to-use' },
          { label: 'اتصل بنا', path: '/about' },
        ],
      },
    },
    en: {
      product: {
        title: 'Product',
        links: [
          { label: 'How to Use', path: '/how-to-use' },
          { label: 'Features', path: '/' },
        ],
      },
      legal: {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', path: '/privacy' },
          { label: 'Terms of Service', path: '/terms' },
          { label: 'About Us', path: '/about' },
        ],
      },
      support: {
        title: 'Support',
        links: [
          { label: 'Help Center', path: '/how-to-use' },
          { label: 'Contact Us', path: '/about' },
        ],
      },
    },
  };

  const links = footerLinks[language];

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* اللوجو والوصف */}
          <div className="md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'منصة ذكية لتحليل وتحسين المعدل الأكاديمي مع استراتيجيات مذاكرة مخصصة'
                : 'Intelligent platform for analyzing and improving academic GPA with personalized study strategies'}
            </p>
          </div>

          {/* روابط المنتج */}
          <div>
            <h3 className="font-semibold mb-4">{links.product.title}</h3>
            <ul className="space-y-2">
              {links.product.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* روابط قانونية */}
          <div>
            <h3 className="font-semibold mb-4">{links.legal.title}</h3>
            <ul className="space-y-2">
              {links.legal.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* روابط الدعم */}
          <div>
            <h3 className="font-semibold mb-4">{links.support.title}</h3>
            <ul className="space-y-2">
              {links.support.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* الحقوق والتطوير */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © 2026 echo-π. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
          </p>
          <p className="flex items-center gap-2">
            {language === 'ar' ? 'صُنع بـ' : 'Made with'}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            {language === 'ar' ? 'بواسطة' : 'by'} <span className="font-semibold text-primary">echo-π</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
