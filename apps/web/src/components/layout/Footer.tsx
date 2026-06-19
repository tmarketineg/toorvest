'use client';

import Link from 'next/link';
import { GlobeHemisphereWest } from '@phosphor-icons/react/dist/ssr';
import { useTranslation } from '@/i18n/use-translation';

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    platform: [
      { href: '/business-hub', label: t('footer.businessHub') },
      { href: '/investment', label: t('footer.investmentTourism') },
      { href: '/countries', label: t('footer.countryPavilions') },
      { href: '/contact', label: t('footer.contactUs') },
    ],
    resources: [
      { href: '/business-hub', label: t('footer.articles') },
      { href: '/investment', label: t('footer.investmentGuides') },
      { href: '/countries', label: t('footer.countryProfiles') },
    ],
    legal: [
      { href: '/privacy', label: t('footer.privacyPolicy') },
      { href: '/terms', label: t('footer.termsOfService') },
    ],
  };

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2 font-bold text-brand-600">
              <GlobeHemisphereWest weight="light" className="h-6 w-6" />
              <span className="text-base font-semibold tracking-tight">Toorvest</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
              {t('footer.brand')}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--text-primary))]">
              {t('footer.platform')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--text-secondary))] transition-colors duration-300 ease-premium hover:text-[hsl(var(--text-primary))]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--text-primary))]">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--text-secondary))] transition-colors duration-300 ease-premium hover:text-[hsl(var(--text-primary))]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--text-primary))]">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--text-secondary))] transition-colors duration-300 ease-premium hover:text-[hsl(var(--text-primary))]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[hsl(var(--border))] pt-8 text-center">
          <p className="text-sm text-[hsl(var(--text-secondary))]">
            &copy; {new Date().getFullYear()} Toorvest. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
