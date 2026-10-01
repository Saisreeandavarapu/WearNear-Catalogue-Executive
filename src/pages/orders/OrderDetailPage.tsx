import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  Box, 
  ArrowRight, 
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useCatalogue();

  const order = orders.find(o => o.id === id) || orders[0];

  const getPrimaryAction = () => {
    switch (order.status) {
      case 'NEW':
      case 'PICKING':
        return {
          label: 'START PICKING WORKFLOW',
          path: `/vendor/catalogue/orders/${order.id}/picking`
        };
      case 'VERIFICATION':
        return {
          label: 'VERIFY BARCODE & PRODUCT MATCH',
          path: `/vendor/catalogue/orders/${order.id}/verify`
        };
      case 'PACKING':
        return {
          label: 'PACK & CAPTURE EVIDENCE',
          path: `/vendor/catalogue/orders/${order.id}/packing`
        };
      case 'READY':
        return {
          label: 'VIEW PACKAGE LABEL',
          path: `/vendor/catalogue/orders/${order.id}/package`
        };
      default:
        return {
          label: 'VIEW PACKAGE',
          path: `/vendor/catalogue/orders/${order.id}/package`
        };
    }
  };

  const action = getPrimaryAction();

  return (
    <div className="space-y-6">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/orders')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders Queue
        </button>

        <StatusBadge status={order.status} size="lg" />
      </div>

      {/* Main Order Card */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#DDD7CA] pb-4 gap-2">
          <div>
            <span className="text-xs font-bold text-[#687085] uppercase tracking-wider">Catalogue Fulfilment Record</span>
            <h2 className="text-2xl font-black text-[#172033] font-mono">Order #{order.id}</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#687085] flex items-center gap-1 bg-[#F5F0E6] px-3 py-1.5 rounded-xl border border-[#DDD7CA]">
              <Clock className="w-4 h-4 text-amber-600" />
              Target Dispatch: {order.dueTime}
            </span>
          </div>
        </div>

        {/* Customer & Delivery Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F5F0E6]/60 p-4 rounded-2xl border border-[#DDD7CA]">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#687085] uppercase tracking-wider flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#243FBA]" /> Customer Details
            </h4>
            <p className="text-sm font-extrabold text-[#172033]">{order.customerName}</p>
            <p className="text-xs font-mono text-[#687085] flex items-center gap-1">
              <Phone className="w-3 h-3" /> {order.customerPhone}
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#687085] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#243FBA]" /> Delivery Destination
            </h4>
            <p className="text-xs font-medium text-[#172033] leading-relaxed">
              {order.deliveryAddress}
            </p>
          </div>
        </div>

        {/* Ordered Product Line Items */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-[#172033]">Ordered Items ({order.items.length})</h4>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#DDD7CA]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#DDD7CA] bg-slate-100"
                />

                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-sm text-[#172033]">{item.name}</h5>
                  <p className="text-xs text-[#687085] font-mono mt-0.5">
                    SKU: {item.sku} • Barcode: {item.barcode}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] bg-[#F5F0E6] text-[#172033] px-2 py-0.5 rounded border border-[#DDD7CA] font-semibold">
                      Size: {item.size}
                    </span>
                    <span className="text-[11px] bg-[#F5F0E6] text-[#172033] px-2 py-0.5 rounded border border-[#DDD7CA] font-semibold flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.colorHex }} />
                      {item.color}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-[#172033]">₹{item.price.toLocaleString()}</span>
                  <p className="text-xs font-bold text-[#243FBA] mt-0.5">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Operational Action CTA */}
        <div className="pt-4 border-t border-[#DDD7CA] flex justify-end">
          <button
            onClick={() => navigate(action.path)}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-sm font-extrabold rounded-2xl shadow-md transition-colors"
          >
            {action.label}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
