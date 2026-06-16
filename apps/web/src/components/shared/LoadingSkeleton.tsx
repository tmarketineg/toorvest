export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      <div className="h-4 w-3/4 rounded bg-[hsl(var(--surface-elevated))]" />
      <div className="h-4 w-1/2 rounded bg-[hsl(var(--surface-elevated))]" />
      <div className="h-4 w-5/6 rounded bg-[hsl(var(--surface-elevated))]" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[hsl(var(--border))]">
      <div className="h-48 bg-[hsl(var(--surface-elevated))]" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-[hsl(var(--surface-elevated))]" />
        <div className="h-3 w-full rounded bg-[hsl(var(--surface-elevated))]" />
        <div className="h-3 w-2/3 rounded bg-[hsl(var(--surface-elevated))]" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] p-4"
        >
          <div className="h-12 w-12 rounded-lg bg-[hsl(var(--surface-elevated))]" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-[hsl(var(--surface-elevated))]" />
            <div className="h-3 w-2/3 rounded bg-[hsl(var(--surface-elevated))]" />
          </div>
        </div>
      ))}
    </div>
  );
}
