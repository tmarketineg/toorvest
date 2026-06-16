'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, GlobeHemisphereWest } from '@phosphor-icons/react/dist/ssr';
import { SearchBox } from '@/components/shared/SearchBox';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { TipsStatic } from '@/components/shared/TipsStatic';
import { ContactForm } from '@/components/shared/ContactForm';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Article {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt?: string;
}

interface Tourism {
  id?: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
}

interface Emirates {
  id?: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
}

interface Tip {
  id?: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
}

interface Country {
  id: string;
  name: string;
  nameAr?: string;
  code: string;
  description?: string;
  descriptionAr?: string;
  flagUrl?: string;
  _count?: { companies?: number; projects?: number; articles?: number };
}

export default function CountryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [country, setCountry] = useState<Country | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [emirates, setEmirates] = useState<Emirates[]>([]);
  const [tourism, setTourism] = useState<Tourism[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const countryRes = await api.get(`/countries/by-code/${slug.toUpperCase()}`);
        const found: Country = countryRes.data;

        if (!found) {
          if (!cancelled) {
            setError('Country not found.');
            setLoading(false);
          }
          return;
        }

        if (cancelled) return;

        setCountry(found);

        const [articlesRes, emiratesRes, tourismRes, tipsRes] = await Promise.all([
          api.get(`/countries/${found.id}/articles`).catch(() => ({ data: [] })),
          api.get(`/countries/${found.id}/emirates`).catch(() => ({ data: [] })),
          api.get(`/countries/${found.id}/tourism`).catch(() => ({ data: [] })),
          api.get(`/countries/${found.id}/tips`).catch(() => ({ data: [] })),
        ]);

        if (cancelled) return;

        setArticles(Array.isArray(articlesRes.data) ? articlesRes.data : articlesRes.data?.articles ?? []);
        setEmirates(Array.isArray(emiratesRes.data) ? emiratesRes.data : emiratesRes.data?.emirates ?? []);
        setTourism(Array.isArray(tourismRes.data) ? tourismRes.data : tourismRes.data?.tourism ?? []);
        setTips(Array.isArray(tipsRes.data) ? tipsRes.data : tipsRes.data?.tips ?? []);
      } catch (err: unknown) {
        if (!cancelled) {
          const msg =
            err instanceof Error ? err.message : 'Failed to load country data.';
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/countries"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
        >
          <ArrowLeft weight="light" className="h-4 w-4 rtl:rotate-180" />
          All Countries
        </Link>

        <div className="mb-12 h-64 animate-pulse rounded-3xl bg-[hsl(var(--surface))] sm:h-80" />

        <div className="mb-8 max-w-md">
          <div className="h-10 animate-pulse rounded-xl bg-[hsl(var(--surface))]" />
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Articles & Insights</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-[hsl(var(--surface))]" />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Tourism Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-[hsl(var(--surface))]" />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Regions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-[hsl(var(--surface))]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/countries"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
        >
          <ArrowLeft weight="light" className="h-4 w-4 rtl:rotate-180" />
          All Countries
        </Link>

        <div className="flex h-96 flex-col items-center justify-center gap-4 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
          <GlobeHemisphereWest weight="light" className="h-16 w-16 text-[hsl(var(--text-secondary))]" />
          <h2 className="text-xl font-semibold">{error || 'Country not found'}</h2>
          <p className="text-sm text-[hsl(var(--text-secondary))]">
            The country you are looking for does not exist or could not be loaded.
          </p>
          <Link
            href="/countries"
            className="mt-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:opacity-90"
          >
            Browse Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/countries"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
      >
        <ArrowLeft weight="light" className="h-4 w-4 rtl:rotate-180" />
        All Countries
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 overflow-hidden rounded-3xl"
      >
        <div className="relative h-64 sm:h-80">
          <img
            src={country.flagUrl || `https://flagcdn.com/w1280/${country.code.toLowerCase()}.png`}
            alt={country.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 start-0 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <GlobeHemisphereWest weight="light" className="h-8 w-8 text-white" />
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                {country.name}
              </h1>
            </div>
            <p className="mt-2 max-w-xl text-sm text-white/80">
              {country.description}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mb-8 max-w-md">
        <SearchBox
          placeholder={`Search in ${country.name}...`}
          value={search}
          onChange={setSearch}
        />
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Articles & Insights</h2>
        {articles.length === 0 ? (
          <p className="text-[hsl(var(--text-secondary))]">No articles available for this country.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                date={article.publishedAt ?? ''}
                imageUrl={article.coverImage ?? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <TipsStatic />
      </section>

      {tourism.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Tourism Highlights</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tourism.map((item, i) => (
              <motion.div
                key={item.id ?? i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
              >
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-[hsl(var(--text-secondary))]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {emirates.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">
            {emirates[0]?.name === 'Dubai' ? 'Emirates' : 'Regions'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {emirates.map((region, i) => (
              <motion.div
                key={region.id ?? i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
              >
                <h3 className="mb-2 font-semibold">{region.name}</h3>
                <p className="text-sm text-[hsl(var(--text-secondary))]">
                  {region.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Contact</h2>
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
