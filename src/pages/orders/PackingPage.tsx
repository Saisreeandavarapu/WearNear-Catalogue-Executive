import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Package, 
  Camera, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const PackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useCatalogue();

  const [packagingType, setPackagingType] = useState<'Standard' | 'Premium' | 'Large'>('Standard');

  const order = orders.find(o => o.id === id) || orders[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/orders/${order.id}/quantity`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Quantity Audit #{order.id}
        </button>

        <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
          Stage 5 of 6: Packaging & Audit
        </span>
      </div>

      {/* Audit Checklist Card */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-5">
        <div>
          <span className="text-xs font-bold text-[#687085] uppercase tracking-wider">Quality Assurance Audit</span>
          <h2 className="text-2xl font-black text-[#172033]">Order Packing Station</h2>
        </div>

        {/* Verification Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-emerald-900">Product Verified</p>
              <p className="text-[10px] text-emerald-700 font-mono">SKU Match ✓</p>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-emerald-900">Quantity Verified</p>
              <p className="text-[10px] text-emerald-700 font-mono">1/1 Units ✓</p>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-extrabold text-emerald-900">Variant Verified</p>
              <p className="text-[10px] text-emerald-700 font-mono">Color/Size ✓</p>
            </div>
          </div>
        </div>

        {/* Packaging Selection */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-extrabold text-[#172033] block">
            Select WearNear Branded Packaging Option:
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[
              { type: 'Standard', desc: 'Recycled Eco Pouch', icon: Package },
              { type: 'Premium', desc: 'Luxe Hard Box + Tissue', icon: Sparkles },
              { type: 'Large', desc: 'Outerwear Heavy Carton', icon: Package },
            ].map((opt) => {
              const Icon = opt.icon;
              const isSel = packagingType === opt.type;
              return (
                <button
                  key={opt.type}
                  onClick={() => setPackagingType(opt.type as any)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSel
                      ? 'bg-[#172B82] text-white border-[#172B82] shadow-md'
                      : 'bg-white text-[#172033] border-[#DDD7CA] hover:border-[#243FBA]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-xs">{opt.type}</span>
                    <Icon className={`w-4 h-4 ${isSel ? 'text-amber-300' : 'text-[#243FBA]'}`} />
                  </div>
                  <p className={`text-[10px] ${isSel ? 'text-blue-100' : 'text-[#687085]'}`}>
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="pt-4 border-t border-[#DDD7CA] flex items-center justify-between bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA]">
        <div>
          <h4 className="font-extrabold text-sm text-[#172033]">Next Action</h4>
          <p className="text-xs text-[#687085]">Capture 4-Point Fulfilment Evidence Photos</p>
        </div>

        <button
          onClick={() => navigate(`/vendor/catalogue/orders/${order.id}/packing-evidence`)}
          className="flex items-center gap-2 px-6 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-extrabold rounded-xl shadow-md transition-colors"
        >
          Capture Evidence Photos
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
