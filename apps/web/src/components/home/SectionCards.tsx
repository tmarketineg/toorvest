'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Briefcase,
  TrendUp,
  Newspaper,
  ArrowUpRight,
} from '@phosphor-icons/react/dist/ssr';
import { useTranslation } from '@/i18n/use-translation';

export function SectionCards() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Briefcase,
      title: t('explore.businessHub'),
      description: t('explore.businessHubDesc'),
      href: '/business-hub',
      accent: 'group-hover:text-blue-500',
      glow: 'group-hover:bg-blue-500/10',
    },
    {
      icon: TrendUp,
      title: t('explore.investmentTourism'),
      description: t('explore.investmentTourismDesc'),
      href: '/investment',
      accent: 'group-hover:text-brand-500',
      glow: 'group-hover:bg-brand-500/10',
    },
    {
      icon: Newspaper,
      title: t('explore.articlesInsights'),
      description: t('explore.articlesInsightsDesc'),
      href: '/business-hub',
      accent: 'group-hover:text-amber-500',
      glow: 'group-hover:bg-amber-500/10',
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="mb-4 inline-flex items-center rounded-full border border-espresso-400/20 bg-espresso-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-espresso-600 dark:text-espresso-400"
          >
            {t('explore.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t('explore.heading')}
          </motion.h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <Link
                href={section.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 transition-all duration-500 ease-premium hover:shadow-xl active:scale-[0.98] ${section.glow}`}
              >
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />
                <div className="relative flex flex-1 flex-col">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--surface-elevated))] ring-1 ring-[hsl(var(--border))] transition-all duration-500 ease-premium group-hover:ring-brand-500/30">
                    <section.icon
                      weight="light"
                      className={`h-6 w-6 transition-colors duration-500 ease-premium ${section.accent}`}
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-bold tracking-tight">{section.title}</h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
                    {section.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
                    <span>{t('explore.learnMore')}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/10 transition-all duration-300 ease-spring group-hover:translate-x-1">
                      <ArrowUpRight weight="light" className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
