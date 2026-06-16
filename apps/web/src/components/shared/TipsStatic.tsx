import {
  CheckCircle,
  Lightbulb,
  Warning,
} from '@phosphor-icons/react/dist/ssr';

const tips = [
  {
    icon: Lightbulb,
    title: 'Research the Market',
    description:
      'Understand local regulations, market dynamics, and cultural nuances before investing.',
    variant: 'info' as const,
  },
  {
    icon: CheckCircle,
    title: 'Verify Partners',
    description:
      'Always verify business partners and their credentials through official channels.',
    variant: 'success' as const,
  },
  {
    icon: Warning,
    title: 'Due Diligence',
    description:
      'Conduct thorough due diligence on any investment opportunity before committing funds.',
    variant: 'warning' as const,
  },
];

const variantStyles = {
  info: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30',
  success:
    'border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/30',
  warning:
    'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30',
};

const iconStyles = {
  info: 'text-blue-600',
  success: 'text-brand-600',
  warning: 'text-amber-600',
};

export function TipsStatic() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tips & Guidelines</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className={`rounded-xl border p-4 ${variantStyles[tip.variant]}`}
          >
            <tip.icon
              weight="light"
              className={`mb-2 h-5 w-5 ${iconStyles[tip.variant]}`}
            />
            <h4 className="mb-1 text-sm font-semibold">{tip.title}</h4>
            <p className="text-xs text-[hsl(var(--text-secondary))]">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
