import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { EvidenceUploader } from '../../components/common/EvidenceUploader';
import { ArrowLeft } from 'lucide-react';

export const PackingEvidencePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, createPackageForOrder } = useCatalogue();

  const order = orders.find(o => o.id === id) || orders[0];

  const handleEvidenceComplete = (photos: string[]) => {
    createPackageForOrder(order.id);
    navigate(`/vendor/catalogue/orders/${order.id}/package`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/orders/${order.id}/packing`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packing Station #{order.id}
        </button>

        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Stage 5 of 6: Photo Evidence Capture
        </span>
      </div>

      <EvidenceUploader onComplete={handleEvidenceComplete} />
    </div>
  );
};
