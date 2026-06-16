import Link from 'next/link';
import { CalendarBlank, ArrowRight } from '@phosphor-icons/react/dist/ssr';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date?: string;
  category?: string;
  imageUrl?: string;
  slug?: string;
  href?: string;
}

export function ArticleCard({
  title,
  excerpt,
  date,
  category,
  imageUrl,
  slug,
  href,
}: ArticleCardProps) {
  const linkHref = href || (slug ? `/articles/${slug}` : '#');

  return (
    <Link
      href={linkHref}
      className="group block overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] transition-shadow hover:shadow-lg"
    >
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {category && (
            <span className="absolute start-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
              {category}
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-brand-600">
          {title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-[hsl(var(--text-secondary))]">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          {date && (
            <span className="flex items-center gap-1 text-xs text-[hsl(var(--text-secondary))]">
              <CalendarBlank weight="light" className="h-3.5 w-3.5" />
              {date}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
            Read more
            <ArrowRight weight="light" className="h-3.5 w-3.5 rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  );
}
