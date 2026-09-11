import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onRetry,
  title = 'Operation Error'
}) => {
  return (
    <div
      data-testid="error-alert"
      role="alert"
      aria-live="assertive"
      className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 my-4"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-rose-800 text-sm">{title}</h4>
          <p className="mt-1 text-sm text-rose-700 leading-relaxed">{message}</p>
          {onRetry && (
            <div className="mt-3">
              <button
                type="button"
                data-testid="retry-action"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Action
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
