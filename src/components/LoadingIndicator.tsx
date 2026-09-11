import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Loading details...' }) => {
  return (
    <div
      data-testid="loading-indicator"
      className="flex flex-col items-center justify-center py-12 px-4"
      aria-live="polite"
    >
      <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin"></div>
      <p className="mt-3 text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
};
