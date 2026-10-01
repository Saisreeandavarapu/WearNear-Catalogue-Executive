import React from 'react';
import { PackageOpen, LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon: Icon = PackageOpen,
}) => {
  return (
    <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-8 md:p-12 text-center space-y-4 my-6 max-w-md mx-auto shadow-card">
      <div className="w-16 h-16 rounded-full bg-[#F5F0E6] text-[#243FBA] flex items-center justify-center mx-auto border border-[#DDD7CA]">
        <Icon className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-base md:text-lg font-extrabold text-[#172033]">{title}</h3>
        <p className="text-xs md:text-sm text-[#687085] mt-1">{description}</p>
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
