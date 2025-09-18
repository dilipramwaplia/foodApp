import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon: Icon
}) {
  return (
    <div className="text-center py-16">
      {Icon && (
        <div className="mx-auto w-24 h-24 text-gray-300 mb-6">
          <Icon className="w-full h-full" />
        </div>
      )}
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}