'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  PaperPlaneTilt,
} from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

interface BidData {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  client?: { fullName: string; email: string };
  category?: { name: string };
  budgetMin?: number;
  budgetMax?: number;
  deadline?: string;
}

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  pending: { icon: Clock, color: 'text-amber-600' },
  accepted: { icon: CheckCircle, color: 'text-brand-600' },
  rejected: { icon: XCircle, color: 'text-red-600' },
};

export default function BidDetailPage() {
  const params = useParams();
  const bidId = params.bidId as string;
  const [bid, setBid] = useState<BidData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [proposalText, setProposalText] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');
  const [proposedTimeline, setProposedTimeline] = useState('');
  const [responding, setResponding] = useState(false);
  const [responded, setResponded] = useState(false);
  const [respondError, setRespondError] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/bids/${bidId}`)
      .then((res) => setBid(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message || 'Failed to fetch bid details'))
      .finally(() => setLoading(false));
  }, [bidId]);

  const handleRespond = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponding(true);
    setRespondError(null);
    try {
      await api.post(`/bids/${bidId}/respond`, {
        proposalText,
        proposedBudget,
        proposedTimeline,
      });
      setResponded(true);
    } catch (err: any) {
      setRespondError(err.response?.data?.message || err.message || 'Failed to submit response');
    } finally {
      setResponding(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>
          <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  if (error || !bid) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/business-hub/dashboard/bids"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
        >
          <ArrowLeft weight="light" className="h-4 w-4 rtl:rotate-180" />
          Bid Inbox
        </Link>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            {error || 'Bid not found'}
          </p>
        </div>
      </div>
    );
  }

  const normalizedStatus = bid.status?.toLowerCase() || 'pending';
  const StatusIcon = statusConfig[normalizedStatus]?.icon || Clock;
  const statusColor = statusConfig[normalizedStatus]?.color || 'text-amber-600';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/business-hub/dashboard/bids"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
      >
        <ArrowLeft weight="light" className="h-4 w-4 rtl:rotate-180" />
        Bid Inbox
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{bid.title}</h1>
          <p className="text-[hsl(var(--text-secondary))]">
            {bid.category?.name} · Submitted {new Date(bid.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className={`flex items-center gap-1 ${statusColor}`}>
          <StatusIcon weight="light" className="h-5 w-5" />
          <span className="text-sm font-medium capitalize">{normalizedStatus}</span>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
          <p className="text-xs text-[hsl(var(--text-secondary))]">Budget</p>
          <p className="text-lg font-semibold">
            {bid.budgetMin != null && bid.budgetMax != null
              ? `$${bid.budgetMin.toLocaleString()} - $${bid.budgetMax.toLocaleString()}`
              : 'Not specified'}
          </p>
        </div>
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
          <p className="text-xs text-[hsl(var(--text-secondary))]">Deadline</p>
          <p className="text-lg font-semibold">
            {bid.deadline ? new Date(bid.deadline).toLocaleDateString() : 'Not specified'}
          </p>
        </div>
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
          <p className="text-xs text-[hsl(var(--text-secondary))]">Contact</p>
          <p className="text-lg font-semibold">{bid.client?.fullName || 'Unknown'}</p>
          <p className="text-xs text-[hsl(var(--text-secondary))]">{bid.client?.email}</p>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
        <h2 className="mb-3 text-lg font-semibold">Proposal Details</h2>
        <p className="text-sm leading-relaxed text-[hsl(var(--text-secondary))]">
          {bid.description}
        </p>
      </div>

      {normalizedStatus === 'pending' && (
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
          <h2 className="mb-3 text-lg font-semibold">Respond to Bid</h2>
          {responded ? (
            <div className="rounded-xl bg-brand-50 p-4 text-center dark:bg-brand-950/30">
              <CheckCircle weight="light" className="mx-auto mb-2 h-6 w-6 text-brand-600" />
              <p className="text-sm font-medium">Response sent successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleRespond} className="space-y-4">
              {respondError && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
                  {respondError}
                </div>
              )}
              <textarea
                rows={4}
                required
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                placeholder="Write your response..."
                className="w-full resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Proposed Budget</label>
                  <input
                    type="text"
                    required
                    value={proposedBudget}
                    onChange={(e) => setProposedBudget(e.target.value)}
                    placeholder="e.g. $15,000"
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Proposed Timeline</label>
                  <input
                    type="text"
                    required
                    value={proposedTimeline}
                    onChange={(e) => setProposedTimeline(e.target.value)}
                    placeholder="e.g. 3 months"
                    className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={responding}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
              >
                <PaperPlaneTilt weight="light" className="h-4 w-4" />
                {responding ? 'Sending...' : 'Send Response'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
