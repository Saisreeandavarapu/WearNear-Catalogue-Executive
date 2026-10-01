import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { AdjustmentReason } from '../../types';
import { ArrowLeft, Save, RefreshCw } from 'lucide-react';

export const InventoryAdjustPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, addInventoryAdjustment } = useCatalogue();

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [selectedSku, setSelectedSku] = useState(products[0]?.variants[0]?.sku || '');
  const [adjustmentQty, setAdjustmentQty] = useState(5);
  const [reason, setReason] = useState<AdjustmentReason>('Stock Received');
  const [notes, setNotes] = useState('');

  const targetProduct = products.find(p => p.id === selectedProductId) || products[0];
  const targetVariant = targetProduct?.variants.find(v => v.sku === selectedSku) || targetProduct?.variants[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProduct || !targetVariant) return;

    addInventoryAdjustment(
      targetProduct.id,
      targetVariant.sku,
      Number(adjustmentQty),
      reason,
      notes
    );

    navigate('/vendor/catalogue/inventory/transactions');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/inventory')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel Adjustment
        </button>

        <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Stock Adjustment Form
        </span>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-[#172033] border-b border-[#DDD7CA] pb-2">
            Record Inventory Adjustment
          </h3>
        </div>

        <div>
          <label className="text-xs font-bold text-[#172033] block mb-1">Select Product Style</label>
          <select
            value={selectedProductId}
            onChange={(e) => {
              setSelectedProductId(e.target.value);
              const p = products.find(prod => prod.id === e.target.value);
              if (p && p.variants.length > 0) setSelectedSku(p.variants[0].sku);
            }}
            className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
            ))}
          </select>
        </div>

        {targetProduct && (
          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Select Variant SKU</label>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm font-mono focus:ring-2 focus:ring-[#243FBA] outline-none"
            >
              {targetProduct.variants.map(v => (
                <option key={v.id} value={v.sku}>
                  {v.sku} - {v.color} ({v.size}) [Current Stock: {v.stock}]
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Adjustment Quantity (+ / -)</label>
            <input
              type="number"
              value={adjustmentQty}
              onChange={(e) => setAdjustmentQty(Number(e.target.value))}
              required
              className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm font-extrabold focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
            <span className="text-[10px] text-[#687085]">Use positive for addition, negative for deduction</span>
          </div>

          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Adjustment Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as AdjustmentReason)}
              className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
            >
              <option value="Stock Received">Stock Received</option>
              <option value="Damaged">Damaged</option>
              <option value="Lost">Lost</option>
              <option value="Manual Correction">Manual Correction</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#172033] block mb-1">Executive Audit Notes</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add crate receipt # or reason notes..."
            className="w-full p-3 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-extrabold rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" /> Save Adjustment Log
          </button>
        </div>
      </form>
    </div>
  );
};
