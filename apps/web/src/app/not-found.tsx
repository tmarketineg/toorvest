'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n/use-translation';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-[hsl(var(--text-primary))]">{t('notFound.title')}</h1>
      <p className="mb-8 text-lg text-[hsl(var(--text-secondary))]">
        {t('notFound.message')}
      </p>
      <Link
        href="/"
        className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        {t('notFound.backHome')}
      </Link>
    </div>
  );
}
