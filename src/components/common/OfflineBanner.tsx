import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineBannerProps {
  isOffline: boolean;
  onRetry?: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline, onRetry }) => {
  if (!isOffline) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2 flex items-center justify-between text-xs font-bold shadow-md z-40 sticky top-0">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span>You're currently offline. Store changes will sync when reconnected.</span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 bg-slate-950 text-white px-3 py-1 rounded-lg text-[11px] font-semibold hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      )}
    </div>
  );
};
