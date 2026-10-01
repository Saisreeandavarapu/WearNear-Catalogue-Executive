import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { BarcodeScannerModal } from '../../components/common/BarcodeScannerModal';
import { 
  ArrowLeft, 
  Scan, 
  CheckCircle2, 
  Box, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

export const PickingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderItemPicked, updateOrderStatus } = useCatalogue();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string>('');

  const order = orders.find(o => o.id === id) || orders[0];

  const pickedCount = order.items.filter(i => i.isPicked).length;
  const totalCount = order.items.length;
  const progressPercent = Math.round((pickedCount / totalCount) * 100);

  const handleScanSuccess = (scannedCode: string) => {
    setIsScannerOpen(false);
    if (activeItemId) {
      updateOrderItemPicked(order.id, activeItemId, true);
    } else {
      // Pick first unpicked item
      const unpicked = order.items.find(i => !i.isPicked);
      if (unpicked) {
        updateOrderItemPicked(order.id, unpicked.id, true);
      }
    }
  };

  const handleManualPicked = (itemId: string) => {
    updateOrderItemPicked(order.id, itemId, true);
  };

  const handleProceedToVerify = () => {
    updateOrderStatus(order.id, 'VERIFICATION');
    navigate(`/vendor/catalogue/orders/${order.id}/verify`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/orders/${order.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Order Details #{order.id}
        </button>

        <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Stage 2 of 6: Picking
        </span>
      </div>

      {/* Picking Progress Header */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-[#687085] uppercase tracking-wider">Item Picking Dispatch</span>
            <h2 className="text-xl md:text-2xl font-black text-[#172033]">
              Order #{order.id} ({pickedCount} / {totalCount} Products Picked)
            </h2>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-[#243FBA]">{progressPercent}%</span>
            <p className="text-[11px] text-[#687085] font-semibold">Picking Progress</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#EFE9DC] h-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="bg-[#243FBA] h-full rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Picking Items Cards */}
      <div className="space-y-4">
        {order.items.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-[#FFFCF5] rounded-3xl border p-5 md:p-6 transition-all ${
              item.isPicked
                ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                : 'border-[#DDD7CA] shadow-card hover:border-[#243FBA]/40'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-[#DDD7CA] bg-slate-100 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#243FBA] px-2 py-0.5 rounded-full">
                      Item #{idx + 1}
                    </span>
                    {item.isPicked && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ✓ PRODUCT PICKED
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-[#172033]">{item.name}</h3>
                  <p className="text-xs text-[#687085] font-mono">
                    SKU: <span className="font-bold text-[#172033]">{item.sku}</span> • Barcode: {item.barcode}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <span className="font-semibold text-[#172033]">
                      Color: <strong>{item.color}</strong>
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-[#172033]">
                      Size: <strong>{item.size}</strong>
                    </span>
                    <span>•</span>
                    <span className="font-extrabold text-[#243FBA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Required: {item.quantity} Unit(s)
                    </span>
                  </div>
                </div>
              </div>

              {/* Card CTA Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[#DDD7CA]">
                {!item.isPicked ? (
                  <>
                    <button
                      onClick={() => {
                        setActiveItemId(item.id);
                        setIsScannerOpen(true);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Scan className="w-4 h-4 text-amber-300" />
                      Scan Product
                    </button>

                    <button
                      onClick={() => handleManualPicked(item.id)}
                      className="w-full sm:w-auto px-3.5 py-2.5 bg-white border border-[#DDD7CA] hover:bg-[#F5F0E6] text-[#172033] text-xs font-semibold rounded-xl transition-colors"
                    >
                      Manual Pick
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => updateOrderItemPicked(order.id, item.id, false)}
                    className="text-xs text-[#687085] font-medium hover:text-red-600 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Undo Pick
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Footer Button to Proceed to Verification */}
      <div className="pt-4 border-t border-[#DDD7CA] flex items-center justify-between bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA]">
        <div>
          <h4 className="font-extrabold text-sm text-[#172033]">Next Fulfilment Stage</h4>
          <p className="text-xs text-[#687085]">Proceed to Barcode & SKU Verification</p>
        </div>

        <button
          onClick={handleProceedToVerify}
          disabled={pickedCount < totalCount}
          className="flex items-center gap-2 px-6 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-extrabold rounded-xl shadow-md disabled:opacity-40 transition-colors"
        >
          Proceed to Verification ({pickedCount}/{totalCount})
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        targetSku={order.items.find(i => i.id === activeItemId)?.sku}
        expectedBarcode={order.items.find(i => i.id === activeItemId)?.barcode}
      />
    </div>
  );
};
