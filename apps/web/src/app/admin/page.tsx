'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Article,
  Buildings,
  Users,
  Bell,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

interface Stats {
  articles: number;
  companies: number;
  users: number;
  notifications: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ articles: 0, companies: 0, users: 0, notifications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/articles?limit=1').catch(() => ({ data: { meta: { total: 0 } } })),
      api.get('/companies?limit=1').catch(() => ({ data: { meta: { total: 0 } } })),
    ]).then(([articlesRes, companiesRes]) => {
      setStats({
        articles: articlesRes.data?.meta?.total || 0,
        companies: companiesRes.data?.meta?.total || 0,
        users: 0,
        notifications: 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Articles', value: stats.articles, icon: Article, color: 'text-blue-600' },
    { label: 'Companies', value: stats.companies, icon: Buildings, color: 'text-green-600' },
    { label: 'Users', value: stats.users, icon: Users, color: 'text-purple-600' },
    { label: 'Notifications', value: stats.notifications, icon: Bell, color: 'text-amber-600' },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Dashboard Overview</h2>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
          >
            <card.icon weight="light" className={`mb-2 h-6 w-6 ${card.color}`} />
            <p className="text-3xl font-bold">{loading ? '—' : card.value}</p>
            <p className="text-sm text-[hsl(var(--text-secondary))]">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
        <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/articles"
            className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--surface-elevated))]"
          >
            <Article weight="light" className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Manage Articles</span>
          </a>
          <a
            href="/admin/companies"
            className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--surface-elevated))]"
          >
            <Buildings weight="light" className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Verify Companies</span>
          </a>
          <a
            href="/admin/users"
            className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-4 transition-colors hover:bg-[hsl(var(--surface-elevated))]"
          >
            <Users weight="light" className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Manage Users</span>
          </a>
        </div>
      </div>
    </div>
  );
}
