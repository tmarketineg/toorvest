'use client';

import { motion } from 'motion/react';
import {
  Briefcase,
  BuildingOffice,
  Leaf,
  Factory,
  GraduationCap,
  Heartbeat,
  Airplane,
  Code,
  MagnifyingGlass,
  CurrencyDollar,
} from '@phosphor-icons/react/dist/ssr';

const categories = [
  { icon: Briefcase, label: 'Business', slug: 'business' },
  { icon: BuildingOffice, label: 'Real Estate', slug: 'real-estate' },
  { icon: Leaf, label: 'Agriculture', slug: 'agriculture' },
  { icon: Factory, label: 'Industry', slug: 'industry' },
  { icon: GraduationCap, label: 'Education', slug: 'education' },
  { icon: Heartbeat, label: 'Healthcare', slug: 'healthcare' },
  { icon: Airplane, label: 'Tourism', slug: 'tourism' },
  { icon: Code, label: 'Technology', slug: 'technology' },
  { icon: MagnifyingGlass, label: 'Consulting', slug: 'consulting' },
  { icon: CurrencyDollar, label: 'Finance', slug: 'finance' },
];

interface CategoryGridProps {
  onSelect?: (slug: string) => void;
}

export function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {categories.map((cat, i) => (
        <motion.button
          key={cat.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          onClick={() => onSelect?.(cat.slug)}
          className="group flex flex-col items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4 transition-all hover:border-brand-500 hover:shadow-sm"
        >
          <cat.icon
            weight="light"
            className="h-6 w-6 text-[hsl(var(--text-secondary))] transition-colors group-hover:text-brand-600"
          />
          <span className="text-xs font-medium">{cat.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
