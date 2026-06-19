'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';
import { useTranslation } from '@/i18n/use-translation';

interface Country {
  id: string;
  name: string;
  nameAr?: string;
  code: string;
  flagUrl?: string;
}

export function CountriesGrid() {
  const { t, locale } = useTranslation();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/countries')
      .then((res) => setCountries(res.data))
      .catch((err) => {
        console.error('Failed to load countries:', err);
        setCountries([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-8 w-64 rounded-full bg-[hsl(var(--surface-elevated))]" />
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden px-4 sm:px-6 lg:px-[calc((100vw-80rem)/2+1.5rem)]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 w-56 flex-shrink-0 animate-pulse rounded-[2rem] bg-[hsl(var(--surface-elevated))]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="mb-4 inline-flex items-center rounded-full border border-sage-400/20 bg-sage-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sage-600 dark:text-sage-400"
            >
              {t('countries.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t('countries.heading')}
            </motion.h2>
          </div>
          <Link
            href="/countries"
            className="hidden items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 sm:inline-flex"
          >
            {t('countries.viewAll')}
            <ArrowRight weight="light" className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      <div className="scrollbar-hide snap-x-mandatory flex gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[calc((100vw-80rem)/2+1.5rem)]">
        {countries.map((country, i) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="snap-start flex-shrink-0"
          >
            <Link
              href={`/countries/${country.code.toLowerCase()}`}
              className="group block w-56 overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] transition-all duration-500 ease-premium hover:shadow-xl active:scale-[0.98]"
            >
              <div className="relative m-2 overflow-hidden rounded-[calc(2rem-0.5rem)]">
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={country.flagUrl || `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`}
                    alt={locale === 'ar' ? (country.nameAr || country.name) : country.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-sm font-semibold text-white drop-shadow-lg">
                    {locale === 'ar' ? (country.nameAr || country.name) : country.name}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:hidden sm:px-6 lg:px-8">
        <Link
          href="/countries"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-600"
        >
          {t('countries.viewAllCountries')}
          <ArrowRight weight="light" className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
