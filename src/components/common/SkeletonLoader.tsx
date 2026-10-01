import React from 'react';

interface SkeletonLoaderProps {
  type?: 'card' | 'table' | 'detail' | 'list';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'card', count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 md:p-5 bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] space-y-3 animate-pulse"
        >
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 bg-[#EFE9DC] rounded" />
            <div className="h-6 w-20 bg-[#EFE9DC] rounded-full" />
          </div>

          <div className="space-y-2 py-2">
            <div className="h-3 w-3/4 bg-[#EFE9DC] rounded" />
            <div className="h-3 w-1/2 bg-[#EFE9DC] rounded" />
          </div>

          <div className="h-12 w-full bg-[#EFE9DC] rounded-xl" />
        </div>
      ))}
    </div>
  );
};
