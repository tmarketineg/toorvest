'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  TrendUp,
  BuildingOffice,
  Leaf,
  Factory,
  Users,
  ChatCircle,
  GraduationCap,
  MagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr';
import { SearchBox } from '@/components/shared/SearchBox';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { ContactForm } from '@/components/shared/ContactForm';
import api from '@/lib/api';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  budget: string;
}

interface ArticleItem {
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

function formatBudget(min?: number, max?: number): string {
  if (max && max >= 1_000_000_000) return `$${(max / 1_000_000_000).toFixed(0)}B`;
  if (max && max >= 1_000_000) return `$${(max / 1_000_000).toFixed(0)}M`;
  if (max && max >= 1_000) return `$${(max / 1_000).toFixed(0)}K`;
  if (max) return `$${max.toLocaleString()}`;
  if (min && min >= 1_000_000) return `$${(min / 1_000_000).toFixed(0)}M`;
  if (min) return `$${min.toLocaleString()}`;
  return 'N/A';
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
      <div className="h-44 animate-pulse bg-[hsl(var(--surface-elevated))]" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[hsl(var(--surface-elevated))]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[hsl(var(--surface-elevated))]" />
        <div className="h-3 w-full animate-pulse rounded bg-[hsl(var(--surface-elevated))]" />
        <div className="h-3 w-full animate-pulse rounded bg-[hsl(var(--surface-elevated))]" />
      </div>
    </div>
  );
}

export default function InvestmentPage() {
  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<'all' | 'governmental' | 'individual'>('all');
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [projectsRes, articlesRes] = await Promise.all([
          api.get('/projects'),
          api.get('/articles?module=INVESTMENT_TOURISM&limit=3'),
        ]);

        const rawProjects: ProjectItem[] = (projectsRes.data.data || []).map(
          (p: Record<string, unknown>) => ({
            id: p.id as string,
            title: (p.title as string) || 'Untitled Project',
            description: (p.description as string) || '',
            type: (p.projectType as string)?.toLowerCase() || 'individual',
            location: p.country
              ? `${(p.country as Record<string, string>).name}`
              : (p.sector as string) || 'Global',
            budget: formatBudget(p.budgetMin as number | undefined, p.budgetMax as number | undefined),
          })
        );

        const rawArticles: ArticleItem[] = (
          articlesRes.data.data || []
        ).map((a: Record<string, unknown>) => ({
          title: (a.title as string) || '',
          excerpt: (a.excerpt as string) || '',
          date: a.publishedAt
            ? new Date(a.publishedAt as string).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : '',
          imageUrl: (a.coverImage as string) || '',
          slug: (a.slug as string) || '',
        }));

        setProjects(rawProjects);
        setArticles(rawArticles);
      } catch (err) {
        console.error('Failed to fetch investment data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      (projectFilter === 'all' || p.type === projectFilter) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <TrendUp weight="light" className="h-8 w-8 text-brand-600" />
          <h1 className="text-3xl font-bold sm:text-4xl">Investment Tourism</h1>
        </div>
        <p className="mt-2 text-[hsl(var(--text-secondary))]">
          Discover curated investment projects, real estate opportunities, and government-backed ventures worldwide.
        </p>
      </motion.div>

      <div className="mb-8 max-w-md">
        <SearchBox
          placeholder="Search investment projects..."
          value={search}
          onChange={setSearch}
        />
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold">Articles & Insights</h2>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <ArticleCard
                key={i}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                imageUrl={article.imageUrl}
                slug={article.slug}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12" id="projects">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Investment Projects</h2>
          <div className="flex gap-2">
            {(['all', 'governmental', 'individual'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setProjectFilter(type)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  projectFilter === type
                    ? 'bg-brand-600 text-white'
                    : 'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-secondary))]'
                }`}
              >
                {type === 'all' ? 'All' : type === 'governmental' ? 'Governmental' : 'Individual'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] transition-shadow hover:shadow-lg"
              >
                <div className="p-4">
                  <h3 className="mb-1 font-semibold">{project.title}</h3>
                  <p className="mb-2 text-xs text-[hsl(var(--text-secondary))]">
                    {project.location}
                  </p>
                  <p className="mb-3 line-clamp-2 text-sm text-[hsl(var(--text-secondary))]">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-600">
                      {project.budget}
                    </span>
                    <span className="rounded-full bg-brand-600/10 px-2.5 py-0.5 text-xs font-medium text-brand-600">
                      {project.type === 'governmental' ? 'Government' : 'Individual'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold">Sector Opportunities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BuildingOffice, title: 'Real Estate', description: 'Commercial and residential development projects.' },
            { icon: Leaf, title: 'Agriculture', description: 'Sustainable farming and agri-tech investments.' },
            { icon: Factory, title: 'Industry', description: 'Manufacturing and industrial zone opportunities.' },
            { icon: Users, title: 'Investors Hub', description: 'Connect with verified investors and partners.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-5"
            >
              <item.icon weight="light" className="mb-3 h-6 w-6 text-brand-600" />
              <h3 className="mb-1 font-semibold">{item.title}</h3>
              <p className="text-sm text-[hsl(var(--text-secondary))]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
        <div className="flex items-center gap-3 mb-4">
          <ChatCircle weight="light" className="h-6 w-6 text-brand-600" />
          <h2 className="text-xl font-bold">Sofia — Investment Assistant</h2>
        </div>
        <p className="mb-4 text-[hsl(var(--text-secondary))]">
          Have questions about investment opportunities? Chat with Sofia, our AI-powered investment assistant.
        </p>
        <Link
          href="/investment/sofia"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <ChatCircle weight="light" className="h-4 w-4" />
          Start Chat with Sofia
        </Link>
      </section>

      <section className="mb-12 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap weight="light" className="h-6 w-6 text-brand-600" />
          <h2 className="text-xl font-bold">Online Incubator</h2>
        </div>
        <p className="mb-4 text-[hsl(var(--text-secondary))]">
          Join our online incubator program to get mentorship, funding connections, and resources for your investment journey.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-[hsl(var(--surface-elevated))] p-4 text-center">
            <p className="text-2xl font-bold text-brand-600">50+</p>
            <p className="text-xs text-[hsl(var(--text-secondary))]">Active Mentors</p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--surface-elevated))] p-4 text-center">
            <p className="text-2xl font-bold text-brand-600">$10M+</p>
            <p className="text-xs text-[hsl(var(--text-secondary))]">Funding Connected</p>
          </div>
          <div className="rounded-xl bg-[hsl(var(--surface-elevated))] p-4 text-center">
            <p className="text-2xl font-bold text-brand-600">200+</p>
            <p className="text-xs text-[hsl(var(--text-secondary))]">Projects Launched</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold">Expert Directory</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Dr. Fatima Al-Rashid', specialty: 'Real Estate Investment', location: 'Dubai' },
            { name: 'James Morrison', specialty: 'Venture Capital', location: 'London' },
            { name: 'Yuki Tanaka', specialty: 'Tech Investments', location: 'Tokyo' },
          ].map((expert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                <span className="text-sm font-bold">
                  {expert.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold">{expert.name}</p>
                <p className="text-xs text-[hsl(var(--text-secondary))]">
                  {expert.specialty} · {expert.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold">Contact Us</h2>
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
