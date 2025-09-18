/**
 * Loading spinner component - Single Responsibility Principle
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.size] - Spinner size ('sm', 'md', 'lg')
 */

import { cn } from '../../lib/utils';

export function LoadingSpinner({ className, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-emerald-600',
        sizeClasses[size]
      )}></div>
    </div>
  );
}