/**
 * Error display component - Single Responsibility Principle
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} [props.onRetry] - Retry callback function
 * @param {string} [props.className] - Additional CSS classes
 */

import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ErrorMessage({ message, onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-6 text-center', className)}>
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}