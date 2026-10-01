import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { BarcodeScannerModal } from '../../components/common/BarcodeScannerModal';
import { 
  ArrowLeft, 
  Scan, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

export const VerifyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderItemVerified, updateOrderStatus } = useCatalogue();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [mismatchState, setMismatchState] = useState<boolean>(false);
  const [scannedBadCode, setScannedBadCode] = useState<string>('');

  const order = orders.find(o => o.id === id) || orders[0];
  const targetItem = order.items[0]; // Active verification item

  const isFullyVerified = order.items.every(i => i.isVerified) && !mismatchState;

  const handleScanResult = (code: string) => {
    setIsScannerOpen(false);
    if (code === targetItem.barcode || code === targetItem.sku) {
      setMismatchState(false);
      updateOrderItemVerified(order.id, targetItem.id, true);
    } else {
      setMismatchState(true);
      setScannedBadCode(code);
    }
  };

  const handleProceedToQuantity = () => {
    if (mismatchState) return;
    updateOrderStatus(order.id, 'PACKING');
    navigate(`/vendor/catalogue/orders/${order.id}/quantity`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/orders/${order.id}/picking`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Picking #{order.id}
        </button>

        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Stage 3 of 6: SKU Product Verification
        </span>
      </div>

      {/* Main Title & Status Card */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#687085] uppercase tracking-wider">Barcode & SKU Audit</span>
            <h2 className="text-2xl font-black text-[#172033]">Product Match Verification</h2>
          </div>

          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            <Scan className="w-4 h-4 text-amber-300" />
            Scan Barcode Now
          </button>
        </div>
      </div>

      {/* Mismatch Warning Alert if incorrect scan occurs */}
      {mismatchState && (
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-5 bg-red-50 border-2 border-red-300 rounded-3xl space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 text-red-700 rounded-2xl">
              <XCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-red-900">⚠️ WRONG PRODUCT / MISMATCH DETECTED</h4>
              <p className="text-xs text-red-700">
                Scanned barcode code does not match customer order specification. Workflow locked.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-white/80 rounded-2xl border border-red-200 text-xs font-mono">
            <div>
              <span className="text-red-700 font-bold block text-[10px] uppercase">Expected SKU:</span>
              <span className="font-extrabold text-slate-900">{targetItem.sku}</span>
            </div>
            <div>
              <span className="text-red-700 font-bold block text-[10px] uppercase">Scanned Code:</span>
              <span className="font-extrabold text-red-600">{scannedBadCode}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Scan Barcode Again
            </button>
            <button
              onClick={() => setMismatchState(false)}
              className="px-4 py-2 bg-white text-slate-800 border border-slate-300 text-xs font-bold rounded-xl"
            >
              Clear Alert
            </button>
          </div>
        </motion.div>
      )}

      {/* Side-by-Side Comparison Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ordered Item Specs */}
        <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-5 space-y-3 shadow-card">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDD7CA]">
            <span className="text-xs font-black text-[#243FBA] uppercase tracking-wider">ORDERED PRODUCT SPEC</span>
            <span className="text-[11px] font-mono text-[#687085]">Reference</span>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={targetItem.imageUrl}
              alt={targetItem.name}
              className="w-20 h-20 rounded-2xl object-cover border border-[#DDD7CA]"
            />
            <div>
              <h4 className="font-extrabold text-sm text-[#172033]">{targetItem.name}</h4>
              <p className="text-xs text-[#687085] font-mono mt-0.5">SKU: {targetItem.sku}</p>
              <p className="text-xs text-[#687085] font-mono">Barcode: {targetItem.barcode}</p>
            </div>
          </div>

          <div className="p-3 bg-[#F5F0E6] rounded-2xl space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#687085]">Variant Size:</span>
              <span className="font-bold text-[#172033]">{targetItem.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#687085]">Color Name:</span>
              <span className="font-bold text-[#172033]">{targetItem.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#687085]">Target Qty:</span>
              <span className="font-bold text-[#243FBA]">{targetItem.quantity} Unit(s)</span>
            </div>
          </div>
        </div>

        {/* Scanned Audit Result */}
        <div className={`rounded-3xl border p-5 space-y-3 shadow-card flex flex-col justify-between ${
          targetItem.isVerified && !mismatchState
            ? 'bg-emerald-50/50 border-emerald-300'
            : 'bg-[#FFFCF5] border-[#DDD7CA]'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD7CA]">
              <span className="text-xs font-black text-[#172033] uppercase tracking-wider">SCANNED AUDIT MATCH</span>
              {targetItem.isVerified && !mismatchState ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ✓ MATCHED
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Pending Scan
                </span>
              )}
            </div>

            {targetItem.isVerified && !mismatchState ? (
              <div className="py-4 text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-extrabold text-emerald-900">✓ PRODUCT MATCHED</h4>
                <p className="text-xs text-emerald-700">SKU {targetItem.sku} verified against store inventory tag.</p>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <Scan className="w-12 h-12 text-[#243FBA] mx-auto opacity-70 animate-bounce" />
                <p className="text-xs text-[#687085]">Tap scan button to verify physical barcode tag.</p>
              </div>
            )}
          </div>

          <button
            onClick={() => handleScanResult(targetItem.barcode)}
            className="w-full py-2.5 bg-white border border-[#DDD7CA] hover:bg-[#F5F0E6] text-[#172033] text-xs font-bold rounded-xl transition-colors"
          >
            Simulate Auto-Match Verification
          </button>
        </div>
      </div>

      {/* Footer Navigation Button */}
      <div className="pt-4 border-t border-[#DDD7CA] flex items-center justify-between bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA]">
        <div>
          <h4 className="font-extrabold text-sm text-[#172033]">Next Stage</h4>
          <p className="text-xs text-[#687085]">Proceed to Quantity Verification</p>
        </div>

        <button
          onClick={handleProceedToQuantity}
          disabled={!isFullyVerified}
          className="flex items-center gap-2 px-6 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-extrabold rounded-xl shadow-md disabled:opacity-40 transition-colors"
        >
          Quantity Verification
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanResult}
        targetSku={targetItem.sku}
        expectedBarcode={targetItem.barcode}
      />
    </div>
  );
};
