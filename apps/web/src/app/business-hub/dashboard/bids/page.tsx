'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

interface Bid {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  client?: { fullName: string };
  category?: { name: string };
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  accepted: 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300',
  rejected: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function BidsInboxPage() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/bids/my')
      .then((res) => setBids(Array.isArray(res.data) ? res.data : res.data?.bids || []))
      .catch((err) => setError(err.response?.data?.message || err.message || 'Failed to fetch bids'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/business-hub/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
      >
        <ArrowLeft weight="light" className="h-4 w-4" />
        Dashboard
      </Link>

      <h1 className="mb-2 text-3xl font-bold">Bid Inbox</h1>
      <p className="mb-8 text-[hsl(var(--text-secondary))]">
        All incoming bids and proposals for your listings.
      </p>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-48 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {bids.map((bid) => (
            <Link
              key={bid.id}
              href={`/business-hub/dashboard/bids/${bid.id}`}
              className="flex items-center justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4 transition-all hover:shadow-md"
            >
              <div>
                <p className="font-semibold">{bid.title}</p>
                <p className="text-sm text-[hsl(var(--text-secondary))]">
                  {bid.category?.name} · {bid.client?.fullName}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`mb-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[bid.status?.toLowerCase()] || statusStyles.pending}`}
                >
                  {bid.status?.charAt(0).toUpperCase() + bid.status?.slice(1).toLowerCase()}
                </span>
                <p className="text-xs text-[hsl(var(--text-secondary))]">
                  {new Date(bid.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
