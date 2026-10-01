import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { ArrowLeft, Layers, Plus } from 'lucide-react';

export const ProductVariantsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useCatalogue();

  const product = products.find(p => p.id === id) || products[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/products/${product.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Product #{product.id}
        </button>

        <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Variants Manager
        </span>
      </div>

      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD7CA]">
          <div>
            <h3 className="font-black text-lg text-[#172033]">{product.name}</h3>
            <p className="text-xs text-[#687085]">Manage color and size variant matrix stock</p>
          </div>

          <button className="px-4 py-2 bg-[#243FBA] text-white text-xs font-bold rounded-xl flex items-center gap-1">
            <Plus className="w-4 h-4" /> New Variant
          </button>
        </div>

        <div className="space-y-3">
          {product.variants.map((v) => (
            <div key={v.id} className="p-4 bg-white rounded-2xl border border-[#DDD7CA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: v.colorHex }} />
                <div>
                  <h5 className="font-extrabold text-sm text-[#172033]">{v.color} - Size {v.size}</h5>
                  <p className="text-xs font-mono text-[#687085]">SKU: {v.sku} • Barcode: {v.barcode}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-black text-[#243FBA]">{v.stock} Units</span>
                <p className="text-xs text-[#687085]">₹{v.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
