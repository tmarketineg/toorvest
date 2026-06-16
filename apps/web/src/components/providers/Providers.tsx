'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { LocaleProvider } from '@/lib/use-locale';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LocaleProvider>
  );
}
