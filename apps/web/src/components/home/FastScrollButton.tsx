'use client';

import { motion } from 'motion/react';
import { ArrowDown } from '@phosphor-icons/react/dist/ssr';
import { useTranslation } from '@/i18n/use-translation';

export function FastScrollButton() {
  const { t } = useTranslation();

  const scrollToPavilions = () => {
    document
      .getElementById('pavilions')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center py-8">
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        onClick={scrollToPavilions}
        className="group inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-5 py-2.5 text-sm font-medium text-[hsl(var(--text-secondary))] shadow-sm transition-all duration-300 ease-premium hover:shadow-md active:scale-[0.98]"
      >
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown weight="light" className="h-4 w-4" />
        </motion.span>
        {t('scrollBtn')}
      </motion.button>
    </div>
  );
}
