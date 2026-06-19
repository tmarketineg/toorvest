'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  Article,
  Buildings,
  Users,
  Bell,
  ChartBar,
  Gear,
} from '@phosphor-icons/react/dist/ssr';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: House },
  { href: '/admin/articles', label: 'Articles', icon: Article },
  { href: '/admin/companies', label: 'Companies', icon: Buildings },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="mt-2 text-[hsl(var(--text-secondary))]">
          Manage your platform content and users.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-56">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                      : 'text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--surface-elevated))] hover:text-[hsl(var(--text-primary))]'
                  }`}
                >
                  <item.icon weight="light" className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
