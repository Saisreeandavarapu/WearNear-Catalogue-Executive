import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  isActive?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  isActive,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-4 md:p-5 rounded-2xl border transition-all cursor-pointer ${
        isActive
          ? 'bg-[#172B82] text-white border-[#172B82] shadow-elevated'
          : 'bg-[#FFFCF5] text-[#172033] border-[#DDD7CA] hover:border-[#243FBA]/40 shadow-card'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs md:text-sm font-medium ${isActive ? 'text-blue-100' : 'text-[#687085]'}`}>
            {title}
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            {value}
          </h3>
        </div>

        <div className={`p-2.5 rounded-xl ${
          isActive 
            ? 'bg-white/10 text-white' 
            : 'bg-[#F5F0E6] text-[#243FBA]'
        }`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between mt-3 text-xs">
          {subtitle && (
            <span className={isActive ? 'text-blue-100/80' : 'text-[#687085]'}>
              {subtitle}
            </span>
          )}
          {trend && (
            <span className={`font-semibold ${
              trend.isPositive 
                ? (isActive ? 'text-emerald-300' : 'text-emerald-600')
                : (isActive ? 'text-rose-300' : 'text-rose-600')
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
