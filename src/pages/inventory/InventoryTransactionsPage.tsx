import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { ArrowLeft, History, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const InventoryTransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactions } = useCatalogue();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/inventory')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </button>

        <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Stock Movement Audit Log
        </span>
      </div>

      <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD7CA]">
          <div>
            <h3 className="font-extrabold text-base text-[#172033]">Inventory Audit Ledger</h3>
            <p className="text-xs text-[#687085]">Every stock movement creates a permanent audit record</p>
          </div>

          <span className="text-xs font-mono font-bold text-[#687085]">
            {transactions.length} Records
          </span>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 bg-white rounded-2xl border border-[#DDD7CA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  tx.change > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tx.change > 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-[#172033]">{tx.productName}</h4>
                  <p className="text-xs text-[#687085] font-mono">
                    SKU: {tx.sku} • Reason: <strong className="text-[#172033]">{tx.reason}</strong>
                  </p>
                  {tx.notes && <p className="text-[11px] text-[#687085] italic mt-0.5">{tx.notes}</p>}
                </div>
              </div>

              <div className="text-right">
                <span className={`text-base font-black font-mono ${
                  tx.change > 0 ? 'text-emerald-700' : 'text-red-600'
                }`}>
                  {tx.change > 0 ? `+${tx.change}` : tx.change} Units
                </span>
                <p className="text-[10px] text-[#687085] font-mono">{tx.timestamp}</p>
                <p className="text-[10px] font-bold text-[#243FBA]">{tx.executive}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
