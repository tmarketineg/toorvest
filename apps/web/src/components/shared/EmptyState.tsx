import { FolderDashed } from '@phosphor-icons/react/dist/ssr';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[hsl(var(--border))] px-6 py-16 text-center">
      <div className="mb-4 text-[hsl(var(--text-secondary))]">
        {icon || <FolderDashed weight="light" className="h-12 w-12" />}
      </div>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="mb-4 max-w-sm text-sm text-[hsl(var(--text-secondary))]">
        {description}
      </p>
      {action}
    </div>
  );
}
