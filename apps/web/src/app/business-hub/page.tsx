'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Briefcase,
  BuildingOffice,
  MagnifyingGlass,
  Plus,
} from '@phosphor-icons/react/dist/ssr';
import { SearchBox } from '@/components/shared/SearchBox';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { CategoryGrid } from '@/components/shared/CategoryGrid';
import { EmptyState } from '@/components/shared/EmptyState';
import api, { Company, Article } from '@/lib/api';

const tabs = [
  { id: 'all', label: 'All Listings' },
  { id: 'companies', label: 'Companies' },
  { id: 'services', label: 'Services' },
  { id: 'articles', label: 'Articles' },
];

export default function BusinessHubPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [companiesRes, articlesRes] = await Promise.all([
          api.get('/companies'),
          api.get('/articles?module=BUSINESS_HUB&limit=3'),
        ]);
        setCompanies(companiesRes.data.data || []);
        setArticles(articlesRes.data.data?.articles || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCompanies = companies.filter(
    (c) =>
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      (c.serviceCategories || []).some((cat) =>
        cat.toLowerCase().includes(search.toLowerCase())
      )
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-10 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          </div>
          <div className="mt-2 h-5 w-96 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>

        <div className="mb-6 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ))}
        </div>

        <div className="mb-8 flex gap-3">
          <div className="flex-1 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="h-12 w-32 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>

        <section className="mb-12">
          <div className="mb-4 h-7 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
                <div className="mb-1 h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="mb-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="space-y-1">
                  <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-4 h-7 w-44 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="p-4">
                  <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="mb-3 h-4 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="mb-4 text-lg text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <Briefcase weight="light" className="h-8 w-8 text-brand-600" />
          <h1 className="text-3xl font-bold sm:text-4xl">Business Hub</h1>
        </div>
        <p className="mt-2 text-[hsl(var(--text-secondary))]">
          Connect with businesses worldwide. Find partners, list your company, and explore opportunities.
        </p>
      </motion.div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white'
                : 'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mb-8 flex items-center gap-3">
        <div className="flex-1">
          <SearchBox
            placeholder="Search companies, services..."
            value={search}
            onChange={setSearch}
          />
        </div>
        <Link
          href="/business-hub/bid"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Plus weight="light" className="h-4 w-4" />
          <span className="hidden sm:inline">Submit Bid</span>
        </Link>
      </div>

      {(activeTab === 'all' || activeTab === 'companies' || activeTab === 'services') && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">Company Listings</h2>
          {filteredCompanies.length === 0 ? (
            <EmptyState title="No companies found" description="Try a different search term." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company, i) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/business-hub/${company.id}`}
                    className="group block h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5 transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      {company.logoUrl ? (
                        <img
                          src={company.logoUrl}
                          alt={company.companyName}
                          className="h-8 w-8 rounded object-cover"
                        />
                      ) : (
                        <BuildingOffice weight="light" className="h-6 w-6 text-brand-600" />
                      )}
                      <div className="flex items-center gap-2">
                        {company.isVerified && (
                          <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            Verified
                          </span>
                        )}
                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                          {(company.serviceCategories || [])[0] || 'General'}
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-1 font-semibold transition-colors group-hover:text-brand-600">
                      {company.companyName}
                    </h3>
                    <p className="mb-2 text-xs text-[hsl(var(--text-secondary))]">
                      {company.country ? `${company.country.name}, ${company.country.code}` : ''}
                    </p>
                    <p className="text-sm text-[hsl(var(--text-secondary))]">
                      {company.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {(activeTab === 'all' || activeTab === 'articles') && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-bold">Articles & Insights</h2>
          {articles.length === 0 ? (
            <EmptyState title="No articles found" description="Check back later for new insights." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={article.publishedAt}
                  imageUrl={article.coverImage}
                  slug={article.slug}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold">Browse by Category</h2>
        <CategoryGrid />
      </section>
    </div>
  );
}
