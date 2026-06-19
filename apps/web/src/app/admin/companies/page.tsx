'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Buildings } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

interface Company {
  id: string;
  companyName: string;
  isVerified: boolean;
  subscriptionTier: string;
  createdAt: string;
  country?: { name: string };
  user?: { email: string };
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/companies?limit=50')
      .then((res) => setCompanies(res.data?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Companies</h2>

      <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
            <tr>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Tier</th>
              <th className="px-4 py-3 font-medium">Verified</th>
              <th className="px-4 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3"><div className="h-4 w-32 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-4 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-gray-200" /></td>
                </tr>
              ))
            ) : companies.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[hsl(var(--text-secondary))]">
                  No companies found.
                </td>
              </tr>
            ) : (
              companies.map((company) => (
                <tr key={company.id} className="bg-[hsl(var(--surface))] transition-colors hover:bg-[hsl(var(--surface-elevated))]">
                  <td className="px-4 py-3 font-medium">{company.companyName}</td>
                  <td className="px-4 py-3 text-[hsl(var(--text-secondary))]">
                    {company.country?.name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      company.subscriptionTier === 'ENTERPRISE' ? 'bg-purple-50 text-purple-700' :
                      company.subscriptionTier === 'PREMIUM' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {company.subscriptionTier}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {company.isVerified ? (
                      <CheckCircle weight="light" className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle weight="light" className="h-5 w-5 text-gray-400" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--text-secondary))]">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
