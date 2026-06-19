'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, PencilSimple, TrashSimple } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt?: string;
  author?: { fullName: string };
  country?: { name: string };
  category?: { name: string };
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadArticles = () => {
    setLoading(true);
    api.get('/articles?limit=50')
      .then((res) => setArticles(res.data?.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load articles'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadArticles(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.delete(`/admin/articles/${id}`);
      setArticles(articles.filter(a => a.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete article');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Articles</h2>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3"><div className="h-4 w-32 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-16 animate-pulse rounded bg-gray-200" /></td>
                </tr>
              ))
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[hsl(var(--text-secondary))]">
                  No articles found.
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="bg-[hsl(var(--surface))] transition-colors hover:bg-[hsl(var(--surface-elevated))]">
                  <td className="px-4 py-3">
                    <Link href={`/articles/${article.slug}`} className="font-medium hover:text-brand-600">
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      article.status === 'PUBLISHED' ? 'bg-green-50 text-green-700' :
                      article.status === 'DRAFT' ? 'bg-amber-50 text-amber-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--text-secondary))]">
                    {article.author?.fullName || '—'}
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--text-secondary))]">
                    {article.country?.name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashSimple weight="light" className="h-4 w-4" />
                    </button>
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
