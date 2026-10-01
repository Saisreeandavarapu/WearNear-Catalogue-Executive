import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export const InventoryDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products } = useCatalogue();

  const product = products.find(p => p.id === productId) || products[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/inventory')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </button>

        <button
          onClick={() => navigate('/vendor/catalogue/inventory/adjust')}
          className="px-4 py-2 bg-[#243FBA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCw className="w-4 h-4" /> Adjust Stock
        </button>
      </div>

      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6">
        <div className="flex items-center gap-4">
          <img src={product.primaryImage} alt={product.name} className="w-20 h-20 rounded-2xl object-cover border border-[#DDD7CA]" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[#172033]">{product.name}</h2>
              <StatusBadge status={product.stockStatus} size="sm" />
            </div>
            <p className="text-xs text-[#687085] font-mono mt-0.5">SKU Root: {product.skuBase} • Brand: {product.brand}</p>
            <p className="text-sm font-extrabold text-[#243FBA] mt-1">Total Stock: {product.totalStock} Units</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#DDD7CA]">
          <h4 className="font-extrabold text-sm text-[#172033]">Variant Stock Breakdown</h4>

          <div className="space-y-2">
            {product.variants.map((v) => (
              <div key={v.id} className="p-3 bg-white rounded-xl border border-[#DDD7CA] flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-[#172033]">{v.color} ({v.size})</span>
                  <p className="text-[11px] font-mono text-[#687085]">SKU: {v.sku} • Barcode: {v.barcode}</p>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-xs text-[#243FBA]">{v.stock} Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
