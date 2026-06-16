'use client';

import { motion } from 'motion/react';
import { useTranslation } from '@/i18n/use-translation';
import { GlobeHemisphereWest, ChartLineUp, Handshake } from '@phosphor-icons/react/dist/ssr';

export function WhyToorvest() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: GlobeHemisphereWest,
      title: t('why.globalReach'),
      desc: t('why.globalReachDesc'),
    },
    {
      icon: ChartLineUp,
      title: t('why.investmentInsights'),
      desc: t('why.investmentInsightsDesc'),
    },
    {
      icon: Handshake,
      title: t('why.trustedConnections'),
      desc: t('why.trustedConnectionsDesc'),
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
            className="mb-4 inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400"
          >
            {t('why.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t('why.heading')}
          </motion.h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 transition-all duration-500 ease-premium hover:shadow-xl"
            >
              <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <card.icon weight="light" className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
