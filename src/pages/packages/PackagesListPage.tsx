import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PackageCheck, ArrowRight, QrCode } from 'lucide-react';

export const PackagesListPage: React.FC = () => {
  const navigate = useNavigate();
  const { packages } = useCatalogue();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Sealed Package Registry</h2>
          <p className="text-xs text-[#687085]">Overview of packed shipments waiting for courier captain pickup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.packageId} className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDD7CA] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#687085] uppercase tracking-wider">PACKAGE IDENTIFIER</span>
                <h3 className="font-mono font-black text-lg text-[#172033]">{pkg.packageId}</h3>
              </div>
              <StatusBadge status={pkg.status} size="sm" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#687085]">Order Reference:</span>
              <span className="font-mono font-bold text-[#172033]">#{pkg.orderId}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#687085]">Evidence Capture:</span>
              <span className="font-bold text-emerald-700">✓ {pkg.evidenceCount}/4 Photos Verified</span>
            </div>

            <div className="pt-2 border-t border-[#DDD7CA] flex justify-end">
              <button
                onClick={() => navigate(`/vendor/catalogue/handover/${pkg.packageId}`)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Delivery Handover <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
