import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Plus, 
  Minus, 
  AlertTriangle, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

export const QuantityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderItemQuantity, updateOrderStatus } = useCatalogue();

  const order = orders.find(o => o.id === id) || orders[0];
  const targetItem = order.items[0];

  const [verifiedQty, setVerifiedQty] = useState<number>(targetItem.verifiedQuantity || targetItem.quantity);

  const isConfirmed = verifiedQty === targetItem.quantity;

  const handleQtyChange = (delta: number) => {
    const newQty = Math.max(0, verifiedQty + delta);
    setVerifiedQty(newQty);
    updateOrderItemQuantity(order.id, targetItem.id, newQty);
  };

  const handleProceedToPacking = () => {
    updateOrderStatus(order.id, 'PACKING');
    navigate(`/vendor/catalogue/orders/${order.id}/packing`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/orders/${order.id}/verify`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Verification #{order.id}
        </button>

        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Stage 4 of 6: Quantity Audit
        </span>
      </div>

      {/* Main Quantity Verification Box */}
      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-6">
        <div>
          <span className="text-xs font-bold text-[#687085] uppercase tracking-wider">Unit Count Audit</span>
          <h2 className="text-2xl font-black text-[#172033]">Quantity Verification</h2>
        </div>

        {/* Circular Visual Progress Indicator */}
        <div className="flex flex-col items-center justify-center p-6 bg-[#F5F0E6]/50 rounded-3xl border border-[#DDD7CA] text-center space-y-3">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#EFE9DC]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={isConfirmed ? 'text-emerald-500' : 'text-amber-500'}
                strokeDasharray={`${(verifiedQty / targetItem.quantity) * 100}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-[#172033]">{verifiedQty}</span>
              <span className="text-[10px] font-bold text-[#687085] uppercase">of {targetItem.quantity} Units</span>
            </div>
          </div>

          <div>
            {isConfirmed ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ✓ QUANTITY CONFIRMED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full text-xs font-extrabold border border-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                ⚠ QUANTITY MISMATCH (Expected {targetItem.quantity}, Picked {verifiedQty})
              </span>
            )}
          </div>
        </div>

        {/* Item Counter Controls */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#DDD7CA]">
          <div className="flex items-center gap-3">
            <img
              src={targetItem.imageUrl}
              alt={targetItem.name}
              className="w-12 h-12 rounded-xl object-cover border border-[#DDD7CA]"
            />
            <div>
              <h4 className="font-bold text-sm text-[#172033]">{targetItem.name}</h4>
              <p className="text-xs text-[#687085] font-mono">Size: {targetItem.size} • {targetItem.color}</p>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQtyChange(-1)}
              className="w-10 h-10 rounded-xl bg-[#F5F0E6] hover:bg-[#DDD7CA] text-[#172033] flex items-center justify-center font-bold text-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="font-mono font-black text-xl w-8 text-center">{verifiedQty}</span>

            <button
              onClick={() => handleQtyChange(1)}
              className="w-10 h-10 rounded-xl bg-[#243FBA] hover:bg-[#172B82] text-white flex items-center justify-center font-bold text-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-[#DDD7CA] flex items-center justify-between bg-[#FFFCF5] p-5 rounded-2xl border border-[#DDD7CA]">
        <div>
          <h4 className="font-extrabold text-sm text-[#172033]">Next Stage</h4>
          <p className="text-xs text-[#687085]">Proceed to Packaging & Evidence Capture</p>
        </div>

        <button
          onClick={handleProceedToPacking}
          disabled={!isConfirmed}
          className="flex items-center gap-2 px-6 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-extrabold rounded-xl shadow-md disabled:opacity-40 transition-colors"
        >
          Pack Order
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
