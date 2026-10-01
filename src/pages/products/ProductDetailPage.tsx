import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ArrowLeft, Edit3, QrCode, Layers, Tag } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useCatalogue();

  const product = products.find(p => p.id === id) || products[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/products')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products Catalogue
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/vendor/catalogue/products/${product.id}/edit`)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#DDD7CA] text-[#172033] rounded-xl text-xs font-bold hover:bg-[#F5F0E6]"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => navigate(`/vendor/catalogue/products/${product.id}/barcode`)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#243FBA] text-white rounded-xl text-xs font-bold hover:bg-[#172B82]"
          >
            <QrCode className="w-3.5 h-3.5" /> Barcode
          </button>
        </div>
      </div>

      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full md:w-64 aspect-4/3 md:aspect-square rounded-2xl object-cover border border-[#DDD7CA] bg-slate-100"
          />

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#243FBA] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                {product.brand}
              </span>
              <StatusBadge status={product.stockStatus} />
            </div>

            <h2 className="text-xl md:text-2xl font-black text-[#172033]">{product.name}</h2>
            <p className="text-xs text-[#687085] leading-relaxed">{product.description}</p>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl font-black text-[#172033]">₹{product.basePrice.toLocaleString()}</span>
              {product.mrp > product.basePrice && (
                <span className="text-sm text-[#687085] line-through font-semibold">₹{product.mrp.toLocaleString()}</span>
              )}
            </div>
          </div>
        </div>

        {/* Variants List */}
        <div className="space-y-3 pt-4 border-t border-[#DDD7CA]">
          <h4 className="font-extrabold text-sm text-[#172033]">Product Variant Inventory Matrix</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.variants.map((v) => (
              <div key={v.id} className="p-3 bg-white rounded-2xl border border-[#DDD7CA] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#172033]">{v.color} ({v.size})</p>
                  <p className="text-[11px] font-mono text-[#687085]">SKU: {v.sku}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-[#243FBA]">{v.stock} Units</span>
                  <p className="text-[10px] font-mono text-[#687085]">Barcode: {v.barcode}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
