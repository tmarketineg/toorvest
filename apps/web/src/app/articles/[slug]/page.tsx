'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';
import type { Article } from '@/lib/api';

export default function ArticleDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${params.slug}`);
        setArticle(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-3/4 rounded bg-[hsl(var(--surface-elevated))]" />
          <div className="h-4 w-1/2 rounded bg-[hsl(var(--surface-elevated))]" />
          <div className="h-64 rounded-xl bg-[hsl(var(--surface-elevated))]" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-lg text-[hsl(var(--text-secondary))]">{error || 'Article not found'}</p>
        <Link href="/business-hub" className="mt-4 inline-block text-brand-600 hover:text-brand-700">
          Back to Business Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/business-hub"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
      >
        <ArrowLeft weight="light" className="h-4 w-4" />
        Back to Business Hub
      </Link>

      <article>
        <h1 className="mb-4 text-3xl font-bold text-[hsl(var(--text-primary))]">
          {article.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--text-secondary))]">
          {article.author && (
            <span>By {article.author.fullName}</span>
          )}
          {article.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar weight="light" className="h-4 w-4" />
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          )}
          {article.country && (
            <span>{article.country.name}</span>
          )}
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--surface-elevated))] px-3 py-1 text-xs font-medium text-[hsl(var(--text-secondary))]"
              >
                <Tag weight="light" className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="mb-8 w-full rounded-xl object-cover"
            style={{ maxHeight: '400px' }}
          />
        )}

        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-[hsl(var(--text-secondary))]">
            {article.excerpt}
          </p>
          {article.content && (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          )}
        </div>

        {article.category && (
          <div className="mt-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
            <span className="text-sm font-medium text-[hsl(var(--text-secondary))]">Category: </span>
            <span className="text-sm font-semibold text-[hsl(var(--text-primary))]">
              {article.category.name}
            </span>
          </div>
        )}
      </article>
    </div>
  );
}
