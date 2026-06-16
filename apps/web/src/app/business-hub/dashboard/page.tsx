'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  ChartLineUp,
  EnvelopeSimple,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

interface Bid {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt?: string;
  client?: { fullName: string };
  category?: { name: string };
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  ROUTED: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  RESPONDED: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  ACCEPTED: 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300',
  COMPLETED: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  REJECTED: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  EXPIRED: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bids/my')
      .then((res) => setBids(Array.isArray(res.data) ? res.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Active Bids', value: bids.filter((b) => b.status === 'PENDING' || b.status === 'ROUTED').length.toString(), icon: Briefcase },
    { label: 'Accepted', value: bids.filter((b) => b.status === 'ACCEPTED').length.toString(), icon: EnvelopeSimple },
    { label: 'Total Bids', value: bids.length.toString(), icon: ChartLineUp },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold sm:text-4xl">Company Dashboard</h1>
        <p className="mt-2 text-[hsl(var(--text-secondary))]">
          Manage your listings, bids, and company profile.
        </p>
      </motion.div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
          >
            <stat.icon weight="light" className="mb-2 h-5 w-5 text-brand-600" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-[hsl(var(--text-secondary))]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Bids</h2>
          <Link
            href="/business-hub/dashboard/bids"
            className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all
            <ArrowRight weight="light" className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))]">
          <div className="divide-y divide-[hsl(var(--border))]">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between bg-[hsl(var(--surface))] p-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-[hsl(var(--surface-elevated))]" />
                    <div className="h-3 w-24 animate-pulse rounded bg-[hsl(var(--surface-elevated))]" />
                  </div>
                  <div className="h-6 w-16 animate-pulse rounded-full bg-[hsl(var(--surface-elevated))]" />
                </div>
              ))
            ) : bids.length === 0 ? (
              <div className="p-8 text-center text-[hsl(var(--text-secondary))]">
                No bids yet. <Link href="/business-hub/bid" className="text-brand-600 hover:underline">Create your first bid</Link>
              </div>
            ) : (
              bids.slice(0, 5).map((bid) => (
                <Link
                  key={bid.id}
                  href={`/business-hub/dashboard/bids/${bid.id}`}
                  className="flex items-center justify-between bg-[hsl(var(--surface))] p-4 transition-colors hover:bg-[hsl(var(--surface-elevated))]"
                >
                  <div>
                    <p className="font-medium">{bid.title}</p>
                    <p className="text-xs text-[hsl(var(--text-secondary))]">
                      {bid.category?.name || 'General'} · {bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : ''}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[bid.status] || 'bg-gray-50 text-gray-700'}`}
                  >
                    {bid.status.charAt(0) + bid.status.slice(1).toLowerCase()}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
