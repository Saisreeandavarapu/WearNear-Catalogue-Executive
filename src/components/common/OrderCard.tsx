import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Package, ShieldCheck, ArrowRight } from 'lucide-react';
import { Order } from '../../types';
import { StatusBadge } from './StatusBadge';
import { motion } from 'framer-motion';

interface OrderCardProps {
  order: Order;
  compact?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, compact = false }) => {
  const navigate = useNavigate();

  const getActionTarget = () => {
    switch (order.status) {
      case 'NEW':
      case 'PICKING':
        return `/vendor/catalogue/orders/${order.id}/picking`;
      case 'VERIFICATION':
        return `/vendor/catalogue/orders/${order.id}/verify`;
      case 'PACKING':
        return `/vendor/catalogue/orders/${order.id}/packing`;
      case 'READY':
        return `/vendor/catalogue/orders/${order.id}/package`;
      case 'HANDED_OVER':
      case 'COMPLETED':
        return `/vendor/catalogue/orders/${order.id}`;
      default:
        return `/vendor/catalogue/orders/${order.id}`;
    }
  };

  const getButtonText = () => {
    switch (order.status) {
      case 'NEW':
        return 'Start Picking';
      case 'PICKING':
        return 'Continue Picking';
      case 'VERIFICATION':
        return 'Verify Products';
      case 'PACKING':
        return 'Pack Order';
      case 'READY':
        return 'View Package';
      case 'HANDED_OVER':
      case 'COMPLETED':
        return 'View Details';
      default:
        return 'View Order';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] p-4 md:p-5 shadow-card hover:border-[#243FBA]/40 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD7CA]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-base md:text-lg text-[#172033]">
              #{order.id}
            </span>
            <StatusBadge status={order.status} size="sm" />
          </div>
          <span className="text-xs text-[#687085] flex items-center gap-1 font-medium bg-[#F5F0E6] px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Due {order.dueTime}
          </span>
        </div>

        {/* Customer & Address */}
        <div className="py-3 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[#687085]">Customer:</span>
            <span className="font-semibold text-[#172033]">{order.customerName}</span>
          </div>
          <div className="flex items-start gap-1.5 text-xs text-[#687085]">
            <MapPin className="w-3.5 h-3.5 text-[#243FBA] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{order.deliveryAddress}</span>
          </div>
        </div>

        {/* Product Items Thumbnails */}
        <div className="py-2.5 bg-[#F5F0E6]/60 rounded-xl p-2.5 my-1 border border-[#DDD7CA]/50">
          <p className="text-[11px] font-semibold text-[#687085] mb-2 uppercase tracking-wide">
            {order.items.length} {order.items.length === 1 ? 'Product' : 'Products'} • ₹{order.totalAmount.toLocaleString()}
          </p>
          
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover border border-[#DDD7CA] bg-white shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#172033] truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#687085] font-mono">
                    SKU: {item.sku} • {item.color} ({item.size})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#172033]">Qty: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-3 border-t border-[#DDD7CA] flex items-center justify-between mt-2">
        <button
          onClick={() => navigate(`/vendor/catalogue/orders/${order.id}`)}
          className="text-xs font-medium text-[#687085] hover:text-[#243FBA] flex items-center gap-1 transition-colors"
        >
          Details <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => navigate(getActionTarget())}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          {getButtonText()}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
