import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Truck, ArrowRight, Scan } from 'lucide-react';

export const HandoverListPage: React.FC = () => {
  const navigate = useNavigate();
  const { packages } = useCatalogue();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-black text-[#172033]">Delivery Captain Handover</h2>
        <p className="text-xs text-[#687085]">Verify captain QR codes and confirm physical parcel handover</p>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.packageId} className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-lg text-[#172033]">{pkg.packageId}</span>
                <StatusBadge status={pkg.status} size="sm" />
              </div>
              <p className="text-xs text-[#687085] font-mono">Order: #{pkg.orderId} • {pkg.itemsCount} Items</p>
              {pkg.deliveryPartner && (
                <p className="text-xs font-bold text-emerald-800">Partner: {pkg.deliveryPartner}</p>
              )}
            </div>

            <button
              onClick={() => navigate(`/vendor/catalogue/handover/${pkg.packageId}`)}
              className="px-5 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-extrabold rounded-xl shadow-xs flex items-center justify-center gap-1.5"
            >
              <Scan className="w-4 h-4 text-amber-300" /> Verify Captain Handover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
