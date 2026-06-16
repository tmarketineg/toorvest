'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

export default function BidPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/bids', {
        title: form.title,
        description: form.description,
        budgetMin: form.budgetMin ? Number(form.budgetMin) : undefined,
        budgetMax: form.budgetMax ? Number(form.budgetMax) : undefined,
        deadline: form.deadline || undefined,
      });
      router.push('/business-hub/dashboard/bids');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to submit bid. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/business-hub"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
      >
        <ArrowLeft weight="light" className="h-4 w-4" />
        Back to Business Hub
      </Link>

      <h1 className="mb-2 text-3xl font-bold">Submit a Bid</h1>
      <p className="mb-8 text-[hsl(var(--text-secondary))]">
        Fill out the form below to submit your business bid or partnership proposal.
      </p>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="bid-title" className="mb-1 block text-sm font-medium">
            Bid Title
          </label>
          <input
            id="bid-title"
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Digital Transformation Partnership"
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div>
          <label htmlFor="bid-description" className="mb-1 block text-sm font-medium">
            Proposal Description
          </label>
          <textarea
            id="bid-description"
            required
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="Describe your proposal, expertise, and what you offer..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bid-budget-min" className="mb-1 block text-sm font-medium">
              Minimum Budget
            </label>
            <input
              id="bid-budget-min"
              type="number"
              value={form.budgetMin}
              onChange={(e) => setForm({ ...form, budgetMin: e.target.value })}
              placeholder="e.g. 10000"
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="bid-budget-max" className="mb-1 block text-sm font-medium">
              Maximum Budget
            </label>
            <input
              id="bid-budget-max"
              type="number"
              value={form.budgetMax}
              onChange={(e) => setForm({ ...form, budgetMax: e.target.value })}
              placeholder="e.g. 50000"
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bid-deadline" className="mb-1 block text-sm font-medium">
            Deadline
          </label>
          <input
            id="bid-deadline"
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
        >
          <PaperPlaneTilt weight="light" className="h-4 w-4" />
          {submitting ? 'Submitting...' : 'Submit Bid'}
        </button>
      </form>
    </div>
  );
}
