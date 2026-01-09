import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const { t, dir } = useLanguage();

  const footerSections = [
    {
      title: t('footer.column.platform'),
      links: [
        { label: t('footer.link.features'), path: '/' },
        { label: t('footer.link.howTo'), path: '/how-to-use' },
      ],
    },
    {
      title: t('footer.column.resources'),
      links: [
        { label: t('footer.link.blog'), path: '/learning' },
        { label: t('nav.gpa'), path: '/gpa' },
      ],
    },
    {
      title: t('footer.column.legal'),
      links: [
        { label: t('footer.link.privacy'), path: '/privacy' },
        { label: t('footer.link.terms'), path: '/terms' },
      ],
    },
    {
      title: t('footer.column.connect'),
      links: [
        { label: t('footer.link.contact'), path: '/about' },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-auto" dir={dir}>
      <div className="container mx-auto px-6 py-12 lg:py-16 max-w-7xl">

        {/* Top Section: Brand & Socials */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 border-b border-border/50 pb-12 items-center lg:items-start text-center lg:text-start">

          {/* Brand Block */}
          <div className="flex-1 flex flex-col gap-6 items-center lg:items-start">
            <Logo className="w-fit scale-110" />
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              {t('footer.about.desc')}
            </p>
          </div>

          {/* Socials - Now prominent on the right/left */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/ECHOPI207", label: "GitHub Profile" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-mostafa-mohamed", label: "LinkedIn Profile" },
              { icon: Mail, href: "mailto:mohamed.mostafa.req@gmail.com", label: "Email Contact" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 ring-1 ring-border hover:ring-primary shadow-sm hover:shadow-lg hover:shadow-primary/25"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12 text-center md:text-start">
          {footerSections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h4 className="font-bold text-foreground tracking-tight text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group justify-center md:justify-start"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start">
          <p className="text-sm text-muted-foreground font-medium">
            {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
