import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  PackageCheck, 
  Truck, 
  CheckCheck, 
  XCircle, 
  Box,
  Layers
} from 'lucide-react';
import { OrderStatus, VerificationStatus, StockStatus, PackageStatus } from '../../types';

interface StatusBadgeProps {
  status: OrderStatus | VerificationStatus | StockStatus | PackageStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let bgColor = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Clock;
  let label = status.replace(/_/g, ' ');

  switch (status) {
    case 'NEW':
      bgColor = 'bg-amber-50 text-amber-800 border-amber-200/80';
      Icon = Clock;
      label = 'New Order';
      break;
    case 'PICKING':
      bgColor = 'bg-blue-50 text-[#243FBA] border-blue-200';
      Icon = Box;
      label = 'Picking';
      break;
    case 'VERIFICATION':
    case 'PENDING':
      bgColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      Icon = Layers;
      label = 'Verification';
      break;
    case 'MATCHED':
      bgColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      Icon = CheckCircle2;
      label = 'Matched';
      break;
    case 'MISMATCH':
      bgColor = 'bg-red-50 text-red-700 border-red-200';
      Icon = XCircle;
      label = 'Mismatch';
      break;
    case 'MANUAL_REVIEW':
      bgColor = 'bg-purple-50 text-purple-700 border-purple-200';
      Icon = AlertTriangle;
      label = 'Manual Review';
      break;
    case 'PACKING':
      bgColor = 'bg-cyan-50 text-cyan-800 border-cyan-200';
      Icon = PackageCheck;
      label = 'Packing';
      break;
    case 'READY':
    case 'CREATED':
      bgColor = 'bg-teal-50 text-teal-800 border-teal-200';
      Icon = CheckCircle2;
      label = 'Ready for Handover';
      break;
    case 'HANDED_OVER':
      bgColor = 'bg-[#172B82]/10 text-[#172B82] border-[#172B82]/20';
      Icon = Truck;
      label = 'Handed Over';
      break;
    case 'COMPLETED':
      bgColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      Icon = CheckCheck;
      label = 'Completed';
      break;
    case 'CANCELLED':
      bgColor = 'bg-red-100 text-red-800 border-red-200';
      Icon = XCircle;
      label = 'Cancelled';
      break;
    case 'IN_STOCK':
      bgColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      Icon = CheckCircle2;
      label = 'In Stock';
      break;
    case 'LOW_STOCK':
      bgColor = 'bg-amber-50 text-amber-800 border-amber-300';
      Icon = AlertTriangle;
      label = 'Low Stock';
      break;
    case 'OUT_OF_STOCK':
      bgColor = 'bg-red-50 text-red-700 border-red-200';
      Icon = XCircle;
      label = 'Out of Stock';
      break;
    default:
      break;
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3 py-1.5 font-bold gap-2'
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border shadow-xs transition-colors ${bgColor} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span className="capitalize">{label}</span>
    </span>
  );
};
