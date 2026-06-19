'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  List,
  X,
  Sun,
  Moon,
  GlobeHemisphereWest,
  SignOut,
  UserCircle,
  Bell,
} from '@phosphor-icons/react/dist/ssr';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale, type Locale } from '@/lib/use-locale';
import { useTranslation } from '@/i18n/use-translation';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, initializeAuth, logout } = useAuthStore();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/notifications')
        .then((res) => {
          const notifs = Array.isArray(res.data) ? res.data : [];
          setUnreadCount(notifs.filter((n: any) => !n.isRead).length);
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    const next: Locale = locale === 'en' ? 'ar' : 'en';
    setLocale(next);
  };

  const navLinks = [
    { href: '/business-hub', label: t('nav.businessHub') },
    { href: '/investment', label: t('nav.investment') },
    { href: '/countries', label: t('nav.pavilions') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 flex w-full justify-center transition-all duration-700 ease-premium ${
          scrolled ? 'mt-3' : 'mt-6'
        }`}
      >
        <nav
          className={`mx-4 flex h-14 items-center justify-between rounded-full border px-4 transition-all duration-700 ease-premium sm:px-6 ${
            scrolled
              ? 'w-full max-w-5xl border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 shadow-lg backdrop-blur-2xl'
              : 'w-full max-w-6xl border-white/10 bg-white/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5'
          }`}
        >
          <Link href="/" className="flex items-center gap-2 font-bold text-brand-600">
            <GlobeHemisphereWest weight="light" className="h-6 w-6" />
            <span className="text-base font-semibold tracking-tight">Toorvest</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[hsl(var(--text-secondary))] transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))] hover:text-[hsl(var(--text-primary))]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <>
                <button
                  onClick={toggleLocale}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--text-secondary))] transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))]"
                  aria-label={t('nav.toggleLang')}
                >
                  <span className="text-xs font-bold">
                    {locale === 'en' ? 'ع' : 'En'}
                  </span>
                </button>

                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--text-secondary))] transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))]"
                  aria-label={t('nav.toggleTheme')}
                >
                  {theme === 'dark' ? (
                    <Sun weight="light" className="h-4 w-4" />
                  ) : (
                    <Moon weight="light" className="h-4 w-4" />
                  )}
                </button>
              </>
            )}

            {mounted && isAuthenticated && user ? (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/notifications"
                  className="relative flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--text-secondary))] transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))]"
                >
                  <Bell weight="light" className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/business-hub/dashboard"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[hsl(var(--text-secondary))] transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))]"
                >
                  <UserCircle weight="light" className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{user.fullName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--text-secondary))] transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))]"
                >
                  <SignOut weight="light" className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden rounded-full px-4 py-2 text-sm font-medium text-[hsl(var(--text-secondary))] transition-all duration-300 ease-premium hover:bg-[hsl(var(--surface-elevated))] md:block"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden rounded-full bg-[hsl(var(--text-primary))] px-5 py-2 text-sm font-medium text-[hsl(var(--background))] transition-all duration-300 ease-premium hover:opacity-90 active:scale-[0.98] md:block"
                >
                  {t('nav.getStarted')}
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[hsl(var(--text-secondary))] md:hidden"
              aria-label={t('nav.toggleMenu')}
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                {mobileOpen ? (
                  <X weight="light" className="h-5 w-5" />
                ) : (
                  <List weight="light" className="h-5 w-5" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[hsl(var(--background))]/80 backdrop-blur-3xl md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="flex min-h-full flex-col items-center justify-center gap-2 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-full px-8 py-4 text-2xl font-semibold text-[hsl(var(--text-primary))] transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: navLinks.length * 0.08,
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="mt-8 flex gap-3"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/notifications"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-6 py-3 text-sm font-medium"
                    >
                      <Bell weight="light" className="h-4 w-4" />
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/business-hub/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full border border-[hsl(var(--border))] px-6 py-3 text-sm font-medium"
                    >
                      {t('nav.dashboard')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="rounded-full bg-[hsl(var(--text-primary))] px-6 py-3 text-sm font-medium text-[hsl(var(--background))]"
                    >
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full border border-[hsl(var(--border))] px-6 py-3 text-sm font-medium"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full bg-[hsl(var(--text-primary))] px-6 py-3 text-sm font-medium text-[hsl(var(--background))]"
                    >
                      {t('nav.getStarted')}
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
