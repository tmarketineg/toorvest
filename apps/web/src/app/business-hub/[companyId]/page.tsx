'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, CheckCircle, Star } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';
import type { Company } from '@/lib/api';

export default function CompanyDetailPage() {
  const params = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get(`/companies/${params.companyId}`);
        setCompany(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Company not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [params.companyId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-3/4 rounded bg-[hsl(var(--surface-elevated))]" />
          <div className="h-4 w-1/2 rounded bg-[hsl(var(--surface-elevated))]" />
          <div className="h-48 rounded-xl bg-[hsl(var(--surface-elevated))]" />
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-lg text-[hsl(var(--text-secondary))]">{error || 'Company not found'}</p>
        <Link href="/business-hub" className="mt-4 inline-block text-brand-600 hover:text-brand-700">
          Back to Business Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/business-hub"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
      >
        <ArrowLeft weight="light" className="h-4 w-4" />
        Back to Business Hub
      </Link>

      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8">
        <div className="flex items-start gap-6">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.companyName}
              className="h-20 w-20 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[hsl(var(--surface-elevated))] text-2xl font-bold text-brand-600">
              {company.companyName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[hsl(var(--text-primary))]">
                {company.companyName}
              </h1>
              {company.isVerified && (
                <CheckCircle weight="fill" className="h-5 w-5 text-green-500" />
              )}
            </div>
            {company.country && (
              <p className="mt-1 flex items-center gap-1 text-[hsl(var(--text-secondary))]">
                <MapPin weight="light" className="h-4 w-4" />
                {company.country.name}
              </p>
            )}
          </div>
          <div className="text-right">
            <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              {company.subscriptionTier || 'BASIC'}
            </span>
          </div>
        </div>

        {company.description && (
          <p className="mt-6 text-[hsl(var(--text-secondary))]">{company.description}</p>
        )}

        {company.serviceCategories && company.serviceCategories.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-[hsl(var(--text-primary))]">Services</h3>
            <div className="flex flex-wrap gap-2">
              {company.serviceCategories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-[hsl(var(--surface-elevated))] px-3 py-1 text-xs font-medium text-[hsl(var(--text-secondary))]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {(company.budgetRangeMin || company.budgetRangeMax) && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-[hsl(var(--text-primary))]">Budget Range</h3>
            <p className="text-[hsl(var(--text-secondary))]">
              {company.budgetRangeMin ? `$${company.budgetRangeMin.toLocaleString()}` : '$0'}
              {' — '}
              {company.budgetRangeMax ? `$${company.budgetRangeMax.toLocaleString()}` : 'Open'}
            </p>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <Link
            href={`/business-hub/bid?companyId=${company.id}`}
            className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Submit Bid
          </Link>
          <button className="rounded-xl border border-[hsl(var(--border))] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[hsl(var(--surface-elevated))]">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
