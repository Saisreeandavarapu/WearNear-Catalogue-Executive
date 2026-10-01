import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Box,
  Layers,
  PackageCheck,
  Truck,
  Scan,
  PlusCircle,
  RefreshCw,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';
import { StatCard } from '../../components/common/StatCard';
import { OrderCard } from '../../components/common/OrderCard';
import { BarcodeScannerModal } from '../../components/common/BarcodeScannerModal';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, profile } = useCatalogue();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const newOrdersCount = orders.filter(o => o.status === 'NEW').length;
  const pickingCount = orders.filter(o => o.status === 'PICKING').length;
  const verifyCount = orders.filter(o => o.status === 'VERIFICATION').length;
  const packingCount = orders.filter(o => o.status === 'PACKING').length;
  const handoverCount = orders.filter(o => o.status === 'READY').length;

  const priorityOrders = orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED');

  const handleScanResult = (code: string) => {
    setIsScannerOpen(false);
    navigate(`/vendor/catalogue/scanner?code=${code}`);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#172B82] text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Decorative Background Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-amber-400 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            Catalogue Operations Today
          </div>
          <h2 className="text-2xl md:text-3xl font-black">
            Good Morning, {profile.name} 👋
          </h2>
          <p className="text-xs md:text-sm text-blue-100/90">
            {profile.storeName} • Shift Accuracy Rate: <span className="font-bold text-emerald-300">{profile.accuracyRate}</span>
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#243FBA] hover:bg-[#3155D8] text-white text-xs font-bold rounded-xl shadow-md border border-blue-400/30 transition-all active:scale-95"
          >
            <Scan className="w-4 h-4 text-amber-300" />
            Quick Scanner
          </button>
          <button
            onClick={() => navigate('/vendor/catalogue/products/add')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        <StatCard
          title="New Orders"
          value={newOrdersCount}
          subtitle="Awaiting Pick"
          icon={ShoppingBag}
          onClick={() => navigate('/vendor/catalogue/orders')}
        />
        <StatCard
          title="Picking"
          value={pickingCount}
          subtitle="In Progress"
          icon={Box}
          isActive={true}
          onClick={() => navigate('/vendor/catalogue/orders')}
        />
        <StatCard
          title="Verification"
          value={verifyCount}
          subtitle="SKU Checks"
          icon={Layers}
          onClick={() => navigate('/vendor/catalogue/orders')}
        />
        <StatCard
          title="Packing"
          value={packingCount}
          subtitle="Sealing"
          icon={PackageCheck}
          onClick={() => navigate('/vendor/catalogue/orders')}
        />
        <StatCard
          title="Handover"
          value={handoverCount}
          subtitle="Ready Captains"
          icon={Truck}
          onClick={() => navigate('/vendor/catalogue/handover')}
        />
      </div>

      {/* Premium Fulfilment Pipeline Visual Stepper */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-5 md:p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-[#172033]">Fulfilment Pipeline</h3>
            <p className="text-xs text-[#687085]">Standard 6-stage Catalogue Executive verification flow</p>
          </div>
          <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {priorityOrders.length} Active Jobs
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { step: '1. Orders', desc: 'Customer Dispatch', icon: ShoppingBag, color: 'bg-amber-50 text-amber-800' },
            { step: '2. Picking', desc: 'Item Retrieval', icon: Box, color: 'bg-blue-50 text-[#243FBA]' },
            { step: '3. Verify SKU', desc: 'Barcode Scan', icon: Layers, color: 'bg-indigo-50 text-indigo-700' },
            { step: '4. Quantity', desc: 'Count Check', icon: CheckCircle2, color: 'bg-purple-50 text-purple-700' },
            { step: '5. Packing', desc: 'Sealed & Evidence', icon: PackageCheck, color: 'bg-cyan-50 text-cyan-800' },
            { step: '6. Handover', desc: 'Delivery Captain', icon: Truck, color: 'bg-emerald-50 text-emerald-800' },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className={`p-3 rounded-2xl border border-[#DDD7CA]/70 flex flex-col justify-between ${s.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider">{s.step}</span>
                  <Icon className="w-4 h-4 opacity-80" />
                </div>
                <p className="text-xs font-extrabold">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setIsScannerOpen(true)}
          className="p-4 bg-white hover:bg-[#F5F0E6] rounded-2xl border border-[#DDD7CA] shadow-card flex items-center gap-3 text-left transition-all group"
        >
          <div className="p-3 rounded-xl bg-[#243FBA] text-white group-hover:scale-105 transition-transform">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs md:text-sm text-[#172033]">Scan Product</h4>
            <p className="text-[11px] text-[#687085]">Instant SKU lookup</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/vendor/catalogue/products/add')}
          className="p-4 bg-white hover:bg-[#F5F0E6] rounded-2xl border border-[#DDD7CA] shadow-card flex items-center gap-3 text-left transition-all group"
        >
          <div className="p-3 rounded-xl bg-emerald-600 text-white group-hover:scale-105 transition-transform">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs md:text-sm text-[#172033]">Add Product</h4>
            <p className="text-[11px] text-[#687085]">New fashion item</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/vendor/catalogue/inventory/adjust')}
          className="p-4 bg-white hover:bg-[#F5F0E6] rounded-2xl border border-[#DDD7CA] shadow-card flex items-center gap-3 text-left transition-all group"
        >
          <div className="p-3 rounded-xl bg-indigo-600 text-white group-hover:scale-105 transition-transform">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs md:text-sm text-[#172033]">Update Stock</h4>
            <p className="text-[11px] text-[#687085]">Inventory log</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/vendor/catalogue/orders')}
          className="p-4 bg-white hover:bg-[#F5F0E6] rounded-2xl border border-[#DDD7CA] shadow-card flex items-center gap-3 text-left transition-all group"
        >
          <div className="p-3 rounded-xl bg-[#172B82] text-white group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs md:text-sm text-[#172033]">View Orders</h4>
            <p className="text-[11px] text-[#687085]">Active queue</p>
          </div>
        </button>
      </div>

      {/* Priority Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-[#172033]">Priority Fulfilment Queue</h3>
            <p className="text-xs text-[#687085]">Active customer orders requiring immediate executive processing</p>
          </div>

          <button
            onClick={() => navigate('/vendor/catalogue/orders')}
            className="text-xs font-bold text-[#243FBA] hover:underline flex items-center gap-1"
          >
            View All ({orders.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {priorityOrders.slice(0, 6).map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Scanner Modal Trigger */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanResult}
      />
    </div>
  );
};
