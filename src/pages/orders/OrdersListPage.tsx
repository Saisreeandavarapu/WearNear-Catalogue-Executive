import React, { useState } from 'react';
import { useCatalogue } from '../../context/CatalogueContext';
import { OrderCard } from '../../components/common/OrderCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrdersListPage: React.FC = () => {
  const { orders } = useCatalogue();
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.sku.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'ALL') return matchesSearch;
    if (activeTab === 'ISSUES') return matchesSearch && o.verificationStatus === 'MISMATCH';
    return matchesSearch && o.status === activeTab;
  });

  const tabs = [
    { key: 'ALL', label: 'All Orders', count: orders.length },
    { key: 'NEW', label: 'New', count: orders.filter(o => o.status === 'NEW').length },
    { key: 'PICKING', label: 'Picking', count: orders.filter(o => o.status === 'PICKING').length },
    { key: 'VERIFICATION', label: 'Verification', count: orders.filter(o => o.status === 'VERIFICATION').length },
    { key: 'PACKING', label: 'Packing', count: orders.filter(o => o.status === 'PACKING').length },
    { key: 'READY', label: 'Ready', count: orders.filter(o => o.status === 'READY').length },
    { key: 'COMPLETED', label: 'Completed', count: orders.filter(o => o.status === 'COMPLETED').length },
    { key: 'ISSUES', label: 'Issues', count: orders.filter(o => o.verificationStatus === 'MISMATCH').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Customer Orders Queue</h2>
          <p className="text-xs text-[#687085]">Manage picking, verification, packing, and courier dispatch</p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order #, SKU, or Customer..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD7CA] rounded-2xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none shadow-xs"
          />
          <Search className="w-4 h-4 text-[#687085] absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#DDD7CA]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-[#172B82] text-white shadow-md'
                : 'bg-white text-[#172033] border border-[#DDD7CA] hover:bg-[#F5F0E6]'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === tab.key ? 'bg-amber-400 text-slate-950 font-black' : 'bg-[#F5F0E6] text-[#687085]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Order Cards Grid */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Orders Waiting"
          description="All current orders in this category have been processed successfully."
          icon={ShoppingBag}
        />
      )}
    </div>
  );
};
