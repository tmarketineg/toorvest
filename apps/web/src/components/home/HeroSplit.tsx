'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { useTranslation } from '@/i18n/use-translation';

const flagImages: Record<string, string> = {
  us: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
  gb: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  de: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
  ae: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
  sa: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800',
  jp: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
  in: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
  eg: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800',
  ke: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
  jo: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800',
};

const flagCodes = ['us', 'gb', 'de', 'ae', 'sa', 'jp', 'in', 'eg', 'ke', 'jo'] as const;

export function HeroSplit() {
  const { t } = useTranslation();
  const [currentFlag, setCurrentFlag] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlag((prev) => (prev + 1) % flagCodes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const code = flagCodes[currentFlag];

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--background))]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-brand-500/5 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-espresso-400/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid min-h-[90dvh] max-w-7xl items-center gap-12 px-4 py-32 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t('hero.title1')}
            <br />
            {t('hero.title2')}
            <br />
            <span className="text-brand-600 dark:text-brand-400">{t('hero.title3')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="max-w-lg text-lg leading-relaxed text-[hsl(var(--text-secondary))]"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/business-hub"
              className="group inline-flex items-center gap-3 rounded-full bg-[hsl(var(--text-primary))] px-7 py-3.5 text-sm font-semibold text-[hsl(var(--background))] transition-all duration-300 ease-premium hover:opacity-90 active:scale-[0.98]"
            >
              {t('hero.ctaBusiness')}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight weight="light" className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              href="/investment"
              className="group inline-flex items-center gap-3 rounded-full border border-[hsl(var(--border))] px-7 py-3.5 text-sm font-semibold transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))] active:scale-[0.98]"
            >
              {t('hero.ctaInvestment')}
              <ArrowRight weight="light" className="h-4 w-4 transition-transform duration-300 ease-spring rtl:rotate-180 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-6 pt-4"
          >
            <div className="flex -space-x-2">
              {['#22c55e', '#16a34a', '#15803d', '#166534'].map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-[hsl(var(--background))]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">15+</span>{' '}
              <span className="text-[hsl(var(--text-secondary))]">{t('hero.countriesConnected')}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="double-bezel-shell relative bg-gradient-to-br from-[hsl(var(--surface-elevated))] to-[hsl(var(--surface))] ring-1 ring-[hsl(var(--border))]">
            <div className="relative h-[320px] w-[320px] overflow-hidden sm:h-[400px] sm:w-[400px] lg:h-[480px] lg:w-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={code}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={flagImages[code]}
                    alt={t(`countries.${code}`)}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute bottom-6 left-6"
                >
                  <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {t(`countries.${code}`)}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 right-6 flex gap-1.5">
                {flagCodes.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-premium ${
                      i === currentFlag
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
