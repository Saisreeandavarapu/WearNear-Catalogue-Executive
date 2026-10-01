import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Warehouse, RefreshCw, Search, History, AlertTriangle } from 'lucide-react';

export const InventoryListPage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useCatalogue();
  const [search, setSearch] = useState('');

  const totalProducts = products.length;
  const totalUnits = products.reduce((acc, p) => acc + p.totalStock, 0);
  const lowStockCount = products.filter(p => p.stockStatus === 'LOW_STOCK').length;
  const outOfStockCount = products.filter(p => p.stockStatus === 'OUT_OF_STOCK').length;

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.skuBase.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Title & Top Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Store Inventory Management</h2>
          <p className="text-xs text-[#687085]">Real-time stock levels, low-stock alerts, and stock adjustments</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/vendor/catalogue/inventory/transactions')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#DDD7CA] text-[#172033] text-xs font-bold rounded-xl hover:bg-[#F5F0E6]"
          >
            <History className="w-4 h-4 text-[#687085]" /> Audit Logs
          </button>
          <button
            onClick={() => navigate('/vendor/catalogue/inventory/adjust')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#243FBA] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#172B82]"
          >
            <RefreshCw className="w-4 h-4" /> Stock Adjustment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] shadow-card">
          <p className="text-xs text-[#687085] font-semibold">Total Styles</p>
          <h3 className="text-2xl font-black text-[#172033] mt-1">{totalProducts}</h3>
        </div>

        <div className="p-4 bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] shadow-card">
          <p className="text-xs text-[#687085] font-semibold">Total Available Units</p>
          <h3 className="text-2xl font-black text-[#243FBA] mt-1">{totalUnits}</h3>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 shadow-card">
          <p className="text-xs text-amber-800 font-semibold">Low Stock Styles</p>
          <h3 className="text-2xl font-black text-amber-900 mt-1">{lowStockCount}</h3>
        </div>

        <div className="p-4 bg-red-50 rounded-2xl border border-red-200 shadow-card">
          <p className="text-xs text-red-800 font-semibold">Out of Stock</p>
          <h3 className="text-2xl font-black text-red-900 mt-1">{outOfStockCount}</h3>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter inventory by name or SKU root..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD7CA] rounded-2xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
        />
        <Search className="w-4 h-4 text-[#687085] absolute left-3.5 top-3" />
      </div>

      {/* Responsive View: Desktop Table vs Mobile Cards */}
      {/* Desktop Table */}
      <div className="hidden md:block bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] overflow-hidden shadow-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F0E6] text-xs font-bold text-[#687085] border-b border-[#DDD7CA]">
              <th className="p-4">Product Garment</th>
              <th className="p-4">SKU Base</th>
              <th className="p-4">Total Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDD7CA] text-xs font-medium text-[#172033]">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/80 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.primaryImage} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-[#DDD7CA]" />
                  <div>
                    <span className="font-bold text-sm block">{p.name}</span>
                    <span className="text-[11px] text-[#687085]">{p.brand} • {p.category}</span>
                  </div>
                </td>
                <td className="p-4 font-mono font-semibold">{p.skuBase}</td>
                <td className="p-4 font-extrabold text-sm">{p.totalStock} units</td>
                <td className="p-4"><StatusBadge status={p.stockStatus} size="sm" /></td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => navigate(`/vendor/catalogue/inventory/${p.id}`)}
                    className="text-[#243FBA] font-bold hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Inventory Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] p-4 shadow-card space-y-2">
            <div className="flex items-center gap-3">
              <img src={p.primaryImage} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-[#DDD7CA]" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-[#172033] truncate">{p.name}</h4>
                <p className="text-xs text-[#687085] font-mono">SKU: {p.skuBase}</p>
              </div>
              <StatusBadge status={p.stockStatus} size="sm" />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#DDD7CA] text-xs">
              <span className="font-extrabold text-[#243FBA]">{p.totalStock} Units Available</span>
              <button
                onClick={() => navigate(`/vendor/catalogue/inventory/${p.id}`)}
                className="font-bold text-[#172033] hover:underline"
              >
                Inspect Stock →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
