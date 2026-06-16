import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

interface CountryCardProps {
  name: string;
  code: string;
  slug?: string;
  description?: string;
  flagUrl?: string;
}

export function CountryCard({ name, code, slug, description, flagUrl }: CountryCardProps) {
  const href = slug ? `/countries/${slug}` : `/countries/${code.toLowerCase()}`;
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] transition-shadow hover:shadow-lg"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={flagUrl || `https://flagcdn.com/w320/${code.toLowerCase()}.png`}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{name}</h3>
          <ArrowRight
            weight="light"
className="h-4 w-4 text-[hsl(var(--text-secondary))] transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-[-0.25rem]"
          />
        </div>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-[hsl(var(--text-secondary))]">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
