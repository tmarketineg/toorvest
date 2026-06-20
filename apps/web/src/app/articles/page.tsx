'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { EmptyState } from '@/components/shared/EmptyState';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt?: string;
  author?: { fullName: string };
  category?: { name: string };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async (page: number, append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const response = await api.get('/articles', { params: { page, limit: 20 } });
      const fetched = response.data.data || [];
      const pag = response.data.meta || { page: 1, limit: 20, total: 0, totalPages: 1 };

      setArticles(prev => append ? [...prev, ...fetched] : fetched);
      setPagination(pag);
    } catch {
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  function formatDate(dateString?: string): string | undefined {
    if (!dateString) return undefined;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const hasMore = pagination.page < pagination.totalPages;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Articles</h1>
        <p className="mt-2 text-[hsl(var(--text-secondary))]">
          Stay informed with the latest news, insights, and analysis.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
              <div className="h-48 bg-[hsl(var(--border))]" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-2/3 rounded bg-[hsl(var(--border))]" />
                <div className="h-3 w-full rounded bg-[hsl(var(--border))]" />
                <div className="h-3 w-4/5 rounded bg-[hsl(var(--border))]" />
                <div className="flex items-center gap-2">
                  <div className="h-3 w-16 rounded bg-[hsl(var(--border))]" />
                  <div className="h-3 w-20 rounded bg-[hsl(var(--border))]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => fetchArticles(1)}
            className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Try again
          </button>
        </div>
      ) : articles.length === 0 ? (
        <EmptyState
          title="No articles found"
          description="Check back later for new content."
        />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                date={formatDate(article.publishedAt)}
                category={article.category?.name}
                imageUrl={article.coverImage}
                slug={article.slug}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => fetchArticles(pagination.page + 1, true)}
                disabled={loadingMore}
                className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-2.5 text-sm font-medium transition-colors hover:bg-[hsl(var(--border))] disabled:opacity-50"
              >
                {loadingMore ? 'Loading...' : 'Load more'}
              </button>
            </div>
          )}

          {pagination.total > 0 && (
            <p className="mt-6 text-center text-sm text-[hsl(var(--text-secondary))]">
              Showing {articles.length} of {pagination.total} articles
            </p>
          )}
        </>
      )}
    </div>
  );
}
