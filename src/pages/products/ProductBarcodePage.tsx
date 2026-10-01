import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { ArrowLeft, Printer, Download, Scan, RefreshCw, QrCode } from 'lucide-react';

export const ProductBarcodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useCatalogue();

  const product = products.find(p => p.id === id) || products[0];
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/products/${product.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Product #{product.id}
        </button>

        <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Barcode Registry
        </span>
      </div>

      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6 text-center">
        <div>
          <h3 className="text-xl font-black text-[#172033]">{product.name}</h3>
          <p className="text-xs text-[#687085]">EAN-13 / Code-128 Inventory Tag Generator</p>
        </div>

        {/* Variant Selector */}
        <div className="flex justify-center gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                selectedVariant.id === v.id
                  ? 'bg-[#172B82] text-white border-[#172B82]'
                  : 'bg-white text-[#172033] border-[#DDD7CA]'
              }`}
            >
              {v.color} ({v.size})
            </button>
          ))}
        </div>

        {/* Barcode Printable Tag Card */}
        <div className="p-6 bg-white rounded-2xl border-2 border-slate-900 shadow-md max-w-sm mx-auto text-left font-sans space-y-3">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="font-extrabold text-xs tracking-wider text-slate-900">WEARNEAR FASHION</span>
            <span className="text-[10px] font-mono font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
              {product.brand}
            </span>
          </div>

          <div>
            <p className="text-sm font-black text-slate-900 line-clamp-1">{product.name}</p>
            <p className="text-xs font-mono text-slate-600">SKU: {selectedVariant.sku}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            {/* Simulated Barcode Lines */}
            <div className="w-full h-16 bg-slate-950 flex items-center justify-between px-2 rounded overflow-hidden">
              <div className="w-full h-full bg-repeating-linear from-white via-white via-[2px] to-black to-[4px]" />
            </div>
            <p className="text-sm font-mono font-black text-slate-900 tracking-widest mt-1">
              {selectedVariant.barcode}
            </p>
          </div>

          <div className="flex justify-between text-xs font-bold text-slate-900 pt-1">
            <span>Color: {selectedVariant.color}</span>
            <span>Size: {selectedVariant.size}</span>
            <span>₹{selectedVariant.price}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-white border border-[#DDD7CA] hover:bg-[#F5F0E6] text-[#172033] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-[#687085]" /> Print Tag
          </button>
          <button className="px-4 py-2.5 bg-white border border-[#DDD7CA] hover:bg-[#F5F0E6] text-[#172033] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
            <Download className="w-4 h-4 text-[#687085]" /> Download PNG
          </button>
          <button
            onClick={() => navigate('/vendor/catalogue/scanner')}
            className="px-4 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Scan className="w-4 h-4" /> Test Scan
          </button>
        </div>
      </div>
    </div>
  );
};
