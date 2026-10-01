import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { PackageQRCode } from '../../components/common/PackageQRCode';
import { ArrowLeft } from 'lucide-react';

export const PackagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, packages, profile } = useCatalogue();

  const order = orders.find(o => o.id === id) || orders[0];
  const pkg = packages.find(p => p.orderId === order.id) || {
    packageId: `PKG-${order.id}-01`,
    orderId: order.id,
    storeName: profile.storeName,
    itemsCount: order.items.length,
    evidenceCount: 4,
    createdAt: '12:20 PM Today',
    status: 'READY' as const,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PKG-${order.id}-01`
  };

  const handleProceedToHandover = () => {
    navigate(`/vendor/catalogue/handover/${pkg.packageId}`);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/orders')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders Queue
        </button>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Stage 6 of 6: Package Sealed
        </span>
      </div>

      <PackageQRCode
        packageData={pkg}
        onProceedToHandover={handleProceedToHandover}
      />
    </div>
  );
};
