'use client';

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

export function SearchBox({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
}: SearchBoxProps) {
  return (
    <div className="relative">
      <MagnifyingGlass
        weight="light"
        className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
        className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] py-3 ps-10 pe-4 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
      />
    </div>
  );
}
