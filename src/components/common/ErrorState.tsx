import React from 'react';
import { AlertOctagon, RotateCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Data',
  message = 'Something went wrong while fetching catalogue operations. Please verify your connection.',
  onRetry,
}) => {
  return (
    <div className="bg-red-50/80 rounded-3xl border border-red-200 p-8 text-center space-y-4 max-w-md mx-auto my-6">
      <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-200">
        <AlertOctagon className="w-7 h-7" />
      </div>

      <div>
        <h3 className="text-base font-bold text-red-900">{title}</h3>
        <p className="text-xs text-red-700 mt-1">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          <RotateCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
};
