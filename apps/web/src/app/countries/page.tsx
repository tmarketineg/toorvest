'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { SearchBox } from '@/components/shared/SearchBox';
import { CountryCard } from '@/components/shared/CountryCard';
import { EmptyState } from '@/components/shared/EmptyState';

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function CountriesPage() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<{ code: string; name: string; slug: string; description?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true);
        const response = await api.get('/countries');
        const mapped = response.data.map((c: { id: string; name: string; nameAr?: string; code: string; flagUrl?: string; description?: string }) => ({
          code: c.code,
          name: c.name,
          slug: c.code.toLowerCase(),
          description: c.description,
          flagUrl: c.flagUrl,
        }));
        setCountries(mapped);
      } catch (err) {
        setError('Failed to load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Country Pavilions</h1>
        <p className="mt-2 text-[hsl(var(--text-secondary))]">
          Explore business landscapes and investment opportunities across the globe.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBox
          placeholder="Search countries..."
          value={search}
          onChange={setSearch}
        />
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
              <div className="h-40 bg-[hsl(var(--border))]" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-2/3 rounded bg-[hsl(var(--border))]" />
                <div className="h-3 w-full rounded bg-[hsl(var(--border))]" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No countries found"
          description="Try a different search term."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((country) => (
            <CountryCard key={country.code} {...country} />
          ))}
        </div>
      )}
    </div>
  );
}
